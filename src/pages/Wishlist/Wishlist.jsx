import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';

export default function Wishlist() {
  const { wishlist } = useCart();

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title"><Heart size={28} style={{ color: 'var(--gold)', display: 'inline' }} /> My Wishlist</h1>
        <p className="section-subtitle">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>

        {wishlist.length > 0 ? (
          <div className="products-grid">{wishlist.map(p => <ProductCard key={p.id} product={p} />)}</div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--gray-500)' }}>
            <Heart size={48} style={{ color: 'var(--gray-700)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--white)', marginBottom: '8px' }}>Your wishlist is empty</h3>
            <p style={{ marginBottom: '20px' }}>Save items you love for later</p>
            <Link to="/shop" className="btn btn-primary">Browse Products</Link>
          </div>
        )}
      </div>
    </div>
  );
}
