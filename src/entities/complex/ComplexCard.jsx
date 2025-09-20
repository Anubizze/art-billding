import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getImagePath } from '../../shared/lib/imageUtils';

const ComplexCard = ({ complex }) => {
  const { name, location, description, images, mortgageRate, priceFrom, priceTo } = complex;
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
      {/* Image Slider */}
      <div className="relative h-64 bg-gray-200">
        {images && images.length > 0 && !imageError ? (
          <img 
            src={getImagePath(images[0])} 
            alt={name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-4xl mb-2">🏢</div>
            <div className="text-sm font-medium">{name}</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{location}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        
        {/* Price */}
        {priceFrom && priceTo && (
          <div className="mb-4">
            <span className="text-sm text-gray-500">Цена от</span>
            <div className="text-xl font-bold text-blue-600">
              {priceFrom} ₽
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-green-600 font-semibold">
            <span className="bg-green-100 px-3 py-1 rounded-full text-sm">
              Ипотека {mortgageRate}%
            </span>
          </div>
          <Link 
            to="/complexes" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Страница ЖК
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComplexCard;
