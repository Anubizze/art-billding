import React, { useEffect, useRef } from 'react';
import './map.css';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Проверяем, что Яндекс.Карты загружены
    if (typeof window !== 'undefined' && window.ymaps) {
      window.ymaps.ready(() => {
        // Координаты Мариуполя (центр карты)
        const center = [47.0971, 37.5434];
        
        // Создаем карту
        const map = new window.ymaps.Map(mapRef.current, {
          center: center,
          zoom: 12,
          controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
        });

        // Данные жилых комплексов согласно карте объектов.png
        const complexes = [
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

        // Создаем метки для каждого ЖК
        complexes.forEach((complex, index) => {
          const placemark = new window.ymaps.Placemark(
            complex.coords,
            {
              balloonContentHeader: `<div style="font-weight: bold; font-size: 16px; color: ${complex.color};">${complex.name}</div>`,
              balloonContentBody: `<div style="color: #666; margin-top: 5px;">${complex.description}</div>`,
              balloonContentFooter: `<div style="margin-top: 10px;"><button onclick="window.location.href='#/complexes'" style="background: ${complex.color}; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Страница ЖК</button></div>`,
              hintContent: complex.name
            },
            {
              iconLayout: 'default#imageWithContent',
              iconImageHref: `data:image/svg+xml;base64,${btoa(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="${complex.color}" stroke="white" stroke-width="3"/>
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
  }, []);

  return (
    <section id="map" className="map">
      <div className="map__container">
        <div className="map__header">
          <h2 className="map__title">
            Карта — расположение ЖК
          </h2>
          <p className="map__description">
            На карте отмечены комплексы, представленные на сайте.
          </p>
        </div>

        <div className="map__content">
          <div 
            ref={mapRef} 
            className="map__container-element"
          />
          
          {/* Легенда */}
          <div className="map__legend">
            <h3 className="map__legend-title">Жилые комплексы</h3>
            <div className="map__legend-list">
              {[
                'ЖК «Кленовая аллея»',
                'ЖК «Ленинградские кварталы»',
                'ЖК «Кипарис»',
                'ЖК «Аура Горизонт»',
                'ЖК «Эль Резиденция Нахимов»',
                'ЖК «Мари»'
              ].map((name, index) => (
                <div key={index} className="map__legend-item">
                  <div className="map__legend-dot map__legend-dot--complex">
                    <span className="map__legend-number">{index + 1}</span>
                  </div>
                  <span className="map__legend-text">{name}</span>
                </div>
              ))}
              <div className="map__legend-item">
                <div className="map__legend-dot map__legend-dot--sea">
                  <span className="map__legend-sea-icon">🌊</span>
                </div>
                <span className="map__legend-text">Азовское море</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;