import { useState, useEffect } from 'react'
import { getVenues, saveVenues, initStorage } from '../utils/localStorage'
import { seedVenues } from '../data/seedVenues'

// Generate a URL-friendly slug from a venue name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function useVenues() {
  const [venues, setVenues] = useState([])

  useEffect(() => {
    initStorage(seedVenues)
    const stored = getVenues()
    setVenues(stored)
  }, [])

  function addVenue(venueData) {
    const duplicate = venues.find(
      v =>
        v.name.trim().toLowerCase() === venueData.name.trim().toLowerCase() &&
        v.area === venueData.area
    )
    if (duplicate) {
      return { error: 'A venue with this name already exists in this area.', existing: duplicate }
    }

    const newVenue = {
      ...venueData,
      id: 'v_' + Date.now(),
      slug: generateSlug(venueData.name),
      addedAt: new Date().toISOString(),
      isSeeded: false,
    }
    const updated = [...venues, newVenue]
    saveVenues(updated)
    setVenues(updated)
    return newVenue
  }

  function getVenueById(id) {
    return venues.find(v => v.id === id) || null
  }

  // ── New: look up venue by slug ──
  function getVenueBySlug(slug) {
    return venues.find(v => v.slug === slug) || null
  }

  return { venues, addVenue, getVenueById, getVenueBySlug }
}