import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Get in <span className="gradient-text">Touch</span></h1>
          <p>We'd love to hear from you. Reach out anytime.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Reach out through any of these channels and we'll get back to you as soon as possible.</p>

            <div className="contact-cards">
              <div className="contact-card glass-card">
                <Phone size={20} />
                <div><strong>Phone</strong><a href="tel:+2348001234567">+234 800 123 4567</a></div>
              </div>
              <div className="contact-card glass-card">
                <Mail size={20} />
                <div><strong>Email</strong><a href="mailto:hello@alitech.ng">hello@alitech.ng</a></div>
              </div>
              <div className="contact-card glass-card">
                <MapPin size={20} />
                <div><strong>Address</strong><span>123 Tech Avenue, Victoria Island, Lagos</span></div>
              </div>
              <div className="contact-card glass-card">
                <Clock size={20} />
                <div><strong>Hours</strong><span>Mon-Sat: 9AM - 7PM | Sun: 12PM - 5PM</span></div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap glass-card">
            <h2><MessageSquare size={22} /> Send a Message</h2>
            <form className="contact-form" onSubmit={e => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="John" required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" required />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select>
                  <option>General Inquiry</option>
                  <option>Product Question</option>
                  <option>Repair Service</option>
                  <option>Trade-In</option>
                  <option>Complaint</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows={5} placeholder="Tell us how we can help..." required />
              </div>
              <button type="submit" className="btn btn-primary contact-submit">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
