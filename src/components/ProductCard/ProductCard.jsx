import { Link } from 'react-router-dom';
import { Eye, BatteryMedium, MessageCircle } from 'lucide-react';
import { conditionLabel } from '../../data/products';
import { naira, whatsappLink } from '../../config/site';
import { cld } from '../../lib/images';
import './ProductCard.css';

export default function ProductCard({ product }) {
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

        {product.inStock ? (
          <a
            className="pc-cart-btn"
            href={whatsappLink(`Hello Alitech, I'm interested in the ${product.name} (${[conditionLabel(product.condition), product.grade && `Grade ${product.grade}`].filter(Boolean).join(', ')}) — ${naira(product.price)}. Is it available?`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={15} /> Order on WhatsApp
          </a>
        ) : (
          <button className="pc-cart-btn" disabled>Sold out</button>
        )}
      </div>
    </div>
  );
}
