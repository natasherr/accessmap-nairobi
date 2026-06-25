import { Link } from "react-router-dom";
import { Search, ArrowRight, MapPin, ChevronRight, Rss } from "lucide-react";
import { useState, useEffect } from "react";
import StatsCounter from "../components/StatsCounter";

const NAIROBI_PHOTO =
  "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?auto=format&fit=crop&w=1600&q=80";

const HOW_STEPS = [
  {
    icon: "🔍",
    title: "Search",
    desc: "Type a venue name, area, or category — Westlands, KNH, Sarit Centre.",
  },
  {
    icon: "📋",
    title: "Read real reports",
    desc: "See exactly which features exist: ramp, lift, accessible toilet, parking.",
  },
  {
    icon: "✍️",
    title: "Submit your visit",
    desc: "Visited somewhere? Tick what you saw and leave a 2-minute report.",
  },
  {
    icon: "📲",
    title: "Share it",
    desc: "Send a venue link on WhatsApp so others in your circle can benefit.",
  },
];

const CATEGORIES = [
  { label: "Hospitals",  emoji: "🏥", q: "hospital"  },
  { label: "Markets",    emoji: "🛒", q: "market"    },
  { label: "Offices",    emoji: "🏢", q: "office"    },
  { label: "Schools",    emoji: "🎓", q: "school"    },
  { label: "Banks",      emoji: "🏦", q: "bank"      },
  { label: "Malls",      emoji: "🛍️", q: "mall"      },
];

export default function Home() {
  const [query, setQuery]           = useState("");
  const [recentVenues, setRecent]   = useState([]);

  useEffect(() => {
    const venues = JSON.parse(localStorage.getItem("accessmap_venues") || "[]");
    const sorted = [...venues].sort(
      (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
    );
    setRecent(sorted.slice(0, 3));
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/directory?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <main>

      {/* ── HERO ── */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url(${NAIROBI_PHOTO})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center text-white"
      >
        <span className="inline-block bg-amber text-ink text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          Nairobi Accessibility Directory
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl">
          Find venues that{" "}
          <span
            style={{
              background: "linear-gradient(90deg,#4ade80,#86efac)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            work for everyone
          </span>{" "}
          in Nairobi
        </h1>

        <p className="text-white/80 text-lg max-w-xl mb-10 leading-relaxed">
          A community-powered directory of accessible hospitals, markets,
          offices and schools — reported by real visitors.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-xl gap-2"
        >
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search venues, areas, categories…"
              className="w-full pl-10 pr-4 py-4 rounded-xl border-0 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-forest shadow-lg"
              aria-label="Search venues"
            />
          </div>
          <button
            type="submit"
            className="bg-forest text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-800 transition-colors text-sm shadow-lg whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Quick category pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.q}
              to={`/directory?q=${cat.q}`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20 transition-colors"
            >
              {cat.emoji} {cat.label}
            </Link>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1 text-white/50 text-xs animate-bounce">
          <span>Scroll down</span>
          <ChevronRight size={14} className="rotate-90" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-forest text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-green-200 text-sm text-center mb-6 uppercase tracking-wider font-medium">
            Community impact so far
          </p>
          <StatsCounter />
        </div>
      </section>

      {/* ── SUBMIT CTA BANNER ── */}
      <section className="bg-amber py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-ink mb-1">
              Been to an accessible venue in Nairobi?
            </h2>
            <p className="text-ink/70 text-sm">
              Submit a report in under 2 minutes. Your observation helps
              thousands of people make informed choices.
            </p>
          </div>
          <Link
            to="/report"
            className="shrink-0 bg-ink text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors text-sm flex items-center gap-2"
          >
            Submit a venue <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-offwhite">
        <div className="max-w-4xl mx-auto">
          <p className="text-forest text-sm font-semibold uppercase tracking-wider text-center mb-2">
            How it works
          </p>
          <h2 className="text-3xl font-bold text-ink text-center mb-12">
            Four steps, two minutes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {HOW_STEPS.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-forest hover:shadow-md transition-all text-center"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-bold text-ink text-sm mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT VENUES ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-forest text-sm font-semibold uppercase tracking-wider mb-1">
                Latest additions
              </p>
              <h2 className="text-2xl font-bold text-ink">Recently added venues</h2>
            </div>
            <Link
              to="/directory"
              className="text-forest text-sm font-medium flex items-center gap-1 hover:underline"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {recentVenues.length === 0 ? (
            <div className="bg-mint rounded-2xl p-12 text-center border-2 border-dashed border-forest/30">
              <MapPin size={40} className="mx-auto mb-3 text-forest/30" />
              <p className="font-semibold text-ink mb-1">No venues yet</p>
              <p className="text-gray-500 text-sm mb-5">
                Be the first person to submit an accessible venue in Nairobi.
              </p>
              <Link
                to="/report"
                className="inline-block bg-forest text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-800 transition-colors"
              >
                Submit the first venue
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {recentVenues.map(venue => (
                <Link
                  key={venue.id}
                  to={`/venue/${venue.id}`}
                  className="group block bg-white border border-gray-100 rounded-2xl p-5 hover:border-forest hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-mint flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-forest" />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink text-sm group-hover:text-forest transition-colors">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-gray-400">{venue.area}</p>
                    </div>
                  </div>
                  <span className="inline-block bg-mint text-forest text-xs px-2.5 py-1 rounded-full capitalize font-medium">
                    {venue.category}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(27,107,58,0.92), rgba(27,107,58,0.97)), url(${NAIROBI_PHOTO})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
        className="py-24 px-4 text-center text-white"
      >
        <Rss size={36} className="mx-auto mb-5 text-green-300" />
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 max-w-xl mx-auto leading-tight">
          Help build Nairobi's accessibility map
        </h2>
        <p className="text-green-100 text-base mb-8 max-w-md mx-auto leading-relaxed">
          Every report you submit makes the city more navigable for someone
          with a disability. It takes 2 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/report"
            className="bg-amber text-ink font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Submit a Venue Report
          </Link>
          <Link
            to="/directory"
            className="bg-white/10 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-sm"
          >
            Browse the Directory
          </Link>
        </div>
      </section>

    </main>
  );
}