// Filter venues based on search text, area, badges, and minimum rating
export function filterVenues(venues, reports, filters) {
  const { searchText, area, badges, minRating, sortBy } = filters

  let results = [...venues]

  // Filter by search text (name or area)
  if (searchText && searchText.trim() !== '') {
    const query = searchText.toLowerCase()
    results = results.filter(
      v =>
        v.name.toLowerCase().includes(query) ||
        v.area.toLowerCase().includes(query)
    )
  }

  // Filter by area
  if (area && area !== 'All areas') {
    results = results.filter(v => v.area === area)
  }

  // Filter by accessibility badges
  // Only show venues that have ALL selected badges
  if (badges && badges.length > 0) {
    results = results.filter(v =>
      badges.every(badge => v.accessibility[badge] === true)
    )
  }

  // Filter by minimum star rating
  if (minRating && minRating > 0) {
    results = results.filter(v => {
      const venueReports = reports.filter(r => r.venueId === v.id)
      if (venueReports.length === 0) return false
      const avg =
        venueReports.reduce((sum, r) => sum + r.rating, 0) /
        venueReports.length
      return avg >= minRating
    })
  }

  // Sort results
  if (sortBy === 'highest-rated') {
    results.sort((a, b) => {
      const avgA = getAvg(a.id, reports)
      const avgB = getAvg(b.id, reports)
      return avgB - avgA
    })
  } else if (sortBy === 'most-reports') {
    results.sort((a, b) => {
      const countA = reports.filter(r => r.venueId === a.id).length
      const countB = reports.filter(r => r.venueId === b.id).length
      return countB - countA
    })
  } else if (sortBy === 'alphabetical') {
    results.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    // Default: most recently added
    results.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
  }

  return results
}

// Helper: get average rating for a venue
function getAvg(venueId, reports) {
  const venueReports = reports.filter(r => r.venueId === venueId)
  if (venueReports.length === 0) return 0
  return venueReports.reduce((sum, r) => sum + r.rating, 0) / venueReports.length
}