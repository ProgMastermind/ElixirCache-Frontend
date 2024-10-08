import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ElixirCacheLanding from './ElixirCacheLanding';
import EnhancedRedisCLI from './EnhancedRedisCLI';
import DocumentationPage from './Documentation';
import BenchmarkPage from './BenchMarkPage';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from './ScrollToTop';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<ElixirCacheLanding />} />
          <Route path="/demo" element={<EnhancedRedisCLI />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/benchmarks" element={<BenchmarkPage />} />
        </Routes>
        <Analytics />
      </Router>
    </HelmetProvider>
  );
};

export default App;