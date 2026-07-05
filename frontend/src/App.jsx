import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import Pipeline from './components/Pipeline';
import Results from './components/Results';
import RealWorld from './components/RealWorld';
import BusinessCase from './components/BusinessCase';
import Sandbox from './components/Sandbox';
import DownloadCenter from './components/DownloadCenter';
import Research from './components/Research';

// ScrollToTop component to automatically scroll window back to (0,0) on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Wrapper to animate page mounts/unmounts
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Sub-component to consume useLocation for AnimatePresence mode="wait"
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
        <Route path="/pipeline" element={<PageWrapper><Pipeline /></PageWrapper>} />
        <Route path="/results" element={<PageWrapper><Results /></PageWrapper>} />
        <Route path="/sandbox" element={<PageWrapper><Sandbox /></PageWrapper>} />
        <Route path="/economics" element={<PageWrapper><BusinessCase /></PageWrapper>} />
        <Route path="/real-world" element={<PageWrapper><RealWorld /></PageWrapper>} />
        <Route path="/downloads" element={<PageWrapper><DownloadCenter /></PageWrapper>} />
        <Route path="/research" element={<PageWrapper><Research /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', backgroundColor: 'var(--bg-primary)' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '2px', textDecoration: 'none' }}>
          <span style={{ color: 'var(--text-primary)' }}>SYNZYME</span>
          <span style={{ color: 'var(--accent-cyan)' }}>.GENESIS</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/pipeline" style={{ color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', textDecoration: 'none' }}>Pipeline</Link>
          <Link to="/results" style={{ color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', textDecoration: 'none' }}>Results</Link>
          <Link to="/sandbox" style={{ color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', textDecoration: 'none' }}>Sandbox</Link>
          <Link to="/economics" style={{ color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', textDecoration: 'none' }}>Economics</Link>
          <Link to="/real-world" style={{ color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', textDecoration: 'none' }}>Real World</Link>
          <Link to="/downloads" style={{ color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', textDecoration: 'none' }}>Downloads</Link>
          <Link to="/research" style={{ color: 'var(--text-primary)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', textDecoration: 'none' }}>Research →</Link>
        </div>
      </nav>
      
      <main>
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
