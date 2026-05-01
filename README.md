<p align="center">
  <img src="public/favicon.svg" width="64" height="64" alt="Alitech Logo" />
</p>

<h1 align="center">ALITECH</h1>
<p align="center"><strong>Premium Electronics Store — Buy · Repair · Trade-In</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/License-Private-red" />
</p>

---

## 📋 Overview

**Alitech** is a modern, premium e-commerce web application for selling, repairing, and trading-in electronics gadgets. Built with a luxury dark-themed design language inspired by Apple, Samsung, and Vertu — yet accessible enough for budget-conscious shoppers.

### What We Sell
- **Phones** — iPhone, Samsung Galaxy, Google Pixel, Xiaomi Redmi, Tecno, Infinix, Itel
- **Laptops** — MacBook, Dell XPS, HP Spectre, Lenovo ThinkPad, ASUS ROG, Acer, Surface
- **Tablets** — iPad Pro, Samsung Galaxy Tab, Lenovo Tab
- **Smartwatches** — Apple Watch, Samsung Galaxy Watch
- **Game Consoles** — PlayStation 5, Nintendo Switch
- **Audio** — AirPods, Sony WH-1000XM headphones, JBL
- **Accessories** — Cases, chargers, cables, and more

### Services
- 🔧 **Professional Repair** — Screen, battery, water damage, charging port, software
- 🔄 **Trade-In Program** — Get instant value for your old devices
- 🔥 **Flash Deals** — Weekly rotating discounts up to 40% off

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ 
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/alitech.git
cd alitech

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at **http://localhost:5173/**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19.1 | UI component library |
| [Vite](https://vite.dev/) | 8.0 | Build tool & dev server |
| [React Router](https://reactrouter.com/) | 7.14 | Client-side routing |
| [Lucide React](https://lucide.dev/) | 1.8 | Icon library (280+ icons) |
| Vanilla CSS | — | Custom design system |
| [Google Fonts](https://fonts.google.com/) | — | Space Grotesk + Inter |

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--black` | `#0A0A0A` | Primary background |
| `--charcoal` | `#1A1A1A` | Card backgrounds |
| `--gold` | `#D4A853` | Primary accent |
| `--gold-light` | `#F5D799` | Gradient highlight |
| `--blue` | `#2563EB` | Secondary accent |
| `--green` | `#22C55E` | Success states |
| `--red` | `#EF4444` | Sale badges / errors |

### Design Principles
- **Luxury Dark Theme** — Rich blacks with gold accents
- **Glassmorphism** — Frosted glass cards with backdrop blur
- **Micro-Animations** — Fade-in reveals, hover transforms, floating particles
- **Mobile-First** — Fully responsive with drawer navigation

---

## 📂 Project Structure

```
alitech/
├── public/
│   └── favicon.svg              # Gold "A" on black favicon
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Router + all page routes
│   ├── index.css                # Global design system
│   │
│   ├── context/
│   │   └── CartContext.jsx      # Cart + Wishlist state (localStorage)
│   │
│   ├── data/
│   │   └── products.js          # Product catalog (19 items, 7 categories)
│   │
│   ├── components/
│   │   ├── Header/              # Sticky nav, search overlay, dropdowns
│   │   ├── Footer/              # Trust bar, newsletter, links, socials
│   │   ├── CartDrawer/          # Slide-out cart panel
│   │   ├── ProductCard/         # Product grid card with quick actions
│   │   └── Notification/        # Toast notification system
│   │
│   └── pages/
│       ├── Home/                # Hero carousel, categories, featured, testimonials
│       ├── Shop/                # Product listing with filters + sorting
│       ├── ProductDetail/       # Single product view with tabs
│       ├── Auth/                # Login / Sign up forms
│       ├── Deals/               # Flash deals page
│       ├── Repair/              # Repair services + booking
│       ├── TradeIn/             # 3-step trade-in wizard
│       ├── About/               # Company story + values
│       ├── Contact/             # Contact form + info
│       ├── Wishlist/            # Saved products
│       └── FAQ/                 # Searchable FAQ accordion
│
├── index.html                   # HTML entry with SEO meta
├── vite.config.js               # Vite + React plugin config
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

---

## 📄 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero carousel, brands, categories, featured products, services, testimonials |
| `/shop` | Shop | Full product catalog with filters, sorting, grid/list views |
| `/shop/:category` | Shop (filtered) | Category-specific view (phones, laptops, tablets, etc.) |
| `/product/:id` | Product Detail | Image, specs, colors, quantity, related products |
| `/deals` | Deals | Discounted products with savings badges |
| `/repair` | Repair | Repair services, pricing, stats, booking CTA |
| `/trade-in` | Trade-In | 3-step device valuation wizard |
| `/auth` | Auth | Login / Sign up with toggle |
| `/about` | About | Company story, stats, values |
| `/contact` | Contact | Contact form, phone, email, address, hours |
| `/wishlist` | Wishlist | Saved favorite products |
| `/faq` | FAQ | Searchable accordion Q&A |
| `/privacy` | Privacy Policy | Policy placeholder |
| `/terms` | Terms of Service | Policy placeholder |
| `/returns` | Return Policy | Policy placeholder |

---

## ✨ Key Features

### Shopping Experience
- 🛒 **Persistent Cart** — Saved to localStorage, survives page reload
- ❤️ **Wishlist** — Heart icon on every product card
- 🔍 **Global Search** — Header search with keyword filtering
- 📊 **Product Filters** — Filter by brand, price range, condition
- 🔢 **Sort Options** — Featured, price (low/high), rating, name
- 📱 **Grid/List View** — Toggle between display modes
- 🏷️ **Smart Badges** — Hot Deal, Best Seller, New Arrival, discount %

### UI/UX
- ✨ **Scroll Animations** — Intersection Observer section reveals
- 🎠 **Hero Carousel** — Auto-rotating with manual navigation
- 🏃 **Brand Marquee** — Infinite scrolling brand logos
- 🔔 **Toast Notifications** — Success/info/warning alerts
- 📐 **Breadcrumb Navigation** — On shop and product pages
- 🛡️ **Trust Badges** — Free delivery, genuine products, easy returns, secure payment
- 📰 **Newsletter** — Email subscription section

### Responsive Design
- 📱 **Mobile Navigation** — Slide-out drawer menu
- 🎛️ **Mobile Filters** — Slide-out filter panel
- 👆 **Touch-Friendly** — Large tap targets, smooth scrolling

---

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 5173 |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |

---

## 🤝 Contributing

This is a private project. For questions or contributions, contact the project owner.

---

## 📜 License

This project is **private** and not licensed for public use.

---

<p align="center">
  Built with ❤️ for tech lovers<br/>
  <strong>Alitech</strong> — Your Trusted Electronics Partner
</p>
