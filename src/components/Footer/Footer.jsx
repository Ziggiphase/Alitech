import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageCircle, Shield, BadgeCheck } from 'lucide-react';
import { site, whatsappLink } from '../../config/site';
import './Footer.css';

const socialIcons = [
  { key: 'facebook', label: 'Facebook', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>) },
  { key: 'x', label: 'X (Twitter)', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>) },
  { key: 'instagram', label: 'Instagram', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>) },
  { key: 'tiktok', label: 'TikTok', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>) },
  { key: 'youtube', label: 'YouTube', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>) },
];

export default function Footer() {
  // Only show icons that have a link in src/config/site.js
  const socialLinks = socialIcons.filter(s => site.socials[s.key]);

  return (
    <footer className="footer">
      {/* Trust badges */}
      <div className="trust-bar">
        <div className="container trust-bar-inner">
          <div className="trust-item"><Shield size={22} /><div><strong>Genuine Products</strong><span>100% Authentic</span></div></div>
          <div className="trust-item"><BadgeCheck size={22} /><div><strong>Clearly Graded</strong><span>Brand new &amp; UK used, condition stated</span></div></div>
          <div className="trust-item"><MessageCircle size={22} /><div><strong>Order on WhatsApp</strong><span>Chat directly with the seller</span></div></div>
        </div>
      </div>

      {/* WhatsApp updates */}
      <div className="newsletter-section">
        <div className="container newsletter-inner">
          <div>
            <h3>Stay in the Loop</h3>
            <p>Get new arrivals, UK-used stock and deals straight on WhatsApp.</p>
          </div>
          <a href={whatsappLink('Hello Alitech, please add me to your updates list.')} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle size={16} /> Get updates on WhatsApp
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-col footer-about">
            <Link to="/" className="footer-logo" aria-label="Alitech — home"><img src="/brand/alitech-logo.webp" alt="Alitech — Premium Devices & Technology" width="220" height="144" loading="lazy" /></Link>
            <p>Your trusted destination for premium electronics. We sell, repair, and trade-in devices with quality you can rely on.</p>
            {socialLinks.length > 0 && (
              <div className="footer-socials">
                {socialLinks.map(({ key, label, icon }) => (
                  <a key={key} href={site.socials[key]} target="_blank" rel="noopener noreferrer" aria-label={label}>{icon}</a>
                ))}
              </div>
            )}
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
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Contact Us</a>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/returns">Return Policy</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="footer-contact"><MessageCircle size={14} /> WhatsApp us</a>
            <a href={`tel:${site.phoneDisplay.replace(/[^\d+]/g, "")}`} className="footer-contact"><Phone size={14} /> {site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`} className="footer-contact"><Mail size={14} /> {site.email}</a>
            <div className="footer-contact"><MapPin size={14} /> {site.address}</div>
            <div className="footer-contact"><Clock size={14} /> {site.hours}</div>
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
