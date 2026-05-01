import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Smartphone, Laptop, Tablet, Watch, Gamepad2, Headphones, Cable, Wrench, ArrowLeftRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Header.css';

const navCategories = [
  { path: '/shop/phones', name: 'Phones', icon: Smartphone },
  { path: '/shop/laptops', name: 'Laptops', icon: Laptop },
  { path: '/shop/tablets', name: 'Tablets', icon: Tablet },
  { path: '/shop/smartwatches', name: 'Watches', icon: Watch },
  { path: '/shop/consoles', name: 'Consoles', icon: Gamepad2 },
  { path: '/shop/audio', name: 'Audio', icon: Headphones },
  { path: '/shop/accessories', name: 'Accessories', icon: Cable },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopDropdown, setShopDropdown] = useState(false);
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setShopDropdown(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <span>🔥 Free delivery on orders over ₦100,000</span>
          <div className="top-bar-links">
            <Link to="/repair">Repair Services</Link>
            <Link to="/trade-in">Trade-In</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="logo" id="header-logo">
            <span className="logo-icon">A</span>
            <span className="logo-text">ALITECH</span>
          </Link>

          <nav className={`nav ${mobileOpen ? 'nav--open' : ''}`}>
            <button className="nav-close" onClick={() => setMobileOpen(false)}><X size={24} /></button>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>

            <div className="nav-dropdown" onMouseEnter={() => setShopDropdown(true)} onMouseLeave={() => setShopDropdown(false)}>
              <Link to="/shop" className={`nav-link ${location.pathname.startsWith('/shop') ? 'active' : ''}`}>
                Shop <ChevronDown size={14} />
              </Link>
              {shopDropdown && (
                <div className="dropdown-menu">
                  <Link to="/shop" className="dropdown-item dropdown-all">All Products</Link>
                  {navCategories.map(cat => (
                    <Link key={cat.path} to={cat.path} className="dropdown-item">
                      <cat.icon size={16} /> {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/deals" className={`nav-link ${location.pathname === '/deals' ? 'active' : ''}`}>
              Deals <span className="nav-badge">Hot</span>
            </Link>
            <Link to="/repair" className={`nav-link ${location.pathname === '/repair' ? 'active' : ''}`}>Repair</Link>
            <Link to="/trade-in" className={`nav-link ${location.pathname === '/trade-in' ? 'active' : ''}`}>Trade-In</Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>

            {/* Mobile-only links */}
            <div className="nav-mobile-extras">
              <Link to="/wishlist" className="nav-link"><Heart size={16} /> Wishlist</Link>
              <Link to="/auth" className="nav-link"><User size={16} /> Sign In</Link>
            </div>
          </nav>

          <div className="header-actions">
            <button className="btn-icon" onClick={() => setSearchOpen(!searchOpen)} id="search-toggle" aria-label="Search">
              <Search size={18} />
            </button>
            <Link to="/wishlist" className="btn-icon header-wishlist" id="wishlist-btn" aria-label="Wishlist">
              <Heart size={18} />
              {wishlist.length > 0 && <span className="header-badge">{wishlist.length}</span>}
            </Link>
            <button className="btn-icon" onClick={() => setIsCartOpen(true)} id="cart-toggle" aria-label="Cart">
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="header-badge">{cartCount}</span>}
            </button>
            <Link to="/auth" className="btn btn-primary header-auth-btn" id="auth-btn">
              <User size={16} /> Sign In
            </Link>
            <button className="btn-icon mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Menu">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div className="search-overlay animate-fadeIn">
            <div className="container">
              <form onSubmit={handleSearch} className="search-form">
                <Search size={20} className="search-icon" />
                <input
                  type="text" placeholder="Search for phones, laptops, tablets..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  autoFocus className="search-input" id="search-input"
                />
                <button type="button" className="search-close" onClick={() => setSearchOpen(false)}><X size={20} /></button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      {mobileOpen && <div className="nav-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
