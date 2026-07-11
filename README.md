# AccessMap Nairobi

A community-powered accessibility directory for Nairobi venues — built with React, Vite, and Tailwind CSS.

---

## About the Project

AccessMap Nairobi is a 100% frontend web application that helps people with disabilities and their carers find accessible venues across Nairobi. Users can search for hospitals, markets, schools, banks, and malls — and instantly see whether each venue has ramps, lifts, accessible toilets, accessible parking, and more.

All data is community-powered — anyone can submit a report in under two minutes. No backend or database is needed; all data is stored in the browser via localStorage.

---

## Features

- **Live search** — filter venues by name, area, or category in real time
- **Filter sidebar** — filter by Nairobi area, accessibility features, and minimum star rating
- **Star rating system** — community reports include 1–5 star ratings averaged per venue
- **4-step report form** — submit a venue report with accessibility observations
- **Readable URLs** — venue pages use slugs e.g. `/venue/kenyatta-national-hospital`
- **Google Maps integration** — one-click directions to any venue
- **WhatsApp share** — share venue pages directly to WhatsApp
- **33 seed venues** — pre-loaded real Nairobi venues across 6 categories
- **Duplicate prevention** — prevents the same venue from being added twice
- **Responsive design** — works on mobile, tablet, and desktop
- **Print venue card** — clean print view for carers and social workers


---

## Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/natasherr/accessmap-nairobi.git
   cd accessmap-nairobi
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the development server**
```bash
   npm run dev
```

4. **Open in browser**
http://localhost:5173/

---

## How It Works

### Data Storage
All venue and report data is stored in the browser's localStorage under three keys:
- `accessmap_venues` — array of all venue objects
- `accessmap_reports` — array of all community reports
- `accessmap_meta` — metadata including whether seed data has been loaded

On first visit, 33 real Nairobi venues are automatically seeded into localStorage. User-submitted venues and reports are saved on top of this.

### Accessibility Badges
Each venue can have up to 8 accessibility badges:
- ♿ Ramp / step-free entry
- 🛗 Lift / elevator
- 🚻 Accessible toilet
- 🅿️ Accessible parking
- 🦯 Tactile paving
- 🦽 Wide corridors
- 🔊 Audio assistance
- 🧑‍🦽 Staff assistance

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, search, stats, how it works, recent venues |
| `/directory` | Directory | Searchable, filterable venue listing |
| `/venue/:slug` | Venue Detail | Full venue profile with community reports |
| `/report` | Report Form | 4-step form to submit a venue report |
| `/about` | About | Mission, Kenya disability stats, how to share |
| `*` | 404 | Friendly not-found page |



---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ for Nairobi
