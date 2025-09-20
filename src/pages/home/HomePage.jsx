import React from 'react';
import Header from '../../widgets/header/Header';
import Hero from '../../widgets/hero/Hero';
import Complexes from '../../widgets/complexes/Complexes';
import Map from '../../widgets/map/Map';
import Advantages from '../../widgets/advantages/Advantages';
import Investment from '../../widgets/investment/Investment';
import Comparison from '../../widgets/comparison/Comparison';
import ConsultationSection from '../../widgets/consultation-section/ConsultationSection';
import Footer from '../../widgets/footer/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Complexes />
      <Map />
      <Advantages />
      <Investment />
      <Comparison />
      <ConsultationSection />
      <Footer />
    </div>
  );
};

export default HomePage;
