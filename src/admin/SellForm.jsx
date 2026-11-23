import { useState } from 'react';
import Modal, { Field } from './Modal';
import { money, ymd, PAYMENT_METHODS, unitTitle, explainError } from './utils';

export default function SellForm({ unit, listing, onClose, onSave }) {
  const editing = unit.status === 'sold';
  const [f, setF] = useState({
    soldPrice: unit.soldPrice ?? listing?.price ?? '',
    soldDate: unit.soldDate || ymd(),
    customerName: unit.customerName || '',
    customerPhone: unit.customerPhone || '',
    paymentMethod: unit.paymentMethod || PAYMENT_METHODS[0],
    saleNotes: unit.saleNotes || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const set = (key) => (e) => setF(s => ({ ...s, [key]: e.target.value }));

  const profit = (Number(f.soldPrice) || 0) - (Number(unit.costPrice) || 0);

  const submit = async (e) => {
    e.preventDefault();
    if (!(Number(f.soldPrice) > 0)) return setError('Enter the selling price.');
    if (!f.soldDate) return setError('Enter the date of sale.');
    setSaving(true); setError('');
    try {
      await onSave({
        ...unit,
        status: 'sold',
        soldPrice: Number(f.soldPrice),
        soldDate: f.soldDate,
        customerName: f.customerName.trim(),
        customerPhone: f.customerPhone.trim(),
        paymentMethod: f.paymentMethod,
        saleNotes: f.saleNotes.trim(),
      });
    } catch (err) {
      console.error(err);
      setError(explainError(err));
      setSaving(false);
    }
  };

  return (
    <Modal
      title={editing ? 'Edit sale' : 'Mark as sold'}
      onClose={onClose}
      footer={<>
        {error && <p className="adm-error">{error}</p>}
        <button type="button" className="adm-btn" onClick={onClose}>Cancel</button>
        <button type="submit" form="sell-form" className="adm-btn adm-btn--primary" disabled={saving}>{saving ? 'Saving…' : editing ? 'Save' : 'Confirm sale'}</button>
      </>}
    >
      <div className="adm-sell-summary">
        <strong>{unitTitle(unit)}</strong>
        <span>{unit.imei ? `IMEI ${unit.imei} · ` : ''}Bought for {money(unit.costPrice)}</span>
      </div>
      <form id="sell-form" className="adm-form" onSubmit={submit}>
        <Field label="Sold for (₦)" required>
          <input type="number" inputMode="numeric" min="0" value={f.soldPrice} onChange={set('soldPrice')} autoFocus />
        </Field>
        <Field label="Date sold" required>
          <input type="date" value={f.soldDate} onChange={set('soldDate')} max={ymd()} />
        </Field>
        <div className={`adm-profit adm-field--wide ${profit < 0 ? 'neg' : ''}`}>
          Profit on this phone: <strong>{money(profit)}</strong>
        </div>
        <Field label="Customer name" hint="Optional">
          <input value={f.customerName} onChange={set('customerName')} />
        </Field>
        <Field label="Customer phone" hint="Optional">
          <input type="tel" value={f.customerPhone} onChange={set('customerPhone')} placeholder="0803…" />
        </Field>
        <Field label="Payment method">
          <select value={f.paymentMethod} onChange={set('paymentMethod')}>{PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}</select>
        </Field>
        <Field label="Notes" wide>
          <textarea rows={2} value={f.saleNotes} onChange={set('saleNotes')} placeholder="e.g. delivered to Ikeja, paid half on delivery" />
        </Field>
      </form>
    </Modal>
  );
}
