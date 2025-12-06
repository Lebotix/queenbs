import React from 'react';
import { Home, Building2, Key, Package, Sparkles } from 'lucide-react';
import { scrollToSection } from '../utils/helpers';

export const Services: React.FC = () => {
    return (
        <section id="services" className="py-20 px-6 bg-gray-900/60">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-16" style={{ fontFamily: 'Ephesis, cursive', color: '#c084fc', textShadow: '3px 3px 0 #1f2937, -1px -1px 0 #1f2937, 1px -1px 0 #1f2937, -1px 1px 0 #1f2937, 0 0 20px rgba(192, 132, 252, 0.5)' }}>
                    Our Services
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-gray-800/80 p-8 rounded-lg border border-purple-500/40 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                        <Home className="w-12 h-12 text-pink-400 mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Residential Cleaning</h3>
                        <p className="text-gray-100">Professional home cleaning services tailored to your needs.</p>
                    </div>
                    <div className="bg-gray-800/80 p-8 rounded-lg border border-purple-500/40 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                        <Building2 className="w-12 h-12 text-pink-400 mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Commercial Cleaning</h3>
                        <p className="text-gray-100">Keep your business space spotless and professional.</p>
                    </div>
                    <div className="bg-gray-800/80 p-8 rounded-lg border border-purple-500/40 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                        <Key className="w-12 h-12 text-pink-400 mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Move In/Out Cleaning</h3>
                        <p className="text-gray-100">Complete cleaning for your move-in or move-out day.</p>
                    </div>
                    <div className="bg-gray-800/80 p-8 rounded-lg border border-purple-500/40 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                        <Package className="w-12 h-12 text-pink-400 mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Rental Clean Outs</h3>
                        <p className="text-gray-100">Thorough cleaning for rental properties between tenants.</p>
                    </div>
                    <div className="bg-gray-800/80 p-8 rounded-lg border border-purple-500/40 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                        <Home className="w-12 h-12 text-pink-400 mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Estate Clean Up</h3>
                        <p className="text-gray-100">Compassionate and comprehensive estate cleaning services.</p>
                    </div>
                    <div className="bg-gray-800/80 p-8 rounded-lg border border-purple-500/40 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                        <Sparkles className="w-12 h-12 text-pink-400 mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Deep Cleaning</h3>
                        <p className="text-gray-100">Intensive cleaning for every corner of your space.</p>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <p className="text-lg text-white mb-6" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}><strong><em>Plus personalized services on request!</em></strong></p>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-10 py-4 rounded-full text-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-pink-500/50"
                    >
                        Get a Free Quote Today!
                    </button>
                </div>
            </div>
        </section>
    );
};