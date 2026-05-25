import { useState, useEffect, useCallback } from 'react';
import { PRIMARY_CONTACT } from '../data/contactConfig';
import './ImageLightbox.css';

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  productName?: string;
}

export default function ImageLightbox({ images, currentIndex, isOpen, onClose, onNavigate, productName }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex];
  const waMsg = productName
    ? `Hello! I am interested in "${productName}" from Natarajan WoodCarvings. Please share details.`
    : 'Hello! I am interested in your wood carvings.';

  return (
    <div className="lightbox" onClick={onClose} id="image-lightbox">
      <div className="lightbox__content" onClick={e => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="Close">✕</button>
        <button className="lightbox__nav lightbox__nav--prev" onClick={handlePrev} aria-label="Previous">❮</button>
        <button className="lightbox__nav lightbox__nav--next" onClick={handleNext} aria-label="Next">❯</button>

        <div className={`lightbox__image-wrap ${zoomed ? 'lightbox__image-wrap--zoomed' : ''}`}>
          <img
            src={current.src}
            alt={current.alt}
            className="lightbox__image"
            onClick={() => setZoomed(!zoomed)}
          />
        </div>

        <div className="lightbox__footer">
          <span className="lightbox__counter">{currentIndex + 1} / {images.length}</span>
          {productName && <span className="lightbox__name">{productName}</span>}
          <a
            href={`https://wa.me/91${PRIMARY_CONTACT.raw}?text=${encodeURIComponent(waMsg)}`}
            className="btn btn-whatsapp btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
