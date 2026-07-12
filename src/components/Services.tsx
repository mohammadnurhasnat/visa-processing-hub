import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import touristBg from '../assets/images/kashmir_landscape_1783697060091.jpg';
import medicalBg from '../assets/images/medical_visa_bg_1783696727614.jpg';
import doubleEntryBg from '../assets/images/double_entry_visa_bg_1783696759271.jpg';
import businessBg from '../assets/images/business_visa_bg_1783696744283.jpg';
import visaDocBg from '../assets/images/visa_documentation_bg_1783698581534.jpg';
import emergencyBg from '../assets/images/emergency_visa_bg_1783698597865.jpg';

const services = [
  {
    title: 'Tourist Visa',
    desc: 'General tourism and sightseeing visas for exploring the beauty of India.',
    color: 'bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white',
    image: touristBg,
    rates: { slot: '৳6,000', full: '৳8,000' }
  },
  {
    title: 'Medical Visa',
    desc: 'Specialized hospital + attendant visas with fast-track processing for urgent care.',
    color: 'bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-600 group-hover:text-white',
    image: medicalBg,
    rates: { slot: '৳6,000', full: '৳8,000' }
  },
  {
    title: 'Double Entry Visa',
    desc: 'Convenient double entry visas for embassy interviews and multiple visits.',
    color: 'bg-green-50 text-green-600 border border-green-100 group-hover:bg-green-600 group-hover:text-white',
    image: doubleEntryBg,
    rates: { slot: '৳25,000', full: '৳28,500' }
  },
  {
    title: 'Business Visa',
    desc: 'Official visas for business meetings, trade fairs, and international conferences.',
    color: 'bg-purple-50 text-purple-600 border border-purple-100 group-hover:bg-purple-600 group-hover:text-white',
    image: businessBg,
    rates: { slot: '৳6,000', full: '৳8,000' }
  },
  {
    title: 'Visa Documentation',
    desc: 'Professional assistance for all types of visa documentation and paperwork.',
    color: 'bg-orange-50 text-orange-600 border border-orange-100 group-hover:bg-orange-600 group-hover:text-white',
    image: visaDocBg,
    docRates: [
      { label: 'Tourist Visa', price: '৳2,000' },
      { label: 'Medical Visa', price: '৳2,500' },
      { label: 'Business Visa', price: '৳3,000' },
      { label: 'Double Entry Visa', price: '৳4,500' }
    ]
  },
  {
    title: 'Emergency Visa Assistance',
    desc: 'Urgent visa support for immediate travel requirements or emergency bookings.',
    color: 'bg-amber-50 text-amber-600 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white',
    image: emergencyBg
  }
];

export default function Services() {
  const [bookingService, setBookingService] = useState<string | null>(null);
  return (
    <section id="services" className="pt-32 pb-24 md:pt-36 md:pb-28 bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Our Core Services</span>
            </div>
            <p className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight font-display">
              Indian Visa Specialists
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We provide end-to-end support for all categories of Indian visa applications with guaranteed professional documentation and hassle-free processing.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden p-8 rounded-3xl border border-gray-200/90 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] hover:border-blue-200/90 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              {service.image && (
                <div 
                  className="absolute inset-0 z-0 opacity-15 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight font-display group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-700 font-medium leading-relaxed mb-4 text-sm mix-blend-multiply">
                  {service.desc}
                </p>

                {service.rates && (
                  <div className="my-4 pt-4 border-t border-gray-200 space-y-2 mix-blend-multiply">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-semibold">Only Slot:</span>
                      <span className="font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">{service.rates.slot}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-semibold">Full Processing + Documentation:</span>
                      <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{service.rates.full}</span>
                    </div>
                  </div>
                )}
                
                {service.docRates && (
                  <div className="my-4 pt-4 border-t border-gray-200 space-y-2 mix-blend-multiply">
                    <p className="text-xs text-gray-600 font-semibold mb-2">Only Documentation Rates:</p>
                    <ul className="space-y-2">
                      {service.docRates.map((rate, idx) => (
                        <li key={idx} className="flex justify-between items-center text-xs">
                          <span className="text-gray-700 flex items-center gap-1"><CheckCircle size={12} className="text-orange-500" /> {rate.label}</span>
                          <span className="font-extrabold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">{rate.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative z-10 flex items-center justify-between border-t border-gray-200 pt-4 mt-4 mix-blend-multiply">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <CheckCircle size={16} className="text-blue-600" />
                  <span>Expert Support</span>
                </div>
                <button 
                  onClick={() => setBookingService(service.title)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-md cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {bookingService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-[260px] w-full p-4 overflow-hidden"
            >
              <h3 className="text-sm font-bold text-gray-900 mb-1">সার্ভিস বুকিং নিশ্চিতকরণ</h3>
              <p className="text-xs text-gray-600 mb-4">
                আপনি কি নিশ্চিত যে আপনি <strong>{bookingService}</strong> বুক করতে চান?
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setBookingService(null)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                >
                  না (No)
                </button>
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('TRIGGER_CHAT', { detail: `আমি ${bookingService} বুক করতে চাই` }));
                    setBookingService(null);
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-sm cursor-pointer"
                >
                  হ্যাঁ (Yes)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
