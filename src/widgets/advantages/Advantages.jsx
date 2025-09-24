import React from 'react';
import './advantages.css';

const Advantages = () => {
  const advantages = [
    {
      title: 'Набережная и пляж рядом с Приморским парком',
      description: 'стартовали подготовительные работы — геодезия, демонтаж покрытий. Общая протяжённость объекта — 2,5 км.',
      highlight: '2,5 км'
    },
    {
      title: 'Социальная инфраструктура',
      description: 'детский сад, школа, магазины, аптеки, кафе, рестораны, поликлиника — всё необходимое рядом.'
    },
    {
      title: 'Образование',
      description: 'вблизи расположены ведущие вузы города — Приазовский государственный технический университет и Мариупольский государственный университет имени А. И. Куинджи.'
    },
    {
      title: 'Прогноз роста цен',
      description: 'такой же, как в Крыму или Сочи. В Мариуполе цены на недвижимость уже за пару лет показали динамику в 35%.',
      highlight: '35%'
    }
  ];

  const transportProjects = [
    '6 разноуровневых развязок',
    '14 путепроводов и 3 моста',
    'Барьерное ограждение и освещение по всей длине',
    'Увеличение пропускной способности до ~40 тыс. авт./сутки'
  ];

  return (
    <section id="advantages" className="advantages">
      <div className="advantages__container">
        <div className="advantages__header">
          <h2 className="advantages__title">
            Преимущества покупки квартиры
          </h2>
        </div>

        <div className="advantages__content">
          {/* Main advantages */}
          <div className="advantages__list">
            {advantages.map((advantage, index) => (
              <div key={index} className="advantages__item">
                <h3 className="advantages__item-title">
                  {advantage.title}
                </h3>
                <p className="advantages__item-description">
                  {advantage.description.split(advantage.highlight).map((part, i) => (
                    <span key={i}>
                      {part}
                      {i === 0 && advantage.highlight && (
                        <span className="advantages__item-highlight">{advantage.highlight}</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          {/* Transport projects */}
          <div className="advantages__transport">
            <h3 className="advantages__transport-title">
              Транспортные проекты
            </h3>
            <p className="advantages__transport-description">
              Началась активная подготовка к строительству обхода Мариуполя длиной более{' '}
              <span className="advantages__transport-highlight">30 км</span> — часть федеральной трассы{' '}
              <span className="advantages__transport-highlight">Р‑280 «Новороссия»</span>. 
              Завершение объекта ожидается к <span className="advantages__transport-highlight">2028</span> году 
              (возможен запуск в 2027).
            </p>
            
            <ul className="advantages__transport-list">
              {transportProjects.map((project, index) => (
                <li key={index} className="advantages__transport-item">
                  <span className="advantages__transport-item-icon">•</span>
                  <span className="advantages__transport-item-text">{project}</span>
                </li>
              ))}
            </ul>

            <p className="advantages__transport-note">
              Это не просто дорога — это возможность создать комфортное, современное пространство и улучшить условия жизни.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
