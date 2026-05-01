import { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import './FAQ.css';

const faqs = [
  { q: 'Are all products genuine and original?', a: 'Yes! Alitech only sells 100% authentic products sourced from authorized distributors. Every device comes with a valid warranty.' },
  { q: 'What is your return policy?', a: 'We offer a 7-day return policy for all products in original condition. Opened items may be subject to a restocking fee.' },
  { q: 'Do you offer warranty on repairs?', a: 'All our repairs come with a 90-day warranty covering the repaired components. If the issue recurs, we\'ll fix it for free.' },
  { q: 'How does the trade-in program work?', a: 'Bring your old device to our store, and we\'ll assess its condition and give you instant credit towards your next purchase. You can also start online for an estimate.' },
  { q: 'What payment methods do you accept?', a: 'We accept bank transfers, cards (Visa/Mastercard), mobile money, and cash. Installment payment plans are available for select devices.' },
  { q: 'Do you deliver nationwide?', a: 'Yes! We deliver across Nigeria. Orders over ₦100,000 qualify for free delivery. Standard delivery takes 2-5 business days.' },
  { q: 'Can I finance my purchase?', a: 'Yes, we partner with selected finance providers to offer installment plans. Speak with our team for details and eligibility.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive an SMS and email with a tracking link. You can also check your order status from your account dashboard.' },
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
              <p>No matching questions found. <a href="/contact" style={{ color: 'var(--gold)' }}>Contact us</a> for help.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
