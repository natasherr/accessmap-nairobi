import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, MapPin } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-forest font-semibold border-b-2 border-forest pb-0.5"
      : "text-ink hover:text-forest transition-colors";

  return (
    <nav className="bg-offwhite border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-forest font-bold text-lg">
          <MapPin size={22} className="text-amber" aria-hidden="true" />
          <span>AccessMap Nairobi</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/directory" className={linkClass}>Directory</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink
            to="/report"
            className="bg-forest text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
          >
            + Report a Venue
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm border-t border-gray-100 pt-3">
          <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/directory" className={linkClass} onClick={() => setMenuOpen(false)}>Directory</NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink
            to="/report"
            className="bg-forest text-white px-4 py-2 rounded-lg text-sm font-medium text-center"
            onClick={() => setMenuOpen(false)}
          >
            + Report a Venue
          </NavLink>
        </div>
      )}
    </nav>
  );
}