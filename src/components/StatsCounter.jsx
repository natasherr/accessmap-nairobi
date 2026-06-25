import { useEffect, useState } from "react";
import { MapPin, FileText, CheckCircle } from "lucide-react";

export default function StatsCounter() {
  const [stats, setStats] = useState({ venues: 0, reports: 0, features: 0 });

  useEffect(() => {
    // Read live counts from localStorage
    const venues  = JSON.parse(localStorage.getItem("accessmap_venues")  || "[]");
    const reports = JSON.parse(localStorage.getItem("accessmap_reports") || "[]");

    // Count total accessibility features recorded across all venues
    const featureKeys = ["ramp","lift","accessibleToilet","accessibleParking",
                         "tactilePaving","wideCorridors","audioAssistance","staffAssistance"];
    let featureCount = 0;
    venues.forEach(v => {
      featureKeys.forEach(k => { if (v.accessibility?.[k]) featureCount++; });
    });

    setStats({ venues: venues.length, reports: reports.length, features: featureCount });
  }, []);

  const items = [
    { icon: MapPin,      label: "Venues Listed",        value: stats.venues,   color: "text-forest" },
    { icon: FileText,    label: "Community Reports",     value: stats.reports,  color: "text-amber"  },
    { icon: CheckCircle, label: "Accessibility Features", value: stats.features, color: "text-forest" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm">
          <Icon size={28} className={`${color} mx-auto mb-2`} aria-hidden="true" />
          <div className="text-3xl font-bold text-ink">{value}</div>
          <div className="text-sm text-gray-500 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}