import { BADGES } from '../constants/badges'
import AccessBadge from './AccessBadge'

// Inside VenueCard, this one map call renders all 8 badges:
{BADGES.map(badge => (
  <AccessBadge
    key={badge.key}
    emoji={badge.emoji}
    label={badge.label}
    colorClass={badge.colorClass}
    isPresent={venue.accessibility[badge.key]}
  />
))}