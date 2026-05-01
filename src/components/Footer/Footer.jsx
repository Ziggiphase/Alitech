import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CreditCard, Shield, Truck, RotateCcw } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Trust badges */}
      <div className="trust-bar">
        <div className="container trust-bar-inner">
          <div className="trust-item"><Truck size={22} /><div><strong>Free Delivery</strong><span>On orders ₦100k+</span></div></div>
          <div className="trust-item"><Shield size={22} /><div><strong>Genuine Products</strong><span>100% Authentic</span></div></div>
          <div className="trust-item"><RotateCcw size={22} /><div><strong>Easy Returns</strong><span>7-day return policy</span></div></div>
          <div className="trust-item"><CreditCard size={22} /><div><strong>Secure Payment</strong><span>SSL encrypted</span></div></div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter-section">
        <div className="container newsletter-inner">
          <div>
            <h3>Stay in the Loop</h3>
            <p>Get exclusive deals, new arrivals, and tech news straight to your inbox.</p>
          </div>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button type="submit" className="btn btn-primary"><Send size={16} /> Subscribe</button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-col footer-about">
            <Link to="/" className="footer-logo"><span className="logo-icon">A</span><span className="logo-text">ALITECH</span></Link>
            <p>Your trusted destination for premium electronics. We sell, repair, and trade-in devices with quality you can rely on.</p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a href="#" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a>
              <a href="#" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/shop/phones">Phones</Link>
            <Link to="/shop/laptops">Laptops</Link>
            <Link to="/shop/tablets">Tablets</Link>
            <Link to="/shop/smartwatches">Smartwatches</Link>
            <Link to="/shop/consoles">Game Consoles</Link>
            <Link to="/shop/audio">Audio</Link>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <Link to="/repair">Repair Services</Link>
            <Link to="/trade-in">Trade-In</Link>
            <Link to="/deals">Deals & Offers</Link>
            <Link to="/shop">Compare Devices</Link>
            <Link to="/faq">FAQs</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Alitech</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/returns">Return Policy</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:+2348001234567" className="footer-contact"><Phone size={14} /> +234 800 123 4567</a>
            <a href="mailto:hello@alitech.ng" className="footer-contact"><Mail size={14} /> hello@alitech.ng</a>
            <div className="footer-contact"><MapPin size={14} /> Lagos, Nigeria</div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Alitech. All rights reserved.</p>
          <p className="footer-tagline">Built with ❤️ for tech lovers</p>
        </div>
      </div>
    </footer>
  );
}
