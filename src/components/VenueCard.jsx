import { Link } from 'react-router-dom'
import { MapPin, FileText } from 'lucide-react'
import { BADGES } from '../constants/badges'
import AccessBadge from './AccessBadge'
import StarRating from './StarRating'

/**
 * VenueCard
 * Displays a single venue as a card in the directory listing.
 *
 * Props:
 *  - venue   {object}  A venue object from useVenues()
 *  - reports {array}   All reports for this venue from useReports()
 *                      Pass as: reports.filter(r => r.venueId === venue.id)
 *
 * Used by: Directory.jsx (Member B)
 * Links to: /venue/:id — picked up by VenueDetail.jsx (Member C)
 * StarRating size="lg" is available for Member C to use on VenueDetail
 */
export default function VenueCard({ venue, reports }) {
  // Compute average rating from this venue's reports
  const avgRating =
    reports.length > 0
      ? Math.round(
          (reports.reduce((sum, r) => sum + r.rating, 0) / reports.length) * 10
        ) / 10
      : null

  // Google Maps directions link — no API key needed
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venue.name + ' Nairobi'
  )}`

  return (
    <article
      className="bg-white rounded-2xl shadow-sm border border-gray-100
                 hover:shadow-md transition-shadow duration-200
                 focus-within:ring-2 focus-within:ring-forest
                 flex flex-col"
      aria-label={`Venue: ${venue.name}`}
    >
      {/* ── Card Header ── */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-ink leading-tight">
              {venue.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
              <MapPin size={13} aria-hidden="true" />
              {venue.area} · {venue.category}
            </p>
          </div>

          {/* Rating or "No ratings" */}
          <div className="flex flex-col items-end shrink-0">
            {avgRating !== null ? (
              <>
                <StarRating rating={avgRating} size="sm" />
                <span className="text-xs text-gray-400 mt-0.5">
                  {avgRating} · {reports.length}{' '}
                  {reports.length === 1 ? 'report' : 'reports'}
                </span>
              </>
            ) : (
              <span className="text-xs text-gray-400 italic">No ratings yet</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Accessibility Badges ── */}
      <div className="p-4 flex-1">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
          Accessibility features
        </p>
        <div className="flex flex-wrap gap-1.5">
          {BADGES.map(badge => (
            <AccessBadge
              key={badge.key}
              emoji={badge.emoji}
              label={badge.label}
              colorClass={badge.colorClass}
              isPresent={venue.accessibility[badge.key]}
            />
          ))}
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="p-4 pt-0 flex gap-2">
        {/* Internal link → VenueDetail.jsx (Member C reads venue id via useParams) */}
        <Link
          to={`/venue/${venue.id}`}
          className="flex-1 text-center text-sm font-medium
                     bg-forest text-white rounded-xl py-2 px-3
                     hover:bg-green-800 transition-colors
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
        >
          View Details
        </Link>

        {/* External link → Google Maps, no API key needed */}
        
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${venue.name} on Google Maps`}
          className="flex items-center gap-1 text-sm font-medium
                     border border-forest text-forest rounded-xl py-2 px-3
                     hover:bg-mint transition-colors
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
        <a>
          <MapPin size={14} aria-hidden="true" />
          Directions
        </a>
      </div>

      {/* Report count footer */}
      {reports.length > 0 && (
        <div className="px-4 pb-3 flex items-center gap-1 text-xs text-gray-400">
          <FileText size={12} aria-hidden="true" />
          {reports.length} community {reports.length === 1 ? 'report' : 'reports'} submitted
        </div>
      )}
    </article>
  )
}