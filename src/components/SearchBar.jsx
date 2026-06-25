import { Search, X } from 'lucide-react'

/**
 * SearchBar
 * Controlled search input for filtering venues by name or area.
 *
 * Props:
 *  - value       {string}    Current search text (controlled by Directory.jsx)
 *  - onChange    {function}  Called with new string on every keystroke
 *  - placeholder {string}    Input placeholder text
 *
 * Used by: Directory.jsx (Member B)
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search venues by name or area...',
}) {
  return (
    <div className="relative w-full">
      {/* Visually hidden label for screen readers */}
      <label htmlFor="venue-search" className="sr-only">
        Search venues
      </label>

      {/* Search icon — left side */}
      <Search
        size={16}
        aria-hidden="true"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />

      {/* Input */}
      <input
        id="venue-search"
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search venues"
        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200
                   bg-white text-sm text-ink placeholder-gray-400
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-forest
                   focus-visible:border-forest transition-colors"
      />

      {/* Clear button — only appears when there is text */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2
                     text-gray-400 hover:text-ink transition-colors
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}