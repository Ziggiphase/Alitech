import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { getCatalog } from '@backend/public';
import { normalizeProducts } from '../data/products';

// Loads the product listings once per visit. The last copy is kept on the phone,
// so returning visitors see products instantly even on a slow connection.
const CACHE_KEY = 'alitech_catalog_cache_v1';
const ProductsContext = createContext(null);

const readCache = () => { try { return JSON.parse(localStorage.getItem(CACHE_KEY)); } catch { return null; } };

export function ProductsProvider({ children }) {
  const [raw, setRaw] = useState(readCache);
  const [loading, setLoading] = useState(!raw);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const list = await getCatalog();
      setRaw(list);
      setError(null);
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(list)); } catch { /* storage full or blocked */ }
    } catch (e) {
      console.error('Could not load products', e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const value = useMemo(() => {
    const products = normalizeProducts(raw || []);
    return { products, loading, error, refresh, getProduct: (id) => products.find(p => p.id === id) };
  }, [raw, loading, error, refresh]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export const useProducts = () => useContext(ProductsContext);
