import { Link } from "react-router-dom";
import { MapPin, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-amber" />
            <span className="font-bold text-lg">AccessMap Nairobi</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            A community-powered accessibility directory helping people with
            disabilities find accessible venues across Nairobi.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-400">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/directory" className="text-gray-300 hover:text-white transition-colors">
                Venue Directory
              </Link>
            </li>
            <li>
              <Link to="/report" className="text-gray-300 hover:text-white transition-colors">
                Submit a Report
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About the Project
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-400">
            Share
          </h3>
          
            href="https://wa.me/?text=Check%20out%20AccessMap%20Nairobi!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Share on WhatsApp
          </a>
        </div>

      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        {year} AccessMap Nairobi. Made with love for the Nairobi community.
      </div>
    </footer>
  );
}