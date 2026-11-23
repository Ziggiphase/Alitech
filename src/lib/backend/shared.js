/** Firestore rejects `undefined` values — drop them (and empty strings) before saving. */
export function stripUndefined(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ''));
}

/** Readable, unique product id for URLs, e.g. "iphone-13-pro-128gb-k3f9" */
export function slugId(name = 'product', existing = []) {
  const base = String(name).toLowerCase().replace(/\+/g, ' plus').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'product';
  let id;
  do { id = `${base}-${Math.random().toString(36).slice(2, 6)}`; } while (existing.includes(id));
  return id;
}
