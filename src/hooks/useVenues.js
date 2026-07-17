import { useState, useEffect } from 'react'
import { getVenues, saveVenues, initStorage } from '../utils/localStorage'
import { seedVenues } from '../data/seedVenues'
import {seedReports} from '../data/seedReports'

/*
 * useVenues
 * A custom React hook that manages all venue data.
 * Loads seed venues into localStorage on the very first visit,
 * then reads all venues from localStorage on every subsequent load.
 * Provides functions to add new venues and look up venues by id or slug.
 *
 * Returns:
 *  - venues           {array}     All venues currently in localStorage
 *  - addVenue         {function}  Saves a new user-submitted venue to localStorage
 *  - getVenueById     {function}  Finds a single venue by its id
 *  - getVenueBySlug   {function}  Finds a single venue by its URL slug
 *
 * Used by: Directory.jsx, VenueDetail.jsx, ReportForm.jsx
 */

/*
 * generateSlug
 * Converts a venue name into a URL-friendly slug.
 * Example: "Kenyatta National Hospital" becomes "kenyatta-national-hospital"
 * Steps:
 *  1. Convert to lowercase
 *  2. Remove any characters that are not letters, numbers, spaces, or hyphens
 *  3. Trim leading and trailing spaces
 *  4. Replace spaces with hyphens
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function useVenues() {

  // Holds all venues in state — starts empty before localStorage is read
  const [venues, setVenues] = useState([])

  // On first load, seed the data if it has not been seeded yet,
  // then read all venues from localStorage into state
  useEffect(() => {
    initStorage(seedVenues, seedReports)
    const stored = getVenues()
    setVenues(stored)
  }, [])

  /*
   * addVenue
   * Saves a new user-submitted venue to localStorage.
   * Before saving, checks if a venue with the same name and area already exists
   * to prevent duplicates. If a duplicate is found, returns an error object
   * instead of saving so the caller can handle it gracefully.
   * Automatically generates a slug and sets isSeeded to false.
   */
  function addVenue(venueData) {
    // Check for a duplicate — same name and same area
    const duplicate = venues.find(
      v =>
        v.name.trim().toLowerCase() === venueData.name.trim().toLowerCase() &&
        v.area === venueData.area
    )
    if (duplicate) {
      return {
        error: 'A venue with this name already exists in this area.',
        existing: duplicate,
      }
    }

    const newVenue = {
      ...venueData,
      id: 'v_' + Date.now(),            // unique id based on current timestamp
      slug: generateSlug(venueData.name),
      addedAt: new Date().toISOString(),
      isSeeded: false,                   // marks this as user-submitted, not seed data
    }
    const updated = [...venues, newVenue]
    saveVenues(updated)
    setVenues(updated)
    return newVenue
  }

  /*
   * getVenueById
   * Finds and returns a single venue by its id.
   * Returns null if no match is found.
   */
  function getVenueById(id) {
    return venues.find(v => v.id === id) || null
  }

  /*
   * getVenueBySlug
   * Finds and returns a single venue by its URL slug.
   * Used by VenueDetail.jsx to look up the venue from the URL parameter.
   * Returns null if no match is found.
   */
  function getVenueBySlug(slug) {
    return venues.find(v => v.slug === slug) || null
  }

  return { venues, addVenue, getVenueById, getVenueBySlug }
}