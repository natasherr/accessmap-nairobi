import { Star } from 'lucide-react'

/**
 * StarRating
 * Display-only star rating component. NOT interactive.
 *
 * Props:
 *  - rating   {number}  Float rating e.g. 3.7 (computed average from reports)
 *  - maxStars {number}  Total stars to show — defaults to 5
 *  - size     {string}  'sm' for venue cards | 'lg' for VenueDetail page (Member C uses 'lg')
 */
export default function StarRating({ rating, maxStars = 5, size = 'sm' }) {
  const iconSize = size === 'lg' ? 22 : 16

  // Build array of 5 star states from the float rating
  // e.g. 3.7 → ['full', 'full', 'full', 'half', 'empty']
  const stars = Array.from({ length: maxStars }, (_, i) => {
    const position = i + 1
    if (rating >= position) return 'full'
    if (rating >= position - 0.5) return 'half'
    return 'empty'
  })

  return (
    <div
      role="img"
      aria-label={`${rating} out of ${maxStars} stars`}
      className="inline-flex items-center gap-0.5"
    >
      {stars.map((type, i) => (
        <span key={i} className="relative inline-block" aria-hidden="true">
          {/* Base: always an empty grey star */}
          <Star
            size={iconSize}
            className="text-gray-300"
            fill="none"
            strokeWidth={1.5}
          />

          {/* Overlay: filled or half-filled amber star on top */}
          {type !== 'empty' && (
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: type === 'half' ? '50%' : '100%' }}
            >
              <Star
                size={iconSize}
                className="text-amber"
                fill="#F5A623"
                strokeWidth={1.5}
              />
            </span>
          )}
        </span>
      ))}
    </div>
  )
}