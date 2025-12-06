import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-8 px-6 text-center text-gray-300 border-t border-purple-500/30 bg-gray-900">
            <p>&copy; {new Date().getFullYear()} Queen B's Cleaning, LLC. All rights reserved.</p>
            <p className="mt-2">Serving North Platte, NE and surrounding areas</p>
        </footer>
    );
};