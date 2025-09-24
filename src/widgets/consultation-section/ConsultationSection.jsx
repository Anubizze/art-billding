import React from 'react';
import ConsultationForm from '../../features/consultation/ConsultationForm';
import './consultation-section.css';

const ConsultationSection = () => {
  return (
    <section id="consultation" className="consultation-section">
      <div className="consultation-section__container">
        <div className="consultation-section__header">
          <h2 className="consultation-section__title">
            Получите бесплатную консультацию
          </h2>
          <p className="consultation-section__description">
            Ответим на вопросы, подберём планировку и рассчитаем ипотеку 2%.
          </p>
        </div>
        
        <ConsultationForm />
      </div>
    </section>
  );
};

export default ConsultationSection;
