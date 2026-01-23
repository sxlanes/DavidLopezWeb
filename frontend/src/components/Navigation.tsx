import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Navigation: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Don't show navigation on home page as it has its own Hero section
    if (isHome) return null;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-void/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
            {/* Left: Brand Name */}
            <Link
                to="/"
                className="text-xl md:text-2xl font-serif text-gold-dim tracking-tight hover:opacity-80 transition-opacity"
            >
                David López
            </Link>

            {/* Right: Back to Menu */}
            <Link
                to="/"
                className="group flex items-center gap-2 text-sm md:text-base font-sans text-stone-400 hover:text-white uppercase tracking-widest transition-colors"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-gold-dim" />
                <span>Volver al menú</span>
            </Link>
        </nav>
    );
};

export default Navigation;
