import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ComplexesPage from '../pages/complexes/ComplexesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/complexes" element={<ComplexesPage />} />
      </Routes>
    </Router>
  );
};

export default App;





