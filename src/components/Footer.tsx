import { Plane } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand Info & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 pb-8 border-b border-gray-200 mb-8">
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 font-display">
                Visa Processing <span className="text-blue-600">Hub</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              Premium Indian visa processing agency in Dhaka. We offer seamless documentation, medical, tourist, and business visa services at Jamuna Future Park.
            </p>
          </div>
          
          <div className="w-full lg:max-w-sm space-y-2">
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">Newsletter</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none w-full text-sm text-gray-950 shadow-sm" 
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all font-bold text-sm cursor-pointer shrink-0 shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Visa Services (BAM PASE) & Contact Details (DAN PASE) Side by Side */}
        <div className="grid grid-cols-2 gap-6 sm:gap-12 md:gap-16 lg:gap-24 mb-8">
          
          {/* BAM PASE: Visa Services */}
          <div className="space-y-3">
            <h4 className="text-gray-900 font-extrabold uppercase tracking-widest text-xs sm:text-sm border-b border-gray-200 pb-2">
              Visa Services
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm md:text-base text-gray-600">
              <li>
                <a href="#services" className="hover:text-blue-600 transition-colors py-0.5 block font-medium">
                  Tourist Visa Support
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-600 transition-colors py-0.5 block font-medium">
                  Medical Visa Fast-Track
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-600 transition-colors py-0.5 block font-medium">
                  Business & Double Entry Visa
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-600 transition-colors py-0.5 block font-medium">
                  Expert Documentation Assistance
                </a>
              </li>
            </ul>
          </div>

          {/* DAN PASE: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-gray-900 font-extrabold uppercase tracking-widest text-xs sm:text-sm border-b border-gray-200 pb-2">
              Contact Details
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm md:text-base text-gray-600 leading-normal">
              <li className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2">
                <span className="font-bold text-gray-900 sm:min-w-[80px]">Phone:</span> 
                <span className="text-gray-700 font-medium">+09643848934</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2">
                <span className="font-bold text-gray-900 sm:min-w-[80px]">WhatsApp:</span> 
                <a href="https://wa.me/8801332601510" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                  +8801332601510
                </a>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2">
                <span className="font-bold text-gray-900 sm:min-w-[80px]">Email:</span> 
                <span className="text-gray-700 font-medium break-all">visaprocessinghub@gmail.com</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2">
                <span className="font-bold text-gray-900 sm:min-w-[80px]">Location:</span> 
                <span className="text-gray-700 font-medium leading-snug">Level: 3/A, Jamuna Future Park, Dhaka-1229</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
          <p>© {new Date().getFullYear()} Visa Processing Hub. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
