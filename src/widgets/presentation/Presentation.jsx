import React, { useState } from 'react';
import { getImagePath } from '../../shared/lib/imageUtils';
import './presentation.css';

const Presentation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="presentation" className="presentation">
      <div className="presentation__container">
        <div className="presentation__content">
          <div className="presentation__text">
            <h2 className="presentation__title">
              Презентация наших проектов
            </h2>
            <p className="presentation__description">
              Ознакомьтесь с подробной презентацией всех наших жилых комплексов. 
              Узнайте больше о планировках, ценах и особенностях каждого проекта.
            </p>
            <div className="presentation__features">
              <div className="presentation__feature">
                <svg className="presentation__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Подробные описания ЖК</span>
              </div>
              <div className="presentation__feature">
                <svg className="presentation__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Планировки и цены</span>
              </div>
              <div className="presentation__feature">
                <svg className="presentation__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Особенности комплексов</span>
              </div>
            </div>
            <button 
              onClick={openModal}
              className="presentation__button"
            >
              <svg className="presentation__button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Смотреть презентацию
            </button>
          </div>
          
          <div className="presentation__visual">
            <div className="presentation__image-container">
              <img 
                src={getImagePath('/pdf/prezent.pdf')} 
                alt="Презентация проектов"
                className="presentation__image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="presentation__image-placeholder" style={{display: 'none'}}>
                <div className="presentation__image-placeholder-icon">📄</div>
                <div className="presentation__image-placeholder-text">Презентация проектов</div>
              </div>
              <div className="presentation__play-overlay">
                <button 
                  onClick={openModal}
                  className="presentation__play-button"
                  aria-label="Открыть презентацию"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="presentation__modal">
          <div className="presentation__modal-content">
            <div className="presentation__modal-header">
              <h3>Презентация проектов</h3>
              <button 
                onClick={closeModal}
                className="presentation__modal-close"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            <div className="presentation__modal-body">
              <div className="presentation__modal-options">
                <a 
                  href={getImagePath('/pdf/prezent.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="presentation__modal-option"
                >
                  <svg className="presentation__modal-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="presentation__modal-option-content">
                    <h4>Скачать презентацию</h4>
                    <p>Скачайте PDF файл для просмотра на устройстве</p>
                  </div>
                </a>
                
                <a 
                  href={getImagePath('/pdf/prezent.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="presentation__modal-option"
                >
                  <svg className="presentation__modal-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <div className="presentation__modal-option-content">
                    <h4>Открыть в новой вкладке</h4>
                    <p>Просмотр презентации в браузере</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Presentation;
