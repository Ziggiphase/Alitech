import { useState } from 'react';
import { ArrowLeftRight, Smartphone, ChevronRight, CheckCircle, MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../config/site';
import './TradeIn.css';

const deviceTypes = ['Smartphone', 'Laptop', 'Tablet', 'Smartwatch', 'Game Console'];
const conditions = [
  { value: 'excellent', label: 'Excellent', desc: 'Like new, no scratches' },
  { value: 'good', label: 'Good', desc: 'Minor wear, fully functional' },
  { value: 'fair', label: 'Fair', desc: 'Visible wear, works fine' },
  { value: 'poor', label: 'Poor', desc: 'Significant damage' },
];

export default function TradeIn() {
  const [step, setStep] = useState(1);
  const [deviceType, setDeviceType] = useState('');
  const [deviceCondition, setDeviceCondition] = useState('');

  const steps = [
    { num: 1, title: 'Select Device' },
    { num: 2, title: 'Condition' },
    { num: 3, title: 'Chat on WhatsApp' },
  ];

  return (
    <div className="tradein-page">
      <section className="tradein-hero">
        <div className="container">
          <span className="badge badge-gold"><ArrowLeftRight size={12} /> Trade-In Program</span>
          <h1>Trade In, <span className="gradient-text">Upgrade</span></h1>
          <p>Tell us what you have, and we'll give you a quote on WhatsApp.</p>
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
                  {deviceCondition ? (
                    <a
                      href={whatsappLink(`Hello Alitech, I want to swap/trade in my ${deviceType.toLowerCase()}.\nCondition: ${conditions.find(c => c.value === deviceCondition)?.label}\nModel: `)}
                      target="_blank" rel="noopener noreferrer"
                      className="btn btn-primary"
                      onClick={() => setStep(3)}
                    >
                      <MessageCircle size={16} /> Continue on WhatsApp
                    </a>
                  ) : (
                    <button className="btn btn-primary" disabled>
                      Continue on WhatsApp <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="tradein-step-content tradein-result animate-fadeIn">
                <div className="tradein-result-icon"><MessageCircle size={36} /></div>
                <h3>Continue on WhatsApp</h3>
                <p>Send us the model and a few photos of your {deviceType.toLowerCase()}, and we'll reply with a quote.</p>
                <div className="tradein-btns">
                  <button className="btn btn-secondary" onClick={() => { setStep(1); setDeviceType(''); setDeviceCondition(''); }}>Start Over</button>
                  <a href={whatsappLink(`Hello Alitech, I want to swap/trade in my ${deviceType.toLowerCase()}.\nCondition: ${conditions.find(c => c.value === deviceCondition)?.label}\nModel: `)} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><MessageCircle size={16} /> Open WhatsApp again</a>
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
