// What the public shop reads: one document holding every product listing.
// (One read per visit keeps the site well inside Firebase's free limits.)
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from './app';

export async function getCatalog() {
  const snap = await getDoc(doc(db, 'site', 'catalog'));
  return snap.exists() ? snap.data().products || [] : [];
}
