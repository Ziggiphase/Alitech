import { store, delay } from './store';
import { slugId, stripUndefined } from '../shared';
import { shrinkImage } from '../../images';

let listeners = [];
export function watchAuth(cb) { listeners.push(cb); setTimeout(() => cb(store.user()), 50); return () => { listeners = listeners.filter(l => l !== cb); }; }
const emit = () => listeners.forEach(l => l(store.user()));
export async function signIn() { store.setUser({ email: (window.__mockEmail || 'bellobasit790@gmail.com').toLowerCase(), name: 'Test User' }); emit(); }
export async function signOut() { store.setUser(null); emit(); }

export async function getCatalog() { await delay(); return store.catalog(); }
export async function saveProduct(product) {
  await delay();
  const list = store.catalog(); const now = new Date().toISOString();
  const id = product.id || slugId(product.name, list.map(p => p.id));
  const clean = stripUndefined({ ...product, id, updatedAt: now, added: product.added || now });
  const i = list.findIndex(p => p.id === id);
  if (i >= 0) list[i] = clean; else list.unshift(clean);
  store.setCatalog(list); return clean;
}
export async function deleteProduct(id) { await delay(); store.setCatalog(store.catalog().filter(p => p.id !== id)); }
export async function setStock(updates) { await delay(); store.setCatalog(store.catalog().map(p => (p.id in updates ? { ...p, inStock: updates[p.id] } : p))); }

export async function listUnits() { await delay(); return store.units(); }
export async function saveUnit(unit) {
  await delay();
  const { id, ...data } = unit; const units = store.units();
  const clean = stripUndefined({ ...data, updatedAt: new Date().toISOString() });
  if (id) { store.setUnits(units.map(u => (u.id === id ? { ...clean, id } : u))); return { ...clean, id }; }
  const nu = { ...clean, createdAt: clean.updatedAt, id: Math.random().toString(36).slice(2, 12) };
  store.setUnits([...units, nu]); return nu;
}
export async function deleteUnit(id) { await delay(); store.setUnits(store.units().filter(u => u.id !== id)); }

export async function uploadImage(file) {
  const blob = await shrinkImage(file, 600, 0.7);
  return await new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });
}
