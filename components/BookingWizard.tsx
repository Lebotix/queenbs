
import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { ServiceType, BookingDetails, AIQuoteResponse } from '../types';
import { generateSmartQuote } from '../services/geminiService';
import { sendBookingNotification } from '../services/emailService';
import { 
  Sparkles, ShieldCheck, Truck, HardHat, 
  Calendar, Clock, CheckCircle, 
  Loader2, ArrowRight, ArrowLeft, MapPin, Wand2, Info
} from 'lucide-react';

const icons: Record<string, React.FC<any>> = {
  Sparkles, ShieldCheck, Truck, HardHat
};

export const BookingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiError, setAiError] = useState('');
  const [submitError, setSubmitError] = useState('');
  
  // Booking State
  const [booking, setBooking] = useState<BookingDetails>({
    serviceType: ServiceType.STANDARD,
    bedrooms: 2,
    bathrooms: 1,
    date: '',
    time: '09:00',
    address: '',
    instructions: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  // AI Quote State
  const [aiDescription, setAiDescription] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<AIQuoteResponse | null>(null);

  const handleAIQuote = async () => {
    if (!aiDescription.trim()) return;
    setIsProcessingAI(true);
    setAiError('');
    try {
      const quote = await generateSmartQuote(aiDescription, booking.bedrooms, booking.bathrooms);
      if (quote) {
        setAiSuggestion(quote);
        setBooking(prev => ({
          ...prev,
          serviceType: quote.recommendedService
        }));
      } else {
        setAiError("Couldn't generate a quote. Please proceed manually.");
      }
    } catch (e) {
      setAiError("AI Service unavailable.");
    } finally {
      setIsProcessingAI(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    
    // Send email notification
    const success = await sendBookingNotification(booking);
    
    setIsSubmitting(false);
    
    if (success) {
        nextStep(); // Go to success screen
    } else {
        setSubmitError("There was an issue sending your request. Please try again or call us directly.");
    }
  };

  const renderStep1_Service = () => (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-2xl font-serif font-bold text-white mb-4">Choose Your Service</h3>
      
      {/* AI Helper Section */}
      <div className="bg-gray-900/50 border border-purple-500/30 p-6 rounded-xl mb-8">
        <div className="flex items-center gap-2 mb-3 text-pink-400">
          <Wand2 className="h-5 w-5" />
          <h4 className="font-bold">Not sure what you need? Ask our AI Assistant.</h4>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
                <textarea 
                    className="w-full p-3 rounded-lg bg-gray-800 border-gray-600 border focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-white placeholder-gray-400"
                    rows={3}
                    placeholder="e.g. I have a 3 bedroom house that hasn't been cleaned in months, lots of dust and dog hair..."
                    value={aiDescription}
                    onChange={(e) => setAiDescription(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2 justify-center">
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Beds</label>
                        <input 
                            type="number" 
                            min={1} 
                            max={10} 
                            value={booking.bedrooms}
                            onChange={(e) => setBooking({...booking, bedrooms: parseInt(e.target.value) || 1})}
                            className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Baths</label>
                        <input 
                            type="number" 
                            min={1} 
                            max={10} 
                            value={booking.bathrooms}
                            onChange={(e) => setBooking({...booking, bathrooms: parseInt(e.target.value) || 1})}
                            className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
                        />
                    </div>
                </div>
                <button 
                    onClick={handleAIQuote}
                    disabled={isProcessingAI || !aiDescription}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50"
                >
                    {isProcessingAI ? <Loader2 className="animate-spin h-4 w-4" /> : 'Get Smart Suggestion'}
                </button>
            </div>
        </div>
        {aiError && <p className="text-red-400 text-sm mt-2">{aiError}</p>}
        {aiSuggestion && (
            <div className="mt-4 bg-gray-800 p-4 rounded border-l-4 border-pink-500 shadow-sm">
                <p className="text-white font-medium">Suggestion: <span className="font-bold text-pink-400">{aiSuggestion.recommendedService}</span></p>
                <p className="text-gray-300 text-sm italic">"{aiSuggestion.reasoning}"</p>
                <p className="text-purple-400 font-bold mt-1">Est. Time: {aiSuggestion.estimatedHours} hrs</p>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map((service) => {
          const Icon = icons[service.iconName];
          const isSelected = booking.serviceType === service.id;
          return (
            <button
              key={service.id}
              onClick={() => {
                setBooking({ ...booking, serviceType: service.id });
                setAiSuggestion(null); // Reset AI override if user manually selects
              }}
              className={`relative p-5 border rounded-xl text-left transition-all duration-300 group ${
                isSelected
                  ? 'border-pink-500 bg-purple-900/30 ring-1 ring-pink-500 shadow-lg shadow-pink-500/10'
                  : 'border-gray-600 hover:border-pink-400/50 bg-gray-800/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shadow-sm flex-shrink-0 transition-colors duration-300 ${isSelected ? 'bg-purple-500/30 text-pink-400' : 'bg-gray-700 text-gray-400 group-hover:text-pink-300'}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 pr-6">
                    <h4 className={`font-bold text-lg leading-tight transition-colors duration-300 ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                        {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1.5 line-clamp-2 leading-relaxed">
                        {service.description}
                    </p>
                </div>
                {isSelected && (
                    <div className="absolute top-4 right-4 animate-scaleIn">
                        <CheckCircle className="h-5 w-5 text-pink-500" />
                    </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Manual Details if no AI used */}
      {!aiSuggestion && (
          <div className="mt-8 grid grid-cols-2 gap-6 bg-gray-800/40 p-6 rounded-xl border border-gray-600/50">
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bedrooms</label>
                <select 
                    value={booking.bedrooms}
                    onChange={(e) => setBooking({...booking, bedrooms: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-600 bg-gray-700/50 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                >
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bathrooms</label>
                <select 
                    value={booking.bathrooms}
                    onChange={(e) => setBooking({...booking, bathrooms: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-600 bg-gray-700/50 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                >
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
             </div>
          </div>
      )}

      <div className="flex justify-end pt-6 border-t border-gray-700/50">
        <button onClick={nextStep} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 flex items-center gap-2 shadow-lg shadow-purple-900/50 transform transition-all active:scale-95">
            Next: Schedule <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  const renderStep2_Details = () => (
    <div className="space-y-6 animate-fadeIn">
        <h3 className="text-2xl font-serif font-bold text-white mb-4">When & Where?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-pink-400" /> Date
                </label>
                <input 
                    type="date" 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent color-scheme-dark"
                    value={booking.date}
                    onChange={(e) => setBooking({...booking, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    style={{ colorScheme: 'dark' }}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-pink-400" /> Time
                </label>
                <select 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={booking.time}
                    onChange={(e) => setBooking({...booking, time: e.target.value})}
                >
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                </select>
            </div>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-pink-400" /> Address
            </label>
            <input 
                type="text"
                placeholder="123 Queen St, Apt 4B, New York, NY"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-400"
                value={booking.address}
                onChange={(e) => setBooking({...booking, address: e.target.value})}
            />
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-700">
             <h4 className="font-bold text-white">Contact Information</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                    type="text" placeholder="Full Name"
                    className="p-3 border border-gray-600 bg-gray-700 text-white rounded-lg w-full focus:ring-pink-500 placeholder-gray-400"
                    value={booking.contactName}
                    onChange={(e) => setBooking({...booking, contactName: e.target.value})}
                />
                <input 
                    type="email" placeholder="Email Address"
                    className="p-3 border border-gray-600 bg-gray-700 text-white rounded-lg w-full focus:ring-pink-500 placeholder-gray-400"
                    value={booking.contactEmail}
                    onChange={(e) => setBooking({...booking, contactEmail: e.target.value})}
                />
                <input 
                    type="tel" placeholder="Phone Number"
                    className="p-3 border border-gray-600 bg-gray-700 text-white rounded-lg w-full focus:ring-pink-500 placeholder-gray-400"
                    value={booking.contactPhone}
                    onChange={(e) => setBooking({...booking, contactPhone: e.target.value})}
                />
             </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 mt-6 flex gap-3 items-start">
            <Info className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
            <p className="text-gray-200 text-sm">
                <strong>Please Note:</strong> All services are estimated and tallied on a case by case basis and are not one size fits all. We will discuss final pricing with you directly.
            </p>
        </div>

        {submitError && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
                {submitError}
            </div>
        )}

        <div className="flex justify-between pt-6">
            <button onClick={prevStep} className="text-gray-400 hover:text-white font-medium px-4 flex items-center gap-2 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button 
                onClick={handleSubmitBooking} 
                disabled={!booking.date || !booking.address || !booking.contactName || isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-purple-900/50"
            >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Request Free Quote <CheckCircle className="h-4 w-4" /></>}
            </button>
        </div>
    </div>
  );

  const renderStep3_Success = () => (
    <div className="text-center py-12 space-y-6 animate-fadeIn">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-900/30 mb-4 ring-1 ring-blue-500/50">
            <CheckCircle className="h-12 w-12 text-blue-400" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-white">Quote Request Received!</h3>
        <p className="text-gray-300 max-w-md mx-auto">
            Thank you, {booking.contactName}. We have received your request for a {booking.serviceType} on <strong>{booking.date} at {booking.time}</strong>.
        </p>
        <div className="bg-blue-900/20 p-4 rounded-lg max-w-md mx-auto text-blue-200 text-sm border border-blue-800">
            We will contact you shortly to confirm details and provide a personalized price estimate.
        </div>
        <div className="pt-8">
            <button onClick={() => window.location.reload()} className="text-pink-400 font-bold hover:text-pink-300 hover:underline">
                Request Another Quote
            </button>
        </div>
    </div>
  );

  return (
    <div className="bg-gray-800/80 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto my-12 border border-purple-500/30 backdrop-blur-sm">
        <div className="bg-gray-900 p-6 flex justify-between items-center text-white border-b border-purple-500/20">
            <h2 className="text-xl font-bold font-serif text-pink-400">Book Your Clean</h2>
            <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`h-2 w-8 rounded-full transition-colors ${step >= i ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`} />
                ))}
            </div>
        </div>
        <div className="p-8">
            {step === 1 && renderStep1_Service()}
            {step === 2 && renderStep2_Details()}
            {step === 3 && renderStep3_Success()}
        </div>
    </div>
  );
};
