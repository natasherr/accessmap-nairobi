import { useState, useEffect } from 'react'
import { getReports, saveReports } from '../utils/localStorage'

export function useReports() {
  const [reports, setReports] = useState([])

  // Load reports from localStorage on first render
  useEffect(() => {
    const stored = getReports()
    setReports(stored)
  }, [])

  // Add a new community report
  function addReport(reportData) {
    const newReport = {
      ...reportData,
      id: 'r_' + Date.now(),
      submittedAt: new Date().toISOString(),
    }
    const updated = [...reports, newReport]
    saveReports(updated)
    setReports(updated)
    return newReport
  }

  // Get all reports for a specific venue
  function getReportsByVenueId(venueId) {
    return reports.filter(r => r.venueId === venueId)
  }

  // Get average star rating for a specific venue
  function getAverageRating(venueId) {
    const venueReports = getReportsByVenueId(venueId)
    if (venueReports.length === 0) return null
    const total = venueReports.reduce((sum, r) => sum + r.rating, 0)
    return Math.round((total / venueReports.length) * 10) / 10
  }

  return { reports, addReport, getReportsByVenueId, getAverageRating }
}