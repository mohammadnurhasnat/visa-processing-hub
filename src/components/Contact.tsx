import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-[3rem] overflow-hidden relative shadow-2xl shadow-blue-600/20">
          {/* Abstract Decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full -mr-48 -mt-48 mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full -ml-48 -mb-48 mix-blend-multiply filter blur-3xl opacity-50"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="p-12 md:p-20 text-white">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to Book Your <br />Next Adventure?</h2>
                <p className="text-blue-100 text-lg mb-12 max-w-md font-light leading-relaxed">
                  Get in touch with our travel experts for a free consultation. We'll help you plan the perfect trip.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm uppercase tracking-widest font-bold mb-1">Call Us</p>
                      <p className="text-xl font-semibold">+09643848934</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm uppercase tracking-widest font-bold mb-1">Email Us</p>
                      <p className="text-xl font-semibold">visaprocessinghub@hmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm uppercase tracking-widest font-bold mb-1">Visit Us</p>
                      <p className="text-xl font-semibold">Level: 3/A, Jamuna Future Park, Dhaka-1229</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex gap-6">
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white text-white hover:text-blue-600 transition-all border border-white/10">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="bg-white p-12 md:p-20 m-6 rounded-[2.5rem]">
              <motion.form
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Phone Number</label>
                    <input type="tel" placeholder="+880..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Service Type</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none appearance-none">
                    <option>Visa Processing</option>
                    <option>Air Ticketing</option>
                    <option>Tour Package</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Message</label>
                  <textarea rows={4} placeholder="Tell us about your travel plans..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none resize-none"></textarea>
                </div>
                <button className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3">
                  Send Message
                  <Send size={20} />
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
