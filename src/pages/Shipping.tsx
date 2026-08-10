import './Shipping.css';

const couriers = [
  { name: 'Priority International', desc: 'Fast overseas delivery option', time: '5–7 days', icon: '📦' },
  { name: 'Worldwide Courier', desc: 'Reliable global shipping', time: '5–10 days', icon: '🚀' },
  { name: 'Domestic Express', desc: 'Fast delivery within India', time: '3–5 days', icon: '🏠' },
  { name: 'Economy Delivery', desc: 'Budget-friendly domestic option', time: '7–14 days', icon: '📮' },
];

const packingSteps = [
  { step: '01', title: 'Bubble Wrap Layer', desc: 'Each statue is individually wrapped in premium bubble wrap for shock absorption.', icon: '🫧' },
  { step: '02', title: 'Thermocol Padding', desc: 'Thermocol sheets and foam peanuts fill all gaps, preventing any movement during transit.', icon: '📋' },
  { step: '03', title: 'Custom Wooden Box', desc: 'A sturdy wooden crate is custom-built to match the exact dimensions of the statue.', icon: '📦' },
  { step: '04', title: 'Sealed & Labeled', desc: 'The box is sealed, reinforced with strapping tape, and labeled with handling instructions.', icon: '🏷️' },
];

export default function Shipping() {
  return (
    <div className="shipping-page" id="shipping-page">
      <section className="shipping-hero">
        <div className="container">
          <span className="badge badge-gold">🚚 Delivery & Packaging</span>
          <h1>Shipping & Packaging</h1>
          <p className="section-subtitle">
            Museum-grade packaging. Worldwide delivery. Every statue arrives in perfect condition.
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Shipping Options</h2>
            <p className="section-subtitle">Flexible delivery choices for safe shipping across India and worldwide</p>
          </div>
          <div className="shipping-courier-grid">
            {couriers.map((c, i) => (
              <div key={i} className="shipping-courier-card">
                <span className="shipping-courier-icon">{c.icon}</span>
                <h4>{c.name}</h4>
                <p>{c.desc}</p>
                <span className="shipping-courier-time">⏱️ {c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packing Process */}
      <section className="section shipping-packing-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Packing Process</h2>
            <p className="section-subtitle">4-layer protection ensures your art arrives flawlessly</p>
          </div>
          <div className="shipping-packing-grid">
            {packingSteps.map((s, i) => (
              <div key={i} className="shipping-packing-card">
                <div className="shipping-packing-num">{s.step}</div>
                <span className="shipping-packing-icon">{s.icon}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>We Ship Worldwide 🌍</h2>
            <p className="section-subtitle">From Kallakurichi to your doorstep — anywhere on the planet</p>
          </div>
          <div className="shipping-info-grid">
            <div className="shipping-info-card">
              <h4>🇮🇳 Domestic (India)</h4>
              <ul>
                <li>Delivery within 3–5 business days</li>
                <li>Secure advance payment confirmation before dispatch</li>
                <li>Real-time tracking provided by Courier Services</li>
              </ul>
            </div>
            <div className="shipping-info-card">
              <h4>🌏 International</h4>
              <ul>
                <li>Shipped through trusted international courier services</li>
                <li>Delivery within 5–14 business days</li>
                <li>Customs documentation handled by us</li>
              </ul>
            </div>
            <div className="shipping-info-card">
              <h4>🛡️ Our Promise</h4>
              <ul>
                <li>100% damage-free delivery guarantee</li>
                <li>Free replacement if damaged in transit</li>
                <li>Photo verification before dispatch</li>
                <li>WhatsApp updates at every stage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
