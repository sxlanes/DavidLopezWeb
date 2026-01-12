import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-stone-600 text-xs tracking-wider uppercase">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} David López.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Substack</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;