import { useEffect, useState } from "react";
import { MapPin, FileText, CheckCircle } from "lucide-react";

/*
 * StatsCounter
 * Displays three live statistics on the home page:
 * - Total number of venues listed
 * - Total number of community reports submitted
 * - Total number of accessibility features recorded across all venues
 *
 * All counts are read directly from localStorage so they always
 * reflect the latest data without needing a page refresh.
 *
 * Used by: Home.jsx
 */
export default function StatsCounter() {

  // Holds the three stat values — starts at zero before localStorage is read
  const [stats, setStats] = useState({ venues: 0, reports: 0, features: 0 });

  useEffect(() => {
    // Read the venues and reports arrays from localStorage
    const venues  = JSON.parse(localStorage.getItem("accessmap_venues")  || "[]");
    const reports = JSON.parse(localStorage.getItem("accessmap_reports") || "[]");

    // Count how many individual accessibility features are marked as true
    // across all venues combined
    const featureKeys = [
      "ramp", "lift", "accessibleToilet", "accessibleParking",
      "tactilePaving", "wideCorridors", "audioAssistance", "staffAssistance"
    ];

    let featureCount = 0;
    venues.forEach(venue => {
      featureKeys.forEach(key => {
        if (venue.accessibility?.[key]) featureCount++;
      });
    });

    // Update state with the calculated counts
    setStats({
      venues: venues.length,
      reports: reports.length,
      features: featureCount,
    });
  }, []);

  // Each item defines what icon, label, value, and color to display
  const items = [
    { icon: MapPin,      label: "Venues Listed",         value: stats.venues,   color: "text-forest" },
    { icon: FileText,    label: "Community Reports",      value: stats.reports,  color: "text-amber"  },
    { icon: CheckCircle, label: "Accessibility Features", value: stats.features, color: "text-forest" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map(({ icon: Icon, label, value, color }) => (
        <div
          key={label}
          className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm"
        >
          <Icon size={28} className={`${color} mx-auto mb-2`} aria-hidden="true" />
          <div className="text-3xl font-bold text-ink">{value}</div>
          <div className="text-sm text-gray-500 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}