// TEST-ONLY stand-in for Firebase (used when building with VITE_MOCK_BACKEND=1). Data lives in localStorage.
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const store = {
  catalog: () => read('mock_catalog', []),
  setCatalog: (v) => write('mock_catalog', v),
  units: () => read('mock_units', []),
  setUnits: (v) => write('mock_units', v),
  user: () => read('mock_user', null),
  setUser: (v) => write('mock_user', v),
};
export const delay = (ms = 120) => new Promise(r => setTimeout(r, ms));
