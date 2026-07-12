const fs = require('fs');
let code = fs.readFileSync('src/components/Services.tsx', 'utf8');

const regex = /className="bg-white rounded-xl shadow-xl max-w-\[300px\] w-full p-4 overflow-hidden"[\s\S]*?className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm cursor-pointer"/;

const replacement = `className="bg-white rounded-lg shadow-xl max-w-[260px] w-full p-4 overflow-hidden"
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
                    window.dispatchEvent(new CustomEvent('TRIGGER_CHAT', { detail: \`আমি \${bookingService} বুক করতে চাই\` }));
                    setBookingService(null);
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-sm cursor-pointer"`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/Services.tsx', code);
