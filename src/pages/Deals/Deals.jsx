import { Link } from 'react-router-dom';
import { Clock, Star, ArrowRight, Zap } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../context/ProductsContext';
import './Deals.css';

export default function Deals() {
  const { products } = useProducts();
  const dealsProducts = products.filter(p => p.originalPrice);

  return (
    <div className="deals-page">
      {/* Hero */}
      <section className="deals-hero">
        <div className="container">
          <span className="badge badge-red"><Zap size={12} /> Limited Time</span>
          <h1>Flash <span className="gradient-text">Deals</span> 🔥</h1>
          <p>Incredible savings on premium electronics. New deals added weekly!</p>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{dealsProducts.length} Deals Available</h2>
          </div>
          <div className="products-grid">
            {dealsProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {dealsProducts.length === 0 && (
            <div className="shop-empty">
              <Clock size={48} />
              <h3>New deals coming soon!</h3>
              <p>Check back regularly for amazing offers.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
