import { Link } from 'react-router-dom';
import { useCountUp } from '../hooks/useScrollReveal';
import { products } from '../data/products';
import './Home.css';

const ganeshaStatIcon = '/images/icons/ganesha-photo-icon.png';

const stats = [
  { value: 40, suffix: '+', label: 'Years of Heritage', icon: '\uD83C\uDFDB\uFE0F' },
  { value: 10000, suffix: '+', label: 'Statues Crafted', iconSrc: ganeshaStatIcon },
  { value: 500, suffix: '+', label: 'Statue Varieties', iconSrc: ganeshaStatIcon },
  { value: 50, suffix: '+', label: 'Countries Shipped', icon: '\uD83C\uDF0D' },
];

const featuredProducts = products.slice(0, 6);

export default function Home() {
  return (
    <div className="home" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero__bg">
          <img src="/images/hero-bg-custom.png" alt="Natarajan WoodCarvings Workshop" className="hero__bg-img" />
          <div className="hero__bg-overlay"></div>
        </div>
        <div className="container hero__content">
          <h1 className="hero__title">
            <span className="hero__title-line">Natarajan</span>
            <span className="hero__title-line gold-shimmer">WoodCarvings®</span>
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
          <div className="hero__scroll-cta" onClick={() => document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Scroll to explore</span>
            <div className="hero__scroll-arrow">↓</div>
          </div>
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
          <div className="heritage-grid">
            <div className="heritage-img-stack">
              <img src="/images/gallery/product-1.jpg" alt="Lord Venkateshwara with Prabhavali" className="heritage-img heritage-img--1" loading="lazy" />
              <img src="/images/gallery/product-3.jpg" alt="Lord Venkateshwara Grand Arch" className="heritage-img heritage-img--2" loading="lazy" />
            </div>
            <div className="heritage-content">
              <span className="badge badge-gold">🏛️ Our Heritage</span>
              <h2>A Legacy Rooted in the Chola Dynasty</h2>
              <div className="gold-divider" style={{ margin: '1.5rem 0' }}></div>
              <p>
                For over four decades, Natarajan WoodCarvings has been preserving and evolving the ancient
                art of Tamil wood carving. Our craft traces its lineage to the master sculptors who adorned
                the great temples of the Chola dynasty.
              </p>
              <p>
                Each statue is born from carefully selected wood — Teak, Rosewood, or Vaagai — and
                transformed through weeks of meticulous hand carving by our team of skilled artisans.
              </p>
              <div className="heritage-awards">
                <div className="heritage-award">
                  <span className="heritage-award__icon">🏆</span>
                  <div>
                    <strong>Poompuhar Award</strong>
                    <p>Tamil Nadu State Recognition</p>
                  </div>
                </div>
                <div className="heritage-award">
                  <span className="heritage-award__icon">📍</span>
                  <div>
                    <strong>GI Tag — 2021</strong>
                    <p>Geographical Indication Certified</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary">Read Our Story →</Link>
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
              href="https://wa.me/919092342219?text=Hello!%20I%20want%20to%20discuss%20a%20custom%20wood%20carving%20order."
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
