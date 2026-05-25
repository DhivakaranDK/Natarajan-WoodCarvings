import { useState } from 'react';
import { PRIMARY_CONTACT } from '../data/contactConfig';
import './CustomOrders.css';

const statueTypes = [
  'Deity Statue',
  'Wall Mount Panel',
  'Temple Arch',
  'Pooja Mandap',
  'Decorative Pillar',
  'Modern Art Piece',
  'Custom Design',
];

const woodOptions = [
  'Rain Tree Wood (Country Wood)',
  'Burma Teak',
  'Nelambur Teak',
  'African Teak',
  'Temple Plant Wood',
  'Fig Wood',
  'Indian Kino Tree Wood',
  'Mahogany',
  'Not Sure - Need Guidance',
];

const finishOptions = [
  'Natural Polish',
  'Raw / Unfinished',
  'Antique Brown',
  'Gold Accent',
  'Traditional Multi Color',
];

type FormState = {
  statueType: string;
  deityName: string;
  woodType: string;
  finish: string;
  height: string;
  width: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

type FormField = keyof FormState;
type FormErrors = Partial<Record<FormField, string>>;

const initialForm: FormState = {
  statueType: '',
  deityName: '',
  woodType: '',
  finish: '',
  height: '',
  width: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
};

const mandatoryMessage = 'This field is mandatory to fill.';
const namePattern = /^[A-Za-z\s]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CustomOrders() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const update = (field: FormField, value: string) => {
    const nextValue = field === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;

    setForm(prev => ({ ...prev, [field]: nextValue }));
    setErrors(prev => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const applyErrors = (nextErrors: FormErrors) => {
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateDesignStep = () => applyErrors({
    ...(form.statueType ? {} : { statueType: mandatoryMessage }),
  });

  const validateSpecificationsStep = () => applyErrors({
    ...(form.woodType ? {} : { woodType: mandatoryMessage }),
    ...(form.finish ? {} : { finish: mandatoryMessage }),
  });

  const validateContactStep = () => {
    const nextErrors: FormErrors = {};
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) {
      nextErrors.name = mandatoryMessage;
    } else if (!namePattern.test(name)) {
      nextErrors.name = 'Name should contain only letters.';
    }

    if (!form.phone) {
      nextErrors.phone = mandatoryMessage;
    } else if (!/^\d{10}$/.test(form.phone)) {
      nextErrors.phone = 'Enter a valid 10-digit mobile number.';
    }

    if (email && !emailPattern.test(email)) {
      nextErrors.email = 'Enter a valid email address with @ and .';
    }

    return applyErrors(nextErrors);
  };

  const handleDesignNext = () => {
    if (validateDesignStep()) setStep(2);
  };

  const handleSpecificationsNext = () => {
    if (validateSpecificationsStep()) setStep(3);
  };

  const generateWhatsAppMsg = () => (
    `Hello Natarajan WoodCarvings! I'd like to place a custom order:\n\n` +
    `Order Details\n` +
    `- Type: ${form.statueType}\n` +
    `- Deity/Design: ${form.deityName || 'N/A'}\n` +
    `- Wood: ${form.woodType}\n` +
    `- Finish: ${form.finish}\n` +
    `- Size: ${form.height || 'N/A'} x ${form.width || 'N/A'}\n` +
    `Contact\n` +
    `- Name: ${form.name}\n` +
    `- Phone: ${form.phone}\n` +
    `- Email: ${form.email || 'N/A'}\n\n` +
    `Notes: ${form.notes || 'None'}`
  );

  const handleSubmit = () => {
    if (!validateContactStep()) return;

    const msg = generateWhatsAppMsg();
    window.open(`https://wa.me/91${PRIMARY_CONTACT.raw}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="custom-page" id="custom-orders-page">
      <section className="custom-hero">
        <div className="container">
          <span className="badge badge-gold">Bespoke Creations</span>
          <h1>Custom Orders</h1>
          <p className="section-subtitle">
            Tell us your vision. Our artisans will bring it to life in wood.
            Fill the form below and we will connect on WhatsApp for details.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="custom-form-wrap">
            <div className="custom-steps-indicator">
              {[1, 2, 3].map(s => (
                <div key={s} className={`custom-step-dot ${step >= s ? 'custom-step-dot--active' : ''}`}>
                  <span>{s}</span>
                  <small>{s === 1 ? 'Design' : s === 2 ? 'Details' : 'Contact'}</small>
                </div>
              ))}
              <div className="custom-steps-line">
                <div className="custom-steps-line-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
              </div>
            </div>

            {step === 1 && (
              <div className="custom-form-step" id="custom-step-1">
                <h3>Step 1: What would you like?</h3>
                <div className="form-group">
                  <label className="form-label">Statue Type *</label>
                  <div className={`custom-option-grid ${errors.statueType ? 'custom-option-grid--error' : ''}`}>
                    {statueTypes.map(type => (
                      <button
                        type="button"
                        key={type}
                        className={`custom-option ${form.statueType === type ? 'custom-option--selected' : ''}`}
                        onClick={() => update('statueType', type)}
                        aria-pressed={form.statueType === type}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {errors.statueType && <p className="form-error" id="statue-type-error">{errors.statueType}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Deity / Design Name</label>
                  <input
                    className="form-input"
                    placeholder="e.g., Lord Ganesha, Nataraja, custom peacock"
                    value={form.deityName}
                    onChange={e => update('deityName', e.target.value)}
                  />
                </div>

                <div className="custom-form-nav">
                  <div />
                  <button className="btn btn-primary" onClick={handleDesignNext}>Next: Details</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="custom-form-step" id="custom-step-2">
                <h3>Step 2: Specifications</h3>
                <div className="form-group">
                  <label className="form-label">Wood Type *</label>
                  <div className={`custom-option-grid ${errors.woodType ? 'custom-option-grid--error' : ''}`}>
                    {woodOptions.map(wood => (
                      <button
                        type="button"
                        key={wood}
                        className={`custom-option ${form.woodType === wood ? 'custom-option--selected' : ''}`}
                        onClick={() => update('woodType', wood)}
                        aria-pressed={form.woodType === wood}
                      >
                        {wood}
                      </button>
                    ))}
                  </div>
                  {errors.woodType && <p className="form-error" id="wood-type-error">{errors.woodType}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Finish Preference *</label>
                  <div className={`custom-option-grid ${errors.finish ? 'custom-option-grid--error' : ''}`}>
                    {finishOptions.map(finish => (
                      <button
                        type="button"
                        key={finish}
                        className={`custom-option ${form.finish === finish ? 'custom-option--selected' : ''}`}
                        onClick={() => update('finish', finish)}
                        aria-pressed={form.finish === finish}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                  {errors.finish && <p className="form-error" id="finish-error">{errors.finish}</p>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Height (approx)</label>
                    <input
                      className="form-input"
                      placeholder="e.g., 2 feet"
                      value={form.height}
                      onChange={e => update('height', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Width (approx)</label>
                    <input
                      className="form-input"
                      placeholder="e.g., 1.5 feet"
                      value={form.width}
                      onChange={e => update('width', e.target.value)}
                    />
                  </div>
                </div>

                <div className="custom-form-nav">
                  <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" onClick={handleSpecificationsNext}>Next: Contact</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="custom-form-step" id="custom-step-3">
                <h3>Step 3: Your Contact Details</h3>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    placeholder="Full name"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p className="form-error" id="name-error">{errors.name}</p>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && <p className="form-error" id="phone-error">{errors.phone}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p className="form-error" id="email-error">{errors.email}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Any specific requirements, reference image details, carving size, finish or delivery location"
                    value={form.notes}
                    onChange={e => update('notes', e.target.value)}
                  />
                </div>

                <div className="custom-summary">
                  <h4>Order Summary</h4>
                  <div className="custom-summary-grid">
                    <span>Type:</span><strong>{form.statueType}</strong>
                    <span>Design:</span><strong>{form.deityName || '-'}</strong>
                    <span>Wood:</span><strong>{form.woodType}</strong>
                    <span>Finish:</span><strong>{form.finish}</strong>
                    <span>Size:</span><strong>{form.height || '-'} x {form.width || '-'}</strong>
                  </div>
                </div>

                <div className="custom-form-nav">
                  <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                  <button className="btn btn-whatsapp btn-lg" onClick={handleSubmit}>
                    Send via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
