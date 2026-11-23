import { useState } from 'react';
import { categories, conditions, grades } from '../data/products';
import Modal, { Field } from './Modal';
import { ymd, explainError } from './utils';

const toNumber = (v) => (v === '' || v == null ? undefined : Number(v));

export default function UnitForm({ unit, catalog, onClose, onSave }) {
  const isNew = !unit.id;
  const [f, setF] = useState({
    productId: '', model: '', category: 'phones', imei: '', storage: '', colour: '',
    condition: 'uk-used', grade: '', batteryHealth: '', costPrice: '', dateBought: ymd(),
    supplier: '', notes: '', status: 'in_stock',
    ...unit,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (e) => setF(s => ({ ...s, [key]: e.target.value }));

  // Picking a website listing fills in the details so they don't have to be typed twice
  const pickListing = (e) => {
    const id = e.target.value;
    const p = catalog.find(x => x.id === id);
    setF(s => ({
      ...s,
      productId: id,
      ...(p ? {
        model: s.model || p.name,
        category: p.category || s.category,
        condition: p.condition || s.condition,
        grade: p.grade || s.grade,
      } : {}),
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!String(f.model).trim()) return setError('Enter the model (e.g. iPhone 13 Pro).');
    if (f.costPrice === '' || Number(f.costPrice) < 0) return setError('Enter how much you paid for it.');
    if (!f.dateBought) return setError('Enter the date you bought it.');
    setSaving(true); setError('');
    try {
      await onSave({
        ...unit,
        productId: f.productId || undefined,
        model: String(f.model).trim(),
        category: f.category,
        imei: String(f.imei || '').trim(),
        storage: String(f.storage || '').trim(),
        colour: String(f.colour || '').trim(),
        condition: f.condition,
        grade: f.condition === 'new' ? undefined : f.grade || undefined,
        batteryHealth: f.condition === 'new' ? undefined : toNumber(f.batteryHealth),
        costPrice: Number(f.costPrice),
        dateBought: f.dateBought,
        supplier: String(f.supplier || '').trim(),
        notes: String(f.notes || '').trim(),
        status: unit.status || 'in_stock',
      });
    } catch (err) {
      console.error(err);
      setError(explainError(err));
      setSaving(false);
    }
  };

  const used = f.condition !== 'new';

  return (
    <Modal
      title={isNew ? 'Add phone to stock' : 'Edit stock record'}
      onClose={onClose}
      footer={<>
        {error && <p className="adm-error">{error}</p>}
        <button type="button" className="adm-btn" onClick={onClose}>Cancel</button>
        <button type="submit" form="unit-form" className="adm-btn adm-btn--primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
      </>}
    >
      <form id="unit-form" className="adm-form" onSubmit={submit}>
        <Field label="Website listing" wide hint="Optional. Link it so the listing shows “Sold out” automatically when you sell the last one.">
          <select value={f.productId} onChange={pickListing}>
            <option value="">— Not linked —</option>
            {[...catalog].sort((a, b) => a.name.localeCompare(b.name)).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </Field>

        <Field label="Model" required wide hint="e.g. iPhone 13 Pro">
          <input value={f.model} onChange={set('model')} placeholder="Model" />
        </Field>
        <Field label="IMEI / Serial number" hint="Helps you identify each phone">
          <input value={f.imei} onChange={set('imei')} inputMode="numeric" placeholder="e.g. 356789104523871" />
        </Field>
        <Field label="Category">
          <select value={f.category} onChange={set('category')}>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        </Field>
        <Field label="Storage">
          <input value={f.storage} onChange={set('storage')} placeholder="e.g. 128GB" />
        </Field>
        <Field label="Colour">
          <input value={f.colour} onChange={set('colour')} placeholder="e.g. Blue" />
        </Field>

        <Field label="Condition">
          <select value={f.condition} onChange={set('condition')}>{conditions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        </Field>
        {used && (
          <Field label="Grade">
            <select value={f.grade} onChange={set('grade')}>
              <option value="">— Not graded —</option>
              {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </Field>
        )}
        {used && (
          <Field label="Battery health (%)">
            <input type="number" inputMode="numeric" min="0" max="100" value={f.batteryHealth ?? ''} onChange={set('batteryHealth')} />
          </Field>
        )}

        <Field label="Amount paid (₦)" required hint="What you bought it for">
          <input type="number" inputMode="numeric" min="0" value={f.costPrice} onChange={set('costPrice')} placeholder="e.g. 480000" />
        </Field>
        <Field label="Date bought" required>
          <input type="date" value={f.dateBought} onChange={set('dateBought')} max={ymd()} />
        </Field>
        <Field label="Bought from" hint="Optional — supplier or person">
          <input value={f.supplier} onChange={set('supplier')} />
        </Field>
        <Field label="Notes" wide>
          <textarea rows={2} value={f.notes} onChange={set('notes')} placeholder="e.g. small scratch on back, new screen" />
        </Field>
      </form>
    </Modal>
  );
}
