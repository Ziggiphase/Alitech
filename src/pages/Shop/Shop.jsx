import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, LayoutList, ChevronDown, X, Search } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories, brands } from '../../data/products';
import './Shop.css';

export default function Shop() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [condition, setCondition] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryInfo = categories.find(c => c.id === category);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category) result = result.filter(p => p.category === category);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (condition !== 'all') result = result.filter(p => p.condition === condition);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [category, searchQuery, selectedBrands, priceRange, condition, sortBy]);

  const availableBrands = useMemo(() => {
    const catProducts = category ? products.filter(p => p.category === category) : products;
    const brandIds = [...new Set(catProducts.map(p => p.brand))];
    return brands.filter(b => brandIds.includes(b.id));
  }, [category]);

  const toggleBrand = (brandId) => {
    setSelectedBrands(prev =>
      prev.includes(brandId) ? prev.filter(b => b !== brandId) : [...prev, brandId]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 3000]);
    setCondition('all');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedBrands.length > 0 || condition !== 'all' || priceRange[0] > 0 || priceRange[1] < 3000;

  return (
    <div className="shop-page">
      {/* Breadcrumb */}
      <div className="shop-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link>
          {categoryInfo && <> / <span>{categoryInfo.name}</span></>}
          {searchQuery && <> / <span>Search: "{searchQuery}"</span></>}
        </div>
      </div>

      {/* Header */}
      <div className="shop-header">
        <div className="container">
          <h1>{categoryInfo ? categoryInfo.name : searchQuery ? `Results for "${searchQuery}"` : 'All Products'}</h1>
          {categoryInfo && <p>{categoryInfo.description}</p>}
        </div>
      </div>

      <div className="container shop-layout">
        {/* Sidebar filters */}
        <aside className={`shop-sidebar ${filtersOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3><SlidersHorizontal size={18} /> Filters</h3>
            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>Clear All</button>
            )}
            <button className="sidebar-close" onClick={() => setFiltersOpen(false)}><X size={20} /></button>
          </div>

          {/* Categories */}
          {!category && (
            <div className="filter-group">
              <h4>Categories</h4>
              {categories.map(cat => (
                <Link key={cat.id} to={`/shop/${cat.id}`} className="filter-link">
                  {cat.name}
                  <span className="filter-count">{products.filter(p => p.category === cat.id).length}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Brands */}
          <div className="filter-group">
            <h4>Brands</h4>
            {availableBrands.map(brand => (
              <label key={brand.id} className="filter-checkbox">
                <input type="checkbox" checked={selectedBrands.includes(brand.id)} onChange={() => toggleBrand(brand.id)} />
                <span className="checkmark" />
                {brand.name}
              </label>
            ))}
          </div>

          {/* Price */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} placeholder="Min" className="price-input" />
              <span>—</span>
              <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} placeholder="Max" className="price-input" />
            </div>
          </div>

          {/* Condition */}
          <div className="filter-group">
            <h4>Condition</h4>
            {['all', 'new', 'refurbished', 'used'].map(c => (
              <label key={c} className="filter-radio">
                <input type="radio" name="condition" value={c} checked={condition === c} onChange={() => setCondition(c)} />
                <span className="radiomark" />
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </label>
            ))}
          </div>
        </aside>

        {/* Products area */}
        <main className="shop-main">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="toolbar-left">
              <button className="btn btn-secondary filter-toggle" onClick={() => setFiltersOpen(true)}>
                <SlidersHorizontal size={16} /> Filters
              </button>
              <span className="results-count">{filteredProducts.length} products</span>
            </div>
            <div className="toolbar-right">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A-Z</option>
              </select>
              <div className="view-toggles">
                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid3X3 size={16} /></button>
                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><LayoutList size={16} /></button>
              </div>
            </div>
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="active-filters">
              {selectedBrands.map(b => (
                <button key={b} className="active-filter" onClick={() => toggleBrand(b)}>
                  {brands.find(br => br.id === b)?.name} <X size={12} />
                </button>
              ))}
              {condition !== 'all' && (
                <button className="active-filter" onClick={() => setCondition('all')}>
                  {condition} <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' ? 'products-grid' : 'products-list'}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <Search size={48} />
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter overlay */}
      {filtersOpen && <div className="filter-overlay" onClick={() => setFiltersOpen(false)} />}
    </div>
  );
}
