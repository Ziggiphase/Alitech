import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Smartphone, Laptop, Tablet, Watch, Gamepad2, Headphones, Cable, Star, Zap, Shield, Wrench, ArrowLeftRight } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { brands, heroSlides, testimonials, categories } from '../../data/products';
import { useProducts } from '../../context/ProductsContext';
import { cld } from '../../lib/images';
import { naira } from '../../config/site';
import './Home.css';

const iconMap = { Smartphone, Laptop, Tablet, Watch, Gamepad2, Headphones, Cable };

// Slide button goes to its product, or to the shop if that product was removed
const heroLink = (slide, getProduct) => {
  if (!slide.productId) return '/deals';
  return getProduct(slide.productId) ? `/product/${slide.productId}` : '/shop';
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Auto-rotate hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.observe').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const { products, getProduct } = useProducts();
  const featuredProducts = (products.some(p => p.featured) ? products.filter(p => p.featured) : products).slice(0, 8);
  const dealsProducts = products.filter(p => p.originalPrice).slice(0, 4);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero" id="hero-section">
        <div className="hero-bg" style={{ background: heroSlides[currentSlide].bg }} />
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }} />
          ))}
        </div>

        <div className="container hero-content">
          <div className="hero-text" key={currentSlide}>
            <span className="hero-tag animate-fadeInUp">✨ New at Alitech</span>
            <h1 className="hero-title animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              {heroSlides[currentSlide].title}
            </h1>
            <p className="hero-subtitle animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="hero-actions animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <Link to={heroLink(heroSlides[currentSlide], getProduct)} className="btn btn-primary btn-lg">
                {heroSlides[currentSlide].cta} <ArrowRight size={18} />
              </Link>
              <Link to="/shop" className="btn btn-secondary btn-lg">Browse All</Link>
            </div>
          </div>
        </div>

        <div className="hero-nav">
          <button onClick={prevSlide} className="hero-nav-btn"><ChevronLeft size={20} /></button>
          <div className="hero-dots">
            {heroSlides.map((_, i) => (
              <button key={i} className={`hero-dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)} />
            ))}
          </div>
          <button onClick={nextSlide} className="hero-nav-btn"><ChevronRight size={20} /></button>
        </div>
      </section>

      {/* ===== BRANDS MARQUEE ===== */}
      <section className="brands-section">
        <div className="brands-marquee">
          <div className="brands-track">
            {[...brands, ...brands].map((brand, i) => (
              <div key={i} className="brand-item">
                <span className="brand-emoji">{brand.logo}</span>
                <span className="brand-name">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section observe" id="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Find exactly what you need</p>
            </div>
            <Link to="/shop" className="btn btn-secondary">View All <ArrowRight size={16} /></Link>
          </div>
          <div className={`categories-grid ${isVisible['categories-section'] ? 'animate-fadeInUp' : ''}`}>
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon];
              return (
                <Link key={cat.id} to={`/shop/${cat.id}`} className="category-card glass-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="category-icon"><Icon size={28} /></div>
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                  <ArrowRight size={16} className="category-arrow" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section observe" id="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured <span className="gradient-text">Products</span></h2>
              <p className="section-subtitle">Handpicked by our tech experts</p>
            </div>
            <Link to="/shop" className="btn btn-secondary">Shop All <ArrowRight size={16} /></Link>
          </div>
          <div className={`products-grid ${isVisible['featured-section'] ? 'animate-fadeInUp' : ''}`}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="promo-banner observe" id="promo-section">
        <div className="container promo-inner">
          <div className={`promo-text ${isVisible['promo-section'] ? 'animate-fadeInUp' : ''}`}>
            <span className="badge badge-gold">Limited Time</span>
            <h2>Flash Deals 🔥</h2>
            <p>Save up to 40% on selected devices. New deals every week.</p>
            <Link to="/deals" className="btn btn-primary btn-lg">View Deals <ArrowRight size={18} /></Link>
          </div>
          <div className={`promo-cards ${isVisible['promo-section'] ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0.2s' }}>
            {dealsProducts.slice(0, 2).map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="promo-card glass-card">
                <img src={cld(product.image, 400)} alt={product.name} />
                <div>
                  <h4>{product.name}</h4>
                  <div className="promo-prices">
                    <span className="promo-new">{naira(product.price)}</span>
                    <span className="promo-old">{naira(product.originalPrice)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section observe" id="services-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>More Than a Store</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>We're your complete electronics partner</p>
          <div className={`services-grid ${isVisible['services-section'] ? 'animate-fadeInUp' : ''}`}>
            <Link to="/repair" className="service-card glass-card">
              <div className="service-icon"><Wrench size={28} /></div>
              <h3>Expert Repair</h3>
              <p>Professional repair services for all your devices, using quality parts.</p>
              <span className="service-link">Learn More <ArrowRight size={14} /></span>
            </Link>
            <Link to="/trade-in" className="service-card glass-card">
              <div className="service-icon"><ArrowLeftRight size={28} /></div>
              <h3>Trade-In Program</h3>
              <p>Get instant value for your old devices. Upgrade for less with our trade-in offers.</p>
              <span className="service-link">Get a Quote <ArrowRight size={14} /></span>
            </Link>
            <Link to="/deals" className="service-card glass-card">
              <div className="service-icon"><Zap size={28} /></div>
              <h3>Exclusive Deals</h3>
              <p>Members-only flash sales, bundle offers, and seasonal discounts you won't find elsewhere.</p>
              <span className="service-link">See Deals <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section observe" id="testimonials-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>What Our Customers Say</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Trusted by thousands of tech lovers</p>
          <div className={`testimonials-grid ${isVisible['testimonials-section'] ? 'animate-fadeInUp' : ''}`}>
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card glass-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="#D4A853" stroke="#D4A853" />)}
                </div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
