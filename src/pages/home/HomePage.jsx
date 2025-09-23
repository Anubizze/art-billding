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
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Небольшая задержка для корректной прокрутки
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Обрабатываем хеш при загрузке страницы
    handleHashChange();

    // Обрабатываем изменения хеша
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
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
