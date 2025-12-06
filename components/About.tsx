import React from 'react';

export const About: React.FC = () => {
    return (
        <section id="about" className="py-20 px-6 bg-gray-900/60">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-12" style={{ fontFamily: 'Ephesis, cursive', color: '#c084fc', textShadow: '3px 3px 0 #1f2937, -1px -1px 0 #1f2937, 1px -1px 0 #1f2937, -1px 1px 0 #1f2937, 0 0 20px rgba(192, 132, 252, 0.5)' }}>
                    About Us
                </h2>
                <div className="bg-gray-800/80 p-10 rounded-lg border border-purple-500/40 shadow-xl">
                    <p className="text-xl text-gray-100 leading-relaxed">
                        At Queen B's Cleaning, we treat every space like royalty. Locally owned and operated in North Platte, Nebraska, we take pride in delivering spotless results with a personal touch. With <strong>10 years of experience</strong> in the industry, whether you need a quick refresh or a full deep clean, we make sure your home or business shines, every time.
                    </p>
                </div>
            </div>
        </section>
    );
};