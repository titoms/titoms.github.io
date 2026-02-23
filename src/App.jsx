import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Hero, Stars } from './components';

// Lazy load components that are not in the initial viewport
const Who = lazy(() => import('./components/Who'));
const TechSkills = lazy(() => import('./components/TechSkills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Header />
          <Hero />
        </div>
        <Suspense fallback={<div className="w-full h-20 flex items-center justify-center text-secondary">Loading...</div>}>
          <Who />
          <TechSkills />
          <Experience />
          <Projects />
          <div className="relative z-0">
            <Contact />
            <Stars />
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App
