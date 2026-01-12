import React from 'react';
import Hero from '../components/Hero';
import Articles from './Articles';


const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <div id="articulos-home" className="bg-void min-h-screen">
                <Articles />
            </div>
        </>
    );
};

export default Home;
