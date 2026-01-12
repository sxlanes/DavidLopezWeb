import React from 'react';
import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

const Socials: React.FC = () => {
    const socialLinks = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/davidlopez_escritor_filosofo/',
            icon: Instagram,
            handle: '@davidlopez_escritor_filosofo',
            desc: 'Reflexiones visuales y novedades.'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/david-lópez-7189171a/',
            icon: Linkedin,
            handle: 'David López',
            desc: 'Trayectoria académica y profesional.'
        },
        {
            name: 'X (Twitter)',
            url: 'https://twitter.com/HuertoInfinito',
            icon: Twitter,
            handle: '@HuertoInfinito',
            desc: 'Pensamientos breves y diálogo.'
        },
        {
            name: 'Email',
            url: 'mailto:contacto@davidlopez.info',
            icon: Mail,
            handle: 'contacto@davidlopez.info',
            desc: 'Contacto directo.'
        }
    ];

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void flex flex-col items-center justify-center">
            <h1 className="text-4xl font-serif text-gold-dim mb-16 text-center tracking-widest uppercase">Redes Sociales</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-6 p-8 border border-white/5 bg-void-light hover:border-gold-dim/30 hover:bg-white/5 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center text-gold-dim group-hover:scale-110 transition-transform duration-500 border border-white/5">
                            <link.icon size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-serif text-white mb-1 group-hover:text-gold-dim transition-colors">{link.name}</h3>
                            <p className="text-stone-500 text-xs uppercase tracking-widest mb-2">{link.handle}</p>
                            <p className="text-stone-400 text-sm">{link.desc}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Socials;
