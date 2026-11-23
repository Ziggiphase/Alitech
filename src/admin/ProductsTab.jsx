import { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { categories, conditionLabel } from '../data/products';
import { cld } from '../lib/images';
import { money, explainError } from './utils';
import ProductForm from './ProductForm';

export default function ProductsTab({ catalog, units, actions }) {
  const [editing, setEditing] = useState(null); // null | {} (new) | product
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return [...catalog]
      .sort((a, b) => new Date(b.added || 0) - new Date(a.added || 0))
      .filter(p => (cat === 'all' || p.category === cat) && (!s || p.name?.toLowerCase().includes(s)));
  }, [catalog, q, cat]);

  const stockCount = (id) => units.filter(u => u.productId === id && u.status === 'in_stock').length;

  const remove = async (p) => {
    if (!window.confirm(`Remove "${p.name}" from the website?\n\nStock and sales records are kept.`)) return;
    try { await actions.deleteProduct(p.id); actions.notify('Product removed from the website'); }
    catch (e) { console.error(e); alert(explainError(e, 'delete')); }
  };

  return (
    <section>
      <div className="adm-section-head">
        <div>
          <h1>Website products</h1>
          <p className="adm-muted">What customers see in the shop. Changes show on the website immediately.</p>
        </div>
        <button className="adm-btn adm-btn--primary" onClick={() => setEditing({})}><Plus size={18} /> Add product</button>
      </div>

      <div className="adm-toolbar">
        <div className="adm-search"><Search size={16} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" /></div>
        <select value={cat} onChange={e => setCat(e.target.value)} aria-label="Category">
          <option value="all">All categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {list.length === 0 ? (
        <div className="adm-empty">
          <p>{catalog.length === 0 ? <>No products yet. Tap <strong>Add product</strong> to put your first phone on the website.</> : 'No products match your search.'}</p>
        </div>
      ) : (
        <div className="adm-list">
          {list.map(p => {
            const linked = stockCount(p.id);
            return (
              <article key={p.id} className="adm-item">
                <img className="adm-thumb" src={cld(p.images?.[0], 160) || '/brand/alitech-mark.webp'} alt="" loading="lazy" />
                <div className="adm-item-main">
                  <h3>{p.name}</h3>
                  <div className="adm-meta">
                    <span>{conditionLabel(p.condition)}{p.grade ? ` · Grade ${p.grade}` : ''}</span>
                    <span className="adm-price">{money(p.price)}</span>
                  </div>
                  <div className="adm-tags">
                    {p.inStock === false ? <span className="adm-tag adm-tag--red">Sold out</span> : <span className="adm-tag adm-tag--green">Available</span>}
                    {linked > 0 && <span className="adm-tag">{linked} in stock</span>}
                    {p.featured && <span className="adm-tag adm-tag--gold">Homepage</span>}
                  </div>
                </div>
                <div className="adm-item-actions">
                  <button className="adm-icon-btn" onClick={() => setEditing(p)} aria-label="Edit"><Pencil size={17} /></button>
                  <a className="adm-icon-btn" href={`/product/${p.id}`} target="_blank" rel="noreferrer" aria-label="View on website"><ExternalLink size={17} /></a>
                  <button className="adm-icon-btn danger" onClick={() => remove(p)} aria-label="Delete"><Trash2 size={17} /></button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {editing && (
        <ProductForm
          product={editing}
          onClose={() => setEditing(null)}
          onSave={async (data) => {
            await actions.saveProduct(data);
            actions.notify(editing.id ? 'Product updated' : 'Product added to the website');
            setEditing(null);
          }}
          uploadImage={actions.uploadImage}
        />
      )}
    </section>
  );
}
