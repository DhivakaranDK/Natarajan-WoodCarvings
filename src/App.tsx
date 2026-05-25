import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Craftsmanship = lazy(() => import('./pages/Craftsmanship'));
const CustomOrders = lazy(() => import('./pages/CustomOrders'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const Instagram = lazy(() => import('./pages/Instagram'));

function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-parchment)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'float 2s ease-in-out infinite' }}>🪵</div>
        <p style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
          Loading masterpiece...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>Natarajan WoodCarvings — Premium Handcarved Wooden Statues Since 1985</title>
          <meta name="description" content="Premium handcarved wooden statues and panels from Kallakurichi, Tamil Nadu. GI-tagged craft, Poompuhar Award winner. Deity statues, wall mounts, custom orders. Exported worldwide since 1985." />
          <meta name="keywords" content="wood carving, wooden statues, handcrafted, Tamil Nadu, Kallakurichi, GI tag, deity statues, Natarajan WoodCarvings, Poompuhar Award" />
          <link rel="canonical" href="https://www.natarajanwoodcarvings.com" />
        </Helmet>

        <Navbar />

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Gallery />} />
            <Route path="/gallery" element={<Navigate to="/products" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/craftsmanship" element={<Craftsmanship />} />
            <Route path="/custom-orders" element={<CustomOrders />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/instagram" element={<Instagram />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>

        <Footer />
        <WhatsAppFloat />
      </BrowserRouter>
    </HelmetProvider>
  );
}
