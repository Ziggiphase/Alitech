import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { whatsappLink, naira } from '../../config/site';
import { conditionLabel } from '../../data/products';
import { cld } from '../../lib/images';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const orderMessage = [
    'Hello Alitech, I would like to order:',
    '',
    ...cartItems.map((item, i) => {
      const details = [conditionLabel(item.condition), item.grade && `Grade ${item.grade}`].filter(Boolean).join(', ');
      return `${i + 1}. ${item.name}${details ? ` (${details})` : ''} × ${item.quantity} — ${naira(item.price * item.quantity)}`;
    }),
    '',
    `Total: ${naira(cartTotal)}`,
    '',
    'Is it available?',
  ].join('\n');

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
                  <img src={cld(item.image, 160)} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">{naira(item.price)}</span>
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
                <strong>{naira(cartTotal)}</strong>
              </div>
              <a
                href={whatsappLink(orderMessage)}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary cart-checkout-btn"
              >
                <MessageCircle size={18} /> Order on WhatsApp
              </a>
              <p className="cart-note">We'll confirm availability, delivery and payment with you on WhatsApp.</p>
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
