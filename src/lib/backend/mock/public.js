import { store, delay } from './store';
export async function getCatalog() { await delay(); return store.catalog(); }
