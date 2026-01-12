import React from 'react';
import { Link } from 'react-router-dom';

const reviews = [
    {
        author: "José María Ruiz Soroa",
        book: "El esencialismo democrático",
        publisher: "Trotta-Fundación Alfonso Martín Escudero, Madrid 2010",
        pdf: "",
        searchQuery: "misterio de la Democracia"
    },
    {
        author: "Jacobo Siruela",
        book: "El mundo bajo los párpados",
        publisher: "Atalanta, Girona 2010",
        pdf: "",
        searchQuery: "Jacobo Siruela"
    },
    {
        author: "José Antonio Marina",
        book: "Las culturas fracasadas",
        publisher: "Anagrama, Barcelona 2010",
        pdf: "",
        searchQuery: "Marina"
    },
    {
        author: "Jacobo Muñoz",
        book: "Filosofía de la Historia",
        publisher: "Biblioteca Nueva, Madrid 2010",
        pdf: "",
        searchQuery: "Jacobo Muñoz"
    },
    {
        author: "Ramón Andrés",
        book: "No sufrir compañía",
        publisher: "El Acantilado, Barcelona 2010",
        pdf: "http://www.davidlopez.info/wp-content/uploads/2019/04/Ram%C3%B3n-Andr%C3%A9s-y-eso-que-sea-el-silencio.pdf",
        searchQuery: "Ramón Andrés"
    },
    {
        author: "Roman Gubern",
        book: "Metamorfosis de la lectura",
        publisher: "Anagrama, Barcelona 2010",
        pdf: "http://www.davidlopez.info/wp-content/uploads/2010/07/El-FoxP2-de-Roman-Gubern-y-la-luz-de-los-cielos1.pdf",
        searchQuery: "Roman Gubern"
    },
    {
        author: "Vicente Verdú",
        book: "Capitalismo funeral",
        publisher: "Anagrama, Barcelona 2009",
        pdf: "http://www.davidlopez.info/wp-content/uploads/2009/02/Vicente-Verd%C3%BA-el-Apocalisis-y-el-templo-de-Facebook.pdf",
        searchQuery: "Vicente Verdú"
    },
    {
        author: "Clara Janés",
        book: "María Zambrano. Desde la sombra llameante",
        publisher: "Siruela, Madrid 2010",
        pdf: "https://www.davidlopez.info/wp-content/uploads/2022/05/Clara-Janes-y-Maria-Zambrano-ante-la-luz-de-la-Aurora.pdf",
        searchQuery: "Clara Janés"
    },
    {
        author: "Emilio Lledó",
        book: "Ser quien eres",
        publisher: "Prensas Universitarias de Zaragoza, Zaragoza 2009",
        pdf: "",
        searchQuery: "Emilio Lledó"
    },
    {
        author: "Fernando Gil Villa",
        book: "Nihilistas",
        publisher: "Maia Ediciones, Madrid 2009",
        pdf: "",
        searchQuery: "Gil Villa"
    },
    {
        author: "Chantal Maillard",
        book: "Adiós a la India",
        publisher: "Centro de ediciones de la Diputación de Málaga, Málaga 2009",
        pdf: "",
        searchQuery: "Chantal Maillard"
    },
    {
        author: "Adela Cortina",
        book: "Las fronteras de la persona",
        publisher: "Taurus, Madrid 2009",
        pdf: "",
        searchQuery: "Adela Cortina"
    },
    {
        author: "Jesús Mosterín",
        book: "La cultura humana",
        publisher: "Espasa Calpe, Pozuelo de Alarcón 2009",
        pdf: "https://www.davidlopez.info/wp-content/uploads/2022/05/El-autorretrato-de-Dios-en-los-circuitos-neurales-de-Jesus-Mosterin.pdf",
        searchQuery: "Mosterín"
    },
    {
        author: "Salvador Pániker",
        book: "Asimetrías",
        publisher: "Debate, Barcelona 2008",
        pdf: "",
        searchQuery: "Salvador Pániker"
    },
    {
        author: "Leonardo Castellani",
        book: "Cómo sobrevivir intelectualmente al siglo XXI",
        publisher: "LetrasLibres, Madrid 2008",
        pdf: "",
        searchQuery: "Leonardo Castellani"
    },
    {
        author: "Martín Cerda",
        book: "La palabra quebrada",
        publisher: "Edit. Veintisiete Letras, Madrid 2008",
        pdf: "",
        searchQuery: "Martín Cerda"
    },
    {
        author: "Víctor Gómez Pin",
        book: "Filosofía",
        publisher: "Espasa Calpe, Madrid 2008",
        pdf: "",
        searchQuery: "Víctor Gómez Pin"
    },
    {
        author: "Beatriz Bossi",
        book: "Saber gozar",
        publisher: "Trotta, Madrid 2008",
        pdf: "",
        searchQuery: "Beatriz Bossi"
    },
    {
        author: "María Zambrano",
        book: "Algunos lugares de la poesía",
        publisher: "Trotta, Madrid 2008",
        pdf: "",
        searchQuery: "Algunos lugares de la poesía"
    }
];

const LiteraryCriticism: React.FC = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <h1 className="text-4xl font-serif text-gold-dim mb-8 text-center tracking-widest uppercase border-b border-white/5 pb-8">
                Críticas Literarias
            </h1>

            <p className="text-center max-w-2xl mx-auto mb-16 text-stone-400 italic">
                La casi totalidad de las críticas literarias que ofrezco en esta página fueron publicadas en <span className="text-white">Cuadernos Hispanoamericanos</span> (Agencia Española de Cooperación Internacional para el Desarrollo-Ministerio de Asuntos Exteriores).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {reviews.filter(r => r.pdf && r.pdf.trim() !== "").map((review, idx) => (
                    <div key={idx} className="bg-void-light border border-white/5 p-8 flex flex-col hover:border-gold-dim/30 transition-all duration-300 group">
                        <h3 className="text-xl font-serif text-white mb-2 group-hover:text-gold-dim transition-colors">
                            {review.author}
                        </h3>
                        <div className="text-lg font-bold text-gold-dim mb-4 leading-tight">
                            {review.book}
                        </div>
                        <div className="text-stone-500 text-sm mb-6 border-l border-white/10 pl-4 italic">
                            {review.publisher}
                        </div>

                        <div className="mt-auto">
                            {review.pdf ? (
                                <a
                                    href={review.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-dim border border-gold-dim/30 hover:bg-gold-dim hover:text-black px-4 py-2 transition-all"
                                >
                                    <span>Leer PDF</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </a>
                            ) : (
                                <span className="text-xs uppercase tracking-widest text-stone-600 cursor-not-allowed">
                                    No disponible
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiteraryCriticism;
