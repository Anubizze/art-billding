import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          {/* Navigation Menu */}
          <div className="footer__section">
            <h3 className="footer__section-title">Навигация</h3>
            <ul className="footer__section-list">
              <li><Link to="/" className="footer__section-link">Главная</Link></li>
              <li><Link to="/complexes" className="footer__section-link">ЖК</Link></li>
              <li><a href="#advantages" className="footer__section-link">Преимущества</a></li>
              <li><a href="#complexes" className="footer__section-link">Наши комплексы</a></li>
              <li><a href="#investment" className="footer__section-link">Инвестиции</a></li>
              <li><a href="#map" className="footer__section-link">Карта</a></li>
              <li><a href="#consultation" className="footer__section-link">Консультация</a></li>
            </ul>
          </div>

          {/* Complexes */}
          <div className="footer__section">
            <h3 className="footer__section-title">Жилые комплексы</h3>
            <ul className="footer__section-list">
              <li><Link to="/complexes" className="footer__section-link">ЖК Кипарис</Link></li>
              <li><Link to="/complexes" className="footer__section-link">ЖК Горизонт</Link></li>
              <li><Link to="/complexes" className="footer__section-link">ЖК Нахимов</Link></li>
              <li><Link to="/complexes" className="footer__section-link">АУРА I</Link></li>
              <li><Link to="/complexes" className="footer__section-link">АУРА II</Link></li>
              <li><Link to="/complexes" className="footer__section-link">Все ЖК</Link></li>
            </ul>
          </div>

          {/* For buyers */}
          <div className="footer__section">
            <h3 className="footer__section-title">Покупателям</h3>
            <ul className="footer__section-list">
              <li><a href="#investment" className="footer__section-link">Ипотека 2%</a></li>
              <li><a href="#consultation" className="footer__section-link">Получить консультацию</a></li>
              <li><a href="#map" className="footer__section-link">Расположение ЖК</a></li>
              <li><a href="#advantages" className="footer__section-link">Преимущества</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="footer__section">
            <h3 className="footer__section-title">Контакты</h3>
            <div className="space-y-3">
              <div className="footer__contact-item">
                <svg className="footer__contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="footer__contact-text">Бахрушина 23 с1</span>
              </div>
              <div className="footer__contact-item">
                <svg className="footer__contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+74959797272" className="footer__contact-text">8 (495) 979 72 72</a>
              </div>
              <div className="footer__contact-item">
                <svg className="footer__contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:9@astorius.ru" className="footer__contact-text">9@astorius.ru</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__divider">
          <div className="footer__brand">
            <img 
              src="/logo.png" 
              alt="Art Building Group Logo" 
              className="footer__brand-logo"
            />
            <span className="footer__brand-text">Art Building Group</span>
          </div>
          <p className="footer__copyright">© 2025 Art Building Group. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
