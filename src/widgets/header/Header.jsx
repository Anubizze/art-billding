import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getImagePath } from '../../shared/lib/imageUtils';
import './header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Закрываем меню после клика
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo">
            <Link to="/" className="header__logo">
              <img 
                src={getImagePath("/logo.png")} 
                alt="Art Building Group Logo" 
                className="header__logo-image"
              />
              <h1 className="header__logo-text">Art Building Group</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="header__nav">
            <div className="header__nav-list">
              <Link to="/complexes" className="header__nav-link">
                ЖК
              </Link>
              <a href="#map" className="header__nav-link">
                Карта
              </a>
              <a href="#advantages" className="header__nav-link">
                Преимущества
              </a>
              <a href="#investment" className="header__nav-link">
                Инвестиции
              </a>
              <a href="#consultation" className="header__nav-link">
                Заявка
              </a>
            </div>
          </nav>

          {/* Desktop CTA Button */}
          <div className="header__actions">
            {/* ФЗ-214 Badge */}
            <div className="header__badge">
              По ФЗ-214!
            </div>
            <button onClick={scrollToConsultation} className="btn-primary">
              Бесплатная консультация
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="header__mobile-actions">
            {/* ФЗ-214 Badge для мобильных */}
            <div className="header__mobile-badge">
              ФЗ-214!
            </div>
            <button onClick={scrollToConsultation} className="btn-primary">
              Консультация
            </button>
            <button 
              className={`header__mobile-menu-button ${isMobileMenuOpen ? 'header__mobile-menu-button--open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Открыть меню"
            >
              <svg className="header__mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  className="header__mobile-menu-line header__mobile-menu-line--top" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M4 6h16" 
                />
                <path 
                  className="header__mobile-menu-line header__mobile-menu-line--middle" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M4 12h16" 
                />
                <path 
                  className="header__mobile-menu-line header__mobile-menu-line--bottom" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="header__mobile-menu header__mobile-menu--open">
            <div className="header__mobile-menu-header">
              <Link to="/" className="header__mobile-menu-logo" onClick={closeMobileMenu}>
                <img 
                  src={getImagePath("/logo.png")} 
                  alt="Art Building Group Logo" 
                  className="header__mobile-menu-logo-image"
                />
                <span className="header__mobile-menu-logo-text">Art Building Group</span>
              </Link>
              <button 
                className="header__mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Закрыть меню"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Link to="/complexes" className="header__mobile-menu-link" onClick={closeMobileMenu}>
              ЖК
            </Link>
            <a href="#map" className="header__mobile-menu-link" onClick={closeMobileMenu}>
              Карта
            </a>
            <a href="#advantages" className="header__mobile-menu-link" onClick={closeMobileMenu}>
              Преимущества
            </a>
            <a href="#investment" className="header__mobile-menu-link" onClick={closeMobileMenu}>
              Инвестиции
            </a>
            <a href="#consultation" className="header__mobile-menu-link" onClick={closeMobileMenu}>
              Заявка
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
