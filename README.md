<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=32&pause=1000&color=00FFE0&center=true&vCenter=true&width=700&lines=Sachin+K+%E2%80%94+Personal+Portfolio;Computer+Science+Engineer;Machine+Learning+Enthusiast" alt="Typing SVG" />
</p>

<p align="center">
  <img src="portfolio_banner.png" width="100%" alt="Sachin K Portfolio Banner" />
</p>

<p align="center">
  <a href="https://sachinxcoder-chi.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Demo-🚀-00FFE0?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white" alt="D3.js" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62B" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

---

## 📖 Overview

A high-fidelity personal portfolio website built with React, Three.js, and D3.js. Features a dark luxury aesthetic with physics-based animations, WebGL particle backgrounds, interactive skill graphs, and fully responsive layouts. Deployed on Vercel with continuous integration.

**Live**: [sachinxcoder-chi.vercel.app](https://sachinxcoder-chi.vercel.app/)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🌌 **3D Wave Background** | Custom Three.js animated dotted wave surface across all pages, with auto-pause when tab is hidden to save GPU/battery |
| 🔮 **Physics Skill Graph** | D3.js force simulation with draggable nodes, magnetic cursor attraction, and mobile gyroscope tilt support |
| ✍️ **Letter-by-letter Animations** | Spring-physics text reveals, staggered card entrances, and wave-like social link animations |
| 💎 **Glassmorphism UI** | Backdrop-blur glass cards, gradient accents, and floating particle stars |
| 📨 **Contact Form** | EmailJS-powered with per-field validation and real-time status feedback |
| ♿ **Accessibility** | Skip-to-content, aria-labels, keyboard navigation for modals, WCAG-compliant contrast |
| ⚡ **Performance** | Code-split bundles (Three.js, D3, Framer Motion), lazy-loaded images, lazy-loaded routes |
| 🔍 **SEO Ready** | Open Graph, Twitter Cards, meta descriptions, favicon, robots.txt |
| 📱 **Fully Responsive** | Mobile-first design with adaptive layouts and hamburger navigation |
| 🔝 **Scroll to Top** | Floating button appears after scrolling for quick navigation |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 7 |
| 3D/WebGL | Three.js |
| Data Visualization | D3.js (force simulation) |
| Animation | Framer Motion |
| Styling | Tailwind CSS 3 + Custom CSS |
| Theming | next-themes (dark mode) |
| Icons | Lucide React + React Icons |
| Contact | EmailJS |
| Routing | React Router v6 |
| Deployment | Vercel |
| Linting | ESLint + Prettier |

---

## 🗺️ Project Structure

```text
├── index.html                # Entry HTML with SEO meta tags
├── vite.config.mjs           # Vite config with path aliases & chunk splitting
├── tailwind.config.js        # Tailwind theme extensions
├── .eslintrc.cjs             # ESLint config
├── .prettierrc               # Prettier config
├── public/
│   ├── favicon.svg           # SVG favicon
│   ├── robots.txt            # SEO robots file
│   ├── resume.pdf            # Downloadable resume
│   ├── certs/                # Certificate images
│   └── gallery/              # Gallery & achievement images
└── src/
    ├── App.jsx               # Router, page transitions, global layout
    ├── main.jsx              # React entry + ThemeProvider
    ├── index.css             # Design system variables & global styles
    ├── constants/
    │   └── socialLinks.js    # Shared social links data (DRY)
    ├── components/
    │   ├── Navbar.jsx        # Responsive navbar with animated underline
    │   ├── ScrollToTop.jsx   # Floating scroll-to-top button
    │   └── ui/
    │       └── dotted-surface.jsx  # Three.js animated background
    ├── lib/
    │   └── utils.js          # cn() Tailwind merge helper
    ├── CSS/                   # Page-specific stylesheets
    └── pages/
        ├── Home.jsx          # Hero with letter animations & social wave
        ├── Projects.jsx      # Project cards with tech tags
        ├── Gallery.jsx       # Tabbed gallery with lightbox & keyboard nav
        ├── Skills.jsx        # D3 force graph + categorized grid
        ├── Certificates.jsx  # Certificate grid with modal preview
        ├── Blog.jsx          # Blog posts with vote system
        ├── Resume.jsx        # Inline resume + PDF viewer
        ├── About.jsx         # Bio + education timeline
        ├── Contact.jsx       # EmailJS form with field validation
        └── NotFound.jsx      # 404 with navigation options
```

---

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ 
- Git

### Steps

```bash
# Clone the repository
git clone https://github.com/Sachinxcode-01/portfilio-website.git
cd Sachinxcode

# Install dependencies
npm install

# Create .env file with your EmailJS credentials
# VITE_EMAILJS_SERVICE_ID=service_xxxxx
# VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
# VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🚀 Deployment

This project auto-deploys to **Vercel** on every push to `master`. The Vite build outputs optimized, code-split chunks:

- `three` → separate chunk (~495KB gzipped: 125KB)
- `framer-motion` → separate chunk (~109KB gzipped: 37KB)  
- `d3` → separate chunk (~52KB gzipped: 18KB)
- Main bundle → ~204KB (gzipped: 67KB)

---

## 📬 Contact

| Platform | Link |
|----------|------|
| 📧 Email | [saxhin0708@gmail.com](mailto:saxhin0708@gmail.com) |
| 💼 LinkedIn | [sachin-k-5b6689322](https://www.linkedin.com/in/sachin-k-5b6689322) |
| 💻 GitHub | [Sachinxcode-01](https://github.com/Sachinxcode-01) |
| 🌐 Portfolio | [sachinxcoder-chi.vercel.app](https://sachinxcoder-chi.vercel.app/) |

---

## 📄 License

Distributed under the **MIT License**. Feel free to clone, modify, and build upon this for your own portfolio.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Sachinxcode-01"><b>Sachin K</b></a>
</p>
