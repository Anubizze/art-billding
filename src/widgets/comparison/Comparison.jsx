import React from 'react';
import './comparison.css';

const Comparison = () => {
  return (
    <section className="comparison">
      <div className="comparison__container">
        <div className="comparison__header">
          <h2 className="comparison__title">
            Ипотека под 2% или вклад?
          </h2>
        </div>

        <div className="comparison__content">
          {/* Mortgage option */}
          <div className="comparison__card">
            <div className="comparison__card-header">
              <div className="comparison__card-icon">🏠</div>
              <h3 className="comparison__card-title comparison__card-title--primary">Ипотека 2%</h3>
            </div>
            
            <ul className="comparison__card-list">
              <li className="comparison__card-item">
                <span className="comparison__card-item-icon">✓</span>
                <span className="comparison__card-item-text">Минимальный платёж от 22,17 тыс./мес</span>
              </li>
              <li className="comparison__card-item">
                <span className="comparison__card-item-icon">✓</span>
                <span className="comparison__card-item-text">Рост стоимости недвижимости 10–17% в год</span>
              </li>
              <li className="comparison__card-item">
                <span className="comparison__card-item-icon">✓</span>
                <span className="comparison__card-item-text">Доход от капитализации + арендный поток</span>
              </li>
            </ul>
          </div>

          {/* Bank deposit option */}
          <div className="comparison__card">
            <div className="comparison__card-header">
              <div className="comparison__card-icon">🏦</div>
              <h3 className="comparison__card-title comparison__card-title--secondary">Банковский вклад</h3>
            </div>
            
            <ul className="comparison__card-list">
              <li className="comparison__card-item">
                <span className="comparison__card-item-icon comparison__card-item-icon--neutral">•</span>
                <span className="comparison__card-item-text">Доход при 15% годовых: 5,25–5,6 млн ₽ (по ТЗ)</span>
              </li>
              <li className="comparison__card-item">
                <span className="comparison__card-item-icon comparison__card-item-icon--warning">⚠</span>
                <span className="comparison__card-item-text">Процентная ставка может снижаться</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Investment calculations slide */}
        <div className="comparison__slide">
          <h3 className="comparison__slide-title">
            Слайд из презентации с инвестиционными расчётами
          </h3>
          <div className="comparison__slide-content">
            <iframe 
              src="/pdf/prezent.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0"
              className="comparison__slide-iframe"
              title="Презентация с инвестиционными расчетами"
            />
            <div className="comparison__slide-button">
              <svg className="comparison__slide-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Открыть в новом окне
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
