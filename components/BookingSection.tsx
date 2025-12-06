import React from 'react';
import { BookingWizard } from './BookingWizard';

export const BookingSection: React.FC = () => {
    return (
        <section id="booking" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-8" style={{ fontFamily: 'Ephesis, cursive', color: '#c084fc', textShadow: '3px 3px 0 #1f2937' }}>
                    Schedule & Pay Online
                </h2>
                <p className="text-center text-gray-200 mb-10 text-lg">
                    Select your service, choose a time, and securely pay with Credit Card, PayPal, or Cash.
                </p>
                <BookingWizard />
            </div>
        </section>
    );
};