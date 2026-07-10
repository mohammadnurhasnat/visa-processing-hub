import { motion } from 'motion/react';
import { Globe, HeartPulse, RefreshCw, Briefcase, FileText, CheckCircle, Zap } from 'lucide-react';

const services = [
  {
    title: 'Tourist Visa',
    desc: 'General tourism and sightseeing visas for exploring the beauty of India.',
    icon: Globe,
    color: 'bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white',
    rates: { slot: '৳6,000', full: '৳8,000' }
  },
  {
    title: 'Medical Visa',
    desc: 'Specialized hospital + attendant visas with fast-track processing for urgent care.',
    icon: HeartPulse,
    color: 'bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-600 group-hover:text-white',
    rates: { slot: '৳6,000', full: '৳8,000' }
  },
  {
    title: 'Double Entry Visa',
    desc: 'Convenient double entry visas for embassy interviews and multiple visits.',
    icon: RefreshCw,
    color: 'bg-green-50 text-green-600 border border-green-100 group-hover:bg-green-600 group-hover:text-white',
    rates: { slot: '৳25,000', full: '৳28,500' }
  },
  {
    title: 'Business Visa',
    desc: 'Official visas for business meetings, trade fairs, and international conferences.',
    icon: Briefcase,
    color: 'bg-purple-50 text-purple-600 border border-purple-100 group-hover:bg-purple-600 group-hover:text-white',
    rates: { slot: '৳6,000', full: '৳8,000' }
  },
  {
    title: 'Visa Documentation',
    desc: 'Professional assistance for all types of visa documentation and paperwork.',
    icon: FileText,
    color: 'bg-orange-50 text-orange-600 border border-orange-100 group-hover:bg-orange-600 group-hover:text-white',
  },
  {
    title: 'Emergency Visa Assistance',
    desc: 'Urgent visa support for immediate travel requirements or emergency bookings.',
    icon: Zap,
    color: 'bg-amber-50 text-amber-600 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white',
  }
];

export default function Services() {
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
              className="group p-8 rounded-3xl border border-gray-200/90 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] hover:border-blue-200/90 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 transition-all duration-300`}>
                  <service.icon size={26} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight font-display group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  {service.desc}
                </p>

                {service.rates && (
                  <div className="my-4 pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-semibold">Only Slot:</span>
                      <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{service.rates.slot}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-semibold">Full Processing + Documentation:</span>
                      <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{service.rates.full}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm border-t border-gray-100 pt-4 mt-4">
                <CheckCircle size={16} className="text-blue-500" />
                <span>Expert Support Guaranteed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
