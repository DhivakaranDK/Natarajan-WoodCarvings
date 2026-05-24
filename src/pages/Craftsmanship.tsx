import { Link } from 'react-router-dom';
import './Craftsmanship.css';

const craftSteps = [
  {
    step: 1,
    title: 'Selecting Premium Timber',
    desc: 'Every masterpiece begins with the right wood. Our experts handpick seasoned Rain Tree, Teak, Temple Plant, Fig, Indian Kino Tree, and Mahogany logs — inspecting grain, density, and natural character to ensure each block is worthy of becoming a divine sculpture.',
    image: '/images/process/step-1-wood-selection-hands.png',
  },
  {
    step: 2,
    title: 'Blueprint & Design',
    desc: 'Master artisans translate sacred visions into detailed hand-drawn sketches on aged parchment. Every proportion, mudra, and ornament is meticulously planned using traditional iconographic measurements passed down through generations.',
    image: '/images/process/step-2-design-sketch.png',
  },
  {
    step: 3,
    title: 'Rough Carving & Shaping',
    desc: 'Using traditional chisels and mallets, the raw timber block is carefully transformed into its foundational form. This stage demands both strength and vision as the sculptor reveals the deity hidden within the wood.',
    image: '/images/process/step-3-rough-shaping-hands.png',
  },
  {
    step: 4,
    title: 'Intricate Detail Carving',
    desc: 'Fine chisels and gouges bring out the ornate details — delicate jewelry, flowing garments, floral motifs, and sacred symbols. This painstaking stage can take weeks of focused, meditative craftsmanship.',
    image: '/images/process/step-4-detail-carving.png',
  },
  {
    step: 5,
    title: 'Sculpting Divine Expressions',
    desc: 'The most sacred step — breathing life into the deity\'s face. Using precision micro-tools, the artisan sculpts serene expressions, gentle smiles, and compassionate eyes that radiate spiritual grace.',
    image: '/images/process/step-5-face-sculpting-hands.png',
  },
  {
    step: 6,
    title: 'Sanding & Smoothing',
    desc: 'Multiple rounds of hand-sanding with progressively finer grits create a flawless, silk-smooth surface. Every curve is refined, every edge perfected — preparing the sculpture for its final transformation.',
    image: '/images/process/step-6-sanding-finishing-hands.png',
  },
  {
    step: 7,
    title: 'Natural Coloring & Polish',
    desc: 'Traditional wood stains, natural oils, and lacquer are carefully applied by hand. Rich brown, golden, and rosewood tones emerge, enhancing the natural grain while providing lasting protection and a luxurious sheen.',
    image: '/images/process/step-7-natural-coloring-polish.png',
  },
  {
    step: 8,
    title: 'Final Showcase & Delivery',
    desc: 'Every completed piece undergoes rigorous quality inspection before being proudly displayed. From our workshop in Kallakurichi to your sacred space — each sculpture is custom-packed and shipped worldwide with care.',
    image: '/images/process/step-8-final-showcase-delivery-hands.png',
  },
];

const woodTypes = [
  { name: 'Rain Tree Wood', desc: 'Also known as Country Wood. A practical choice for traditional carving work.', color: '#9B6A37' },
  { name: 'Teak Wood Options', desc: 'Available in Burma Teak, Nelambur Teak, and African Teak based on project needs.', color: '#8B6914' },
  { name: 'Temple Plant Wood', desc: 'Selected for devotional and temple-style carvings with a traditional character.', color: '#B48445' },
  { name: 'Fig Wood', desc: 'Suitable for detailed carving where a softer working grain is preferred.', color: '#C8A66A' },
  { name: 'Indian Kino Tree Wood', desc: 'Strong native hardwood with warm tones for durable handcrafted pieces.', color: '#7B3F24' },
  { name: 'Mahogany', desc: 'Stable, attractive hardwood with a refined finish for premium wood carvings.', color: '#6F2E1C' },
];

export default function Craftsmanship() {
  return (
    <div className="craft-page" id="craftsmanship-page">
      <section className="craft-hero">
        <div className="container">
          <span className="badge badge-gold">🔨 The Process</span>
          <h1>Our Craftsmanship</h1>
          <p className="section-subtitle">
            From raw timber to divine art — discover the meticulous journey that 
            transforms a block of wood into a masterpiece.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section craftsmanship-section" id="craftsmanship-section">
        <div className="container">
          <div className="section-header">
            <h2>From Raw Timber to Divine Sculpture</h2>
            <p className="section-subtitle">
              A journey of patience, devotion, and mastery — each statue passes through eight
              stages of meticulous handcrafting by our artisan lineage.
            </p>
          </div>

          <div className="process-timeline" id="process-timeline">
            <div className="process-timeline__line" aria-hidden="true"></div>

            {craftSteps.map((step, index) => (
              <div
                className={`process-step ${index % 2 === 0 ? 'process-step--left' : 'process-step--right'}`}
                key={step.step}
                id={`process-step-${step.step}`}
              >
                <div className="process-step__node">
                  <span className="process-step__number">{step.step}</span>
                </div>

                <div className="process-step__card">
                  <div className="process-step__img-wrap">
                    <img src={step.image} alt={step.title} loading="lazy" />
                  </div>
                  <div className="process-step__content">
                    <span className="process-step__label">Step {step.step}</span>
                    <h3 className="process-step__title">{step.title}</h3>
                    <p className="process-step__desc">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wood Types */}
      <section className="section craft-woods-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Wood Types</h2>
            <p className="section-subtitle">Each wood species brings its own character, grain, and soul to the sculpture</p>
          </div>
          <div className="craft-woods-grid">
            {woodTypes.map((wood, i) => (
              <div key={i} className="craft-wood-card">
                <div className="craft-wood-swatch" style={{ background: wood.color }}></div>
                <h4>{wood.name}</h4>
                <p>{wood.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Watch the Magic Unfold</h2>
            <p className="section-subtitle">See our artisans at work — transforming raw wood into divine art</p>
          </div>
          <div className="craft-video-wrap">
            <video controls poster="/images/gallery/product-6.jpg" preload="metadata" className="craft-video">
              <source src="/videos/natarajan_woodcarvings_1594207741_2348705031364432929_8122844416.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section craft-cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Want a Custom Piece?</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            Tell us your vision and our master artisans will bring it to life.
          </p>
          <Link to="/custom-orders" className="btn btn-gold btn-lg">Start Custom Order →</Link>
        </div>
      </section>
    </div>
  );
}
