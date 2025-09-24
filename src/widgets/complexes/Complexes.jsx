import React from 'react';
import { Link } from 'react-router-dom';
import ComplexCard from '../../entities/complex/ComplexCard';
import './complexes.css';

const Complexes = () => {
  const complexes = [
    {
      id: 11,
      name: 'ЖК Кленовая аллея',
      location: 'Мариуполь, парковая зона',
      description: 'Экологичный комплекс среди зелени',
      images: ['/11 ЖК _Кленовая аллея_/1.jpg', '/11 ЖК _Кленовая аллея_/2.jpg', '/11 ЖК _Кленовая аллея_/3.jpg'],
      mortgageRate: 2,
      priceFrom: '7 500 000',
      priceTo: '14 200 000'
    },
    {
      id: 10,
      name: 'ЖК Ленинградские кварталы',
      location: 'Мариуполь, Ленинградский район',
      description: 'Стильный комплекс в историческом стиле',
      images: ['/10 ЖК Ленинградские кварталы/1 .jpg', '/10 ЖК Ленинградские кварталы/2.jpg', '/10 ЖК Ленинградские кварталы/3 .jpg'],
      mortgageRate: 2,
      priceFrom: '8 200 000',
      priceTo: '15 800 000'
    },
    {
      id: 1,
      name: 'ЖК Кипарис',
      location: 'Мариуполь, Приморский район',
      description: 'Современный жилой комплекс в зеленой зоне',
      images: ['/1 ЖК Кипарис/1.jpg', '/1 ЖК Кипарис/2.jpg', '/1 ЖК Кипарис/3.jpg'],
      mortgageRate: 2,
      priceFrom: '8 056 000',
      priceTo: '14 907 410'
    },
    {
      id: 2,
      name: 'ЖК Горизонт',
      location: 'Мариуполь, центр города',
      description: 'Жилой комплекс с видом на город',
      images: ['/2 ЖК Горизонт/1.jpg', '/2 ЖК Горизонт/10.jpg', '/2 ЖК Горизонт/11.jpg'],
      mortgageRate: 2,
      priceFrom: '6 732 000',
      priceTo: '10 138 400'
    },
    {
      id: 3,
      name: 'ЖК Нахимов',
      location: 'Мариуполь, Нахимовский район',
      description: 'Комфортное жилье в историческом районе',
      images: ['/3 ЖК Нахимов/1 .jpg', '/3 ЖК Нахимов/10 .jpg', '/3 ЖК Нахимов/11.jpg'],
      mortgageRate: 2,
      priceFrom: '7 638 000',
      priceTo: '12 500 000'
    },
    {
      id: 8,
      name: 'ЖК Мари',
      location: 'Мариуполь, центр города',
      description: 'Современный комплекс в сердце города',
      images: ['/8 ЖК _Мари_/1 (1).jpg', '/8 ЖК _Мари_/2.jpg', '/8 ЖК _Мари_/3 (1).jpg'],
      mortgageRate: 2,
      priceFrom: '8 500 000',
      priceTo: '16 200 000'
    }
  ];

  return (
    <section id="complexes" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши жилые комплексы
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Современное жилье с ипотекой от 2%
          </p>
        </div>

        <div className="complexes-grid">
          {complexes.map((complex) => (
            <ComplexCard key={complex.id} complex={complex} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/complexes"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-blue-100 font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Посмотреть все ЖК</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Complexes;
