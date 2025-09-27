import React, { useEffect } from 'react';
import Header from '../../widgets/header/Header';
import Hero from '../../widgets/hero/Hero';
import Complexes from '../../widgets/complexes/Complexes';
import Presentation from '../../widgets/presentation/Presentation';
import Map from '../../widgets/map/Map';
import Advantages from '../../widgets/advantages/Advantages';
import Investment from '../../widgets/investment/Investment';
import FAQ from '../../widgets/faq/FAQ';
import ConsultationSection from '../../widgets/consultation-section/ConsultationSection';
import Footer from '../../widgets/footer/Footer';

const HomePage = () => {
  useEffect(() => {
    // Обработка якорных ссылок при загрузке страницы
    const handleHashChange = () => {
      const fullHash = window.location.hash;
      
      // Проверяем, есть ли якорная ссылка в URL
      if (fullHash && fullHash.startsWith('#/')) {
        const sectionId = fullHash.replace('#/', '');
        
        // Проверяем, что это не маршрут, а якорная ссылка
        if (['map', 'advantages', 'investment', 'faq', 'consultation', 'presentation'].includes(sectionId)) {
          const element = document.getElementById(sectionId);
          if (element) {
            // Небольшая задержка для корректной прокрутки
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }
        }
      }
    };

    // Небольшая задержка для обработки якорных ссылок после загрузки
    setTimeout(handleHashChange, 500);

    return () => {
      // Убираем обработчик при размонтировании
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Complexes />
      <Map />
      <Advantages />
      <Investment />
      <div id="presentation">
        <Presentation />
      </div>
      <FAQ />
      <div id="consultation">
        <ConsultationSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
