import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getImagePath } from '../../shared/lib/imageUtils';
import './ComplexCard.css';

const ComplexCard = ({ complex }) => {
  const { name, location, description, images, mortgageRate, priceFrom, priceTo } = complex;
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="complex-card">
      {/* Image */}
      <div className="complex-card__image">
        {images && images.length > 0 && !imageError ? (
          <img 
            src={getImagePath(images[0])} 
            alt={name}
            onError={handleImageError}
          />
        ) : (
          <div className="complex-card__placeholder">
            <div className="complex-card__placeholder-icon">🏢</div>
            <div className="complex-card__placeholder-text">{name}</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="complex-card__content">
        <h3 className="complex-card__title">{name}</h3>
        <p className="complex-card__location">{location}</p>
        <p className="complex-card__description">{description}</p>
        
        {/* Price */}
        {priceFrom && priceTo && (
          <div className="complex-card__price">
            <div className="complex-card__price-label">Цена от</div>
            <div className="complex-card__price-value">
              {priceFrom} ₽
            </div>
          </div>
        )}
        
        <div className="complex-card__footer">
          <div className="complex-card__mortgage">
            <span className="complex-card__mortgage-badge">
              Ипотека {mortgageRate}%
            </span>
          </div>
          <Link 
            to={`/complex/${complex.id}`} 
            className="complex-card__link"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComplexCard;
