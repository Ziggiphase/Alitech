// Builds downloadable Excel and PDF reports. Loaded only when a download button is tapped.
import writeExcelFile from 'write-excel-file/browser';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { conditionLabel } from '../data/products';
import { moneyPlain, prettyDate, profitOf, unitTitle, ymd } from './utils';

const fileBase = (r) => `alitech-report-${r.range.from.startsWith('0000') ? 'start' : r.range.from}-to-${r.range.to.startsWith('9999') ? ymd() : r.range.to}`;
const bold = (value) => ({ value, fontWeight: 'bold' });
const num = (v) => (v === undefined || v === null || v === '' ? null : Number(v));

export async function downloadExcel(r) {
  const t = r.totals;
  const summary = [
    [bold('Alitech report'), r.label],
    ['Generated', prettyDate(ymd())],
    [],
    [bold('Phones sold'), t.soldCount],
    [bold('Sales (₦)'), t.revenue],
    [bold('Profit (₦)'), t.profit],
    [bold('Phones bought'), t.boughtCount],
    [bold('Spent on stock (₦)'), t.spent],
    [bold('In stock now'), t.stockCount],
    [bold('Stock value at cost (₦)'), t.stockValue],
    [],
    [bold('Best sellers'), bold('Sold'), bold('Sales (₦)'), bold('Profit (₦)')],
    ...r.bestSellers.map(b => [b.model, b.units, b.revenue, b.profit]),
  ];

  const sales = [
    ['Date sold', 'Model', 'IMEI/Serial', 'Colour', 'Condition', 'Grade', 'Bought for (₦)', 'Sold for (₦)', 'Profit (₦)', 'Customer', 'Customer phone', 'Payment', 'Notes'].map(bold),
    ...r.sold.map(u => [u.soldDate, unitTitle(u), u.imei, u.colour, conditionLabel(u.condition), u.grade, num(u.costPrice), num(u.soldPrice), profitOf(u), u.customerName, u.customerPhone, u.paymentMethod, u.saleNotes]),
  ];

  const stock = [
    ['Date bought', 'Model', 'IMEI/Serial', 'Colour', 'Condition', 'Grade', 'Battery %', 'Bought for (₦)', 'Bought from', 'Days in stock', 'Notes'].map(bold),
    ...r.inStock.map(u => [u.dateBought, unitTitle(u), u.imei, u.colour, conditionLabel(u.condition), u.grade, num(u.batteryHealth), num(u.costPrice), u.supplier, daysSince(u.dateBought), u.notes]),
  ];

  const purchases = [
    ['Date bought', 'Model', 'IMEI/Serial', 'Bought for (₦)', 'Bought from', 'Status'].map(bold),
    ...r.bought.map(u => [u.dateBought, unitTitle(u), u.imei, num(u.costPrice), u.supplier, u.status === 'sold' ? 'Sold' : 'In stock']),
  ];

  const w = (...widths) => widths.map(width => ({ width }));
  await writeExcelFile([
    { data: clean(summary), sheet: 'Summary', columns: w(28, 18, 16, 16) },
    { data: clean(sales), sheet: 'Sales', columns: w(12, 26, 18, 10, 12, 7, 14, 14, 12, 18, 15, 13, 28), stickyRowsCount: 1 },
    { data: clean(stock), sheet: 'In stock now', columns: w(12, 26, 18, 10, 12, 7, 9, 14, 18, 12, 28), stickyRowsCount: 1 },
    { data: clean(purchases), sheet: 'Purchases', columns: w(12, 26, 18, 14, 18, 10), stickyRowsCount: 1 },
  ]).toFile(`${fileBase(r)}.xlsx`);
}

export function downloadPdf(r) {
  const t = r.totals;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const gold = [176, 138, 58];

  doc.setFontSize(18); doc.text('Alitech report', 40, 50);
  doc.setFontSize(11); doc.setTextColor(100);
  doc.text(`${r.label}  ·  generated ${prettyDate(ymd())}`, 40, 68);
  doc.setTextColor(0);

  autoTable(doc, {
    startY: 85,
    theme: 'grid',
    headStyles: { fillColor: gold },
    head: [['Summary', '']],
    body: [
      ['Phones sold', String(t.soldCount)],
      ['Sales', moneyPlain(t.revenue)],
      ['Profit', moneyPlain(t.profit)],
      ['Phones bought', String(t.boughtCount)],
      ['Spent on stock', moneyPlain(t.spent)],
      ['In stock now', `${t.stockCount}  (${moneyPlain(t.stockValue)} at cost)`],
    ],
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 160 } },
    margin: { left: 40, right: 40 },
  });

  if (r.bestSellers.length) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      headStyles: { fillColor: gold },
      head: [['Best sellers', 'Sold', 'Sales', 'Profit']],
      body: r.bestSellers.slice(0, 10).map(b => [b.model, String(b.units), moneyPlain(b.revenue), moneyPlain(b.profit)]),
      margin: { left: 40, right: 40 },
    });
  }

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    headStyles: { fillColor: gold },
    head: [['Date', 'Phone', 'IMEI', 'Bought', 'Sold', 'Profit', 'Customer']],
    body: r.sold.length
      ? r.sold.map(u => [prettyDate(u.soldDate), unitTitle(u), u.imei || '', moneyPlain(u.costPrice), moneyPlain(u.soldPrice), moneyPlain(profitOf(u)), u.customerName || ''])
      : [['No sales in this period', '', '', '', '', '', '']],
    styles: { fontSize: 8 },
    margin: { left: 40, right: 40 },
  });

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i); doc.setFontSize(8); doc.setTextColor(150);
    doc.text(`Page ${i} of ${pages}`, doc.internal.pageSize.getWidth() - 80, doc.internal.pageSize.getHeight() - 20);
  }
  doc.save(`${fileBase(r)}.pdf`);
}

function daysSince(date) {
  if (!date) return null;
  const [y, m, d] = date.split('-').map(Number);
  return Math.max(0, Math.round((Date.now() - new Date(y, m - 1, d).getTime()) / 86400000));
}

/** write-excel-file wants null for empty cells, not undefined/'' */
const clean = (rows) => rows.map(row => row.map(c => (c === undefined || c === '' ? null : c)));
