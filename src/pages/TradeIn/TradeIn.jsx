import { useState } from 'react';
import { ArrowLeftRight, Smartphone, ChevronRight, CheckCircle, DollarSign } from 'lucide-react';
import './TradeIn.css';

const deviceTypes = ['Smartphone', 'Laptop', 'Tablet', 'Smartwatch', 'Game Console'];
const conditions = [
  { value: 'excellent', label: 'Excellent', desc: 'Like new, no scratches', multiplier: 1 },
  { value: 'good', label: 'Good', desc: 'Minor wear, fully functional', multiplier: 0.75 },
  { value: 'fair', label: 'Fair', desc: 'Visible wear, works fine', multiplier: 0.5 },
  { value: 'poor', label: 'Poor', desc: 'Significant damage', multiplier: 0.25 },
];

export default function TradeIn() {
  const [step, setStep] = useState(1);
  const [deviceType, setDeviceType] = useState('');
  const [deviceCondition, setDeviceCondition] = useState('');

  const steps = [
    { num: 1, title: 'Select Device' },
    { num: 2, title: 'Condition' },
    { num: 3, title: 'Get Quote' },
  ];

  return (
    <div className="tradein-page">
      <section className="tradein-hero">
        <div className="container">
          <span className="badge badge-gold"><ArrowLeftRight size={12} /> Trade-In Program</span>
          <h1>Trade In, <span className="gradient-text">Upgrade</span></h1>
          <p>Get instant value for your old devices. Quick, easy, and fair pricing.</p>
        </div>
      </section>

      <section className="section">
        <div className="container tradein-container">
          {/* Steps indicator */}
          <div className="tradein-steps">
            {steps.map(s => (
              <div key={s.num} className={`tradein-step ${step >= s.num ? 'active' : ''}`}>
                <div className="step-num">{step > s.num ? <CheckCircle size={18} /> : s.num}</div>
                <span>{s.title}</span>
              </div>
            ))}
          </div>

          <div className="tradein-form glass-card">
            {step === 1 && (
              <div className="tradein-step-content animate-fadeIn">
                <h3>What device do you want to trade in?</h3>
                <div className="device-types">
                  {deviceTypes.map(type => (
                    <button key={type} className={`device-type-btn ${deviceType === type ? 'active' : ''}`} onClick={() => setDeviceType(type)}>
                      <Smartphone size={24} />
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
                <button className="btn btn-primary tradein-next" onClick={() => deviceType && setStep(2)} disabled={!deviceType}>
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="tradein-step-content animate-fadeIn">
                <h3>What condition is your {deviceType.toLowerCase()} in?</h3>
                <div className="condition-options">
                  {conditions.map(c => (
                    <button key={c.value} className={`condition-btn ${deviceCondition === c.value ? 'active' : ''}`} onClick={() => setDeviceCondition(c.value)}>
                      <strong>{c.label}</strong>
                      <span>{c.desc}</span>
                    </button>
                  ))}
                </div>
                <div className="tradein-btns">
                  <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" onClick={() => deviceCondition && setStep(3)} disabled={!deviceCondition}>
                    Get Quote <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="tradein-step-content tradein-result animate-fadeIn">
                <div className="tradein-result-icon"><DollarSign size={36} /></div>
                <h3>Your Estimated Trade-In Value</h3>
                <div className="tradein-value">₦{(conditions.find(c => c.value === deviceCondition)?.multiplier * 50000).toLocaleString()}</div>
                <p>Bring your {deviceType.toLowerCase()} to our store to finalize your trade-in and get instant credit towards your next purchase.</p>
                <div className="tradein-btns">
                  <button className="btn btn-secondary" onClick={() => { setStep(1); setDeviceType(''); setDeviceCondition(''); }}>Start Over</button>
                  <a href="tel:+2348001234567" className="btn btn-primary">Book Appointment</a>
                </div>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="tradein-benefits">
            <div className="tradein-benefit glass-card">
              <CheckCircle size={20} />
              <div><strong>Instant Credit</strong><span>Use towards any purchase</span></div>
            </div>
            <div className="tradein-benefit glass-card">
              <CheckCircle size={20} />
              <div><strong>Fair Pricing</strong><span>Competitive market rates</span></div>
            </div>
            <div className="tradein-benefit glass-card">
              <CheckCircle size={20} />
              <div><strong>Eco-Friendly</strong><span>Responsible recycling</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
