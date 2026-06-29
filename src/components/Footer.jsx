import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="bg-ink text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-extrabold text-amber mb-2">AccessMap Nairobi</h2>
            <p className="text-sm text-gray-400 max-w-xs">
              A community-powered directory helping everyone navigate Nairobi accessibly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-amber mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber transition">Home</Link></li>
              <li><Link to="/directory" className="hover:text-amber transition">Directory</Link></li>
              <li><Link to="/report" className="hover:text-amber transition">Submit a Report</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-amber mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Nairobi, Kenya</li>
              <li>accessmapnairobi@gmail.com</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} AccessMap Nairobi. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with ❤️ for Nairobi</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;