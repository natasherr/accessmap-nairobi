import { useState, useMemo } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useVenues } from '../hooks/useVenues'
import { useReports } from '../hooks/useReports'
import { filterVenues } from '../utils/filters'
import SearchBar from '../components/SearchBar'
import FilterSidebar, { DEFAULT_FILTERS } from '../components/FilterSidebar'
import VenueCard from '../components/VenueCard'

/**
 * Directory
 * Main venue listing page — rendered at route /directory
 * Ties together SearchBar, FilterSidebar, and VenueCard.
 *
 * Data flow:
 *  useVenues()  → venues array from localStorage
 *  useReports() → reports array from localStorage
 *  filterVenues(venues, reports, filters) → filtered + sorted results
 *
 * Member C: VenueCard links to /venue/:id — your VenueDetail reads id via useParams()
 * Member D: This page is imported into App.jsx routing — no changes needed there
 */
export default function Directory() {
  const { venues }   = useVenues()
  const { reports }  = useReports()

  // ── Filter state — keys must match filterVenues() in filters.js exactly ──
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  // ── Mobile: sidebar open/closed ──
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Run filtering + sorting — only recomputes when venues/reports/filters change ──
  const filteredVenues = useMemo(
    () => filterVenues(venues, reports, filters),
    [venues, reports, filters]
  )

  // ── Active filter count for mobile badge ──
  const activeFilterCount = [
    filters.area !== 'All areas',
    filters.badges.length > 0,
    filters.minRating > 0,
    filters.sortBy !== 'recent',
  ].filter(Boolean).length

  // ── Loading state — venues array is empty before localStorage loads ──
  const isLoading = venues.length === 0

  return (
    <main className="min-h-screen bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink">
            Find Accessible Venues in Nairobi
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isLoading
              ? 'Loading venues...'
              : `Showing ${filteredVenues.length} of ${venues.length} venues`
            }
          </p>
        </div>

        {/* ── Search bar — full width above layout ── */}
        <div className="mb-4">
          <SearchBar
            value={filters.searchText}
            onChange={val => setFilters(f => ({ ...f, searchText: val }))}
          />
        </div>

        {/* ── Mobile: Filter toggle button ── */}
        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(prev => !prev)}
            aria-expanded={sidebarOpen}
            aria-controls="filter-sidebar"
            className="flex items-center gap-2 text-sm font-medium
                       border border-gray-200 bg-white rounded-xl px-4 py-2
                       focus:outline-none focus-visible:ring-2
                       focus-visible:ring-forest transition-colors"
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="bg-forest text-white text-xs px-2 py-0.5 rounded-full"
                aria-label={`${activeFilterCount} active filters`}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Main layout: sidebar + venue grid ── */}
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-6">

          {/* ── Sidebar ── */}
          <div
            id="filter-sidebar"
            className={`
              mb-6 lg:mb-0
              ${sidebarOpen ? 'block' : 'hidden'}
              lg:block
            `}
          >
            <div className="lg:sticky lg:top-6">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
              />
            </div>
          </div>

          {/* ── Venue Grid ── */}
          <div>
            {/* Loading skeletons */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3].map(n => (
                  <div
                    key={n}
                    className="bg-white rounded-2xl border border-gray-100
                               shadow-sm h-64 animate-pulse"
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}

            {/* Empty state — filters returned nothing */}
            {!isLoading && filteredVenues.length === 0 && (
              <div className="flex flex-col items-center justify-center
                              py-16 text-center">
                <p className="text-4xl mb-3" aria-hidden="true">🔍</p>
                <h2 className="text-base font-semibold text-ink mb-1">
                  No venues match your filters
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Try adjusting your search or clearing some filters.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="text-sm font-medium bg-forest text-white
                             rounded-xl px-5 py-2
                             focus:outline-none focus-visible:ring-2
                             focus-visible:ring-forest transition-colors
                             hover:bg-green-800"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Venue cards grid */}
            {!isLoading && filteredVenues.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredVenues.map(venue => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    reports={reports.filter(r => r.venueId === venue.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}