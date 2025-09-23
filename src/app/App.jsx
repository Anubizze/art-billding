import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ComplexesPage from '../pages/complexes/ComplexesPage';
import UniversalComplexPage from '../pages/complex-detail/UniversalComplexPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/complexes" element={<ComplexesPage />} />
        <Route path="/complex/:complexId" element={<UniversalComplexPage />} />
      </Routes>
    </Router>
  );
};

export default App;





