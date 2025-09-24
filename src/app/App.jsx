import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ComplexesPage from '../pages/complexes/ComplexesPage';
import UniversalComplexPage from '../pages/complex-detail/UniversalComplexPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<HomePage />} />
        <Route path="/advantages" element={<HomePage />} />
        <Route path="/investment" element={<HomePage />} />
        <Route path="/complexes" element={<ComplexesPage />} />
        <Route path="/complex/:complexId" element={<UniversalComplexPage />} />
        {/* Catch-all route for any unmatched paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;





