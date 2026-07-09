import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, MapPin } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white transition-all duration-300 hover:-translate-y-0.5"
      : "text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-0.5";

  return (
    // Full‑width fixed bar – edge to edge
    <div className="relative top-0 left-0 right-0 z-50 bg-forest border-b border-white/10">
      {/* Inner container: centers content and adds horizontal padding */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-xl transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
        >
          <MapPin size={24} className="text-amber transition-transform duration-300 hover:rotate-12" aria-hidden="true" />
          <span>AccessMap Nairobi</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-base">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/directory" className={linkClass}>Directory</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink
            to="/report"
            className="group bg-amber text-ink px-4 py-2 rounded-full text-base font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber/40 hover:bg-yellow-400 active:translate-y-0"
          >
            + Report a Venue
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown – also full‑width, no rounded corners */}
      {menuOpen && (
        <div className="md:hidden bg-forest/70 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4 flex flex-col gap-3 text-base">
          <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/directory" className={linkClass} onClick={() => setMenuOpen(false)}>Directory</NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink
            to="/report"
            className="bg-amber text-ink px-4 py-2 rounded-full text-base font-medium text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-yellow-400 active:translate-y-0"
            onClick={() => setMenuOpen(false)}
          >
            + Report a Venue
          </NavLink>
        </div>
      )}
    </div>
  );
}