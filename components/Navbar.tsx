import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/helpers';

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-purple-500/20' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-pink-400" style={{ fontFamily: 'Ephesis, cursive', fontSize: '2.5rem' }}>
                    Queen B's Cleaning
                </div>
                <div className="flex gap-6 text-lg">
                    <button
                        onClick={() => scrollToSection('about')}
                        className="hover:text-pink-400 transition-colors border-b-2 border-transparent hover:border-pink-400 text-white"
                    >
                        About Us
                    </button>
                    <button
                        onClick={() => scrollToSection('services')}
                        className="hover:text-pink-400 transition-colors border-b-2 border-transparent hover:border-pink-400 text-white"
                    >
                        Services
                    </button>
                    <button
                        onClick={() => scrollToSection('booking')}
                        className="text-pink-400 font-bold hover:text-pink-300 transition-colors border-b-2 border-transparent hover:border-pink-300"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </nav>
    );
};