import { motion } from 'motion/react';
import { Globe, HeartPulse, RefreshCw, Briefcase, FileText, CheckCircle } from 'lucide-react';

const services = [
  {
    title: 'Tourist Visa',
    desc: 'General tourism and sightseeing visas for exploring the beauty of India.',
    icon: Globe,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Medical Visa',
    desc: 'Specialized hospital + attendant visas with fast-track processing for urgent care.',
    icon: HeartPulse,
    color: 'bg-red-50 text-red-600'
  },
  {
    title: 'Double Entry Visa',
    desc: 'Convenient double entry visas for embassy interviews and multiple visits.',
    icon: RefreshCw,
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Business Visa',
    desc: 'Official visas for business meetings, trade fairs, and international conferences.',
    icon: Briefcase,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Visa Documentation',
    desc: 'Professional assistance for all types of visa documentation and paperwork.',
    icon: FileText,
    color: 'bg-orange-50 text-orange-600'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Our Core Services</h2>
            <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Indian Visa Specialists
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide end-to-end support for all categories of Indian visa applications with guaranteed professional documentation.
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
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-2xl hover:shadow-blue-600/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.desc}
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <CheckCircle size={18} />
                <span>Expert Support</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
