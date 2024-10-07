import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ElixirCacheLanding from './ElixirCacheLanding';
import EnhancedRedisCLI from './EnhancedRedisCLI';
import DocumentationPage from './Documentation';
import BenchmarkPage from './BenchMarkPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ElixirCacheLanding />} />
        <Route path="/demo" element={<EnhancedRedisCLI />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/benchmarks" element={<BenchmarkPage />} />
      </Routes>
    </Router>
  );
};

export default App;