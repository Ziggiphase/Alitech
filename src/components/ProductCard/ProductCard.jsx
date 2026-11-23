import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, BatteryMedium } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { conditionLabel } from '../../data/products';
import { naira } from '../../config/site';
import { cld } from '../../lib/images';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card glass-card" id={`product-${product.id}`}>
      {/* Badges */}
      <div className="pc-badges">
        {discount > 0 && <span className="badge badge-red">-{discount}%</span>}
        {product.badge && <span className="badge badge-gold">{product.badge}</span>}
        {!product.inStock && <span className="badge badge-red">Out of Stock</span>}
      </div>

      {/* Quick actions */}
      <div className="pc-actions">
        <button
          className={`pc-action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
        </button>
        <Link to={`/product/${product.id}`} className="pc-action-btn" aria-label="Quick view">
          <Eye size={16} />
        </Link>
      </div>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="pc-image-wrap">
        <img src={cld(product.image, 600)} alt={product.name} className="pc-image" loading="lazy" />
      </Link>

      {/* Info */}
      <div className="pc-info">
        <span className="pc-brand">{product.brand}</span>
        <Link to={`/product/${product.id}`} className="pc-name">{product.name}</Link>

        <div className="pc-condition">
          <span className={`pc-condition-tag pc-condition--${product.condition}`}>
            {conditionLabel(product.condition)}{product.grade ? ` · Grade ${product.grade}` : ''}
          </span>
          {product.batteryHealth ? (
            <span className="pc-battery"><BatteryMedium size={13} /> {product.batteryHealth}%</span>
          ) : null}
        </div>

        <div className="pc-price-row">
          <span className="pc-price">{naira(product.price)}</span>
          {product.originalPrice && (
            <span className="pc-original">{naira(product.originalPrice)}</span>
          )}
        </div>

        <button
          className="pc-cart-btn"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart size={15} />
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
