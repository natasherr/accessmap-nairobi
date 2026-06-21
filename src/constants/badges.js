export const BADGES = [
  {
    key: 'ramp',
    label: 'Ramp / step-free entry',
    emoji: '♿',
    colorClass: 'bg-green-100 text-green-800',
  },
  {
    key: 'lift',
    label: 'Lift / elevator',
    emoji: '🛗',
    colorClass: 'bg-blue-100 text-blue-800',
  },
  {
    key: 'accessibleToilet',
    label: 'Accessible toilet',
    emoji: '🚻',
    colorClass: 'bg-amber-100 text-amber-800',
  },
  {
    key: 'accessibleParking',
    label: 'Accessible parking',
    emoji: '🅿️',
    colorClass: 'bg-teal-100 text-teal-800',
  },
  {
    key: 'tactilePaving',
    label: 'Tactile paving',
    emoji: '🦯',
    colorClass: 'bg-purple-100 text-purple-800',
  },
  {
    key: 'wideCorridors',
    label: 'Wide corridors',
    emoji: '🦽',
    colorClass: 'bg-red-100 text-red-800',
  },
  {
    key: 'audioAssistance',
    label: 'Audio assistance',
    emoji: '🔊',
    colorClass: 'bg-gray-100 text-gray-800',
  },
  {
    key: 'staffAssistance',
    label: 'Staff assistance',
    emoji: '🧑‍🦽',
    colorClass: 'bg-pink-100 text-pink-800',
  },
]

// Default accessibility object — all false
// Use this as a template when creating new venues or reports
export const DEFAULT_ACCESSIBILITY = {
  ramp: false,
  lift: false,
  accessibleToilet: false,
  accessibleParking: false,
  tactilePaving: false,
  wideCorridors: false,
  audioAssistance: false,
  staffAssistance: false,
}