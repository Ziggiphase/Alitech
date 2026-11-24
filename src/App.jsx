import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { ProductsProvider } from './context/ProductsContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Deals from './pages/Deals/Deals';
import Repair from './pages/Repair/Repair';
import TradeIn from './pages/TradeIn/TradeIn';
import About from './pages/About/About';
import FAQ from './pages/FAQ/FAQ';
import FloatingWhatsApp from './components/FloatingWhatsApp/FloatingWhatsApp';
import { site, whatsappLink } from './config/site';

// The admin dashboard is loaded only when someone opens /admin
const AdminApp = lazy(() => import('./admin/AdminApp'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <Suspense fallback={<div className="admin-boot">Loading dashboard…</div>}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/trade-in" element={<TradeIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactRedirect />} />
          <Route path="/wishlist" element={<Navigate to="/shop" replace />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PolicyPage title="Privacy Policy" />} />
          <Route path="/terms" element={<PolicyPage title="Terms of Service" />} />
          <Route path="/returns" element={<PolicyPage title="Return Policy" />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

// Old /contact links (bookmarks, Google) now open WhatsApp directly
function ContactRedirect() {
  useEffect(() => { window.location.replace(whatsappLink()); }, []);
  return (
    <div className="section container" style={{ textAlign: 'center' }}>
      <p style={{ color: 'var(--gray-400)' }}>
        Opening WhatsApp… <a href={whatsappLink()} style={{ color: 'var(--gold)' }}>Tap here if nothing happens</a>.
      </p>
    </div>
  );
}

function PolicyPage({ title }) {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title">{title}</h1>
        <div className="glass-card" style={{ padding: '32px', marginTop: '24px' }}>
          <p style={{ color: 'var(--gray-400)', lineHeight: '1.8' }}>
            This {title.toLowerCase()} page is currently being updated. Please check back soon or
            message us on <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>WhatsApp</a> or email <a href={`mailto:${site.email}`} style={{ color: 'var(--gold)' }}>{site.email}</a> for
            any questions regarding our {title.toLowerCase()}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ProductsProvider>
        <AppContent />
      </ProductsProvider>
    </Router>
  );
}
