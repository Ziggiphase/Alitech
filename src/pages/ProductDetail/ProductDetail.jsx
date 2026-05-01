import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, Share2, Shield, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--white)' }}>Product not found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="product-detail-page">
      <div className="shop-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <Link to={`/shop/${product.category}`}>{product.category}</Link> / <span>{product.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="pd-grid">
          {/* Image */}
          <div className="pd-image-section">
            <div className="pd-main-image glass-card">
              {discount > 0 && <span className="badge badge-red pd-badge">-{discount}%</span>}
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Info */}
          <div className="pd-info">
            <span className="pd-brand">{product.brand}</span>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-rating">
              <div className="pd-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#D4A853' : 'none'} stroke="#D4A853" />
                ))}
              </div>
              <span>{product.rating}</span>
              <span className="pd-review-count">({product.reviews} reviews)</span>
            </div>

            <div className="pd-price-section">
              <span className="pd-price">₦{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="pd-original">₦{product.originalPrice.toLocaleString()}</span>
                  <span className="badge badge-green">Save ₦{(product.originalPrice - product.price).toLocaleString()}</span>
                </>
              )}
            </div>

            <p className="pd-desc">{product.description}</p>

            {/* Colors */}
            {product.colors && (
              <div className="pd-colors">
                <h4>Color</h4>
                <div className="pd-color-options">
                  {product.colors.map((color, i) => (
                    <button key={i} className={`pd-color-btn ${i === 0 ? 'active' : ''}`}>{color}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="pd-actions">
              <div className="pd-qty">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
              </div>
              <button className="btn btn-primary pd-add-btn" onClick={() => addToCart(product, quantity)} disabled={!product.inStock}>
                <ShoppingCart size={18} /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className={`btn-icon pd-wish-btn ${isInWishlist(product.id) ? 'active' : ''}`} onClick={() => toggleWishlist(product)}>
                <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
              <button className="btn-icon" aria-label="Share"><Share2 size={18} /></button>
            </div>

            {/* Guarantees */}
            <div className="pd-guarantees">
              <div className="pd-guarantee"><Truck size={16} /> Free delivery on orders ₦100k+</div>
              <div className="pd-guarantee"><Shield size={16} /> 1-year warranty included</div>
              <div className="pd-guarantee"><RotateCcw size={16} /> 7-day easy returns</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pd-tabs">
          <div className="pd-tab-nav">
            {['specs', 'description', 'reviews'].map(tab => (
              <button key={tab} className={`pd-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="pd-tab-content glass-card">
            {activeTab === 'specs' && (
              <table className="pd-specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    value !== 'N/A' && (
                      <tr key={key}>
                        <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                        <td>{value}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 'description' && <p className="pd-full-desc">{product.description}</p>}
            {activeTab === 'reviews' && (
              <div className="pd-reviews-placeholder">
                <p>Reviews coming soon. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">You May Also Like</h2>
              <Link to={`/shop/${product.category}`} className="btn btn-secondary">View All <ChevronRight size={16} /></Link>
            </div>
            <div className="products-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
