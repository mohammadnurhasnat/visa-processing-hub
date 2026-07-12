const fs = require('fs');

let footer = fs.readFileSync('src/components/Footer.tsx', 'utf-8');
footer = footer.replace(
`            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 font-display">`,
`            <div className="flex items-center gap-2.5">
              <span className="text-xl font-black tracking-tight text-gray-900 font-display">`
);
fs.writeFileSync('src/components/Footer.tsx', footer);

let navbar = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
navbar = navbar.replace(
`          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-600/10">
              <Plane className="text-white w-5 h-5" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 font-display transition-colors">`,
`          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 font-display transition-colors">`
);
fs.writeFileSync('src/components/Navbar.tsx', navbar);
