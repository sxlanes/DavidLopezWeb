import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticlesCategory from './pages/ArticlesCategory';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Books from './pages/Books';
import AboutMe from './pages/AboutMe';
import Newsletter from './pages/Newsletter';
import Page from './pages/Page';

import Novels from './pages/Novels';
import Socials from './pages/Socials';
import Schopenhauer from './pages/Schopenhauer';
import BailarinasLogicas from './pages/BailarinasLogicas';
import LiteraryCriticism from './pages/LiteraryCriticism';
import FilosofosMiticos from './pages/FilosofosMiticos';
import Pensadores2015 from './pages/Pensadores2015';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-void min-h-screen text-stone-300 font-sans selection:bg-gold-dim selection:text-black">
        <Navigation />
        <main className="relative z-10 w-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articulos" element={<Articles />} />
            <Route path="/articulos/:categorySlug" element={<ArticlesCategory />} />
            <Route path="/cursos" element={<Courses />} />
            <Route path="/cursos/:id" element={<CourseDetail />} />
            <Route path="/libros" element={<Books />} />
            <Route path="/sobre-mi" element={<AboutMe />} />
            <Route path="/newsletter" element={<Newsletter />} />

            {/* Dynamic Pages from XML */}
            <Route path="/novelas" element={<Novels />} />
            <Route path="/redes-sociales" element={<Socials />} />
            <Route path="/sobre-schopenhauer" element={<Schopenhauer />} />
            <Route path="/las-bailarinas-logicas" element={<BailarinasLogicas />} />
            <Route path="/criticas-literarias" element={<LiteraryCriticism />} />

            <Route path="/filosofos-miticos-del-mitico-siglo-xx" element={<FilosofosMiticos />} />
            <Route path="/pensadores-pensando-en-2015" element={<Pensadores2015 />} />
            <Route path="/contacto" element={<Page />} />

            {/* Fallback for other pages if needed */}
            <Route path="/pg/:slug" element={<Page />} />
            <Route path="/post/:id" element={<Page />} />

            {/* Generic catch-all for simpler pages */}
            <Route path="/:slug" element={<Page />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;