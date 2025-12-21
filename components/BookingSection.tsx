
import React from 'react';
import { BookingWizard } from './BookingWizard';

export const BookingSection: React.FC = () => {
    return (
        <section id="booking" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-8" style={{ fontFamily: 'Ephesis, cursive', color: '#c084fc', textShadow: '3px 3px 0 #1f2937' }}>
                    Get Your Free Quote
                </h2>
                <p className="text-center text-gray-200 mb-10 text-lg">
                    Tell us about your space, and we'll provide a personalized estimation. Costs are determined on a case-by-case basis.
                </p>
                <BookingWizard />
            </div>
        </section>
    );
};
