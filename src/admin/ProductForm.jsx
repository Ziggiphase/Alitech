import { useState } from 'react';
import { ImagePlus, ArrowLeft, ArrowRight, X, Plus, Loader2 } from 'lucide-react';
import { categories, brands, conditions, grades } from '../data/products';
import { cld } from '../lib/images';
import Modal, { Field } from './Modal';
import { explainError } from './utils';

const toNumber = (v) => (v === '' || v == null ? undefined : Number(v));

export default function ProductForm({ product, onClose, onSave, uploadImage }) {
  const isNew = !product.id;
  const [f, setF] = useState({
    name: '', category: 'phones', brand: 'apple', condition: 'uk-used', grade: '', batteryHealth: '',
    price: '', originalPrice: '', inStock: true, featured: false, badge: '', description: '',
    ...product,
    images: product.images || [],
    specs: Object.entries(product.specs || {}).map(([k, v]) => ({ k, v })),
    colors: (product.colors || []).join(', '),
  });
  const [uploading, setUploading] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (e) => setF(s => ({ ...s, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const addPhotos = async (files) => {
    const list = [...files].filter(file => file.type.startsWith('image/'));
    if (!list.length) return;
    setError(''); setUploading(n => n + list.length);
    for (const file of list) {
      try {
        const url = await uploadImage(file);
        setF(s => ({ ...s, images: [...s.images, url] }));
      } catch (e) {
        console.error(e);
        setError(`Could not upload ${file.name}: ${e?.message || 'check your connection and try again.'}`);
      } finally {
        setUploading(n => n - 1);
      }
    }
  };

  const moveImage = (i, dir) => setF(s => {
    const images = [...s.images]; const j = i + dir;
    if (j < 0 || j >= images.length) return s;
    [images[i], images[j]] = [images[j], images[i]];
    return { ...s, images };
  });
  const removeImage = (i) => setF(s => ({ ...s, images: s.images.filter((_, k) => k !== i) }));

  const setSpec = (i, key, val) => setF(s => ({ ...s, specs: s.specs.map((r, k) => (k === i ? { ...r, [key]: val } : r)) }));

  const submit = async (e) => {
    e.preventDefault();
    if (!String(f.name || '').trim()) return setError('Enter the product name.');
    if (!(Number(f.price) > 0)) return setError('Enter the price (numbers only, e.g. 650000).');
    if (!f.images.length) return setError('Add at least one photo.');
    if (uploading) return setError('Wait for the photos to finish uploading.');
    setSaving(true); setError('');
    try {
      await onSave({
        id: product.id,
        added: product.added,
        name: String(f.name || '').trim(),
        category: f.category,
        brand: f.brand,
        condition: f.condition,
        grade: f.condition === 'new' ? undefined : f.grade || undefined,
        batteryHealth: f.condition === 'new' ? undefined : toNumber(f.batteryHealth),
        price: Number(f.price),
        originalPrice: toNumber(f.originalPrice),
        inStock: !!f.inStock,
        featured: !!f.featured,
        badge: String(f.badge || '').trim(),
        description: String(f.description || '').trim(),
        images: f.images,
        specs: Object.fromEntries(f.specs.filter(r => r.k.trim() && r.v.trim()).map(r => [r.k.trim(), r.v.trim()])),
        colors: f.colors.split(',').map(c => c.trim()).filter(Boolean),
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
      title={isNew ? 'Add product' : 'Edit product'}
      onClose={onClose}
      footer={<>
        {error && <p className="adm-error">{error}</p>}
        <button type="button" className="adm-btn" onClick={onClose}>Cancel</button>
        <button type="submit" form="product-form" className="adm-btn adm-btn--primary" disabled={saving || uploading > 0}>
          {saving ? 'Saving…' : isNew ? 'Add to website' : 'Save changes'}
        </button>
      </>}
    >
      <form id="product-form" className="adm-form" onSubmit={submit}>
        <Field label="Photos" required wide group hint="The first photo is the main one. Use the arrows to change the order.">
          <div className="adm-photos">
            {f.images.map((url, i) => (
              <div key={url + i} className="adm-photo">
                <img src={cld(url, 240)} alt="" />
                {i === 0 && <span className="adm-photo-main">Main</span>}
                <div className="adm-photo-tools">
                  <button type="button" onClick={() => moveImage(i, -1)} aria-label="Move left" disabled={i === 0}><ArrowLeft size={14} /></button>
                  <button type="button" onClick={() => removeImage(i)} aria-label="Remove photo"><X size={14} /></button>
                  <button type="button" onClick={() => moveImage(i, 1)} aria-label="Move right" disabled={i === f.images.length - 1}><ArrowRight size={14} /></button>
                </div>
              </div>
            ))}
            {Array.from({ length: uploading }).map((_, i) => (
              <div key={`up${i}`} className="adm-photo adm-photo--loading"><Loader2 size={22} className="adm-spin" /></div>
            ))}
            <label className="adm-photo adm-photo--add">
              <ImagePlus size={24} />
              <span>Add photos</span>
              <input type="file" accept="image/*" multiple onChange={e => { addPhotos(e.target.files); e.target.value = ''; }} />
            </label>
          </div>
        </Field>

        <Field label="Product name" required wide hint="e.g. iPhone 13 Pro 256GB">
          <input value={f.name} onChange={set('name')} placeholder="Product name" />
        </Field>

        <Field label="Category">
          <select value={f.category} onChange={set('category')}>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        </Field>
        <Field label="Brand">
          <select value={f.brand} onChange={set('brand')}>{brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select>
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
            <input type="number" inputMode="numeric" min="0" max="100" value={f.batteryHealth} onChange={set('batteryHealth')} placeholder="e.g. 88" />
          </Field>
        )}

        <Field label="Price (₦)" required hint="Numbers only, no commas">
          <input type="number" inputMode="numeric" min="0" value={f.price} onChange={set('price')} placeholder="650000" />
        </Field>
        <Field label="Old price (₦)" hint="Optional — shows the item as discounted">
          <input type="number" inputMode="numeric" min="0" value={f.originalPrice} onChange={set('originalPrice')} placeholder="Leave empty if not on sale" />
        </Field>

        <Field label="Description" wide>
          <textarea rows={3} value={f.description} onChange={set('description')} placeholder="Anything a buyer should know" />
        </Field>

        <Field label="Specifications" wide group hint="e.g. Storage → 128GB, RAM → 6GB, Display → 6.1 inch">
          <div className="adm-specs">
            {f.specs.map((r, i) => (
              <div key={i} className="adm-spec-row">
                <input value={r.k} onChange={e => setSpec(i, 'k', e.target.value)} placeholder="Spec (e.g. Storage)" />
                <input value={r.v} onChange={e => setSpec(i, 'v', e.target.value)} placeholder="Value (e.g. 128GB)" />
                <button type="button" className="adm-icon-btn" onClick={() => setF(s => ({ ...s, specs: s.specs.filter((_, k) => k !== i) }))} aria-label="Remove spec"><X size={16} /></button>
              </div>
            ))}
            <button type="button" className="adm-btn adm-btn--sm" onClick={() => setF(s => ({ ...s, specs: [...s.specs, { k: '', v: '' }] }))}><Plus size={15} /> Add spec</button>
          </div>
        </Field>

        <Field label="Colours available" wide hint="Separate with commas, e.g. Black, Blue, Gold">
          <input value={f.colors} onChange={set('colors')} placeholder="Black, Blue" />
        </Field>

        <Field label="Badge (optional)" hint='Short label, e.g. "Hot Deal"'>
          <input value={f.badge} onChange={set('badge')} maxLength={20} />
        </Field>

        <div className="adm-switches adm-field--wide">
          <label className="adm-switch"><input type="checkbox" checked={!!f.inStock} onChange={set('inStock')} /> <span>Available (uncheck to show as sold out)</span></label>
          <label className="adm-switch"><input type="checkbox" checked={!!f.featured} onChange={set('featured')} /> <span>Show on the homepage</span></label>
        </div>
      </form>
    </Modal>
  );
}
