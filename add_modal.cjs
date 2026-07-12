const fs = require('fs');
let code = fs.readFileSync('src/components/Services.tsx', 'utf8');

const replacement = `      </div>

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
              className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 overflow-hidden"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">সার্ভিস বুকিং নিশ্চিতকরণ</h3>
              <p className="text-gray-600 mb-6">
                আপনি কি নিশ্চিত যে আপনি <strong>{bookingService}</strong> বুক করতে চান?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setBookingService(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  না (No)
                </button>
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('TRIGGER_CHAT', { detail: \`আমি \${bookingService} বুক করতে চাই\` }));
                    setBookingService(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  হ্যাঁ (Yes)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>`;

code = code.replace(/      <\/div>\n    <\/section>/, replacement);
fs.writeFileSync('src/components/Services.tsx', code);
