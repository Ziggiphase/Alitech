import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer animate-fadeIn">
        <div className="cart-header">
          <h3><ShoppingBag size={20} /> Cart ({cartCount})</h3>
          <button onClick={() => setIsCartOpen(false)} className="cart-close"><X size={22} /></button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} />
            <p>Your cart is empty</p>
            <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">₦{item.price.toLocaleString()}</span>
                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>₦{cartTotal.toLocaleString()}</strong>
              </div>
              <Link to="/auth" className="btn btn-primary cart-checkout-btn" onClick={() => setIsCartOpen(false)}>
                Sign In to Checkout
              </Link>
              <button className="btn btn-secondary cart-continue" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
