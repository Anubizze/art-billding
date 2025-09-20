import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';
import ConsultationSection from '../../widgets/consultation-section/ConsultationSection';
import { getImagePath } from '../../shared/lib/imageUtils';
import './complexes-page.css';

const ComplexesPage = () => {
  const [selectedComplex, setSelectedComplex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageType, setImageType] = useState('photo'); // 'photo' or 'layout'
  const [mapRef, setMapRef] = useState(null);

  // Функция для создания карты в модалке
  const createMap = (complex) => {
    if (typeof window !== 'undefined' && window.ymaps && complex.coords && mapRef) {
      // Очищаем предыдущую карту
      if (mapRef.children.length > 0) {
        mapRef.innerHTML = '';
      }
      
      window.ymaps.ready(() => {
        // Координаты Мариуполя (центр карты)
        const center = [47.0971, 37.5434];
        
        // Создаем карту
        const map = new window.ymaps.Map(mapRef, {
          center: center,
          zoom: 12,
          controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
        });

        // Данные всех жилых комплексов (как на главной)
        const allComplexes = [
          {
            name: 'ЖК «Кленовая аллея»',
            description: 'Расположен в северо-западной части города',
            coords: [47.1200, 37.5200],
            color: '#fbbf24'
          },
          {
            name: 'ЖК «Ленинградские кварталы»',
            description: 'Жовтневый район, центральная часть города',
            coords: [47.1000, 37.5400],
            color: '#fbbf24'
          },
          {
            name: 'ЖК «Кипарис»',
            description: 'Юго-западная часть, проспект Ленина',
            coords: [47.0800, 37.5300],
            color: '#fbbf24'
          },
          {
            name: 'ЖК «Аура Горизонт»',
            description: 'Центральная часть, рядом с проспектом Ленина',
            coords: [47.0850, 37.5400],
            color: '#fbbf24'
          },
          {
            name: 'ЖК «Эль Резиденция Нахимов»',
            description: 'Юго-восточная часть, ближе к морю',
            coords: [47.0900, 37.5600],
            color: '#fbbf24'
          },
          {
            name: 'ЖК «Мари»',
            description: 'Левобережный район, проспект Победы',
            coords: [47.1100, 37.5800],
            color: '#fbbf24'
          }
        ];

        // Создаем метки для всех ЖК
        allComplexes.forEach((complexData, index) => {
          const placemark = new window.ymaps.Placemark(
            complexData.coords,
            {
              balloonContentHeader: `<div style="font-weight: bold; font-size: 16px; color: ${complexData.color};">${complexData.name}</div>`,
              balloonContentBody: `<div style="color: #666; margin-top: 5px;">${complexData.description}</div>`,
              balloonContentFooter: `<div style="margin-top: 10px;"><button onclick="window.location.href='/complexes'" style="background: ${complexData.color}; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Страница ЖК</button></div>`,
              hintContent: complexData.name
            },
            {
              iconLayout: 'default#imageWithContent',
              iconImageHref: `data:image/svg+xml;base64,${btoa(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="${complexData.color}" stroke="white" stroke-width="3"/>
                  <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">${index + 1}</text>
                </svg>
              `)}`,
              iconImageSize: [40, 40],
              iconImageOffset: [-20, -20]
            }
          );

          map.geoObjects.add(placemark);
        });

        // Добавляем метку моря
        const seaPlacemark = new window.ymaps.Placemark(
          [47.0700, 37.5700],
          {
            balloonContentHeader: '<div style="font-weight: bold; font-size: 16px; color: #0ea5e9;">🌊 Азовское море</div>',
            balloonContentBody: '<div style="color: #666; margin-top: 5px;">Близко к жилым комплексам</div>',
            hintContent: 'Азовское море'
          },
          {
            iconLayout: 'default#imageWithContent',
            iconImageHref: `data:image/svg+xml;base64,${btoa(`
              <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="12" fill="#0ea5e9" stroke="white" stroke-width="2"/>
                <text x="15" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="14">🌊</text>
              </svg>
            `)}`,
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15]
          }
        );

        map.geoObjects.add(seaPlacemark);
      });
    }
  };

  // Создаем карту когда открывается модалка
  useEffect(() => {
    if (selectedComplex && mapRef) {
      createMap(selectedComplex);
    }
  }, [selectedComplex, mapRef]);

  const complexes = [
    {
      id: 1,
      name: 'ЖК Кипарис',
      location: 'Мариуполь, Приморский район',
      description: 'Современный жилой комплекс в зеленой зоне',
      fullDescription: 'ЖК "Кипарис" — это современный жилой комплекс, расположенный в экологически чистом районе Мариуполя. Комплекс окружен зелеными насаждениями и предлагает комфортное жилье для всей семьи.',
      images: [
        '/1 ЖК Кипарис/1.jpg',
        '/1 ЖК Кипарис/2.jpg',
        '/1 ЖК Кипарис/3.jpg',
        '/1 ЖК Кипарис/4.jpg'
      ],
      layouts: [
        '/1 ЖК Кипарис/planirovka/5 1к- Image  14.10.56.jpeg',
        '/1 ЖК Кипарис/planirovka/6 1к-1 Image.jpeg',
        '/1 ЖК Кипарис/planirovka/7 1к-2.jpg',
        '/1 ЖК Кипарис/planirovka/8 1к-3.jpg',
        '/1 ЖК Кипарис/planirovka/10  1k-2.webp',
        '/1 ЖК Кипарис/planirovka/11 1к-4.jpg',
        '/1 ЖК Кипарис/planirovka/12  1к-5.jpg',
        '/1 ЖК Кипарис/planirovka/14 2к-1.jpg',
        '/1 ЖК Кипарис/planirovka/15 2к-2.jpg',
        '/1 ЖК Кипарис/planirovka/16  3к- 1.jpg'
      ],
      mortgageRate: 2,
      priceFrom: '8 056 000',
      priceTo: '14 907 410',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Зеленая территория',
        'Парковка',
        'Детская площадка',
        'Спортивная зона',
        'Видеонаблюдение',
        'Консьерж-сервис'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 15,
      apartments: 320,
      coords: [47.0800, 37.5300], // Координаты ЖК Кипарис
      documents: [
        {
          name: 'Описание ЖК Кипарис',
          url: '/1 ЖК Кипарис/ЖК Кипарисс.docx',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/1 ЖК Кипарис/Стоимость квартир. Кипарис.docx',
          type: 'docx'
        }
      ]
    },
    {
      id: 2,
      name: 'ЖК Горизонт',
      location: 'Мариуполь, центр города',
      description: 'Жилой комплекс с видом на город',
      fullDescription: 'ЖК "Горизонт" — это жилой комплекс в центре Мариуполя, который сочетает в себе удобное расположение и современные технологии строительства. Идеальный выбор для тех, кто ценит городской комфорт.',
      images: [
        '/2 ЖК Горизонт/1.jpg',
        '/2 ЖК Горизонт/10.jpg',
        '/2 ЖК Горизонт/11.jpg',
        '/2 ЖК Горизонт/12.jpg'
      ],
      layouts: [
        '/2 ЖК Горизонт/planirovka/2 1k-1.jpg',
        '/2 ЖК Горизонт/planirovka/3 1k-2.jpg',
        '/2 ЖК Горизонт/planirovka/4 1k-3.jpg',
        '/2 ЖК Горизонт/planirovka/5 1к-4.jpg',
        '/2 ЖК Горизонт/planirovka/6 1к-5.jpg',
        '/2 ЖК Горизонт/planirovka/7 2к-1.jpg',
        '/2 ЖК Горизонт/planirovka/8 2к-2.jpg',
        '/2 ЖК Горизонт/planirovka/9 2к-3.jpg'
      ],
      mortgageRate: 2,
      priceFrom: '6 732 000',
      priceTo: '10 138 400',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Центральное расположение',
        'Подземная парковка',
        'Фитнес-центр',
        'Детская площадка',
        'Видеонаблюдение',
        'Система безопасности'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 9,
      apartments: 400,
      coords: [47.1000, 37.5400], // Координаты ЖК Горизонт
      documents: [
        {
          name: 'Описание ЖК Горизонт',
          url: '/2 ЖК Горизонт/ЖК Горизонт.docx',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/2 ЖК Горизонт/Стоимость квартир. ЖК Горизонт.docx',
          type: 'docx'
        }
      ]
    },
    {
      id: 3,
      name: 'ЖК Нахимов',
      location: 'Мариуполь, Нахимовский район',
      description: 'Комфортное жилье в историческом районе',
      fullDescription: 'ЖК "Нахимов" — это жилой комплекс в историческом районе Мариуполя, который сочетает традиции и современность. Комплекс предлагает качественное жилье с развитой инфраструктурой.',
      images: [
        '/3 ЖК Нахимов/1 .jpg',
        '/3 ЖК Нахимов/10 .jpg',
        '/3 ЖК Нахимов/11.jpg',
        '/3 ЖК Нахимов/12.jpg'
      ],
      layouts: [
        '/3 ЖК Нахимов/planirovka/6.jpg'
      ],
      mortgageRate: 2,
      priceFrom: '7 638 000',
      priceTo: '14 528 880',
      rooms: ['1-комн', '2-комн', '3-комн'],
      features: [
        'Исторический район',
        'Парковка',
        'Детская площадка',
        'Зеленая зона',
        'Видеонаблюдение',
        'Безопасная территория'
      ],
      developer: 'Art Building Group',
      completionDate: '2024',
      floors: 8,
      apartments: 280,
      coords: [47.0900, 37.5600], // Координаты ЖК Нахимов
      documents: [
        {
          name: 'Описание ЖК Нахимов',
          url: '/3 ЖК Нахимов/ЖК Нахимов.docx',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/3 ЖК Нахимов/Стоимость квартир. ЖК Нахимов.docx',
          type: 'docx'
        }
      ]
    },
    {
      id: 4,
      name: 'АУРА I',
      location: 'Мариуполь, Приморский район',
      description: 'Элитный жилой комплекс первой очереди',
      fullDescription: 'АУРА I — это элитный жилой комплекс первой очереди, расположенный в престижном районе Мариуполя. Комплекс предлагает современное жилье с высоким уровнем комфорта и безопасности.',
      images: [
        '/4 АУРА I/2.jpg',
        '/4 АУРА I/3.jpg',
        '/4 АУРА I/4.jpg',
        '/4 АУРА I/6.jpg'
      ],
      layouts: [
        '/4 АУРА I/planirovka/12_61.jpg',
        '/4 АУРА I/planirovka/13 _502.jpg',
        '/4 АУРА I/planirovka/14 _612.jpg.webp',
        '/4 АУРА I/planirovka/15 _647.jpg',
        '/4 АУРА I/planirovka/16 _697.jpg',
        '/4 АУРА I/planirovka/17 _771.jpg',
        '/4 АУРА I/planirovka/20 1_357.jpg',
        '/4 АУРА I/planirovka/21 1_361.jpg',
        '/4 АУРА I/planirovka/22 1_3192.jpg',
        '/4 АУРА I/planirovka/23 1_351.jpg.webp',
        '/4 АУРА I/planirovka/24.png',
        '/4 АУРА I/planirovka/26.jpg',
        '/4 АУРА I/planirovka/27.jpg',
        '/4 АУРА I/planirovka/28.jpg',
        '/4 АУРА I/planirovka/29.jpg',
        '/4 АУРА I/planirovka/30.png'
      ],
      mortgageRate: 2,
      priceFrom: '7 483 211',
      priceTo: '14 233 471',
      rooms: ['2-комн', '3-комн', '4-комн', 'Пентхаус'],
      features: [
        'Элитная отделка',
        'Подземная парковка',
        'Спа-комплекс',
        'Консьерж-сервис 24/7',
        'Панорамные окна',
        'Премиум материалы'
      ],
      developer: 'Art Building Group',
      completionDate: '2026',
      floors: 9,
      apartments: 200,
      coords: [47.0850, 37.5400], // Координаты АУРА I
      documents: [
        {
          name: 'Описание АУРА I',
          url: '/4 АУРА I/Аура I.docx',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/4 АУРА I/Стоимость квартир. АУРА I.docx',
          type: 'docx'
        }
      ]
    },
    {
      id: 5,
      name: 'АУРА II',
      location: 'Мариуполь, Приморский район',
      description: 'Элитный жилой комплекс второй очереди',
      fullDescription: 'АУРА II — это продолжение успешного проекта АУРА, предлагающее еще более совершенные планировки и улучшенную инфраструктуру. Комплекс для тех, кто ценит качество и комфорт.',
      images: [
        '/5 АУРА II/1.jpg',
        '/5 АУРА II/2.jpg',
        '/5 АУРА II/7.jpg',
        '/5 АУРА II/3.png'
      ],
      layouts: [
        '/5 АУРА II/planirovka/8.jpg',
        '/5 АУРА II/planirovka/9.png',
        '/5 АУРА II/planirovka/10.png',
        '/5 АУРА II/planirovka/11.png',
        '/5 АУРА II/planirovka/12.png',
        '/5 АУРА II/planirovka/13.png',
        '/5 АУРА II/planirovka/14.png',
        '/5 АУРА II/planirovka/15.png',
        '/5 АУРА II/planirovka/16.png'
      ],
      mortgageRate: 2,
      priceFrom: '6 436 900',
      priceTo: '8 025 000',
      rooms: ['2-комн', '3-комн', '4-комн', 'Пентхаус'],
      features: [
        'Улучшенные планировки',
        'Двухуровневая парковка',
        'Премиум спа-комплекс',
        'Персональный консьерж',
        'Умный дом',
        'Эксклюзивные материалы'
      ],
      developer: 'Art Building Group',
      completionDate: '2027',
      floors: 9,
      apartments: 180,
      coords: [47.0900, 37.5500], // Координаты АУРА II
      documents: [
        {
          name: 'Описание АУРА II',
          url: '/5 АУРА II/Аура II.docx',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/5 АУРА II/Стоимость квартир. АУРА II.docx',
          type: 'docx'
        }
      ]
    },
    {
      id: 6,
      name: 'Резиденция I',
      location: 'Мариуполь, спальный район',
      description: 'Комфортное жилье для семьи',
      fullDescription: 'Резиденция I — это жилой комплекс, созданный специально для семей с детьми. Комплекс предлагает безопасную среду, развитую инфраструктуру и качественное жилье по доступным ценам.',
      images: [
        '/6 Резиденция I/1 .png',
        '/6 Резиденция I/2.png',
        '/6 Резиденция I/3.jpg',
        '/6 Резиденция I/6.png'
      ],
      layouts: [
        '/6 Резиденция I/planirovka/8.png',
        '/6 Резиденция I/planirovka/9.png',
        '/6 Резиденция I/planirovka/10.png',
        '/6 Резиденция I/planirovka/11.png',
        '/6 Резиденция I/planirovka/12.png',
        '/6 Резиденция I/planirovka/13.png',
        '/6 Резиденция I/planirovka/14.png',
        '/6 Резиденция I/planirovka/15.png',
        '/6 Резиденция I/planirovka/16.png',
        '/6 Резиденция I/planirovka/17.png',
        '/6 Резиденция I/planirovka/18.png',
        '/6 Резиденция I/planirovka/19.png',
        '/6 Резиденция I/planirovka/20.png',
        '/6 Резиденция I/planirovka/21.png',
        '/6 Резиденция I/planirovka/22.png',
        '/6 Резиденция I/planirovka/23.png',
        '/6 Резиденция I/planirovka/24.png'
      ],
      mortgageRate: 2,
      priceFrom: '7 137 640',
      priceTo: '11 202 706',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Семейная атмосфера',
        'Большая детская площадка',
        'Спортивная зона',
        'Парковка',
        'Видеонаблюдение',
        'Зеленая территория'
      ],
      developer: 'Art Building Group',
      completionDate: '2024',
      floors: 15,
      apartments: 240,
      coords: [47.0950, 37.5450], // Координаты Резиденция I
      documents: [
        {
          name: 'Описание Резиденция I',
          url: '/6 Резиденция I/Резиденция I.docx',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/6 Резиденция I/Стоимость квартир. Резиденция I.docx',
          type: 'docx'
        }
      ]
    },
    {
      id: 7,
      name: 'Резиденция II',
      location: 'Мариуполь, спальный район',
      description: 'Продолжение успешного проекта Резиденция',
      fullDescription: 'Резиденция II — это вторая очередь популярного проекта Резиденция, которая предлагает улучшенные планировки и дополнительную инфраструктуру. Идеальный выбор для растущих семей.',
      images: [
        '/7 Резиденция II/1.jpg',
        '/7 Резиденция II/2.png',
        '/7 Резиденция II/5.jpg',
        '/7 Резиденция II/6.jpg'
      ],
      layouts: [
        '/7 Резиденция II/planirovka/3 Резиденция-2.png',
        '/7 Резиденция II/planirovka/4 Резиденция-2.png',
        '/7 Резиденция II/planirovka/20.png',
        '/7 Резиденция II/planirovka/21.png',
        '/7 Резиденция II/planirovka/22.png',
        '/7 Резиденция II/planirovka/23.png',
        '/7 Резиденция II/planirovka/24.png',
        '/7 Резиденция II/planirovka/25.png',
        '/7 Резиденция II/planirovka/26.png',
        '/7 Резиденция II/planirovka/27.png'
      ],
      mortgageRate: 2,
      priceFrom: '7 141 000',
      priceTo: '11 222 000',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Улучшенные планировки',
        'Расширенная детская зона',
        'Фитнес-центр',
        'Подземная парковка',
        'Система безопасности',
        'Ландшафтный дизайн'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 9,
      apartments: 280,
      coords: [47.1000, 37.5500], // Координаты Резиденция II
      documents: [
        {
          name: 'Описание Резиденция II',
          url: '/7 Резиденция II/ЖК Резиденция II.doc',
          type: 'doc'
        },
        {
          name: 'Стоимость квартир',
          url: '/7 Резиденция II/Стоимость квартир. Резиденция II.doc',
          type: 'doc'
        }
      ]
    },
    {
      id: 8,
      name: 'ЖК Мари',
      location: 'Мариуполь, центр города',
      description: 'Современный комплекс в сердце города',
      fullDescription: 'ЖК "Мари" — это современный жилой комплекс в самом центре Мариуполя, который предлагает все преимущества городской жизни. Комплекс для активных людей, ценящих удобство и комфорт.',
      images: [
        '/8 ЖК _Мари_/1 (1).jpg',
        '/8 ЖК _Мари_/2.jpg',
        '/8 ЖК _Мари_/3 (1).jpg',
        '/8 ЖК _Мари_/4.jpg'
      ],
      layouts: [
        '/8 ЖК _Мари_/planirovka/6 (1).jpg',
        '/8 ЖК _Мари_/planirovka/7 (2).jpg',
        '/8 ЖК _Мари_/planirovka/8 (2).jpg',
        '/8 ЖК _Мари_/planirovka/9 (3).jpg'
      ],
      mortgageRate: 2,
      priceFrom: '7 314 874',
      priceTo: '9 916 224',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Центральное расположение',
        'Торговый центр на первом этаже',
        'Подземная парковка',
        'Фитнес-клуб',
        'Бизнес-центр',
        'Консьерж-сервис'
      ],
      developer: 'Art Building Group',
      completionDate: '2026',
      floors: 7,
      apartments: 350,
      coords: [47.1100, 37.5800], // Координаты ЖК Мари
      documents: [
        {
          name: 'Описание ЖК Мари',
          url: '/8 ЖК _Мари_/жк Мари.docx',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/8 ЖК _Мари_/Стоимость квартир. ЖК Мари.docx',
          type: 'docx'
        }
      ]
    },
    {
      id: 9,
      name: 'Резиденция III',
      location: 'Мариуполь, спальный район',
      description: 'Завершающий этап проекта Резиденция',
      fullDescription: 'Резиденция III — это завершающий этап популярного проекта Резиденция, который объединяет все лучшее из предыдущих очередей. Комплекс предлагает максимальный комфорт и развитую инфраструктуру.',
      images: [
        '/9 Резиденция III/5.jpg',
        '/9 Резиденция III/6.jpg',
        '/9 Резиденция III/7.jpg',
        '/9 Резиденция III/11.png'
      ],
      layouts: [
        '/9 Резиденция III/planirovka/11.png',
        '/9 Резиденция III/planirovka/12.png',
        '/9 Резиденция III/planirovka/13.png',
        '/9 Резиденция III/planirovka/14.png',
        '/9 Резиденция III/planirovka/15.png',
        '/9 Резиденция III/planirovka/16.png',
        '/9 Резиденция III/planirovka/17.png',
        '/9 Резиденция III/planirovka/19.png',
        '/9 Резиденция III/planirovka/20.png',
        '/9 Резиденция III/planirovka/21.png',
        '/9 Резиденция III/planirovka/23.png',
        '/9 Резиденция III/planirovka/24.png',
        '/9 Резиденция III/planirovka/25.png'
      ],
      mortgageRate: 2,
      priceFrom: '6 939 400',
      priceTo: '10 230 000',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Современные технологии',
        'Экологичные материалы',
        'Умная система безопасности',
        'Зеленая энергетика',
        'Центр развития детей',
        'Спортивный комплекс'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 10,
      apartments: 320,
      coords: [47.1050, 37.5550], // Координаты Резиденция III
      documents: [
        {
          name: 'Описание Резиденция III',
          url: '/9 Резиденция III/ЖК Резиденция III',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/9 Резиденция III/Стоимость квартир. Резиденция III.docx',
          type: 'docx'
        }
      ]
    },
    {
      id: 10,
      name: 'ЖК Ленинградские кварталы',
      location: 'Мариуполь, Ленинградский район',
      description: 'Стильный комплекс в историческом стиле',
      fullDescription: 'ЖК "Ленинградские кварталы" — это уникальный проект, который воссоздает атмосферу классической архитектуры Санкт-Петербурга. Комплекс для ценителей элегантности и традиций.',
      images: [
        '/10 ЖК Ленинградские кварталы/1 .jpg',
        '/10 ЖК Ленинградские кварталы/2.jpg',
        '/10 ЖК Ленинградские кварталы/3 .jpg',
        '/10 ЖК Ленинградские кварталы/4 (1).jpg'
      ],
      layouts: [
        '/10 ЖК Ленинградские кварталы/planirovka/6.jpg',
        '/10 ЖК Ленинградские кварталы/planirovka/7.jpg',
        '/10 ЖК Ленинградские кварталы/planirovka/8.jpg',
        '/10 ЖК Ленинградские кварталы/planirovka/9.jpg',
        '/10 ЖК Ленинградские кварталы/planirovka/10.jpg'
      ],
      mortgageRate: 2,
      priceFrom: '7 019 000',
      priceTo: '9 351 810',
      rooms: ['2-комн', '3-комн', '4-комн'],
      features: [
        'Классическая архитектура',
        'Высокие потолки',
        'Паркетные полы',
        'Подземная парковка',
        'Консьерж-сервис',
        'Исторический интерьер'
      ],
      developer: 'Art Building Group',
      completionDate: '2026',
      floors: 15,
      apartments: 200,
      coords: [47.1000, 37.5400], // Координаты ЖК Ленинградские кварталы
      documents: [
        {
          name: 'Описание ЖК Ленинградские кварталы',
          url: '/10 ЖК Ленинградские кварталы/ЖК Ленинградский Квартал.docx',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/10 ЖК Ленинградские кварталы/Стоимость квартир. ЖК Ленинградские кварталы.docx',
          type: 'docx'
        }
      ]
    },
    {
      id: 11,
      name: 'ЖК Кленовая аллея',
      location: 'Мариуполь, парковая зона',
      description: 'Экологичный комплекс среди зелени',
      fullDescription: 'ЖК "Кленовая аллея" — это экологичный жилой комплекс, расположенный в парковой зоне Мариуполя. Комплекс предлагает здоровую среду для жизни с максимальным комфортом.',
      images: [
        '/11 ЖК _Кленовая аллея_/1.jpg',
        '/11 ЖК _Кленовая аллея_/2.jpg',
        '/11 ЖК _Кленовая аллея_/3.jpg',
        '/11 ЖК _Кленовая аллея_/5 .jpg'
      ],
      layouts: [
        '/11 ЖК _Кленовая аллея_/planirovka/6.png',
        '/11 ЖК _Кленовая аллея_/planirovka/7.png',
        '/11 ЖК _Кленовая аллея_/planirovka/8.png'
      ],
      mortgageRate: 2,
      priceFrom: '7 483 211',
      priceTo: '14 233 471',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Парковая зона',
        'Экологичные материалы',
        'Система очистки воздуха',
        'Велосипедные дорожки',
        'Детская площадка',
        'Фитнес на свежем воздухе'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 12,
      apartments: 300,
      coords: [47.1200, 37.5200], // Координаты ЖК Кленовая аллея
      documents: [
        {
          name: 'Описание ЖК Кленовая аллея',
          url: '/11 ЖК _Кленовая аллея_/ЖК Кленовая аллея.docx',
          type: 'docx'
        },
        {
          name: 'Стоимость квартир',
          url: '/11 ЖК _Кленовая аллея_/Стоимость квартир. ЖК Кленовая Аллея.docx',
          type: 'docx'
        }
      ]
    }
  ];

  const openImageModal = (image, type) => {
    setSelectedImage(image);
    setImageType(type);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageType('photo');
  };

  const navigateImage = (direction) => {
    if (!selectedComplex || !selectedImage) return;
    
    const currentImages = imageType === 'photo' ? selectedComplex.images : selectedComplex.layouts;
    const currentIndex = currentImages.indexOf(selectedImage);
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1;
    } else {
      newIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(currentImages[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedImage, selectedComplex, imageType]);

  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="complexes-page">
      <Header />
      
      {/* Hero Section */}
      <section className="complexes-page__hero" style={{backgroundImage: 'url(/Main.jpg)'}}>
        {/* Dark overlay for better text readability */}
        <div className="complexes-page__hero-overlay"></div>
        
        <div className="complexes-page__hero-content">
          <div className="text-center">
            {/* Back to Home Button */}
            <div className="complexes-page__hero-back">
              <Link 
                to="/" 
                className="complexes-page__hero-back-link"
              >
                <svg className="complexes-page__hero-back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Вернуться на главную
              </Link>
            </div>
            
            <h1 className="complexes-page__hero-title">
              Наши жилые комплексы
            </h1>
            <p className="complexes-page__hero-description">
              Современное жилье с ипотекой от 2%
            </p>
            <button 
              onClick={scrollToConsultation}
              className="complexes-page__hero-cta"
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </section>

      {/* Complexes Grid */}
      <section className="complexes-page__complexes">
        <div className="complexes-page__complexes-container">
          <div className="complexes-page__complexes-header">
            <h2 className="complexes-page__complexes-title">
              Выберите свой дом
            </h2>
            <p className="complexes-page__complexes-description">
              Каждый комплекс уникален и создан с заботой о вашем комфорте
            </p>
          </div>

          <div className="complexes-page__complexes-grid">
            {complexes.map((complex) => (
              <div key={complex.id} className="complexes-page__complex-card">
                {/* Image */}
                <div className="complexes-page__complex-image-container">
                  <img 
                    src={complex.images[0]} 
                    alt={complex.name}
                    className="complexes-page__complex-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="complexes-page__complex-image-placeholder" style={{display: 'none'}}>
                    <div className="complexes-page__complex-image-placeholder-icon">🏢</div>
                    <div className="complexes-page__complex-image-placeholder-title">{complex.name}</div>
                    <div className="complexes-page__complex-image-placeholder-text">Изображение загружается...</div>
                  </div>
                  <div className="complexes-page__complex-badge">
                    Ипотека {complex.mortgageRate}%
                  </div>
                </div>

                {/* Content */}
                <div className="complexes-page__complex-content">
                  <h3 className="complexes-page__complex-title">{complex.name}</h3>
                  <p className="complexes-page__complex-location">{complex.location}</p>
                  <p className="complexes-page__complex-description">{complex.description}</p>
                  
                  {/* Price Range */}
                  <div className="complexes-page__complex-price">
                    <span className="complexes-page__complex-price-label">Цена от</span>
                    <div className="complexes-page__complex-price-value">
                      {complex.priceFrom} ₽
                    </div>
                  </div>

                  {/* Features */}
                  <div className="complexes-page__complex-features">
                    <h4 className="complexes-page__complex-features-title">Особенности:</h4>
                    <div className="complexes-page__complex-features-list">
                      {complex.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="complexes-page__complex-feature">
                          {feature}
                        </span>
                      ))}
                      {complex.features.length > 3 && (
                        <span className="complexes-page__complex-features-more">
                          +{complex.features.length - 3} еще
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="complexes-page__complex-rooms">
                    <h4 className="complexes-page__complex-rooms-title">Планировки:</h4>
                    <div className="complexes-page__complex-rooms-list">
                      {complex.rooms.map((room, index) => (
                        <span key={index} className="complexes-page__complex-room">
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="complexes-page__complex-actions">
                    <button 
                      onClick={() => setSelectedComplex(complex)}
                      className="complexes-page__complex-button complexes-page__complex-button--primary"
                    >
                      Подробнее
                    </button>
                    <button 
                      onClick={scrollToConsultation}
                      className="complexes-page__complex-button complexes-page__complex-button--secondary"
                    >
                      Консультация
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complex Detail Modal */}
      {selectedComplex && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedComplex.name}</h2>
                  <p className="text-gray-600">{selectedComplex.location}</p>
                </div>
                <button 
                  onClick={() => setSelectedComplex(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Images */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Фотографии комплекса</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedComplex.images.map((image, index) => (
                    <div key={index} className="relative cursor-pointer group" onClick={() => openImageModal(image, 'photo')}>
                      <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <img 
                          src={getImagePath(image)} 
                          alt={`${selectedComplex.name} - фото ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-blue-50 to-blue-100" style={{display: 'none'}}>
                          <div className="text-4xl mb-2">🏢</div>
                          <div className="text-sm font-medium">{selectedComplex.name}</div>
                          <div className="text-xs text-gray-400 mt-1">Фото {index + 1}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layouts */}
              {selectedComplex.layouts && selectedComplex.layouts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Планировки квартир</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedComplex.layouts.map((layout, index) => (
                    <div key={index} className="relative cursor-pointer group" onClick={() => openImageModal(layout, 'layout')}>
                      <div className="relative w-full h-48 rounded-lg border border-gray-200 overflow-hidden">
                        <img 
                          src={getImagePath(layout)} 
                          alt={`${selectedComplex.name} - планировка ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-green-50 to-green-100" style={{display: 'none'}}>
                          <div className="text-3xl mb-2">🏠</div>
                          <div className="text-sm font-medium">Планировка {index + 1}</div>
                          <div className="text-xs text-gray-400 mt-1">{selectedComplex.name}</div>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">О комплексе</h3>
                <p className="text-gray-700 leading-relaxed">{selectedComplex.fullDescription}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Price */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Стоимость</h4>
                  <div className="text-2xl font-bold text-blue-600">
                    от {selectedComplex.priceFrom} ₽
                  </div>
                  <div className="text-sm text-gray-600">
                    до {selectedComplex.priceTo} ₽
                  </div>
                </div>

                {/* Developer */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Застройщик</h4>
                  <div className="text-lg font-medium text-gray-700">{selectedComplex.developer}</div>
                </div>

                {/* Completion */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Срок сдачи</h4>
                  <div className="text-lg font-medium text-green-700">{selectedComplex.completionDate} год</div>
                </div>

                {/* Floors */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Этажность</h4>
                  <div className="text-lg font-medium text-purple-700">{selectedComplex.floors} этажей</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Особенности комплекса</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedComplex.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rooms */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Доступные планировки</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedComplex.rooms.map((room, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
                      {room}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documents */}
              {selectedComplex.documents && selectedComplex.documents.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Документы</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedComplex.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                      >
                        <div className="flex-shrink-0 mr-4">
                          {doc.type === 'docx' ? (
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {doc.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {doc.type === 'docx' ? 'Документ Word' : 'Документ Word (старый формат)'}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              {selectedComplex.coords && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Расположение ЖК</h3>
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                    <div 
                      ref={setMapRef}
                      className="w-full h-64"
                      style={{ minHeight: '256px' }}
                    />
                    
                    {/* Легенда */}
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                      <h4 className="font-semibold text-gray-900 mb-3">Жилые комплексы</h4>
                      <div className="space-y-2">
                        {[
                          'ЖК «Кленовая аллея»',
                          'ЖК «Ленинградские кварталы»',
                          'ЖК «Кипарис»',
                          'ЖК «Аура Горизонт»',
                          'ЖК «Эль Резиденция Нахимов»',
                          'ЖК «Мари»'
                        ].map((name, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">{name}</span>
                          </div>
                        ))}
                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 bg-sky-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-700">Азовское море</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={scrollToConsultation}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Получить консультацию
                </button>
                <Link 
                  to="/"
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  На главную
                </Link>
                <button 
                  onClick={() => setSelectedComplex(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConsultationSection />
      <Footer />

      {/* Image Zoom Modal */}
      {selectedImage && selectedComplex && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center text-white mb-4">
              <div>
                <h3 className="text-xl font-semibold">{selectedComplex.name}</h3>
                <p className="text-sm text-gray-300">
                  {imageType === 'photo' ? 'Фотография' : 'Планировка'} - {imageType === 'photo' ? 
                    selectedComplex.images.indexOf(selectedImage) + 1 : 
                    selectedComplex.layouts.indexOf(selectedImage) + 1
                  } из {imageType === 'photo' ? selectedComplex.images.length : selectedComplex.layouts.length}
                </p>
              </div>
              <button 
                onClick={closeImageModal}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* Navigation Buttons */}
              {(imageType === 'photo' ? selectedComplex.images.length : selectedComplex.layouts.length) > 1 && (
                <>
                  <button 
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 z-10"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 z-10"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="max-w-full max-h-full flex items-center justify-center">
                <img 
                  src={getImagePath(selectedImage)} 
                  alt={`${selectedComplex.name} - ${imageType === 'photo' ? 'фотография' : 'планировка'}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-96 flex flex-col items-center justify-center text-gray-300 bg-gray-800 rounded-lg" style={{display: 'none'}}>
                  <div className="text-6xl mb-4">{imageType === 'photo' ? '🏢' : '🏠'}</div>
                  <div className="text-lg font-medium">{selectedComplex.name}</div>
                  <div className="text-sm text-gray-400 mt-2">
                    {imageType === 'photo' ? 'Фотография' : 'Планировка'} не найдена
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {(imageType === 'photo' ? selectedComplex.images.length : selectedComplex.layouts.length) > 1 && (
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-2 overflow-x-auto max-w-full">
                  {(imageType === 'photo' ? selectedComplex.images : selectedComplex.layouts).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === image 
                          ? 'border-blue-500 shadow-lg' 
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${imageType === 'photo' ? 'Фото' : 'Планировка'} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Keyboard Instructions */}
            <div className="mt-4 text-center text-gray-400 text-sm">
              Используйте ← → для навигации, Esc для закрытия
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplexesPage;
