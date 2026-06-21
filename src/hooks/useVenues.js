import { useState, useEffect } from 'react'
import { getVenues, saveVenues, initStorage } from '../utils/localStorage'
import { seedVenues } from '../data/seedVenues'

export function useVenues() {
  const [venues, setVenues] = useState([])

  // Load venues from localStorage on first render
  useEffect(() => {
    initStorage(seedVenues) // seeds data only if not already seeded
    const stored = getVenues()
    setVenues(stored)
  }, [])

  // Add a brand new venue (user-submitted)
  function addVenue(venueData) {
    const newVenue = {
      ...venueData,
      id: 'v_' + Date.now(),
      addedAt: new Date().toISOString(),
      isSeeded: false,
    }
    const updated = [...venues, newVenue]
    saveVenues(updated)
    setVenues(updated)
    return newVenue
  }

  // Get a single venue by its ID
  function getVenueById(id) {
    return venues.find(v => v.id === id) || null
  }

  return { venues, addVenue, getVenueById }
}