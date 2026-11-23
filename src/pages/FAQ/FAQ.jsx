import { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { whatsappLink } from '../../config/site';
import './FAQ.css';

const faqs = [
  { q: 'Are all products genuine and original?', a: 'Yes. Every listing says whether the device is brand new or UK used, and used devices show their grade and battery health.' },
  { q: 'How does the trade-in program work?', a: 'Start on our Trade-In page or message us on WhatsApp with your device model, its condition and a few photos. We\'ll reply with a quote you can put towards your next purchase.' },
  { q: 'How do I pay?', a: 'Orders are confirmed on WhatsApp. We agree the price, delivery and payment method with you directly in the chat before you pay.' },
  { q: 'Do you deliver nationwide?', a: 'Delivery is arranged on WhatsApp when you order. We\'ll confirm the cost and timing for your location in the chat.' },
  { q: 'Can I finance my purchase?', a: 'Yes, we partner with selected finance providers to offer installment plans. Speak with our team for details and eligibility.' },
  { q: 'How do I track my order?', a: 'We keep you updated on WhatsApp from the moment your order is confirmed until it gets to you.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="container">
          <h1><HelpCircle size={32} style={{ display: 'inline', verticalAlign: 'middle' }} /> Frequently Asked Questions</h1>
          <p>Find answers to common questions about our products and services.</p>
          <div className="faq-search">
            <Search size={18} />
            <input type="text" placeholder="Search FAQs..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-container">
          {filtered.map((faq, i) => (
            <div key={i} className={`faq-item glass-card ${openIndex === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{faq.q}</span>
                <ChevronDown size={18} className="faq-chevron" />
              </button>
              {openIndex === i && <div className="faq-answer"><p>{faq.a}</p></div>}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-500)' }}>
              <p>No matching questions found. <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Contact us</a> for help.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
