import type { Product } from '../data/products';
import { PRIMARY_CONTACT } from '../data/contactConfig';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  index: number;
}

export default function ProductCard({ product, onClick, index }: ProductCardProps) {
  const waMsg = `Hello! I am interested in "${product.name}" from Natarajan WoodCarvings. Please share price and details.`;

  return (
    <div
      className="product-card"
      style={{ animationDelay: `${index * 0.06}s`, animation: `cardFadeIn 0.5s ease ${index * 0.06}s both` }}
      id={`product-card-${product.id}`}
    >
      <div className="product-card__image-wrap" onClick={onClick}>
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        <div className="product-card__overlay">
          <span className="product-card__zoom">🔍 View</span>
        </div>
        <span className={`product-card__badge badge badge-${product.category === 'custom' ? 'gold' : 'walnut'}`}>
          {product.category.replace('-', ' ')}
        </span>
      </div>
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <a
          href={`https://wa.me/91${PRIMARY_CONTACT.raw}?text=${encodeURIComponent(waMsg)}`}
          className="btn btn-whatsapp product-card__cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
        >
          💬 Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
