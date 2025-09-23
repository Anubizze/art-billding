import React from 'react';
import { getImagePath } from '../../shared/lib/imageUtils';
import './hero.css';

const Hero = () => {
  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="hero" style={{backgroundImage: `url(${getImagePath('/Main.jpg')})`}}>
      {/* Dark overlay for better text readability */}
      <div className="hero__overlay"></div>
      
      {/* Content */}
      <div className="hero__content">
        <div className="text-center">
          <h1 className="hero__title">
            Квартира от застройщика на берегу моря от 6 млн руб. С ипотекой 2%
          </h1>
          
          <div className="hero__badges">
            <div className="hero__badge">
              <span className="hero__badge-text">Ипотека 2%</span>
            </div>
            <div className="hero__badge">
              <span className="hero__badge-text">4 минуты пешком от моря</span>
            </div>
            <div className="hero__badge">
              <span className="hero__badge-text">Продажа строго по 214‑ФЗ</span>
            </div>
            <div className="hero__badge">
              <span className="hero__badge-text">Дополнительная скидка</span>
            </div>
          </div>

          <button onClick={scrollToConsultation} className="btn-secondary hero__cta">
            Оставить заявку
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
