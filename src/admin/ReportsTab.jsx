import { useMemo, useState } from 'react';
import { FileSpreadsheet, FileText, Package, TrendingUp, Wallet, ShoppingBag, Plus } from 'lucide-react';
import { RANGES, rangeDates, inRange, money, prettyDate, profitOf, unitTitle, ymd } from './utils';

export function buildReport(units, rangeId, custom) {
  const range = rangeDates(rangeId, custom);
  const sold = units.filter(u => u.status === 'sold' && inRange(u.soldDate, range))
    .sort((a, b) => (b.soldDate || '').localeCompare(a.soldDate || ''));
  const bought = units.filter(u => inRange(u.dateBought, range))
    .sort((a, b) => (b.dateBought || '').localeCompare(a.dateBought || ''));
  const inStock = units.filter(u => u.status === 'in_stock')
    .sort((a, b) => (a.dateBought || '').localeCompare(b.dateBought || ''));

  const sum = (list, fn) => list.reduce((t, u) => t + (Number(fn(u)) || 0), 0);
  const revenue = sum(sold, u => u.soldPrice);
  const costOfSold = sum(sold, u => u.costPrice);

  const byModel = {};
  for (const u of sold) {
    const key = unitTitle(u) || 'Unknown';
    byModel[key] ??= { model: key, units: 0, revenue: 0, profit: 0 };
    byModel[key].units += 1;
    byModel[key].revenue += Number(u.soldPrice) || 0;
    byModel[key].profit += profitOf(u);
  }
  const bestSellers = Object.values(byModel).sort((a, b) => b.units - a.units || b.profit - a.profit);

  const label = rangeId === 'custom'
    ? `${custom.from ? prettyDate(custom.from) : 'Start'} – ${custom.to ? prettyDate(custom.to) : 'Today'}`
    : RANGES.find(r => r.id === rangeId)?.label;

  return {
    label, range, sold, bought, inStock, bestSellers,
    totals: {
      soldCount: sold.length,
      revenue,
      profit: revenue - costOfSold,
      boughtCount: bought.length,
      spent: sum(bought, u => u.costPrice),
      stockCount: inStock.length,
      stockValue: sum(inStock, u => u.costPrice),
    },
  };
}

export default function ReportsTab({ units, goTo }) {
  const [rangeId, setRangeId] = useState('month');
  const [custom, setCustom] = useState({ from: '', to: ymd() });
  const [exporting, setExporting] = useState('');

  const report = useMemo(() => buildReport(units, rangeId, custom), [units, rangeId, custom]);
  const t = report.totals;

  const download = async (kind) => {
    setExporting(kind);
    try {
      const mod = await import('./exportReport');
      await (kind === 'excel' ? mod.downloadExcel(report) : mod.downloadPdf(report));
    } catch (e) {
      console.error(e);
      alert('Could not create the file. Please try again.');
    } finally { setExporting(''); }
  };

  return (
    <section>
      <div className="adm-section-head">
        <div>
          <h1>Overview</h1>
          <p className="adm-muted">Sales, profit and stock for any period.</p>
        </div>
        <div className="adm-head-actions">
          <button className="adm-btn" onClick={() => download('excel')} disabled={!!exporting}><FileSpreadsheet size={17} /> {exporting === 'excel' ? 'Preparing…' : 'Excel'}</button>
          <button className="adm-btn" onClick={() => download('pdf')} disabled={!!exporting}><FileText size={17} /> {exporting === 'pdf' ? 'Preparing…' : 'PDF'}</button>
        </div>
      </div>

      <div className="adm-toolbar">
        <div className="adm-chips">
          {RANGES.map(r => (
            <button key={r.id} className={`adm-chip ${rangeId === r.id ? 'active' : ''}`} onClick={() => setRangeId(r.id)}>{r.label}</button>
          ))}
        </div>
        {rangeId === 'custom' && (
          <div className="adm-dates">
            <label>From <input type="date" value={custom.from} onChange={e => setCustom(c => ({ ...c, from: e.target.value }))} /></label>
            <label>To <input type="date" value={custom.to} onChange={e => setCustom(c => ({ ...c, to: e.target.value }))} /></label>
          </div>
        )}
      </div>

      {units.length === 0 ? (
        <div className="adm-empty">
          <p>No records yet. Reports fill in as you add phones and mark them sold.</p>
          <button className="adm-btn adm-btn--primary" onClick={() => goTo('stock')}><Plus size={17} /> Add your first phone</button>
        </div>
      ) : (
        <>
          <div className="adm-kpis">
            <Kpi icon={ShoppingBag} label={`Sold · ${report.label}`} value={t.soldCount} sub={`${money(t.revenue)} in sales`} />
            <Kpi icon={TrendingUp} label="Profit" value={money(t.profit)} sub={t.soldCount ? `avg ${money(t.profit / t.soldCount)} per phone` : '—'} tone={t.profit < 0 ? 'neg' : 'pos'} />
            <Kpi icon={Package} label="In stock now" value={t.stockCount} sub={`${money(t.stockValue)} paid for them`} />
            <Kpi icon={Wallet} label={`Bought · ${report.label}`} value={t.boughtCount} sub={`${money(t.spent)} spent`} />
          </div>

          <div className="adm-grid-2">
            <div className="adm-card">
              <h2>Best sellers</h2>
              {report.bestSellers.length === 0 ? <p className="adm-muted">No sales in this period.</p> : (
                <table className="adm-table">
                  <thead><tr><th>Model</th><th>Sold</th><th>Sales</th><th>Profit</th></tr></thead>
                  <tbody>
                    {report.bestSellers.slice(0, 8).map(r => (
                      <tr key={r.model}><td>{r.model}</td><td>{r.units}</td><td>{money(r.revenue)}</td><td className={r.profit < 0 ? 'neg' : 'pos'}>{money(r.profit)}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="adm-card">
              <h2>Sales in this period</h2>
              {report.sold.length === 0 ? <p className="adm-muted">No sales in this period.</p> : (
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead><tr><th>Date</th><th>Phone</th><th>Sold for</th><th>Profit</th></tr></thead>
                    <tbody>
                      {report.sold.slice(0, 50).map(u => (
                        <tr key={u.id}>
                          <td className="nowrap">{prettyDate(u.soldDate)}</td>
                          <td>{unitTitle(u)}{u.customerName ? <small>{u.customerName}</small> : null}</td>
                          <td>{money(u.soldPrice)}</td>
                          <td className={profitOf(u) < 0 ? 'neg' : 'pos'}>{money(profitOf(u))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {report.sold.length > 50 && <p className="adm-muted">Showing 50 of {report.sold.length}. Download Excel for the full list.</p>}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function Kpi({ icon: Icon, label, value, sub, tone }) {
  return (
    <div className="adm-kpi">
      <div className="adm-kpi-label"><Icon size={16} /> {label}</div>
      <div className={`adm-kpi-value ${tone || ''}`}>{value}</div>
      <div className="adm-kpi-sub">{sub}</div>
    </div>
  );
}
