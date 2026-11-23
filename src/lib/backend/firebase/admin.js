// Everything the admin dashboard can do. Firestore security rules decide who is allowed.
import {
  doc, getDoc, runTransaction, collection, getDocs, setDoc, addDoc, deleteDoc,
} from 'firebase/firestore/lite';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut as fbSignOut, onAuthStateChanged,
} from 'firebase/auth';
import { app, db } from './app';
import { cloudinary } from '../../../config/firebase';
import { shrinkImage } from '../../images';
import { slugId, stripUndefined } from '../shared';

const auth = getAuth(app);
const catalogRef = doc(db, 'site', 'catalog');

// ── Sign in ────────────────────────────────────────────────
export const watchAuth = (cb) => onAuthStateChanged(auth, u => cb(u ? { email: (u.email || '').toLowerCase(), name: u.displayName, photo: u.photoURL } : null));

export async function signIn() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    if (e?.code === 'auth/popup-blocked') return signInWithRedirect(auth, provider);
    throw e;
  }
}
export const signOut = () => fbSignOut(auth);

// ── Product listings (shown on the website) ────────────────
export async function getCatalog() {
  const snap = await getDoc(catalogRef);
  return snap.exists() ? snap.data().products || [] : [];
}

function mutateCatalog(fn) {
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(catalogRef);
    const list = snap.exists() ? [...(snap.data().products || [])] : [];
    const result = fn(list);
    tx.set(catalogRef, { products: result.list, updatedAt: new Date().toISOString() });
    return result.value;
  });
}

export function saveProduct(product) {
  return mutateCatalog((list) => {
    const now = new Date().toISOString();
    const id = product.id || slugId(product.name, list.map(p => p.id));
    const clean = stripUndefined({ ...product, id, updatedAt: now, added: product.added || now });
    const i = list.findIndex(p => p.id === id);
    if (i >= 0) list[i] = clean; else list.unshift(clean);
    return { list, value: clean };
  });
}

export function deleteProduct(id) {
  return mutateCatalog(list => ({ list: list.filter(p => p.id !== id), value: id }));
}

/** updates = { productId: true|false } — used to mark listings sold out automatically. */
export function setStock(updates) {
  return mutateCatalog(list => ({
    list: list.map(p => (p.id in updates ? { ...p, inStock: updates[p.id] } : p)),
    value: true,
  }));
}

// ── Stock units (private records) ──────────────────────────
export async function listUnits() {
  const snap = await getDocs(collection(db, 'units'));
  return snap.docs.map(d => ({ ...d.data(), id: d.id }));
}

export async function saveUnit(unit) {
  const { id, ...data } = unit;
  const clean = stripUndefined({ ...data, updatedAt: new Date().toISOString() });
  if (id) {
    await setDoc(doc(db, 'units', id), clean);
    return { ...clean, id };
  }
  clean.createdAt = clean.updatedAt;
  const ref = await addDoc(collection(db, 'units'), clean);
  return { ...clean, id: ref.id };
}

export const deleteUnit = (id) => deleteDoc(doc(db, 'units', id));

// ── Photos (Cloudinary) ────────────────────────────────────
export async function uploadImage(file) {
  const body = new FormData();
  body.append('file', await shrinkImage(file));
  body.append('upload_preset', cloudinary.uploadPreset);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/upload`, { method: 'POST', body });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || 'Photo upload failed');
  return json.secure_url;
}
