import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Search, Plus, AlertTriangle, Send } from 'lucide-react'
import { useVenues } from '../hooks/useVenues'
import { useReports } from '../hooks/useReports'
import { BADGES, DEFAULT_ACCESSIBILITY } from '../constants/badges'
import { NAIROBI_AREAS } from '../constants/areas'

const STEPS = ['Location', 'Venue', 'Report', 'Confirm']
const CATEGORIES = ['hospital', 'mall', 'museum', 'restaurant', 'school', 'government', 'transport', 'hotel', 'other']
const RATING_LABELS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very good', 5: 'Excellent' }
const EMPTY_REPORT = { rating: 0, description: '', visitedAt: '', accessibility: { ...DEFAULT_ACCESSIBILITY } }

//  Sub-components 

function StepBar({ step }) {
  return (
    <div className="flex items-center justify-between relative mb-8 mt-4">
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2" />
      <motion.div className="absolute left-0 top-1/2 h-0.5 bg-[#1B6B3A] -translate-y-1/2"
        animate={{ width: `${((step - 1) / 3) * 100}%` }} transition={{ duration: 0.5 }} />
      {STEPS.map((label, i) => {
        const num = i + 1
        return (
          <motion.div key={num} initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }} transition={{ delay: num * 0.1 }}
            className="relative z-10 flex flex-col items-center gap-1.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${step >= num ? 'bg-[#1B6B3A] text-white' : 'bg-gray-200 text-gray-500'
              } ${step === num ? 'ring-4 ring-[#1B6B3A22]' : ''}`}>
              {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
            </div>
            <span className={`text-xs font-medium ${step >= num ? 'text-[#1B6B3A]' : 'text-gray-400'}`}>{label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

function VenueCard({ venue, selected, onSelect }) {
  const activeBadges = BADGES.filter(b => venue.accessibility[b.key])
  return (
    <div onClick={onSelect} className={`border rounded-xl p-4 cursor-pointer mb-2 transition-all ${selected ? 'border-[#1B6B3A] bg-green-50 shadow-[0_0_0_3px_#1B6B3A18]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}>
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="font-semibold text-gray-900">{venue.name}</div>
          <div className="text-sm text-gray-500 mt-0.5">{venue.area} · {venue.address}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{venue.category}</div>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${selected ? 'bg-[#1B6B3A] border-[#1B6B3A]' : 'border-gray-300'}`}>
          {selected && <CheckCircle2 className="w-3 h-3 text-white" />}
        </div>
      </div>
      {activeBadges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {activeBadges.slice(0, 4).map(b => (
            <span key={b.key} className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.colorClass}`}>
              {b.emoji} {b.label}
            </span>
          ))}
          {activeBadges.length > 4 && (
            <span className="text-xs text-gray-400 px-1 py-0.5">+{activeBadges.length - 4} more</span>
          )}
        </div>
      )}
    </div>
  )
}

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value
  return (
    <div>
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            className={`text-3xl leading-none transition-colors ${display >= n ? 'text-amber-400' : 'text-gray-300'}`}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}>★</button>
        ))}
      </div>
      <p className="text-sm text-gray-500 h-5">{display ? RATING_LABELS[display] : 'Select a rating'}</p>
    </div>
  )
}

//  Step screens 

function Step1({ venues, state, setState }) {
  const filtered = state.searchText.trim()
    ? venues.filter(v =>
      v.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
      v.area.toLowerCase().includes(state.searchText.toLowerCase()))
    : []

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-5">Find or create a venue</h3>

      <label className="text-sm font-semibold text-gray-600 block mb-1.5">Search existing venues</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={state.searchText}
          onChange={e => setState(s => ({ ...s, searchText: e.target.value, selectedVenue: null, mode: 'existing', error: '' }))}
          placeholder="Venue name or area…"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]" />
      </div>

      {state.searchText.trim() && (
        <div className="mt-2">
          {filtered.length === 0
            ? <p className="text-sm text-gray-400 py-2">No venues found for "{state.searchText}"</p>
            : filtered.map(v => (
              <VenueCard key={v.id} venue={v} selected={state.selectedVenue?.id === v.id}
                onSelect={() => setState(s => ({ ...s, selectedVenue: v, mode: 'existing', error: '' }))} />
            ))
          }
        </div>
      )}

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" /><span className="text-sm text-gray-400">or</span><div className="flex-1 h-px bg-gray-200" />
      </div>

      <button onClick={() => setState(s => ({ ...s, mode: 'new', selectedVenue: null, searchText: '', error: '', step: 2 }))}
        className="w-full p-3.5 border-2 border-dashed border-[#1B6B3A] rounded-xl bg-green-50 text-[#1B6B3A] font-semibold text-sm hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" /> Create a new venue
      </button>

      {state.error && <p className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{state.error}</p>}

      <button disabled={!state.selectedVenue}
        onClick={() => {
          if (!state.selectedVenue) { setState(s => ({ ...s, error: 'Please select a venue to continue.' })); return }
          setState(s => ({ ...s, error: '', step: 2 }))
        }}
        className="mt-4 w-full p-3.5 bg-[#1B6B3A] text-white rounded-xl font-semibold text-sm hover:bg-[#145A2B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
        Continue with selected venue →
      </button>
    </div>
  )
}

function Step2({ state, setState, onSaveNewVenue }) {
  const goBack = () => setState(s => ({ ...s, step: 1 }))

  if (state.mode === 'existing') {
    const v = state.selectedVenue
    const activeBadges = BADGES.filter(b => v.accessibility[b.key])
    return (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-5">Confirm venue</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <div className="font-bold text-lg text-gray-900 mb-0.5">{v.name}</div>
          <div className="text-sm text-gray-500 mb-0.5">{v.address}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">{v.area} · {v.category}</div>
          <div className="text-sm font-semibold text-gray-600 mb-2">Reported accessibility features</div>
          <div className="flex flex-wrap gap-2">
            {activeBadges.length
              ? activeBadges.map(b => (
                <span key={b.key} className={`text-xs px-2.5 py-1 rounded-full font-medium ${b.colorClass}`}>
                  {b.emoji} {b.label}
                </span>))
              : <span className="text-sm text-gray-400">None recorded yet</span>
            }
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={goBack} className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-600 font-semibold text-sm hover:bg-gray-50">← Back</button>
          <button onClick={() => setState(s => ({ ...s, step: 3 }))}
            className="flex-[2] p-3 bg-[#1B6B3A] text-white rounded-xl font-semibold text-sm hover:bg-[#145A2B]">
            Confirm & continue →
          </button>
        </div>
      </div>
    )
  }

  // New venue — no accessibility fields here
  const nv = state.newVenue
  const valid = nv.name.trim() && nv.area && nv.address.trim() && nv.category
  const update = (field, value) => setState(s => ({ ...s, newVenue: { ...s.newVenue, [field]: value } }))

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">New venue details</h3>
      <p className="text-sm text-gray-500 mb-5">Basic details only — you'll record what you observed in the next step.</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">Venue name</label>
          <input value={nv.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Westgate Mall"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">Area</label>
          <select value={nv.area} onChange={e => update('area', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]">
            <option value="">Select area…</option>
            {NAIROBI_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">Address</label>
          <input value={nv.address} onChange={e => update('address', e.target.value)} placeholder="e.g. Mwanzi Rd, Westlands"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">Category</label>
          <select value={nv.category} onChange={e => update('category', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]">
            <option value="">Select category…</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
      </div>

      {!valid && (
        <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg mb-4">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" /> Please fill in all four fields to continue.
        </div>
      )}
      <div className="flex gap-3">
        <button onClick={goBack} className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-600 font-semibold text-sm hover:bg-gray-50">← Back</button>
        <button disabled={!valid} onClick={onSaveNewVenue}
          className="flex-[2] p-3 bg-[#1B6B3A] text-white rounded-xl font-semibold text-sm hover:bg-[#145A2B] disabled:opacity-40 disabled:cursor-not-allowed">
          Save & continue →
        </button>
      </div>
    </div>
  )
}

function Step3({ state, setState }) {
  const r = state.report
  const valid = r.rating > 0 && r.visitedAt.trim()
  const updateReport = (field, value) => setState(s => ({ ...s, report: { ...s.report, [field]: value } }))
  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">Your report</h3>
      <p className="text-sm text-gray-500 mb-5">
        Record what you personally observed at <span className="font-semibold text-gray-700">{state.selectedVenue?.name}</span>.
      </p>

      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-600 block mb-2">Overall rating</label>
        <StarRating value={r.rating} onChange={val => updateReport('rating', val)} />
      </div>

      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-600 block mb-1">Date visited</label>
        <input type="date" value={r.visitedAt} max={today}
          onChange={e => updateReport('visitedAt', e.target.value)}
          className="p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]" />
      </div>

      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-600 block mb-1">
          Description <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <textarea value={r.description} onChange={e => updateReport('description', e.target.value)}
          placeholder="Describe your experience — what worked well, what didn't…"
          rows={4} className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] resize-none" />
      </div>

      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-600 block mb-1">Accessibility features observed</label>
        <p className="text-sm text-gray-400 mb-3">Tick only what you personally saw or used during your visit.</p>
        <div className="flex flex-wrap gap-2">
          {BADGES.map(b => (
            <label key={b.key} className={`flex items-center gap-1.5 text-sm cursor-pointer px-3 py-1.5 rounded-lg border transition-colors ${r.accessibility[b.key] ? 'bg-green-50 border-[#1B6B3A] text-[#1B6B3A]' : 'bg-gray-50 border-gray-200 text-gray-500'
              }`}>
              <input type="checkbox" checked={r.accessibility[b.key]}
                onChange={e => updateReport('accessibility', { ...r.accessibility, [b.key]: e.target.checked })}
                className="accent-[#1B6B3A]" />
              {b.emoji} {b.label}
            </label>
          ))}
        </div>
      </div>

      {!valid && (
        <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg mb-4">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" /> Please add a rating and the date of your visit.
        </div>
      )}
      <div className="flex gap-3">
        <button onClick={() => setState(s => ({ ...s, step: 2 }))}
          className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-600 font-semibold text-sm hover:bg-gray-50">← Back</button>
        <button disabled={!valid} onClick={() => setState(s => ({ ...s, step: 4 }))}
          className="flex-[2] p-3 bg-[#1B6B3A] text-white rounded-xl font-semibold text-sm hover:bg-[#145A2B] disabled:opacity-40 disabled:cursor-not-allowed">
          Review & confirm →
        </button>
      </div>
    </div>
  )
}

function Step4({ state, onSubmit, setState}) {
  const v = state.selectedVenue
  const r = state.report
  const accOn = BADGES.filter(b => r.accessibility[b.key])
  const accOff = BADGES.filter(b => !r.accessibility[b.key])
  const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)
  const dateLabel = new Date(r.visitedAt + 'T12:00:00').toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-5">Review your report</h3>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Venue</p>
        <p className="font-semibold text-gray-900">{v.name}</p>
        <p className="text-sm text-gray-500">{v.address} · {v.area}</p>
      </div>
      <hr className="border-gray-100 mb-4" />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Rating</p>
          <p className="text-xl text-amber-400 tracking-widest">{stars}</p>
          <p className="text-sm text-gray-500">{RATING_LABELS[r.rating]}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Date visited</p>
          <p className="text-sm text-gray-900">{dateLabel}</p>
        </div>
      </div>
      <hr className="border-gray-100 mb-4" />

      {r.description && (
        <>
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed">{r.description}</p>
          </div>
          <hr className="border-gray-100 mb-4" />
        </>
      )}

      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Accessibility observed</p>
        <div className="flex flex-wrap gap-2">
          {accOn.map(b => (
            <span key={b.key} className={`text-xs px-2.5 py-1 rounded-full font-medium ${b.colorClass}`}>
              {b.emoji} {b.label}
            </span>
          ))}
          {accOff.map(b => (
            <span key={b.key} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-400 line-through">
              {b.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setState(s => ({ ...s, step: 3 }))} className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-600 font-semibold text-sm hover:bg-gray-50">← Back</button>
        <button onClick={onSubmit}
          className="flex-[2] p-3 bg-[#1B6B3A] text-white rounded-xl font-semibold text-sm hover:bg-[#145A2B] flex items-center justify-center gap-2">
          <Send className="w-4 h-4" /> Submit report
        </button>
      </div>
    </div>
  )
}

//  Main component 

const INITIAL_STATE = {
  step: 1, mode: null, selectedVenue: null,
  newVenue: { name: '', area: '', address: '', category: '' },
  report: { rating: 0, description: '', visitedAt: '', accessibility: { ...DEFAULT_ACCESSIBILITY } },
  searchText: '', error: '', submitted: false,
}

export default function ReportForm() {
  const { venues, addVenue } = useVenues()
  const { addReport } = useReports()
  const [state, setState] = useState(INITIAL_STATE)

  const handleSaveNewVenue = () => {
    const saved = addVenue({
      ...state.newVenue,
      accessibility: { ...DEFAULT_ACCESSIBILITY }, // all false — report fills this in
    })
    setState(s => ({ ...s, selectedVenue: saved, step: 3 }))
  }

  const handleSubmit = () => {
    addReport({
      venueId: state.selectedVenue.id,
      rating: state.report.rating,
      description: state.report.description,
      visitedAt: state.report.visitedAt,
      accessibility: state.report.accessibility,
    })
    setState(s => ({ ...s, submitted: true }))
  }

  if (state.submitted) {
    return (
      <div className="min-h-screen bg-[#E8F5EC] p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-md w-full">
          <CheckCircle2 className="w-16 h-16 text-[#1B6B3A] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Report submitted</h2>
          <p className="text-sm text-gray-500 mb-6">
            Thanks for enlightening others on <span className="font-semibold text-gray-700">{state.selectedVenue?.name}'s</span> accessibility.
          </p>
          <button onClick={() => setState(INITIAL_STATE)}
            className="px-6 py-3 bg-[#1B6B3A] text-white rounded-xl font-semibold text-sm hover:bg-[#145A2B] flex items-center gap-2 mx-auto">
            <Plus className="w-4 h-4" /> Submit another report
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E8F5EC] p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-1">Create an accessibility report</h1>
        <p className="text-sm text-gray-500 mb-6">Help others find accessible venues across Nairobi</p>

        <StepBar step={state.step} />

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {state.step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
              <Step1 venues={venues} state={state} setState={setState} />
            </motion.div>
          )}
          {state.step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
              <Step2 state={state} setState={setState} onSaveNewVenue={handleSaveNewVenue} />
            </motion.div>
          )}
          {state.step === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
              <Step3 state={state} setState={setState} />
            </motion.div>
          )}
          {state.step === 4 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
              < Step4 state={state} onSubmit={handleSubmit} setState={setState} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}