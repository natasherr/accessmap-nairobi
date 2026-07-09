import { Link } from 'react-router-dom';

function Footer() {

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{ background: 'linear-gradient(135deg, #0f1a0f 0%, #1B6B3A 60%, #1a2e1a 100%)' }} className="text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-extrabold text-amber mb-2">AccessMap Nairobi</h2>
            <p className="text-sm text-white/50 max-w-xs">
              A community-powered directory helping everyone navigate Nairobi accessibly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-amber mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" onClick={scrollToTop} className="text-white/70 hover:text-amber transition">Home</Link></li>
              <li><Link to="/directory" onClick={scrollToTop} className="text-white/70 hover:text-amber transition">Directory</Link></li>
              <li><Link to="/report" onClick={scrollToTop} className="text-white/70 hover:text-amber transition">Submit a Report</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-amber mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-white/50">
              <li>Nairobi, Kenya</li>
              <li>accessmapnairobi@gmail.com</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-white/10 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} AccessMap Nairobi. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with ❤️ for Nairobi</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;