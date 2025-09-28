import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';
import ConsultationSection from '../../widgets/consultation-section/ConsultationSection';
import FAQ from '../../widgets/faq/FAQ';
import ImageSlider from '../../widgets/image-slider/ImageSlider';
import { getImagePath } from '../../shared/lib/imageUtils';
import './complexes-page.css';

const ComplexesPage = () => {
  const [selectedComplex, setSelectedComplex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageType, setImageType] = useState('photo'); // 'photo' or 'layout'
  const [mapRef, setMapRef] = useState(null);
  const navigate = useNavigate();

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
              balloonContentFooter: `<div style="margin-top: 10px;"><button onclick="window.location.href='#/complexes'" style="background: ${complexData.color}; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Страница ЖК</button></div>`,
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

  // Обработка якорных ссылок на странице комплексов
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash;
      // Извлекаем якорную часть из хеша
      const anchorHash = fullHash.replace(/^#\/.*?#/, '#');
      
      if (anchorHash && anchorHash === '#consultation') {
        const element = document.querySelector(anchorHash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Небольшая задержка для обработки якорных ссылок после загрузки
    setTimeout(handleHashChange, 200);

    return () => {
      // Убираем обработчик при размонтировании
    };
  }, []);

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
        '/4 АУРА I/1.jpg',
        '/4 АУРА I/2.jpg',
        '/4 АУРА I/3.jpg',
        '/4 АУРА I/4.jpg',
        '/4 АУРА I/6.jpg',
        '/4 АУРА I/7.jpg',
        '/4 АУРА I/8 (1).jpg',
        '/4 АУРА I/9 (1).jpg',
        '/4 АУРА I/11.jpg',
        '/4 АУРА I/19.jpg',
        '/4 АУРА I/21 (1).jpg',
        '/4 АУРА I/36.jpg.webp',
        '/4 АУРА I/37.jpg.webp',
        '/4 АУРА I/38.jpg.webp',
        '/4 АУРА I/39.jpg.webp',
        '/4 АУРА I/40.jpg.webp',
        '/4 АУРА I/41.jpg.webp',
        '/4 АУРА I/42.jpg.webp',
        '/4 АУРА I/43.jpg.webp',
        '/4 АУРА I/44.jpg.webp',
        '/4 АУРА I/45.jpg.webp',
        '/4 АУРА I/46.jpg.webp',
        '/4 АУРА I/47.jpg.webp'
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
      <section className="complexes-page__hero" style={{backgroundImage: `url(${getImagePath('/1%20ЖК%20Кипарис/1.jpg')})`}}>
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
                {/* Image Slider */}
                <div className="complexes-page__complex-image-container">
                  <ImageSlider 
                    images={complex.images} 
                    title={complex.name}
                    autoPlay={true}
                    interval={5000}
                    type="photo"
                  />
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

                  {/* Documents */}
                  {complex.documents && complex.documents.length > 0 && (
                    <div className="complexes-page__complex-documents">
                      <h4 className="complexes-page__complex-documents-title">Документы:</h4>
                      <div className="complexes-page__complex-documents-list">
                        {complex.documents.map((doc, index) => (
                          <a
                            key={index}
                            href={getImagePath(doc.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="complexes-page__complex-document"
                          >
                            <div className="complexes-page__complex-document-icon">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <span className="complexes-page__complex-document-name">{doc.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="complexes-page__complex-actions">
                    <Link 
                      to={`/complex/${complex.id}`}
                      className="complexes-page__complex-button complexes-page__complex-button--primary"
                    >
                      Подробнее
                    </Link>
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
        <div className="complexes-page__modal">
          <div className="complexes-page__modal-content">
            <div className="complexes-page__modal-header">
              {/* Header */}
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem'}}>
                <div style={{flex: 1}}>
                  <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem'}}>{selectedComplex.name}</h2>
                  <p style={{color: '#6b7280', marginBottom: '1rem'}}>{selectedComplex.location}</p>
                  
                  {/* Краткое описание */}
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <p style={{fontSize: '1rem', lineHeight: '1.6', margin: 0}}>
                      {selectedComplex.description}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedComplex(null)}
                  className="complexes-page__modal-close"
                >
                  ×
                </button>
              </div>

              {/* Цены и ипотека - красивый блок */}
              <div style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                color: 'white',
                padding: '1.5rem',
                borderRadius: '1rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', margin: 0}}>
                  💰 Стоимость квартир
                </h3>
                <div style={{
                  display: 'flex', 
                  justifyContent: 'space-around', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  gap: '1rem'
                }}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem'}}>
                      от {selectedComplex.priceFrom} ₽
                    </div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>
                      до {selectedComplex.priceTo} ₽
                    </div>
                  </div>
                  <div style={{
                    borderLeft: window.innerWidth > 768 ? '1px solid rgba(255,255,255,0.3)' : 'none',
                    borderTop: window.innerWidth <= 768 ? '1px solid rgba(255,255,255,0.3)' : 'none',
                    paddingLeft: window.innerWidth > 768 ? '1rem' : '0',
                    paddingTop: window.innerWidth <= 768 ? '1rem' : '0',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem'}}>
                      🏦 Ипотека {selectedComplex.mortgageRate}%
                    </div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>
                      Выгодные условия
                    </div>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div style={{marginBottom: '1.5rem'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem'}}>Фотографии комплекса</h3>
                <div className="complexes-page__image-grid">
                  {selectedComplex.images.map((image, index) => (
                    <div key={index} className="complexes-page__image-item" onClick={() => openImageModal(image, 'photo')}>
                      <img 
                        src={getImagePath(image)} 
                        alt={`${selectedComplex.name} - фото ${index + 1}`}
                        className="complexes-page__image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="complexes-page__image-placeholder" style={{display: 'none'}}>
                        <div className="complexes-page__image-placeholder-icon">🏢</div>
                        <div className="complexes-page__image-placeholder-title">{selectedComplex.name}</div>
                        <div className="complexes-page__image-placeholder-text">Фото {index + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Планировки и типы квартир - объединенная секция */}
              <div style={{marginBottom: '1.5rem'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem'}}>🏠 Планировки квартир</h3>
                
                {/* Доступные типы квартир */}
                <div style={{marginBottom: '1rem'}}>
                  <h4 style={{fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>Доступные планировки:</h4>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem'}}>
                    {selectedComplex.rooms.map((room, index) => (
                      <span 
                        key={index} 
                        style={{
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          fontWeight: '500',
                          fontSize: '0.875rem'
                        }}
                      >
                        {room}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Изображения планировок */}
                {selectedComplex.layouts && selectedComplex.layouts.length > 0 && (
                  <div className="complexes-page__layout-grid">
                    {selectedComplex.layouts.map((layout, index) => (
                    <div key={index} className="complexes-page__layout-item" onClick={() => openImageModal(layout, 'layout')}>
                      <img 
                        src={getImagePath(layout)} 
                        alt={`${selectedComplex.name} - планировка ${index + 1}`}
                        className="complexes-page__layout-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="complexes-page__image-placeholder" style={{display: 'none'}}>
                        <div className="complexes-page__image-placeholder-icon">🏠</div>
                        <div className="complexes-page__image-placeholder-title">Планировка {index + 1}</div>
                        <div className="complexes-page__image-placeholder-text">{selectedComplex.name}</div>
                      </div>
                    </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={{marginBottom: '1.5rem'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem'}}>О комплексе</h3>
                <p style={{color: '#374151', lineHeight: '1.625'}}>{selectedComplex.fullDescription}</p>
              </div>

              {/* Дополнительная информация - красивый блок */}
              <div style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: 'white',
                padding: '1.5rem',
                borderRadius: '1rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', margin: 0}}>
                  🏢 Характеристики комплекса
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem'}}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem'}}>
                      {selectedComplex.floors}
                    </div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>этажей</div>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem'}}>
                      {selectedComplex.apartments}
                    </div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>квартир</div>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem'}}>
                      {selectedComplex.completionDate}
                    </div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>год сдачи</div>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem'}}>
                      {selectedComplex.rooms.length}
                    </div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>типов квартир</div>
                  </div>
                </div>
              </div>

              {/* Информация о застройщике и сроках */}
              <div style={{marginBottom: '1.5rem'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem'}}>🏗️ Информация о проекте</h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                  {/* Developer */}
                  <div style={{backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem'}}>
                    <h4 style={{fontWeight: '600', color: '#111827', marginBottom: '0.5rem'}}>Застройщик</h4>
                    <div style={{fontSize: '1.125rem', fontWeight: '500', color: '#374151'}}>{selectedComplex.developer}</div>
                  </div>

                  {/* Completion */}
                  <div style={{backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '0.5rem'}}>
                    <h4 style={{fontWeight: '600', color: '#111827', marginBottom: '0.5rem'}}>Срок сдачи</h4>
                    <div style={{fontSize: '1.125rem', fontWeight: '500', color: '#16a34a'}}>{selectedComplex.completionDate} год</div>
                  </div>

                  {/* Floors */}
                  <div style={{backgroundColor: '#faf5ff', padding: '1rem', borderRadius: '0.5rem'}}>
                    <h4 style={{fontWeight: '600', color: '#111827', marginBottom: '0.5rem'}}>Этажность</h4>
                    <div style={{fontSize: '1.125rem', fontWeight: '500', color: '#9333ea'}}>{selectedComplex.floors} этажей</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div style={{marginBottom: '1.5rem'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem'}}>✨ Особенности комплекса</h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem'}}>
                  {selectedComplex.features.map((feature, index) => (
                    <div key={index} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <svg 
                        style={{width: '1.25rem', height: '1.25rem', color: '#22c55e'}} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span style={{color: '#374151', fontSize: '0.875rem'}}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>


              {/* Documents */}
              {selectedComplex.documents && selectedComplex.documents.length > 0 && (
                <div style={{marginBottom: '1.5rem'}}>
                  <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem'}}>📄 Документы</h3>
                  <div className="complexes-page__document-grid">
                    {selectedComplex.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={getImagePath(doc.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="complexes-page__document-item"
                      >
                        <div className="complexes-page__document-icon">
                          {doc.type === 'docx' ? (
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          ) : (
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="complexes-page__document-info">
                          <h4 className="complexes-page__document-name">
                            {doc.name}
                          </h4>
                          <p className="complexes-page__document-type">
                            {doc.type === 'docx' ? 'Документ Word' : 'Документ Word (старый формат)'}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              {selectedComplex.coords && (
                <div style={{marginBottom: '1.5rem'}}>
                  <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem'}}>Расположение ЖК</h3>
                  <div className="complexes-page__map-container">
                    <div 
                      ref={setMapRef}
                      className="complexes-page__map"
                    />
                    
                    {/* Легенда */}
                    <div className="complexes-page__map-legend">
                      <h4 style={{fontWeight: '600', color: '#111827', marginBottom: '0.75rem'}}>Жилые комплексы</h4>
                      <div>
                        {[
                          'ЖК «Кленовая аллея»',
                          'ЖК «Ленинградские кварталы»',
                          'ЖК «Кипарис»',
                          'ЖК «Аура Горизонт»',
                          'ЖК «Эль Резиденция Нахимов»',
                          'ЖК «Мари»'
                        ].map((name, index) => (
                          <div key={index} className="complexes-page__map-legend-item">
                            <div 
                              className="complexes-page__map-legend-color"
                              style={{ backgroundColor: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}
                            >✓</div>
                            <span style={{fontSize: '0.875rem', color: '#374151'}}>{name}</span>
                          </div>
                        ))}
                        <div className="complexes-page__map-legend-item" style={{marginTop: '0.5rem'}}>
                          <div 
                            className="complexes-page__map-legend-color"
                            style={{ backgroundColor: '#0ea5e9' }}
                          ></div>
                          <span style={{fontSize: '0.875rem', color: '#374151'}}>Азовское море</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{display: 'flex', gap: '1rem'}}>
                <button 
                  onClick={scrollToConsultation}
                  style={{
                    flex: 1,
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
                >
                  Получить консультацию
                </button>
                <Link 
                  to="/"
                  style={{
                    flex: 1,
                    backgroundColor: '#16a34a',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
                >
                  На главную
                </Link>
                <button 
                  onClick={() => setSelectedComplex(null)}
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    color: '#374151',
                    padding: '0.75rem 1.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FAQ />

      <div id="consultation">
        <ConsultationSection />
      </div>
      <Footer />

      {/* Image Zoom Modal */}
      {selectedImage && selectedComplex && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[60] p-4"
          onClick={(e) => {
            // Закрываем модальное окно при клике на фон
            if (e.target === e.currentTarget) {
              closeImageModal();
            }
          }}
        >
          <div className="relative max-w-8xl max-h-full w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center text-white mb-4 bg-black bg-opacity-50 p-4 rounded-lg">
              <div>
                <h3 className="text-2xl font-bold">{selectedComplex.name}</h3>
                <p className="text-sm text-gray-300 mt-1">
                  {imageType === 'photo' ? '📸 Фотография' : '🏠 Планировка'} - {imageType === 'photo' ? 
                    selectedComplex.images.indexOf(selectedImage) + 1 : 
                    selectedComplex.layouts.indexOf(selectedImage) + 1
                  } из {imageType === 'photo' ? selectedComplex.images.length : selectedComplex.layouts.length}
                </p>
              </div>
              <button 
                onClick={closeImageModal}
                className="text-white hover:text-gray-300 transition-colors bg-red-600 hover:bg-red-700 p-2 rounded-full"
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
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-all duration-300 z-10 shadow-lg hover:shadow-xl"
                    title="Предыдущее изображение"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-all duration-300 z-10 shadow-lg hover:shadow-xl"
                    title="Следующее изображение"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="max-w-full max-h-full flex items-center justify-center relative group">
                <img 
                  src={getImagePath(selectedImage)} 
                  alt={`${selectedComplex.name} - ${imageType === 'photo' ? 'фотография' : 'планировка'}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105 cursor-zoom-in"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  onClick={() => {
                    // Добавляем возможность полного масштабирования по клику
                    const img = e.target;
                    if (img.style.transform === 'scale(1.5)') {
                      img.style.transform = 'scale(1)';
                      img.style.cursor = 'zoom-in';
                    } else {
                      img.style.transform = 'scale(1.5)';
                      img.style.cursor = 'zoom-out';
                    }
                  }}
                />
                <div className="w-full h-96 flex flex-col items-center justify-center text-gray-300 bg-gray-800 rounded-lg" style={{display: 'none'}}>
                  <div className="text-6xl mb-4">{imageType === 'photo' ? '🏢' : '🏠'}</div>
                  <div className="text-lg font-medium">{selectedComplex.name}</div>
                  <div className="text-sm text-gray-400 mt-2">
                    {imageType === 'photo' ? 'Фотография' : 'Планировка'} не найдена
                  </div>
                </div>
                {/* Подсказка о масштабировании */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  🔍 Нажмите для увеличения
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {(imageType === 'photo' ? selectedComplex.images.length : selectedComplex.layouts.length) > 1 && (
              <div className="mt-6 flex justify-center bg-black bg-opacity-30 p-4 rounded-lg">
                <div className="flex space-x-3 overflow-x-auto max-w-full">
                  {(imageType === 'photo' ? selectedComplex.images : selectedComplex.layouts).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-3 transition-all duration-300 hover:scale-110 ${
                        selectedImage === image 
                          ? 'border-blue-500 shadow-lg ring-2 ring-blue-300' 
                          : 'border-gray-600 hover:border-blue-400'
                      }`}
                      title={`${imageType === 'photo' ? 'Фото' : 'Планировка'} ${index + 1}`}
                    >
                      <img 
                        src={getImagePath(image)} 
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
              Используйте ← → для навигации, Esc для закрытия, клик по фону для закрытия
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplexesPage;
