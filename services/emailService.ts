import emailjs from '@emailjs/browser';
import { BookingDetails } from '../types';

export const sendBookingNotification = async (booking: BookingDetails) => {
  const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS configuration is missing. Check your .env file.");
    // We return true in development so the UI doesn't break even if email isn't set up yet
    return true; 
  }

  const templateParams = {
    to_name: "Queen B's Management",
    contact_name: booking.contactName,
    contact_email: booking.contactEmail,
    // 'reply_to' is crucial for the "Auto-Reply" feature in EmailJS to know who to send the confirmation to
    reply_to: booking.contactEmail, 
    contact_phone: booking.contactPhone,
    service_type: booking.serviceType,
    bedrooms: booking.bedrooms,
    bathrooms: booking.bathrooms,
    date: booking.date,
    time: booking.time,
    address: booking.address,
    price: booking.price,
    payment_method: booking.paymentMethod,
    message: `New booking request received for ${booking.address}. Please review and approve.`
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
};