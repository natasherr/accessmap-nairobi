// Storage keys — single source of truth
export const KEYS = {
  VENUES:  'accessmap_venues',
  REPORTS: 'accessmap_reports',
  META:    'accessmap_meta',
}

// ── Read ──────────────────────────────────────────────
export function getVenues() {
  try {
    const data = localStorage.getItem(KEYS.VENUES)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to read venues from localStorage:', error)
    return []
  }
}

export function getReports() {
  try {
    const data = localStorage.getItem(KEYS.REPORTS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to read reports from localStorage:', error)
    return []
  }
}

export function getMeta() {
  try {
    const data = localStorage.getItem(KEYS.META)
    return data ? JSON.parse(data) : {}
  } catch (error) {
    console.error('Failed to read meta from localStorage:', error)
    return {}
  }
}

// ── Write ─────────────────────────────────────────────
export function saveVenues(venues) {
  try {
    localStorage.setItem(KEYS.VENUES, JSON.stringify(venues))
  } catch (error) {
    console.error('Failed to save venues to localStorage:', error)
  }
}

export function saveReports(reports) {
  try {
    localStorage.setItem(KEYS.REPORTS, JSON.stringify(reports))
  } catch (error) {
    console.error('Failed to save reports to localStorage:', error)
  }
}

export function saveMeta(meta) {
  try {
    localStorage.setItem(KEYS.META, JSON.stringify(meta))
  } catch (error) {
    console.error('Failed to save meta to localStorage:', error)
  }
}

// ── Seed check ────────────────────────────────────────
// Returns true if seed data has already been loaded
export function isSeeded() {
  try {
    const meta = getMeta()
    return meta.seeded === true
  } catch (error) {
    return false
  }
}

// ── Init ──────────────────────────────────────────────
// Call this once on app startup
// Loads seed data into localStorage only on first ever visit
export function initStorage(seedVenues) {
  if (isSeeded()) return // already seeded — don't overwrite user data

  saveVenues(seedVenues)
  saveReports([])
  saveMeta({
    seeded: true,
    lastUpdated: new Date().toISOString(),
  })
}