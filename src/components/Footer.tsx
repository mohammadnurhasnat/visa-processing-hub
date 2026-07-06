import { Plane } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                VisaProcessing<span className="text-blue-500">Hub</span>
              </span>
            </div>
            <p className="leading-relaxed">
              Premium Indian visa processing agency in Dhaka. We offer seamless documentation, medical, tourist, and business visa services at Jamuna Future Park.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Visa Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Tourist Visa</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Medical Visa</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Business Visa</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact Details</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2"><span>Phone:</span> +09643848934</li>
              <li className="flex items-center gap-2"><span>WhatsApp:</span> +8801332601510</li>
              <li className="flex items-center gap-2"><span>Location:</span> Jamuna Future Park</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="mb-6">Subscribe to get special offers and travel tips.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-gray-800 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none w-full" />
              <button className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold">Go</button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>© 2024 Sarah Travels & Tourism. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
