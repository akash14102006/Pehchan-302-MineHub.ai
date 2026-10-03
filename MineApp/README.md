# MineApp &mdash; Frontend Application Guide

`MineApp` is the production single-page application (SPA) for **MineHub.ai**, delivering an interactive intelligence platform for mining engineers, geologists, and corporate executives across Coal India Limited (CIL) and CMPDI.

---

## 📋 Prerequisites

Before running or building the application, ensure your local development environment meets the following specifications:

- **Node.js**: `v18.0.0` or higher (LTS recommended)
- **Package Manager**: `npm` `v9.0.0+` (or `pnpm` / `yarn`)
- **Modern Web Browser**: Chrome, Edge, Firefox, or Safari with WebGL and HTML5 Canvas support

---

## 📦 Installation

1. Open your terminal and navigate into the `MineApp` directory:
   ```bash
   cd MineApp
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

---

## 🚀 Running Locally

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will start on the pre-configured port:
```text
  VITE v5.3.1  ready in 320 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```

Open `http://localhost:5174/` in your browser to view the application.

---

## 🛠️ Building for Production

Compile and bundle the production-ready static assets:

```bash
npm run build
```

This generates an optimized static distribution in the `MineApp/dist/` directory:
- Minified JavaScript bundles with code-splitting
- Optimized CSS with design token mappings
- Static asset hash versioning for cache control

### Previewing the Production Build Locally

To test the generated production build before deployment:

```bash
npm run preview
```

---

## ⚙️ Environment Configuration

Currently, `MineApp` runs as a high-fidelity client-side prototype utilizing local data services and simulated AI response pipelines. No mandatory external API keys are required to run the development environment.

Future backend integration environment variables (configured via `.env.local` in Phase 2):
```bash
# Planned Backend API Endpoint (Phase 2 Roadmap)
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Planned Vector & Knowledge Graph Service URL
VITE_GRAPH_SERVICE_URL=http://localhost:8000/api/graph
```

---

## 📁 Folder Structure

```text
MineApp/
├── public/                      # Static runtime assets served at root
│   ├── coal-bg/                 # Coal seam and texture background graphics
│   ├── coal-images/             # Mining operational photography
│   ├── lottie/                  # Lottie animation JSON definitions
│   └── logo.svg                 # SVG brandmark
│
├── src/
│   ├── assets/                  # Brand logos, icons, and UI media
│   │   ├── minehub-logo.svg     # MineHub official logo
│   │   ├── ministry-of-coal-cropped.png # Ministry of Coal seal
│   │   └── Logo.png             # Master brand crest
│   │
│   ├── components/              # Modular UI components
│   │   ├── common/              # Navbar, Footer, AudioPlayer, Modals
│   │   ├── dashboard/           # Dynamic Recharts widgets & KPI cards
│   │   ├── geology/             # Explorer grid, timeline, and PDF viewer modal
│   │   ├── landingpage/         # Hero carousel, hover-reveal cards, feature lists
│   │   └── studio/              # Report Studio chat, 9 engines, source manager, drawer
│   │
│   ├── pages/                   # Application view routes
│   │   ├── LandingPage.jsx      # Welcome portal & interactive features overview
│   │   ├── Dashboard.jsx        # Production analytics control room
│   │   ├── GeologyRepository.jsx# Multi-subsidiary geological exploration archive
│   │   └── ReportStudio.jsx     # AI analytical workbench & multi-engine studio
│   │
│   ├── services/                # In-memory client services & data providers
│   │   ├── geologyReportRepositoryService.js # Geological records, filters & metadata
│   │   ├── reportProductionDataService.js    # Production stats, charts & time series
│   │   └── studioSessionService.js           # Multi-turn chat state & session storage
│   │
│   ├── styles/                  # Custom styling system (Tailwind-free)
│   │   ├── index.css            # Global CSS resets, typography, and utility classes
│   │   └── theme.js             # Theme tokens (colors, spacing, shadows, radii)
│   │
│   ├── constants/               # Feature descriptors & navigation routes
│   │   └── features.js          # Platform capabilities catalog
│   │
│   ├── App.jsx                  # Main view router & layout wrapper
│   └── main.jsx                 # React root DOM mount
│
├── index.html                   # HTML template entry point
├── package.json                 # Dependency tree & scripts
├── vite.config.js               # Vite bundler configuration
└── catalyst.json                # Zoho Catalyst / Slate deployment configuration
```

---

## 💻 Development Guidelines

### 1. Styling & Design System
- **No Tailwind**: Do not install or import Tailwind CSS. All styling is implemented using custom Vanilla CSS and `styled-components` mapped to tokens in `src/styles/theme.js`.
- **Theme Consistency**: Always reference color tokens (e.g., `#0D1117`, `#161B22`, `#F59E0B`) to maintain the industrial dark coal aesthetic.

### 2. State & Data Handling
- In the current UI prototype, operational data is served via `src/services/`. When adding new mock datasets, ensure they reflect authentic Coal India subsidiaries (ECL, BCCL, CCL, WCL, SECL, MCL, NCL, CMPDI).
- Studio chat conversations and active source selections are stored in `localStorage` through `studioSessionService.js`.

---

## 🔧 Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| `Port 5174 already in use` | Another process is holding port 5174 | Run `npx kill-port 5174` or launch on an alternate port: `npm run dev -- --port 5175`. |
| Blank screen on initial load | React root failed to mount | Verify browser console logs. Ensure Node dependencies are cleanly installed via `npm install`. |
| Missing styling or misaligned layout | CSS caching or browser zoom | Hard refresh with `Ctrl + F5` (or `Cmd + Shift + R`). Check that `src/styles/index.css` is imported in `main.jsx`. |
| PDF Viewer modal not loading preview | Static asset path resolution | Verify that relative asset paths point correctly within `MineApp/public/` or `MineApp/src/assets/`. |
