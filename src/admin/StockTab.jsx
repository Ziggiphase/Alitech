import { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, BadgeDollarSign, Undo2 } from 'lucide-react';
import { conditionLabel } from '../data/products';
import { money, prettyDate, profitOf, unitTitle, explainError } from './utils';
import UnitForm from './UnitForm';
import SellForm from './SellForm';

const FILTERS = [
  { id: 'in_stock', label: 'In stock' },
  { id: 'sold', label: 'Sold' },
  { id: 'all', label: 'All' },
];

export default function StockTab({ units, catalog, actions }) {
  const [filter, setFilter] = useState('in_stock');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null);
  const [selling, setSelling] = useState(null);

  const counts = useMemo(() => ({
    in_stock: units.filter(u => u.status === 'in_stock').length,
    sold: units.filter(u => u.status === 'sold').length,
    all: units.length,
  }), [units]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return units
      .filter(u => filter === 'all' || u.status === filter)
      .filter(u => !s || [u.model, u.imei, u.colour, u.storage, u.customerName, u.customerPhone, u.supplier]
        .some(v => String(v || '').toLowerCase().includes(s)))
      .sort((a, b) => (filter === 'sold'
        ? (b.soldDate || '').localeCompare(a.soldDate || '')
        : (b.dateBought || '').localeCompare(a.dateBought || '')) || (b.createdAt || '').localeCompare(a.createdAt || ''));
  }, [units, filter, q]);

  const undoSale = async (u) => {
    if (!window.confirm(`Undo the sale of ${unitTitle(u)}? It will go back to "In stock".`)) return;
    const { soldPrice, soldDate, customerName, customerPhone, paymentMethod, saleNotes, ...rest } = u;
    try { await actions.saveUnit({ ...rest, status: 'in_stock' }); actions.notify('Sale undone — back in stock'); }
    catch (e) { console.error(e); alert(explainError(e)); }
  };

  const remove = async (u) => {
    if (!window.confirm(`Delete the record for ${unitTitle(u)}${u.imei ? ` (IMEI ${u.imei})` : ''}?\n\nThis cannot be undone and it will no longer appear in reports.`)) return;
    try { await actions.deleteUnit(u); actions.notify('Record deleted'); }
    catch (e) { console.error(e); alert(explainError(e, 'delete')); }
  };

  return (
    <section>
      <div className="adm-section-head">
        <div>
          <h1>Stock & sales</h1>
          <p className="adm-muted">Record every phone you buy, then mark it sold. Private — customers never see this.</p>
        </div>
        <button className="adm-btn adm-btn--primary" onClick={() => setEditing({})}><Plus size={18} /> Add phone</button>
      </div>

      <div className="adm-toolbar">
        <div className="adm-chips">
          {FILTERS.map(f => (
            <button key={f.id} className={`adm-chip ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
              {f.label} <span>{counts[f.id]}</span>
            </button>
          ))}
        </div>
        <div className="adm-search"><Search size={16} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search model, IMEI, customer" /></div>
      </div>

      {list.length === 0 ? (
        <div className="adm-empty">
          <p>{units.length === 0 ? <>No phones recorded yet. Tap <strong>Add phone</strong> when you buy one.</> : 'Nothing here.'}</p>
        </div>
      ) : (
        <div className="adm-list">
          {list.map(u => (
            <article key={u.id} className="adm-item adm-item--unit">
              <div className="adm-item-main">
                <div className="adm-item-title">
                  <h3>{unitTitle(u)}</h3>
                  {u.status === 'sold' ? <span className="adm-tag adm-tag--gold">Sold</span> : <span className="adm-tag adm-tag--green">In stock</span>}
                </div>
                <div className="adm-meta">
                  {u.imei && <span>IMEI {u.imei}</span>}
                  {u.colour && <span>{u.colour}</span>}
                  <span>{conditionLabel(u.condition)}{u.grade ? ` · Grade ${u.grade}` : ''}</span>
                  {u.batteryHealth ? <span>Battery {u.batteryHealth}%</span> : null}
                </div>
                <div className="adm-figures">
                  <span>Bought <strong>{money(u.costPrice)}</strong> · {prettyDate(u.dateBought)}{u.supplier ? ` · from ${u.supplier}` : ''}</span>
                  {u.status === 'sold' && (
                    <span>
                      Sold <strong>{money(u.soldPrice)}</strong> · {prettyDate(u.soldDate)}
                      {' · '}<strong className={profitOf(u) < 0 ? 'neg' : 'pos'}>Profit {money(profitOf(u))}</strong>
                      {u.customerName ? ` · ${u.customerName}` : ''}{u.customerPhone ? ` (${u.customerPhone})` : ''}
                    </span>
                  )}
                </div>
              </div>
              <div className="adm-item-actions">
                {u.status === 'in_stock'
                  ? <button className="adm-btn adm-btn--primary adm-btn--sm" onClick={() => setSelling(u)}><BadgeDollarSign size={16} /> Mark sold</button>
                  : <>
                      <button className="adm-btn adm-btn--sm" onClick={() => setSelling(u)}>Edit sale</button>
                      <button className="adm-icon-btn" onClick={() => undoSale(u)} title="Undo sale" aria-label="Undo sale"><Undo2 size={17} /></button>
                    </>}
                <button className="adm-icon-btn" onClick={() => setEditing(u)} aria-label="Edit"><Pencil size={17} /></button>
                <button className="adm-icon-btn danger" onClick={() => remove(u)} aria-label="Delete"><Trash2 size={17} /></button>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <UnitForm
          unit={editing}
          catalog={catalog}
          onClose={() => setEditing(null)}
          onSave={async (data) => {
            await actions.saveUnit(data);
            actions.notify(editing.id ? 'Saved' : 'Phone added to stock');
            setEditing(null);
          }}
        />
      )}

      {selling && (
        <SellForm
          unit={selling}
          listing={catalog.find(p => p.id === selling.productId)}
          onClose={() => setSelling(null)}
          onSave={async (data) => {
            await actions.saveUnit(data);
            actions.notify(selling.status === 'sold' ? 'Sale updated' : 'Marked as sold');
            setSelling(null);
          }}
        />
      )}
    </section>
  );
}
