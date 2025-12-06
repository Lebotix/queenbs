import React from 'react';
import { Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { handlePhoneClick } from '../utils/helpers';

export const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-16" style={{ fontFamily: 'Ephesis, cursive', color: '#c084fc', textShadow: '3px 3px 0 #1f2937, -1px -1px 0 #1f2937, 1px -1px 0 #1f2937, -1px 1px 0 #1f2937, 0 0 20px rgba(192, 132, 252, 0.5)' }}>
                    Contact Us
                </h2>
                <div className="bg-gray-800/80 p-10 rounded-lg border border-purple-500/40 shadow-xl">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-white">Phone</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => handlePhoneClick('308-660-5653')}
                                    className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors text-gray-200"
                                >
                                    <Phone className="w-5 h-5" />
                                    <div>
                                        <span className="font-semibold">Brittany:</span> 308-660-5653
                                    </div>
                                </button>
                                <button
                                    onClick={() => handlePhoneClick('308-520-9321')}
                                    className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors text-gray-200"
                                >
                                    <Phone className="w-5 h-5" />
                                    <div>
                                        <span className="font-semibold">Jamie:</span> 308-520-9321
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-white">Email</h3>
                            <a
                                href="mailto:busycleaning93@gmail.com"
                                className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors text-gray-200"
                            >
                                <Mail className="w-5 h-5" />
                                busycleaning93@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-purple-500/30 pt-8 mt-8 bg-gray-900/50 rounded-lg p-6">
                        <h3 className="text-2xl font-semibold mb-4 text-white text-center">Follow Us</h3>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://www.facebook.com/Queenbcleaning25"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
                            >
                                <Facebook className="w-6 h-6" />
                                Facebook
                            </a>
                            <a
                                href="https://instagram.com/queenbscleaning25"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-pink-500/30"
                            >
                                <Instagram className="w-6 h-6" />
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};