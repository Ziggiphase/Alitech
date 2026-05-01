import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Notification from './components/Notification/Notification';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Auth from './pages/Auth/Auth';
import Deals from './pages/Deals/Deals';
import Repair from './pages/Repair/Repair';
import TradeIn from './pages/TradeIn/TradeIn';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Wishlist from './pages/Wishlist/Wishlist';
import FAQ from './pages/FAQ/FAQ';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/trade-in" element={<TradeIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PolicyPage title="Privacy Policy" />} />
          <Route path="/terms" element={<PolicyPage title="Terms of Service" />} />
          <Route path="/returns" element={<PolicyPage title="Return Policy" />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <Notification />
    </>
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
            contact us at <a href="mailto:hello@alitech.ng" style={{ color: 'var(--gold)' }}>hello@alitech.ng</a> for
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
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}
