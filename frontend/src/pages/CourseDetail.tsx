import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Clock, BookOpen, User } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    price: string;
    image: string;
    syllabus: string[];
    duration: string;
    level: string;
}

// Mock data extended with more details
// Ideally this would come from a data file or API
const coursesData: Course[] = [
    {
        id: 1,
        title: "Filosofía de la Política",
        description: "Un viaje por la historia de la humanidad a través de las ideas políticas.",
        longDescription: "Este curso ofrece un análisis exhaustivo de las corrientes políticas que han dado forma a nuestra civilización. Desde la República de Platón hasta las teorías de la justicia contemporáneas, exploraremos cómo las ideas fundamentales sobre el poder, la libertad y la justicia han evolucionado. Este curso no es solo historia; es una herramienta para comprender el presente.",
        price: "50€",
        image: "/course-politics.jpg",
        syllabus: [
            "Módulo 1: El nacimiento de la política en Grecia",
            "Módulo 2: Maquiavelo y la autonomía de lo político",
            "Módulo 3: El contrato social: Hobbes, Locke, Rousseau",
            "Módulo 4: Marxismo y teoría crítica",
            "Módulo 5: Desafíos políticos del siglo XXI"
        ],
        duration: "10 semanas",
        level: "Intermedio"
    },
    {
        id: 2,
        title: "La Gran Metafísica",
        description: "¿Qué es todo esto? Un curso sobre la estructura de la realidad.",
        longDescription: "La metafísica es la reina de las ciencias filosóficas. En este curso nos atrevemos a preguntar sobre la naturaleza última de la realidad. ¿Qué es el ser? ¿Existe Dios? ¿Qué es el tiempo? A través de autores como Aristóteles, Kant y Heidegger, nos adentraremos en el misterio de la existencia misma.",
        price: "60€",
        image: "/course-metaphysics.jpg",
        syllabus: [
            "Módulo 1: Introducción a la ontología",
            "Módulo 2: El problema de los universales",
            "Módulo 3: Metafísica racionalista vs Empirismo",
            "Módulo 4: La crítica de Kant a la metafísica",
            "Módulo 5: Ontología contemporánea"
        ],
        duration: "12 semanas",
        level: "Avanzado"
    },
    {
        id: 3,
        title: "Filosofía del Arte",
        description: "Comprender la belleza y la creación artística desde una perspectiva filosófica.",
        longDescription: "El arte es quizás la actividad humana más enigmática. Este curso explora la estética como disciplina filosófica, analizando conceptos como lo bello, lo sublime y lo siniestro. Estudiaremos cómo el arte refleja y a veces anticipa los cambios en la conciencia humana.",
        price: "45€",
        image: "/course-art.jpg",
        syllabus: [
            "Módulo 1: Mímesis y Poiesis en la antigüedad",
            "Módulo 2: La estética medieval y renacentista",
            "Módulo 3: El nacimiento de la estética moderna",
            "Módulo 4: El arte en la era de la reproductibilidad técnica",
            "Módulo 5: Arte y verdad en la posmodernidad"
        ],
        duration: "8 semanas",
        level: "Principiante"
    }
];

const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        if (id) {
            const foundCourse = coursesData.find(c => c.id === parseInt(id));
            setCourse(foundCourse || null);
        }
    }, [id]);

    if (!course) {
        return (
            <div className="min-h-screen bg-void pt-32 text-center">
                <p className="text-white text-xl">Cargando curso o curso no encontrado...</p>
                <button onClick={() => navigate('/cursos')} className="mt-4 text-gold-dim hover:underline">
                    Volver a Cursos
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-void text-stone-300 pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Back Link */}
                <Link to="/cursos" className="inline-flex items-center text-stone-500 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" />
                    Volver a Cursos
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left Column: Content */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">{course.title}</h1>
                            <p className="text-xl text-gold-dim">{course.description}</p>
                        </div>

                        <div className="prose prose-invert prose-lg text-stone-400">
                            <h3 className="text-white font-serif text-2xl mb-4">Descripción del Curso</h3>
                            <p>{course.longDescription}</p>
                        </div>

                        <div className="bg-void-light border border-white/5 p-8 rounded-lg">
                            <h3 className="text-white font-serif text-2xl mb-6">Temario</h3>
                            <ul className="space-y-4">
                                {course.syllabus.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-dim/10 flex items-center justify-center text-gold-dim text-xs mr-4 mt-1 border border-gold-dim/20">
                                            {idx + 1}
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Sidebar / Action */}
                    <div className="md:col-span-1">
                        <div className="sticky top-32 bg-void-light border border-white/5 p-8 rounded-lg shadow-2xl">
                            <div className="flex items-center justify-center h-48 bg-stone-900 mb-6 rounded text-stone-700">
                                <span className="text-6xl font-serif">{course.title[0]}</span>
                            </div>

                            <div className="text-3xl font-serif text-white mb-6 text-center">{course.price}</div>

                            <button className="w-full bg-gold-dim text-black font-bold py-4 rounded hover:bg-gold-bright transition-colors mb-6 flex items-center justify-center">
                                <ShoppingBag className="mr-2" />
                                COMPRAR AHORA
                            </button>

                            <div className="space-y-4 text-sm text-stone-400 border-t border-white/5 pt-6">
                                <div className="flex items-center">
                                    <Clock size={16} className="mr-3 text-gold-dim" />
                                    <span>Duración: {course.duration}</span>
                                </div>
                                <div className="flex items-center">
                                    <BookOpen size={16} className="mr-3 text-gold-dim" />
                                    <span>{course.syllabus.length} Módulos</span>
                                </div>
                                <div className="flex items-center">
                                    <User size={16} className="mr-3 text-gold-dim" />
                                    <span>Nivel: {course.level}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
