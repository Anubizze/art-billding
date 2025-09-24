import React from 'react';
import './investment.css';

const Investment = () => {
  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="investment" className="investment">
      <div className="investment__container">
        <div className="investment__header">
          <h2 className="investment__title">
            Инвестируйте с выгодой
          </h2>
        </div>

        <div className="investment__content">
          {/* Investment calculations */}
          <div className="investment__calculations">
            <h3 className="investment__calculations-title">
              Прогноз стоимости через 5 лет
            </h3>
            <p className="investment__calculations-subtitle">
              (с учётом роста стоимости 10–17% ежегодно)
            </p>
            
            <div className="investment__calculations-cards">
              <div className="investment__calculations-card">
                <div className="investment__calculations-value investment__calculations-value--primary">
                  ≈ 10 500 000 — 14 000 000 ₽
                </div>
                <div className="investment__calculations-label">Прогнозируемая стоимость</div>
              </div>
              
              <div className="investment__calculations-card">
                <div className="investment__calculations-value investment__calculations-value--success">
                  ≈ 3 211 000 — 7 711 000 ₽
                </div>
                <div className="investment__calculations-label">Выгода в зависимости от темпа роста цены</div>
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="investment__info">
            <div className="investment__info-card">
              <h4 className="investment__info-title">
                Платёж по ипотеке
              </h4>
              <div className="investment__info-value">
                от 22,17 тыс./мес
              </div>
              <div className="investment__info-description">
                первоначальный взнос от 10%
              </div>
            </div>

            <div className="investment__info-card">
              <h4 className="investment__info-title">
                Сравнение с вкладом
              </h4>
              <ul className="investment__info-list">
                <li>• Доход от вклада при 15% годовых: до 5 600 000 ₽ (альтернативно: 4 200 000 ₽)</li>
                <li>• Суммарный итог по сценарию из ТЗ: от 7 411 000 до 10 911 000 ₽</li>
                <li>• Для суммы 7 млн ₽ на вкладе при 15%: доход 5 250 000 ₽</li>
              </ul>
              <p className="investment__info-note">
                Все цифры — по данным брифа/ТЗ. Не являются публичной офертой.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="investment__cta">
          <h3 className="investment__cta-title">
            Не откладывайте выгодные инвестиции на будущее
          </h3>
          <p className="investment__cta-description">
            Зарабатывайте на недвижимости больше, чем на вкладах уже сейчас. Оставьте заявку — наш менеджер с Вами свяжется.
          </p>
          <button onClick={scrollToConsultation} className="btn-primary investment__cta-button">
            Оставить заявку
          </button>
        </div>
      </div>
    </section>
  );
};

export default Investment;
