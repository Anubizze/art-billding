import React from 'react';
import ComplexCard from '../../entities/complex/ComplexCard';

const Complexes = () => {
  const complexes = [
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
      name: 'АУРА I',
      location: 'Мариуполь, Приморский район',
      description: 'Элитный жилой комплекс первой очереди',
      images: ['/4 АУРА I/2.jpg', '/4 АУРА I/3.jpg', '/4 АУРА I/4.jpg'],
      mortgageRate: 2,
      priceFrom: '7 483 211',
      priceTo: '14 233 471'
    },
    {
      id: 3,
      name: 'ЖК Мари',
      location: 'Мариуполь, центр города',
      description: 'Современный комплекс в сердце города',
      images: ['/8 ЖК _Мари_/1 (1).jpg', '/8 ЖК _Мари_/2.jpg', '/8 ЖК _Мари_/3 (1).jpg'],
      mortgageRate: 2,
      priceFrom: '7 314 874',
      priceTo: '9 916 224'
    }
  ];

  return (
    <section id="complexes" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши жилые комплексы
          </h2>
          <p className="text-lg text-gray-600">
            Карточки формируются из списка объектов. В каждой — слайдер из фотографий. Клик ведёт на страницу ЖК.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {complexes.map((complex) => (
            <ComplexCard key={complex.id} complex={complex} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Complexes;
