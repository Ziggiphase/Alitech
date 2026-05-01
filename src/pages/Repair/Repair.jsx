import { Wrench, Smartphone, BatteryCharging, Droplets, PlugZap, Settings, Laptop, ChevronRight, Phone, Clock, Shield, Star } from 'lucide-react';
import { repairServices } from '../../data/products';
import './Repair.css';

const iconMap = { Smartphone, BatteryCharging, Droplets, PlugZap, Settings, Laptop };

export default function Repair() {
  return (
    <div className="repair-page">
      <section className="repair-hero">
        <div className="container">
          <span className="badge badge-gold"><Wrench size={12} /> Expert Service</span>
          <h1>Professional <span className="gradient-text">Repair</span> Services</h1>
          <p>Fast, reliable repairs for all your devices. Quality parts, expert technicians.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="repair-stats">
            <div className="repair-stat glass-card"><strong>10,000+</strong><span>Devices Repaired</span></div>
            <div className="repair-stat glass-card"><strong>98%</strong><span>Customer Satisfaction</span></div>
            <div className="repair-stat glass-card"><strong>90-Day</strong><span>Repair Warranty</span></div>
            <div className="repair-stat glass-card"><strong>1-3 hrs</strong><span>Average Turnaround</span></div>
          </div>

          <h2 className="section-title" style={{ textAlign: 'center', marginTop: '48px' }}>Our Services</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>We fix it all — phones, laptops, tablets, and more</p>

          <div className="repair-grid">
            {repairServices.map(service => {
              const Icon = iconMap[service.icon];
              return (
                <div key={service.id} className="repair-card glass-card">
                  <div className="repair-card-icon"><Icon size={28} /></div>
                  <h3>{service.name}</h3>
                  <div className="repair-meta">
                    <span>{service.price}</span>
                    <span><Clock size={13} /> {service.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="repair-cta glass-card">
            <div>
              <h3>Need a repair? Get in touch.</h3>
              <p>Walk in or contact us to book a repair appointment.</p>
            </div>
            <a href="tel:+2348001234567" className="btn btn-primary"><Phone size={16} /> Call Us Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}
