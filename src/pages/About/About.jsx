import { Target, Users, Award, Heart, Zap, Globe } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About <span className="gradient-text">Alitech</span></h1>
          <p>Your trusted destination for premium electronics since day one.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-story">
            <div className="about-story-text">
              <h2>Our Story</h2>
              <p>Alitech was born from a simple belief: everyone deserves access to quality electronics at fair prices. What started as a small repair shop has grown into a trusted destination for buying, selling, and repairing electronics.</p>
              <p>We carefully select every product in our catalog, ensuring authenticity and quality. Our technicians are certified professionals who treat every device with the care it deserves.</p>
            </div>
            <div className="about-story-stats">
              <div className="about-stat"><strong>5,000+</strong><span>Happy Customers</span></div>
              <div className="about-stat"><strong>2,000+</strong><span>Devices Sold</span></div>
              <div className="about-stat"><strong>15+</strong><span>Brand Partners</span></div>
              <div className="about-stat"><strong>4.8★</strong><span>Average Rating</span></div>
            </div>
          </div>

          <div className="about-values">
            <h2 className="section-title" style={{ textAlign: 'center' }}>Our Values</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>What drives everything we do</p>
            <div className="values-grid">
              {[
                { icon: Award, title: 'Authenticity', desc: '100% genuine products from authorized channels. No counterfeits, ever.' },
                { icon: Users, title: 'Customer First', desc: 'Your satisfaction is our priority. From browsing to after-sales, we\'re here for you.' },
                { icon: Target, title: 'Fair Pricing', desc: 'Competitive prices without compromising quality. Value in every purchase.' },
                { icon: Heart, title: 'Passion for Tech', desc: 'We love technology and it shows. Our team lives and breathes electronics.' },
                { icon: Zap, title: 'Innovation', desc: 'Always bringing you the latest devices and the most up-to-date repair techniques.' },
                { icon: Globe, title: 'Community', desc: 'We\'re more than a store — we\'re part of the tech community.' },
              ].map((v, i) => (
                <div key={i} className="value-card glass-card">
                  <div className="value-icon"><v.icon size={24} /></div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
