import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';
import ImageSlider from '../../widgets/image-slider/ImageSlider';
import ConsultationSection from '../../widgets/consultation-section/ConsultationSection';
import { getImagePath } from '../../shared/lib/imageUtils';
import './complex-detail-page.css';

const UniversalComplexPage = () => {
  const { complexId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageType, setImageType] = useState('photo');
  const [complex, setComplex] = useState(null);

  // Данные всех комплексов
  const complexesData = [
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
      coords: [47.0800, 37.5300],
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
        '/2 ЖК Горизонт/12.jpg',
        '/2 ЖК Горизонт/13.jpg',
        '/2 ЖК Горизонт/14.jpg'
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
      coords: [47.1000, 37.5400],
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
        '/3 ЖК Нахимов/3.jpg',
        '/3 ЖК Нахимов/5.jpg',
        '/3 ЖК Нахимов/7.jpg',
        '/3 ЖК Нахимов/8.jpg',
        '/3 ЖК Нахимов/9.jpg',
        '/3 ЖК Нахимов/10 .jpg',
        '/3 ЖК Нахимов/11.jpg',
        '/3 ЖК Нахимов/12.jpg',
        '/3 ЖК Нахимов/13.jpg',
        '/3 ЖК Нахимов/14 .jpg',
        '/3 ЖК Нахимов/15 .jpg',
        '/3 ЖК Нахимов/16.jpg'
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
      coords: [47.0900, 37.5600],
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
        '/4 АУРА I/5.webp',
        '/4 АУРА I/6.jpg',
        '/4 АУРА I/7.jpg',
        '/4 АУРА I/8 (1).jpg',
        '/4 АУРА I/9 (1).jpg',
        '/4 АУРА I/11.jpg',
        '/4 АУРА I/19.jpg',
        '/4 АУРА I/21 (1).jpg',
        '/4 АУРА I/31.jpg',
        '/4 АУРА I/32.jpg',
        '/4 АУРА I/33.jpg',
        '/4 АУРА I/34.jpg',
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
      priceFrom: '9 500 000',
      priceTo: '18 200 000',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Элитная отделка',
        'Подземная парковка',
        'Фитнес-центр',
        'Консьерж-сервис',
        'Система безопасности',
        'Панорамные окна'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 12,
      apartments: 180,
      coords: [47.0850, 37.5450],
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
        '/5 АУРА II/3.png',
        '/5 АУРА II/4.png',
        '/5 АУРА II/5.png',
        '/5 АУРА II/6.png',
        '/5 АУРА II/7.jpg'
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
      priceFrom: '10 200 000',
      priceTo: '19 800 000',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Улучшенные планировки',
        'Подземная парковка',
        'Спа-центр',
        'Консьерж-сервис',
        'Система безопасности',
        'Панорамные окна'
      ],
      developer: 'Art Building Group',
      completionDate: '2026',
      floors: 14,
      apartments: 200,
      coords: [47.0870, 37.5470],
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
        '/6 Резиденция I/6.png',
        '/6 Резиденция I/7.png'
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
      priceFrom: '6 800 000',
      priceTo: '12 500 000',
      rooms: ['1-комн', '2-комн', '3-комн'],
      features: [
        'Семейная атмосфера',
        'Детские площадки',
        'Парковка',
        'Зеленая зона',
        'Видеонаблюдение',
        'Безопасная территория'
      ],
      developer: 'Art Building Group',
      completionDate: '2024',
      floors: 6,
      apartments: 150,
      coords: [47.0750, 37.5200],
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
        '/7 Резиденция II/6.jpg',
        '/7 Резиденция II/7.jpg',
        '/7 Резиденция II/8.jpg',
        '/7 Резиденция II/9.jpg',
        '/7 Резиденция II/10.webp',
        '/7 Резиденция II/11.jpg',
        '/7 Резиденция II/12.jpg',
        '/7 Резиденция II/13.jpg',
        '/7 Резиденция II/14.jpg',
        '/7 Резиденция II/15.jpg',
        '/7 Резиденция II/16.jpg',
        '/7 Резиденция II/17.jpg',
        '/7 Резиденция II/18 .jpg',
        '/7 Резиденция II/19.jpg'
      ],
      layouts: [
        '/7 Резиденция II/planirovka/20.png',
        '/7 Резиденция II/planirovka/21.png',
        '/7 Резиденция II/planirovka/22.png',
        '/7 Резиденция II/planirovka/23.png',
        '/7 Резиденция II/planirovka/24.png',
        '/7 Резиденция II/planirovka/25.png',
        '/7 Резиденция II/planirovka/26.png',
        '/7 Резиденция II/planirovka/27.png',
        '/7 Резиденция II/planirovka/3 Резиденция-2.png',
        '/7 Резиденция II/planirovka/4 Резиденция-2.png'
      ],
      mortgageRate: 2,
      priceFrom: '7 200 000',
      priceTo: '13 800 000',
      rooms: ['1-комн', '2-комн', '3-комн'],
      features: [
        'Улучшенные планировки',
        'Детские площадки',
        'Парковка',
        'Зеленая зона',
        'Видеонаблюдение',
        'Безопасная территория'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 7,
      apartments: 180,
      coords: [47.0770, 37.5220],
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
        '/8 ЖК _Мари_/4.jpg',
        '/8 ЖК _Мари_/5 (1).jpg',
        '/8 ЖК _Мари_/10 (2).jpg',
        '/8 ЖК _Мари_/11 (2).jpg'
      ],
      layouts: [
        '/8 ЖК _Мари_/planirovka/6 (1).jpg',
        '/8 ЖК _Мари_/planirovka/7 (2).jpg',
        '/8 ЖК _Мари_/planirovka/8 (2).jpg',
        '/8 ЖК _Мари_/planirovka/9 (3).jpg'
      ],
      mortgageRate: 2,
      priceFrom: '8 500 000',
      priceTo: '16 200 000',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Центральное расположение',
        'Подземная парковка',
        'Фитнес-центр',
        'Консьерж-сервис',
        'Система безопасности',
        'Панорамные окна'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 10,
      apartments: 250,
      coords: [47.0950, 37.5500],
      documents: [
        {
          name: 'Описание ЖК Мари',
          url: '/8 ЖК _Мари_/ЖК Мари.docx',
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
        '/9 Резиденция III/7.jpg'
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
      priceFrom: '7 800 000',
      priceTo: '15 200 000',
      rooms: ['1-комн', '2-комн', '3-комн'],
      features: [
        'Максимальный комфорт',
        'Детские площадки',
        'Парковка',
        'Зеленая зона',
        'Видеонаблюдение',
        'Безопасная территория'
      ],
      developer: 'Art Building Group',
      completionDate: '2026',
      floors: 8,
      apartments: 200,
      coords: [47.0790, 37.5240],
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
        '/10 ЖК Ленинградские кварталы/4 (1).jpg',
        '/10 ЖК Ленинградские кварталы/5.png',
        '/10 ЖК Ленинградские кварталы/12.png',
        '/10 ЖК Ленинградские кварталы/13.png',
        '/10 ЖК Ленинградские кварталы/14.png'
      ],
      layouts: [
        '/10 ЖК Ленинградские кварталы/planirovka/6.jpg',
        '/10 ЖК Ленинградские кварталы/planirovka/7.jpg',
        '/10 ЖК Ленинградские кварталы/planirovka/8.jpg',
        '/10 ЖК Ленинградские кварталы/planirovka/9.jpg',
        '/10 ЖК Ленинградские кварталы/planirovka/10.jpg'
      ],
      mortgageRate: 2,
      priceFrom: '8 200 000',
      priceTo: '15 800 000',
      rooms: ['1-комн', '2-комн', '3-комн', '4-комн'],
      features: [
        'Классическая архитектура',
        'Парковка',
        'Детская площадка',
        'Зеленая зона',
        'Видеонаблюдение',
        'Безопасная территория'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 9,
      apartments: 220,
      coords: [47.0920, 37.5550],
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
      priceFrom: '7 500 000',
      priceTo: '14 200 000',
      rooms: ['1-комн', '2-комн', '3-комн'],
      features: [
        'Экологичная среда',
        'Парковка',
        'Детская площадка',
        'Зеленая зона',
        'Видеонаблюдение',
        'Безопасная территория'
      ],
      developer: 'Art Building Group',
      completionDate: '2025',
      floors: 7,
      apartments: 160,
      coords: [47.0880, 37.5350],
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

  useEffect(() => {
    const foundComplex = complexesData.find(c => c.id === parseInt(complexId));
    if (foundComplex) {
      setComplex(foundComplex);
    } else {
      navigate('/complexes');
    }
  }, [complexId, navigate]);

  const openImageModal = (image, type) => {
    setSelectedImage(image);
    setImageType(type);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageType('photo');
  };

  const navigateImage = (direction) => {
    if (!complex || !selectedImage) return;
    
    const currentImages = imageType === 'photo' ? complex.images : complex.layouts;
    const currentIndex = currentImages.indexOf(selectedImage);
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1;
    } else {
      newIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(currentImages[newIndex]);
  };

  const scrollToConsultation = () => {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Создание карты для конкретного ЖК
  useEffect(() => {
    if (!complex) return;

    // Проверяем, что Яндекс.Карты загружены
    if (typeof window !== 'undefined' && window.ymaps) {
      window.ymaps.ready(() => {
        // Координаты текущего ЖК
        const center = complex.coords;
        
        // Создаем карту
        const map = new window.ymaps.Map('map', {
          center: center,
          zoom: 15,
          controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
        });

        // Добавляем маркер для текущего ЖК
        const placemark = new window.ymaps.Placemark(center, {
          balloonContent: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 10px 0; color: #2563eb;">${complex.name}</h3>
              <p style="margin: 0; color: #6b7280;">${complex.location}</p>
              <p style="margin: 5px 0 0 0; color: #374151;">${complex.fullDescription}</p>
            </div>
          `,
          hintContent: complex.name
        }, {
          iconLayout: 'default#image',
          iconImageHref: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#2563eb" stroke="white" stroke-width="3"/>
              <path d="M16 8l4 8h-8l4-8z" fill="white"/>
            </svg>
          `),
          iconImageSize: [32, 32],
          iconImageOffset: [-16, -16]
        });

        map.geoObjects.add(placemark);

        // Открываем балун при клике на маркер
        placemark.events.add('click', () => {
          placemark.balloon.open();
        });
      });
    }
  }, [complex]);

  if (!complex) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="complex-detail-page__hero">
        <div className="complex-detail-page__hero-overlay"></div>
        <div className="complex-detail-page__hero-content">
          <div className="complex-detail-page__hero-back">
            <Link to="/complexes" className="complex-detail-page__hero-back-link">
              <svg className="complex-detail-page__hero-back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад к комплексам
            </Link>
          </div>
          <div className="complex-detail-page__hero-info">
            <h1 className="complex-detail-page__hero-title">{complex.name}</h1>
            <p className="complex-detail-page__hero-location">{complex.location}</p>
            <p className="complex-detail-page__hero-description">{complex.fullDescription}</p>
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="complex-detail-page__slider">
        <div className="complex-detail-page__slider-container">
          <div className="complex-detail-page__slider-header">
            <h2 className="complex-detail-page__slider-title">Фотогалерея</h2>
            <div className="complex-detail-page__slider-tabs">
              <button 
                className={`complex-detail-page__slider-tab ${imageType === 'photo' ? 'active' : ''}`}
                onClick={() => setImageType('photo')}
              >
                Фотографии
              </button>
              <button 
                className={`complex-detail-page__slider-tab ${imageType === 'layout' ? 'active' : ''}`}
                onClick={() => setImageType('layout')}
              >
                Планировки
              </button>
            </div>
          </div>
          
          <ImageSlider 
            images={imageType === 'photo' ? complex.images : complex.layouts}
            title={complex.name}
            autoPlay={true}
            interval={5000}
            type={imageType}
          />
        </div>
      </section>

      {/* Complex Info Section */}
      <section className="complex-detail-page__info">
        <div className="complex-detail-page__info-container">
          <div className="complex-detail-page__info-grid">
            {/* Main Info */}
            <div className="complex-detail-page__info-main">
              <h2 className="complex-detail-page__info-title">О комплексе</h2>
              <p className="complex-detail-page__info-description">{complex.fullDescription}</p>
              
              <div className="complex-detail-page__info-features">
                <h3 className="complex-detail-page__info-features-title">Особенности</h3>
                <div className="complex-detail-page__info-features-grid">
                  {complex.features.map((feature, index) => (
                    <div key={index} className="complex-detail-page__info-feature">
                      <svg className="complex-detail-page__info-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="complex-detail-page__info-sidebar">
              <div className="complex-detail-page__info-card">
                <h3 className="complex-detail-page__info-card-title">Основные характеристики</h3>
                <div className="complex-detail-page__info-card-item">
                  <span className="complex-detail-page__info-card-label">Застройщик:</span>
                  <span className="complex-detail-page__info-card-value">{complex.developer}</span>
                </div>
                <div className="complex-detail-page__info-card-item">
                  <span className="complex-detail-page__info-card-label">Срок сдачи:</span>
                  <span className="complex-detail-page__info-card-value">{complex.completionDate}</span>
                </div>
                <div className="complex-detail-page__info-card-item">
                  <span className="complex-detail-page__info-card-label">Этажность:</span>
                  <span className="complex-detail-page__info-card-value">{complex.floors} этажей</span>
                </div>
                <div className="complex-detail-page__info-card-item">
                  <span className="complex-detail-page__info-card-label">Квартир:</span>
                  <span className="complex-detail-page__info-card-value">{complex.apartments}</span>
                </div>
                <div className="complex-detail-page__info-card-item">
                  <span className="complex-detail-page__info-card-label">Планировки:</span>
                  <span className="complex-detail-page__info-card-value">{complex.rooms.join(', ')}</span>
                </div>
              </div>

              <div className="complex-detail-page__info-card">
                <h3 className="complex-detail-page__info-card-title">Стоимость</h3>
                <div className="complex-detail-page__info-card-item">
                  <span className="complex-detail-page__info-card-label">От:</span>
                  <span className="complex-detail-page__info-card-value complex-detail-page__info-card-price">{complex.priceFrom} ₽</span>
                </div>
                <div className="complex-detail-page__info-card-item">
                  <span className="complex-detail-page__info-card-label">До:</span>
                  <span className="complex-detail-page__info-card-value complex-detail-page__info-card-price">{complex.priceTo} ₽</span>
                </div>
                <div className="complex-detail-page__info-card-item">
                  <span className="complex-detail-page__info-card-label">Ипотека:</span>
                  <span className="complex-detail-page__info-card-value complex-detail-page__info-card-mortgage">{complex.mortgageRate}%</span>
                </div>
              </div>

              <div className="complex-detail-page__info-actions">
                <button 
                  onClick={scrollToConsultation}
                  className="complex-detail-page__info-button complex-detail-page__info-button--primary"
                >
                  Получить консультацию
                </button>
                <Link 
                  to="/complexes"
                  className="complex-detail-page__info-button complex-detail-page__info-button--secondary"
                >
                  Посмотреть другие ЖК
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="complex-detail-page__documents">
        <div className="complex-detail-page__documents-container">
          <h2 className="complex-detail-page__documents-title">Документы</h2>
          <div className="complex-detail-page__documents-grid">
            {complex.documents.map((doc, index) => (
              <a 
                key={index}
                href={getImagePath(doc.url)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="complex-detail-page__document"
              >
                <div className="complex-detail-page__document-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="complex-detail-page__document-content">
                  <h3 className="complex-detail-page__document-title">{doc.name}</h3>
                  <p className="complex-detail-page__document-type">{doc.type.toUpperCase()}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="complex-detail-page__map">
        <div className="complex-detail-page__map-container">
          <h2 className="complex-detail-page__map-title">Расположение</h2>
          <div className="complex-detail-page__map-content">
            <div id="map" className="complex-detail-page__map-element"></div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <ConsultationSection />

      {/* Footer */}
      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div className="complex-detail-page__modal" onClick={closeImageModal}>
          <div className="complex-detail-page__modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="complex-detail-page__modal-close" onClick={closeImageModal}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="complex-detail-page__modal-image-container">
              <img 
                src={getImagePath(selectedImage)} 
                alt={complex.name}
                className="complex-detail-page__modal-image"
              />
            </div>
            <div className="complex-detail-page__modal-controls">
              <button 
                className="complex-detail-page__modal-control"
                onClick={() => navigateImage('prev')}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="complex-detail-page__modal-control"
                onClick={() => navigateImage('next')}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalComplexPage;
