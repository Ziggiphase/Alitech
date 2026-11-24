import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, ChevronRight, MessageCircle, BatteryMedium, BadgeCheck } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { conditionLabel } from '../../data/products';
import { useProducts } from '../../context/ProductsContext';
import { cld } from '../../lib/images';
import { whatsappLink, naira } from '../../config/site';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, getProduct, loading } = useProducts();
  const product = getProduct(id);
  const [activeTab, setActiveTab] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  // Reset gallery when moving between products
  useEffect(() => { setActiveImage(0); }, [id]);

  if (!product && loading) {
    return <div className="container section" style={{ textAlign: 'center', color: 'var(--gray-400)' }}>Loading…</div>;
  }

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
  const conditionText = [conditionLabel(product.condition), product.grade && `Grade ${product.grade}`].filter(Boolean).join(' · ');
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const orderMsg = `Hello Alitech, I'm interested in the ${product.name} (${conditionText}) — ${naira(product.price)}.\nIs it available?\n${pageUrl}`;
  const specEntries = Object.entries(product.specs || {}).filter(([, v]) => v && v !== 'N/A');

  const availableTabs = [specEntries.length > 0 && 'specs', product.description && 'description'].filter(Boolean);
  const currentTab = availableTabs.includes(activeTab) ? activeTab : availableTabs[0];

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url: pageUrl }); } catch { /* cancelled */ }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${product.name} — ${naira(product.price)}\n${pageUrl}`)}`, '_blank');
    }
  };

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
              <img src={cld(product.images[activeImage] || product.image, 1200)} alt={product.name} />
            </div>
            {product.images.length > 1 && (
              <div className="pd-thumbs">
                {product.images.map((img, i) => (
                  <button
                    key={img + i}
                    className={`pd-thumb ${i === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Photo ${i + 1}`}
                  >
                    <img src={cld(img, 160)} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <span className="pd-brand">{product.brand}</span>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-condition">
              <span className={`pd-condition-tag pd-condition--${product.condition}`}><BadgeCheck size={14} /> {conditionText}</span>
              {product.batteryHealth ? <span className="pd-battery"><BatteryMedium size={15} /> Battery health {product.batteryHealth}%</span> : null}
              {!product.inStock && <span className="badge badge-red">Sold out</span>}
            </div>

            <div className="pd-price-section">
              <span className="pd-price">{naira(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="pd-original">{naira(product.originalPrice)}</span>
                  <span className="badge badge-green">Save {naira(product.originalPrice - product.price)}</span>
                </>
              )}
            </div>

            <p className="pd-desc">{product.description}</p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="pd-colors">
                <h4>Color</h4>
                <div className="pd-color-options">
                  {product.colors.map((color, i) => (
                    <button key={i} className={`pd-color-btn ${i === 0 ? 'active' : ''}`}>{color}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Order + share */}
            <div className="pd-order-row">
              {product.inStock ? (
                <a href={whatsappLink(orderMsg)} target="_blank" rel="noopener noreferrer" className="btn pd-wa-btn">
                  <MessageCircle size={18} /> Order on WhatsApp
                </a>
              ) : (
                <a href={whatsappLink(`Hello Alitech, the ${product.name} shows sold out. Will you get another one soon?\n${pageUrl}`)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary pd-wa-secondary">
                  <MessageCircle size={18} /> Sold out — ask when it's back
                </a>
              )}
              <button className="btn-icon" aria-label="Share" onClick={handleShare}><Share2 size={18} /></button>
            </div>

          </div>
        </div>

        {/* Tabs */}
        {currentTab && <div className="pd-tabs">
          <div className="pd-tab-nav">
            {availableTabs.map(tab => (
              <button key={tab} className={`pd-tab ${currentTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="pd-tab-content glass-card">
            {currentTab === 'specs' && (
              <table className="pd-specs-table">
                <tbody>
                  {specEntries.map(([key, value]) => (
                    <tr key={key}>
                      <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {currentTab === 'description' && <p className="pd-full-desc">{product.description}</p>}
          </div>
        </div>}

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
