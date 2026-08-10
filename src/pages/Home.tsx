import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCountUp } from '../hooks/useScrollReveal';
import { products } from '../data/products';
import { PRIMARY_CONTACT } from '../data/contactConfig';
import './Home.css';

const slideImages = [
  '/images/slides/IMG_20260524_223236.png',
  '/images/slides/IMG_20260524_223630.png',
  '/images/slides/IMG_20260524_223724.png',
  '/images/slides/IMG_20260524_223750.png',
  '/images/slides/IMG_20260524_223941.png',
  '/images/slides/IMG_20260524_224030.png',
  '/images/slides/IMG_20260524_224442.png',
  '/images/slides/IMG_20260524_225228.png',
  '/images/slides/IMG_20260524_230309.png',
];

const ganeshaStatIcon = '/images/icons/ganesha-photo-icon.png';

const stats = [
  { value: 40, suffix: '+', label: 'Years of Heritage', icon: '\uD83C\uDFDB\uFE0F' },
  { value: 10000, suffix: '+', label: 'Statues Crafted', iconSrc: ganeshaStatIcon },
  { value: 500, suffix: '+', label: 'Statue Varieties', iconSrc: ganeshaStatIcon },
  { value: 50, suffix: '+', label: 'Countries Shipped', icon: '\uD83C\uDF0D' },
];

const featuredProducts = products.slice(0, 6);

function HomeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slideImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % slideImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div
      className="home-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Counter Overlay */}
      <span className="home-slider__counter">
        {String(currentIndex + 1).padStart(2, '0')} / {String(slideImages.length).padStart(2, '0')}
      </span>

      {/* Caption Overlay */}
      <div className="home-slider__caption">
        <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: 'var(--space-1) var(--space-2)' }}>Artisan Creation</span>
        <h3 style={{ margin: 'var(--space-1) 0 0', color: 'var(--color-white)' }}>Exquisite Detailing</h3>
      </div>

      <button className="home-slider__nav home-slider__nav--prev" onClick={handlePrev} aria-label="Previous image">❮</button>
      <button className="home-slider__nav home-slider__nav--next" onClick={handleNext} aria-label="Next image">❯</button>
      <div className="home-slider__track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slideImages.map((src, index) => (
          <div key={index} className="home-slider__slide">
            <img src={src} alt={`Wood Carving Showcase ${index + 1}`} className="home-slider__img" />
          </div>
        ))}
      </div>
      <div className="home-slider__dots">
        {slideImages.map((_, index) => (
          <button
            key={index}
            className={`home-slider__dot ${currentIndex === index ? 'home-slider__dot--active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="home" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero__bg">
          <img src="/images/hanuman.png" alt="Natarajan WoodCarvings Workshop" className="hero__bg-img" />
          <div className="hero__bg-overlay"></div>
        </div>
        <div className="container hero__content">
          <h1 className="hero__title">
            <span className="hero__title-line">Natarajan</span>
            <span className="hero__title-line gold-shimmer">WoodCarvings</span>
          </h1>
          <div className="hero__badges">
            <span className="badge badge-gold">📍 GI Tagged Craft — 2021</span>
            <span className="badge badge-gold">🏆 Poompuhar Award Winner</span>
          </div>
          <p className="hero__subtitle">Handcrafted Heritage Since 1985</p>
          <p className="hero__desc">
            Discover premium, handcrafted wooden masterpieces from the heart of Kallakurichi with Natarajan
            Woodcarvings. As GI-tagged artisans and Poompuhar Award winners we preserve centuries of Tamil
            heritage in every meticulously carved detail.
          </p>
          <div className="hero__cta">
            <Link to="/products" className="btn btn-gold btn-lg">Explore Products</Link>
            <Link to="/custom-orders" className="btn btn-outline btn-lg" style={{ borderColor: '#fff', color: '#fff' }}>Custom Orders</Link>
          </div>
           <div className="hero__scroll-cta" onClick={() => document.getElementById('home-slider-section')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Scroll to explore</span>
            <div className="hero__scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* Slide Show Section */}
      <section className="section slider-section" id="home-slider-section">
        <div className="container">
          <div className="section-header">
            <h2>Artisan Creation Gallery</h2>
            <p className="section-subtitle">
              Explore our latest completed wood carvings and custom masterworks from our workshop.
            </p>
          </div>
          <HomeSlider />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" id="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section" id="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Masterpieces</h2>
            <p className="section-subtitle">
              Each piece is a unique work of art, handcrafted by our master artisans with generations of expertise.
            </p>
          </div>
          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <Link to="/products" key={product.id} className="featured-card">
                <div className="featured-card__img-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div className="featured-card__overlay">
                    <span>View Product →</span>
                  </div>
                </div>
                <h4 className="featured-card__name">{product.name}</h4>
                <span className="badge badge-walnut">{product.category.replace('-', ' ')}</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/products" className="btn btn-primary btn-lg">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="section heritage-section" id="heritage-section">
        <div className="container">
          <div className="heritage-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="heritage-content">
              <span className="badge badge-gold" style={{ display: 'inline-flex', marginBottom: 'var(--space-4)' }}>🏛️ Our Heritage</span>
              <h2>A Legacy Rooted in the Chola Dynasty</h2>
              <div className="gold-divider" style={{ margin: '1.5rem auto' }}></div>
              <p style={{ maxWidth: '700px', margin: '0 auto var(--space-4)' }}>
                For over four decades, Natarajan WoodCarvings has been preserving and evolving the ancient
                art of Tamil wood carving. Our craft traces its lineage to the master sculptors who adorned
                the great temples of the Chola dynasty.
              </p>
              <p style={{ maxWidth: '700px', margin: '0 auto var(--space-6)' }}>
                Each statue is born from carefully selected wood — Teak, Rosewood, or Vaagai — and
                transformed through weeks of meticulous hand carving by our team of skilled artisans.
              </p>
              <div className="heritage-awards-grid">
                <div className="heritage-award">
                  <span className="heritage-award__icon">📍</span>
                  <div style={{ textAlign: 'left' }}>
                    <strong>GI Tag — 2021</strong>
                    <p>Geographical Indication Certified</p>
                  </div>
                </div>
                <div className="heritage-award">
                  <span className="heritage-award__icon">🏆</span>
                  <div style={{ textAlign: 'left' }}>
                    <strong>Poompuhar Award</strong>
                    <p>Tamil Nadu State Recognition</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary" style={{ display: 'inline-block', marginTop: 'var(--space-6)' }}>Read Our Story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta-section">
        <div className="cta-section__bg"></div>
        <div className="container cta-section__content">
          <h2>Have a Vision? Let Us Carve It.</h2>
          <p>From deity statues to custom wall panels — tell us your dream, and our artisans will bring it to life in wood.</p>
          <div className="cta-section__btns">
            <Link to="/custom-orders" className="btn btn-gold btn-lg">Start Custom Order</Link>
            <a
              href={`https://wa.me/91${PRIMARY_CONTACT.raw}?text=Hello!%20I%20want%20to%20discuss%20a%20custom%20wood%20carving%20order.`}
              className="btn btn-whatsapp btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  value,
  suffix,
  label,
  icon,
  iconSrc,
}: {
  value: number;
  suffix: string;
  label: string;
  icon?: string;
  iconSrc?: string;
}) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div className="stat-card" ref={ref}>
      <span className={`stat-card__icon${iconSrc ? ' stat-card__icon--image' : ''}`} aria-hidden="true">
        {iconSrc ? <img src={iconSrc} alt="" loading="lazy" /> : icon}
      </span>
      <span className="stat-card__value">{count.toLocaleString()}{suffix}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}
