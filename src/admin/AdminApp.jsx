import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Boxes, Smartphone, LogOut, ExternalLink, RefreshCw } from 'lucide-react';
import * as api from '@backend/admin';
import { ADMIN_EMAILS } from '../config/firebase';
import ReportsTab from './ReportsTab';
import { explainError } from './utils';
import StockTab from './StockTab';
import ProductsTab from './ProductsTab';
import './admin.css';

const TABS = [
  { id: 'reports', label: 'Overview', icon: BarChart3 },
  { id: 'stock', label: 'Stock & Sales', icon: Boxes },
  { id: 'products', label: 'Website', icon: Smartphone },
];

export default function AdminApp() {
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    document.title = 'Alitech — Admin';
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'robots'; document.head.appendChild(meta); }
    meta.content = 'noindex';
    return api.watchAuth(setUser);
  }, []);

  const handleSignIn = async () => {
    setAuthError(''); setSigningIn(true);
    try { await api.signIn(); }
    catch (e) {
      if (e?.code !== 'auth/popup-closed-by-user' && e?.code !== 'auth/cancelled-popup-request') {
        setAuthError('Sign-in failed. Check your internet connection and try again.');
        console.error(e);
      }
    } finally { setSigningIn(false); }
  };

  if (user === undefined) return <div className="admin-boot">Loading…</div>;

  if (!user) {
    return (
      <div className="adm-login">
        <div className="adm-login-card">
          <img src="/brand/alitech-logo.webp" alt="Alitech" className="adm-login-logo" />
          <h1>Alitech Admin</h1>
          <p>Manage products, stock, sales and reports.</p>
          <button className="adm-btn adm-btn--primary adm-btn--lg" onClick={handleSignIn} disabled={signingIn}>
            <GoogleIcon /> {signingIn ? 'Signing in…' : 'Sign in with Google'}
          </button>
          {authError && <p className="adm-error">{authError}</p>}
          <Link to="/" className="adm-login-back">← Back to the website</Link>
        </div>
      </div>
    );
  }

  if (!ADMIN_EMAILS.includes(user.email)) {
    return (
      <div className="adm-login">
        <div className="adm-login-card">
          <h1>No access</h1>
          <p><strong>{user.email}</strong> is not allowed to use this dashboard. Sign in with the business Google account.</p>
          <button className="adm-btn adm-btn--primary" onClick={() => api.signOut()}>Use another account</button>
        </div>
      </div>
    );
  }

  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  const [tab, setTab] = useState(() => sessionStorage.getItem('adm_tab') || 'reports');
  const [catalog, setCatalog] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [c, u] = await Promise.all([api.getCatalog(), api.listUnits()]);
      setCatalog(c); setUnits(u);
    } catch (e) {
      console.error(e);
      setError(explainError(e, 'load your data'));
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { sessionStorage.setItem('adm_tab', tab); }, [tab]);

  const notify = useCallback((msg) => { setToast(msg); setTimeout(() => setToast(''), 2600); }, []);

  // Shared actions passed to the tabs. Each updates the screen right away after saving.
  const actions = {
    notify,
    async saveProduct(p) { const saved = await api.saveProduct(p); setCatalog(list => [saved, ...list.filter(x => x.id !== saved.id)]); return saved; },
    async deleteProduct(id) { await api.deleteProduct(id); setCatalog(list => list.filter(x => x.id !== id)); },
    async saveUnit(u) {
      const saved = await api.saveUnit(u);
      const next = [...units.filter(x => x.id !== saved.id), saved];
      setUnits(next);
      await syncStock(next, [saved.productId, units.find(x => x.id === saved.id)?.productId]);
      return saved;
    },
    async deleteUnit(unit) {
      await api.deleteUnit(unit.id);
      const next = units.filter(x => x.id !== unit.id);
      setUnits(next);
      await syncStock(next, [unit.productId]);
    },
    uploadImage: api.uploadImage,
  };

  // Website listings linked to stock show "Sold out" automatically when no linked phone is left.
  async function syncStock(nextUnits, productIds) {
    const updates = {};
    for (const pid of new Set(productIds.filter(Boolean))) {
      const product = catalog.find(p => p.id === pid);
      if (!product) continue;
      const linked = nextUnits.filter(u => u.productId === pid);
      if (linked.length === 0) continue; // not tracked by stock — leave the manual setting alone
      const hasStock = linked.some(u => u.status === 'in_stock');
      if ((product.inStock !== false) !== hasStock) updates[pid] = hasStock;
    }
    if (Object.keys(updates).length) {
      await api.setStock(updates);
      setCatalog(list => list.map(p => (p.id in updates ? { ...p, inStock: updates[p.id] } : p)));
    }
  }

  return (
    <div className="adm">
      <header className="adm-top">
        <div className="adm-brand"><img src="/brand/alitech-mark.webp" alt="" className="adm-brand-mark" /><span>Alitech <em>Admin</em></span></div>
        <nav className="adm-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`adm-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <t.icon size={18} /><span>{t.label}</span>
            </button>
          ))}
        </nav>
        <div className="adm-top-actions">
          <button className="adm-icon-btn" onClick={load} title="Refresh" aria-label="Refresh"><RefreshCw size={18} /></button>
          <a className="adm-icon-btn" href="/" target="_blank" rel="noreferrer" title="Open website" aria-label="Open website"><ExternalLink size={18} /></a>
          <button className="adm-icon-btn" onClick={() => api.signOut()} title={`Sign out (${user.email})`} aria-label="Sign out"><LogOut size={18} /></button>
        </div>
      </header>

      <main className="adm-main">
        {error && <div className="adm-alert">{error}</div>}
        {loading ? <div className="adm-empty">Loading…</div> : (
          <>
            {tab === 'reports' && <ReportsTab units={units} catalog={catalog} goTo={setTab} />}
            {tab === 'stock' && <StockTab units={units} catalog={catalog} actions={actions} />}
            {tab === 'products' && <ProductsTab catalog={catalog} units={units} actions={actions} />}
          </>
        )}
      </main>

      {toast && <div className="adm-toast">{toast}</div>}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
