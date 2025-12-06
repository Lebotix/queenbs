import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { BookingSection } from './components/BookingSection';

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 text-white relative">
            <Navbar />
            <Hero />
            <Services />
            <BookingSection />
            <About />
            <Contact />
            <Footer />
            <ChatWidget />
        </div>
    );
}

export default App;