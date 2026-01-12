import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Oracle from './components/Oracle';
import Works from './components/Works';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-void min-h-screen text-stone-300 font-sans selection:bg-gold-dim selection:text-black">
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Oracle />
        <Works />
      </main>
      <Footer />
    </div>
  );
};

export default App;