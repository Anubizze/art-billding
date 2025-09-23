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
      // Получаем хеш из URL, исключая маршрутизацию
      const fullHash = window.location.hash;
      // Если хеш содержит #/ то это маршрут, если нет - то якорная ссылка
      const anchorHash = fullHash.replace(/^#\/.*?#/, '#');
      
      if (anchorHash && anchorHash !== '#/' && anchorHash !== '#') {
        const element = document.querySelector(anchorHash);
        if (element) {
          // Небольшая задержка для корректной прокрутки
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Небольшая задержка для обработки якорных ссылок после загрузки
    setTimeout(handleHashChange, 200);

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
