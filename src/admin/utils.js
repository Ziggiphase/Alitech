// Small helpers for the admin dashboard

export const money = (n) => `₦${Math.round(Number(n) || 0).toLocaleString('en-NG')}`;
export const moneyPlain = (n) => `NGN ${Math.round(Number(n) || 0).toLocaleString('en-NG')}`; // PDF fonts have no ₦ sign

/** Local date as YYYY-MM-DD (dates are stored like this so they never shift with time zones). */
export const ymd = (d = new Date()) => {
  const x = new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
};

export const prettyDate = (s) => {
  if (!s) return '';
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const profitOf = (u) => (u.status === 'sold' ? (Number(u.soldPrice) || 0) - (Number(u.costPrice) || 0) : 0);

export const RANGES = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
  { id: 'lastMonth', label: 'Last month' },
  { id: 'year', label: 'This year' },
  { id: 'all', label: 'All time' },
  { id: 'custom', label: 'Custom dates' },
];

/** Returns { from, to } as YYYY-MM-DD strings (inclusive). */
export function rangeDates(id, custom = {}) {
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  switch (id) {
    case 'today': return { from: ymd(now), to: ymd(now) };
    case 'week': {
      const day = (now.getDay() + 6) % 7; // Monday = start of week
      const start = new Date(y, m, now.getDate() - day);
      return { from: ymd(start), to: ymd(now) };
    }
    case 'month': return { from: ymd(new Date(y, m, 1)), to: ymd(now) };
    case 'lastMonth': return { from: ymd(new Date(y, m - 1, 1)), to: ymd(new Date(y, m, 0)) };
    case 'year': return { from: ymd(new Date(y, 0, 1)), to: ymd(now) };
    case 'custom': return { from: custom.from || '0000-01-01', to: custom.to || '9999-12-31' };
    default: return { from: '0000-01-01', to: '9999-12-31' };
  }
}

export const inRange = (date, { from, to }) => !!date && date >= from && date <= to;

export const PAYMENT_METHODS = ['Bank transfer', 'Cash', 'POS', 'Other'];

export const unitTitle = (u) => [u.model, u.storage].filter(Boolean).join(' · ');

/** Turn a Firebase/network error into a plain-English message (with the technical code for support). */
export function explainError(e, action = 'save') {
  const code = e?.code || '';
  const known = {
    'permission-denied': `The database refused to ${action}. Publish firestore.rules in the Firebase console (Firestore Database → Rules) — it must include your email.`,
    'not-found': 'The database was not found. In the Firebase console, open Firestore Database and click "Create database".',
    'failed-precondition': 'The database is not ready. In the Firebase console, open Firestore Database and finish creating it.',
    'unavailable': 'Could not reach the database. Check your internet connection and try again.',
    'unauthenticated': 'You were signed out. Refresh the page and sign in again.',
    'resource-exhausted': 'The free daily limit was reached. Try again tomorrow.',
    'invalid-argument': 'Something in the form could not be saved. Check the fields and try again.',
  };
  const short = code.replace(/^firestore\//, '');
  const msg = known[short] || `Could not ${action}. ${e?.message || 'Check your connection and try again.'}`;
  return code ? `${msg} (${code})` : msg;
}
