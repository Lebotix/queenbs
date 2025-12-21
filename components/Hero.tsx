
import React from 'react';
import { scrollToSection } from '../utils/helpers';
import { LOGO_URL } from '../constants';

export const Hero: React.FC = () => {
    return (
        <section className="pt-32 pb-20 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto text-center">
                <div className="mb-8 flex justify-center">
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="block">
                        <div className="animate-logo-entrance">
                            <img
                                src="https://i.imgur.com/035fOyH.jpeg"
                                alt="Queen B's Cleaning Logo"
                                className="w-64 h-64 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500 animate-float"
                            />
                        </div>
                    </a>
                </div>
                <h1 className="text-7xl md:text-8xl mb-6" style={{ fontFamily: 'Ephesis, cursive', color: '#c084fc', textShadow: '3px 3px 0 #1f2937, -1px -1px 0 #1f2937, 1px -1px 0 #1f2937, -1px 1px 0 #1f2937' }}>
                    Queen B's Cleaning, LLC
                </h1>
                <div className="mb-6">
                    <p className="text-2xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Insured and Bonded</p>
                    <p className="text-lg text-white max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                        Your peace of mind is our priority. We carry full liability insurance and bonding to protect your property and give you confidence in our professional service.
                    </p>
                </div>
                <p className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'Lobster, cursive', color: '#c084fc', textShadow: '3px 3px 0 #1f2937, -1px -1px 0 #1f2937, 1px -1px 0 #1f2937, -1px 1px 0 #1f2937, 0 0 20px rgba(192, 132, 252, 0.5)' }}>
                    You have the grime, We bring the shine!
                </p>
                <p className="text-xl text-white mb-12" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                    <span className="inline-block bg-gray-900 px-6 py-2 rounded-full border border-purple-500/50">
                        Serving North Platte, NE and surrounding areas
                    </span>
                </p>
                <button
                    onClick={() => scrollToSection('booking')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
                >
                    Schedule Online
                </button>
            </div>
        </section>
    );
};
