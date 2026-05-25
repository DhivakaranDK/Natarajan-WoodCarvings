import { type FormEvent, useState } from 'react';
import { CONTACT_NUMBERS, PRIMARY_CONTACT, CONTACT_EMAIL } from '../data/contactConfig';
import './Contact.css';

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAILJS_SERVICE_ID = 'service_1e2yyme';
const EMAILJS_TEMPLATE_ID = 'template_aedt71e';
const EMAILJS_PUBLIC_KEY = 'PnPPyJPr5dXsCgfqb';

const ICONS = {
  phone: '\u{1F4DE}',
  address: '\u{1F4CD}',
  email: '\u2709\uFE0F',
  clock: '\u23F0',
  chat: '\u{1F4AC}',
  instagram: '\u{1F4F8}',
  success: '\u2705',
};

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

// Letters (incl. accented), spaces, hyphen, apostrophe, dot. 2-60 chars.
const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ '\-.]{1,59}$/;
// Standard email (single @, dot in domain, no whitespace).
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX = { name: 60, email: 254, phone: 15, message: 1000 } as const;
const PHONE_MIN_DIGITS = 7;

const SUBJECT_OPTIONS = [
  'Product Inquiry',
  'Custom Order',
  'Shipping Question',
  'Bulk Order',
  'Other',
];

type ContactForm = typeof initialForm;
type ContactFormField = keyof ContactForm;
type ContactFormErrors = Partial<Record<ContactFormField, string>>;
type ContactFormTouched = Partial<Record<ContactFormField, boolean>>;

// Strip characters the field doesn't accept so the user literally cannot type
// disallowed input. Sanitization happens before the value reaches state.
function sanitizeField(field: ContactFormField, value: string): string {
  switch (field) {
    case 'name':
      return value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ '\-.]/g, '');
    case 'phone':
      return value.replace(/\D/g, '');
    case 'email':
      return value.replace(/\s/g, '');
    default:
      return value;
  }
}

function validateField(field: ContactFormField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case 'name':
      if (!value) return 'Please enter your name.';
      if (value.length < 2) return 'Name must be at least 2 characters.';
      if (!namePattern.test(value)) return 'Use letters, spaces, hyphens or apostrophes only.';
      return undefined;
    case 'phone': {
      if (!value) return 'Please enter your phone number.';
      if (value.length < PHONE_MIN_DIGITS) {
        return `Phone number must be at least ${PHONE_MIN_DIGITS} digits.`;
      }
      if (value.length > MAX.phone) return `Phone number must be at most ${MAX.phone} digits.`;
      return undefined;
    }
    case 'email':
      if (!value) return 'Please enter your email address.';
      if (value.length > MAX.email) return 'Email is too long.';
      if (!emailPattern.test(value)) return 'Enter a valid email address.';
      return undefined;
    case 'subject':
      if (!value) return 'Please select a subject.';
      return undefined;
    case 'message':
      if (!value) return 'Please enter your message.';
      if (value.length < 10) return 'Message must be at least 10 characters.';
      if (value.length > MAX.message) return `Message must be under ${MAX.message} characters.`;
      return undefined;
  }
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<ContactFormTouched>({});

  const update = (field: ContactFormField, value: string) => {
    const cleaned = sanitizeField(field, value);
    setForm(prev => ({ ...prev, [field]: cleaned }));
    setError('');
    // Re-validate on change only after the field has been touched, so we don't
    // yell at the user mid-typing on a fresh field.
    if (touched[field] || errors[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, cleaned) }));
    }
  };

  const handleBlur = (field: ContactFormField) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, form[field]) }));
  };

  const validateForm = () => {
    const nextErrors: ContactFormErrors = {};
    (Object.keys(form) as ContactFormField[]).forEach(field => {
      const message = validateField(field, form[field]);
      if (message) nextErrors[field] = message;
    });
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSending(true);
    setError('');

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const subject = form.subject || 'Contact Form Inquiry';
    const message = form.message.trim();

    try {
      const response = await fetch(EMAILJS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: CONTACT_EMAIL,
            name,
            phone,
            email,
            subject,
            message,
            // Aliases kept for compatibility with EmailJS reply-to / from-name settings
            from_name: name,
            reply_to: email,
          },
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || `EmailJS request failed with ${response.status}`);
      }

      setSent(true);
      setForm(initialForm);
      setErrors({});
      setTouched({});
    } catch (submitError) {
      console.error('Contact form email failed:', submitError);
      setError('Could not send your message right now. Please try again or contact us on WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-page" id="contact-page">
      <section className="contact-hero">
        <div className="container">
          <span className="badge badge-gold">{ICONS.phone} Get In Touch</span>
          <h1>Contact Us</h1>
          <p className="section-subtitle">
            Visit our workshop, call us, or send a message - we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-info-card">
                <span className="contact-info-icon">{ICONS.address}</span>
                <div>
                  <h4>Workshop Address</h4>
                  <p>25A, 11, Anna Nagar, Kallakurichi<br />Tamil Nadu 606202, India</p>
                </div>
              </div>

              <div className="contact-info-card">
                <span className="contact-info-icon">{ICONS.phone}</span>
                <div>
                  <h4>Phone / WhatsApp</h4>
                  <div className="contact-phones-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {CONTACT_NUMBERS.map(num => (
                      <p key={num.raw} style={{ margin: 0 }}>
                        <a href={`tel:+91${num.raw}`}>{num.formatted}</a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <span className="contact-info-icon">{ICONS.email}</span>
                <div>
                  <h4>Email</h4>
                  <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                </div>
              </div>

              <div className="contact-info-card">
                <span className="contact-info-icon">{ICONS.clock}</span>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon - Sun: 7:00 AM - 9:00 PM</p>
                </div>
              </div>

              <a
                href={`https://wa.me/91${PRIMARY_CONTACT.raw}?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20wood%20carvings.`}
                className="btn btn-whatsapp btn-lg contact-wa-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {ICONS.chat} Chat on WhatsApp
              </a>

              <div className="contact-social">
                <a
                  href="https://www.instagram.com/natarajan_woodcarvings/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                >
                  {ICONS.instagram} Instagram
                </a>
              </div>
            </div>

            <div className="contact-form-wrap">
              {!sent ? (
                <form onSubmit={handleSubmit} id="contact-form" noValidate>
                  <h3>Send Us a Message</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Your Name *</label>
                      <input
                        id="contact-name"
                        className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                        required
                        autoComplete="name"
                        maxLength={MAX.name}
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      />
                      {errors.name && <p className="form-error" id="contact-name-error">{errors.name}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Phone Number *</label>
                      <input
                        id="contact-phone"
                        className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={MAX.phone}
                        value={form.phone}
                        onChange={e => update('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                      />
                      {errors.phone && <p className="form-error" id="contact-phone-error">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email *</label>
                    <input
                      id="contact-email"
                      className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      maxLength={MAX.email}
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && <p className="form-error" id="contact-email-error">{errors.email}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">Subject *</label>
                    <select
                      id="contact-subject"
                      className={`form-select ${errors.subject ? 'form-input--error' : ''}`}
                      required
                      value={form.subject}
                      onChange={e => update('subject', e.target.value)}
                      onBlur={() => handleBlur('subject')}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    >
                      <option value="">Select a topic</option>
                      {SUBJECT_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.subject && <p className="form-error" id="contact-subject-error">{errors.subject}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                      required
                      maxLength={MAX.message}
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="How can we help you?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-hint'}
                    />
                    {errors.message ? (
                      <p className="form-error" id="contact-message-error">{errors.message}</p>
                    ) : (
                      <p className="form-hint" id="contact-message-hint">
                        {form.message.length}/{MAX.message}
                      </p>
                    )}
                  </div>
                  {error && <p className="contact-error" role="alert">{error}</p>}
                  <button type="submit" className="btn btn-primary btn-lg contact-submit-btn" disabled={sending}>
                    {sending ? 'Sending...' : 'Send Message ->'}
                  </button>
                </form>
              ) : (
                <div className="contact-success">
                  <span className="contact-success-icon">{ICONS.success}</span>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Your message has been sent to {CONTACT_EMAIL}. We'll get back to you within 24 hours.</p>
                  <button className="btn btn-outline" onClick={() => setSent(false)}>Send Another Message</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map-section">
        <iframe
          title="Natarajan WoodCarvings Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d978.9!2d78.9638912!3d11.7274605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab66fa6ba87159%3A0xdd0a1bd1c64a8893!2sNatarajan%20Wood%20Carvings%20-%20Kallakurichi!5e0!3m2!1sen!2sin!4v1717000000000"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          id="google-map-embed"
        ></iframe>
      </section>
    </div>
  );
}
