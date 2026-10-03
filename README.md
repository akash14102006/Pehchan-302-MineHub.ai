<div align="center">

<img src="MineApp/src/assets/minehub-logo.svg" alt="MineHub.ai Logo" width="110" height="110" />

# MineHub.ai

### AI-Powered Geological, Mining & Statutory Reporting Intelligence Platform

**Smart India Hackathon 2026 &bull; Problem Statement ID: 26023 &bull; Team ID: 163089 &bull; Team Pehchan 302**  
*Ministry of Coal &bull; Central Mine Planning & Design Institute (CMPDI) &bull; Coal India Limited (CIL)*

<p align="center">
  <img src="https://img.shields.io/badge/SIH-2026-FF9933?style=for-the-badge&logoColor=white" alt="SIH 2026" />
  <img src="https://img.shields.io/badge/Problem%20Statement-26023-138808?style=for-the-badge&logoColor=white" alt="Problem Statement 26023" />
  <img src="https://img.shields.io/badge/Team%20ID-163089-000080?style=for-the-badge&logoColor=white" alt="Team ID 163089" />
  <img src="https://img.shields.io/badge/Team-Pehchan%20302-2B3A42?style=for-the-badge&logoColor=white" alt="Team Pehchan 302" />
  <img src="https://img.shields.io/badge/Status-Interactive%20UI%20Prototype-4A90E2?style=for-the-badge&logoColor=white" alt="Status" />
  <img src="https://img.shields.io/badge/Stack-React%2018%20%7C%20Vite%205-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="Tech Stack" />
</p>

---

<p align="center">
  <b>Transforming 50+ years of unstructured geological exploration logs, borehole profiles, mine production ledgers, and statutory compliance filings into instant, evidence-grounded intelligence.</b>
</p>

<p align="center">
  <a href="#-executive-summary--the-problem">Problem</a> &bull;
  <a href="#-the-solution-minehubai">Solution</a> &bull;
  <a href="#-how-it-works-the-6-stage-intelligence-lifecycle">How It Works</a> &bull;
  <a href="#-system-architecture">Architecture</a> &bull;
  <a href="#-core-modules--feature-deep-dives">Core Modules</a> &bull;
  <a href="#-truth-in-engineering-current-implementation-status">Truth in Engineering</a> &bull;
  <a href="#-technology-stack">Tech Stack</a> &bull;
  <a href="#-public-data-sources-catalog">Data Sources</a> &bull;
  <a href="#-quick-start--local-development">Quick Start</a> &bull;
  <a href="#-team-pehchan-302">Team</a>
</p>

</div>

---

## 📌 Executive Summary & The Problem

The Indian coal sector, anchored by **Coal India Limited (CIL)** and its specialized exploration arm **CMPDI (Central Mine Planning & Design Institute)**, stewards over half a century of geological investigations across India's premier coalfields. This legacy encompasses hundreds of thousands of comprehensive geological reports (GRs), borehole lithology logs, seam correlation charts, chemical analysis sheets, and statutory environmental clearance filings.

Despite the invaluable intelligence stored within these archives, mining engineers, exploration geologists, and corporate executives face severe operational friction:

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             THE INDUSTRY BOTTLENECK                              │
├─────────────────────────┬────────────────────────────┬───────────────────────────┤
│    50+ YEARS OF DATA    │      ISOLATED SILOS        │      CRITICAL IMPACT      │
│  Scanned paper logs,    │  Archives split across     │  Days spent extracting    │
│  raster PDFs, degraded  │  7 subsidiaries (ECL,      │  seam thickness, ash %,   │
│  handwritten tables,    │  BCCL, CCL, WCL, SECL,     │  stripping ratios, and    │
│  borehole profiles      │  MCL, NCL) and CMPDI RIs   │  statutory clearances     │
└─────────────────────────┴────────────────────────────┴───────────────────────────┘
```

### The Three Critical Challenges

1. **Unstructured & Degraded Archives**: Reports dating back to the 1970s exist primarily as scanned PDF files, featuring faded carbon copies, manual lithology sketches, and multi-column chemical tables. Standard keyword search engines cannot decipher tabular borehole stratigraphy or cross-reference seam names across coalfields.
2. **Subsidiary & Authority Fragmentation**: Critical intelligence is compartmentalized across 7 operating subsidiaries and 7 CMPDI Regional Institutes (RIs). Comparing stripping ratios between Southeastern Coalfields (SECL) and Mahanadi Coalfields (MCL) requires manual document requisition.
3. **High Cost of AI Hallucinations**: In mining engineering and statutory reporting, a fabricated borehole depth or an inaccurate stripping ratio can lead to catastrophic capital expenditure misallocations or regulatory penalties. Standard generative LLMs cannot be trusted without strict page-level verification.

---

## 💡 The Solution: MineHub.ai

**MineHub.ai** is an enterprise-grade, domain-specialized intelligence workspace engineered to unlock the vast repository of Indian mining documentation. Designed around the specific needs of CMPDI exploration teams and CIL subsidiary operations, MineHub provides:

- **Centralized Geological Repository**: Unified indexing, subsidiary-level categorization, timeline navigation, and instant in-app PDF exploration across all 8 Coal India entities.
- **Deep-Dig Retrieval-Augmented Generation (RAG)**: Layout-aware chunking optimized for borehole logs, coal seam stratigraphy, proximate analysis tables, and statutory clauses.
- **Zero-Guess Verification Gate**: An automated provenance enforcement layer that grounds every AI assertion in verifiable document citations with page-level bounding excerpts.
- **Report Studio & 9 Analytical Engines**: An interactive intelligence workbench featuring executive summaries, natural voice briefings, automated inquiry, interactive mind maps, knowledge graph visualization, dynamic multi-charting, structured data extraction, regulatory timelines, and lexical word clouds.
- **Multi-Agent Architecture (Agent Bench)**: Specialized agent personas (Geology Specialist, Operations Analyst, Statutory Auditor, and Orchestration Agent) collaborating to cross-examine complex queries.

---

## 🔄 How It Works: The 6-Stage Intelligence Lifecycle

MineHub processes complex mining records through a disciplined, end-to-end intelligence pipeline:

```text
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                           STAGE 1: INGESTION                                │
  │  Multi-Subsidiary Geological Reports, Borehole Logs, Mining Leases, Scanned │
  │  PDFs, Production Ledgers (ECL, BCCL, CCL, WCL, SECL, MCL, NCL, CMPDI)     │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                     STAGE 2: DIGITIZATION & CHUNKING                        │
  │  Layout-Aware OCR (DocTR/Surya) + Domain Chunking: Stratigraphic Seam Units,│
  │  Proximate Analysis Tables, Borehole Intercepts, Statutory Clauses          │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       STAGE 3: DEEP-DIG RETRIEVAL                           │
  │  Hybrid Search: Dense Vector Embeddings (Domain-tuned) + BM25 Lexical +     │
  │  Geological Knowledge Graph Traversal (Colliery ↔ Seam ↔ Fault)            │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                   STAGE 4: ZERO-GUESS VERIFICATION GATE                     │
  │  Strict Citation Binding: Source Document ID, Page Number & Excerpt Matching │
  │  Confidence Thresholding: Automatic Abstention on Unverified Grounding     │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                 STAGE 5: AGENT BENCH REASONING ORCHESTRATION                │
  │  Collaborative Personas: Geology Specialist | Production Analyst |           │
  │  Compliance Auditor | Synthesis Orchestrator                                │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                      STAGE 6: ANALYTICAL DELIVERABLES                       │
  │  Report Studio & 9 Engines: Interactive Chat, Executive Summaries, Audio    │
  │  Briefings, Mind Maps, Graph Views, Data Tables, Production Dashboards      │
  └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

MineHub is architected with clear boundaries between the user presentation layer, the orchestration engine, and the secure retrieval foundation:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   PRESENTATION LAYER                                    │
│  React 18 SPA (Vite 5) &bull; Custom Industrial CSS Design System &bull; Tabular Data Grid &bull; Studio  │
│  PDF Viewer Modal &bull; Canvas Visualizers &bull; Audio Web Synthesis &bull; Subsidiary Quick-Switch │
└────────────────────────────────────────────┬────────────────────────────────────────────┘
                                             │ REST API / WebSocket
┌────────────────────────────────────────────▼────────────────────────────────────────────┐
│                    ORCHESTRATION & AGENT BENCH LAYER (BLUEPRINT)                        │
│  FastAPI Gateway &bull; LangGraph Multi-Agent Orchestrator &bull; Session Context & LocalStorage   │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────┐ │
│  │ Geology Specialist│  │ Mining Operations │  │ Statutory Auditor │  │  Synthesis    │ │
│  │   Agent Persona   │  │   Agent Persona   │  │   Agent Persona   │  │  Orchestrator │ │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘  └───────────────┘ │
└────────────────────────────────────────────┬────────────────────────────────────────────┘
                                             │ Evidence Verification
┌────────────────────────────────────────────▼────────────────────────────────────────────┐
│                  RETRIEVAL & ZERO-GUESS GATE FOUNDATION (BLUEPRINT)                     │
│  Deep-Dig Hybrid Search (Dense Vectors + BM25) &bull; Zero-Guess Citation Grounding Engine │
│  Stratigraphic Borehole Parser &bull; Layout Analysis &bull; Strict Source Excerpt Verification │
└────────────────────────────────────────────┬────────────────────────────────────────────┘
                                             │ Document Storage & Index
┌────────────────────────────────────────────▼────────────────────────────────────────────┐
│                             DATA SOURCES & STORAGE LAYER                                │
│  PostgreSQL (Relational Metadata) &bull; pgvector (Embeddings) &bull; Neo4j (Knowledge Graph)   │
│  CMPDI Archives &bull; 7 CIL Subsidiaries &bull; data.gov.in &bull; coal.gov.in &bull; Bhuvan Geospatial │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Visual Architecture Blueprints

The complete architectural specifications, workflow diagrams, and entity-relationship models are documented in the [`docs/architecture/`](./docs/architecture/) repository:

| Architectural Blueprint | Description | Link |
| :--- | :--- | :--- |
| **Platform Solution Architecture** | End-to-end component interaction from document ingest to UI | [View Diagram](./docs/architecture/minehub_solution_architecture.jpg) |
| **System Workflow Architecture** | Detailed multi-stage workflow pipeline and verification gates | [View Diagram](./docs/architecture/minehub_workflow_architecture.png) |
| **Master Architecture v3** | Complete enterprise deployment topology and agent interactions | [View Diagram](./docs/architecture/minehub_master_architecture_v3.jpg) |
| **Judges Edition System Flow** | Streamlined architectural diagram prepared for SIH evaluation | [View Diagram](./docs/architecture/minehub_architecture_judges_edition.jpg) |
| **Unified Process Blueprints** | Full catalog of 20 detailed architecture diagrams and models | [Browse Directory](./docs/architecture/) |

---

## ⚡ Core Modules & Feature Deep Dives

### 1. Geological Report Repository & Explorer

A dedicated exploration portal built to browse, filter, inspect, and evaluate geological investigation records across India's coalfields:

- **Subsidiary-Level Indexing**: Full support for all 8 Coal India entities:
  - Eastern Coalfields Limited (**ECL**)
  - Bharat Coking Coal Limited (**BCCL**)
  - Central Coalfields Limited (**CCL**)
  - Western Coalfields Limited (**WCL**)
  - South Eastern Coalfields Limited (**SECL**)
  - Mahanadi Coalfields Limited (**MCL**)
  - Northern Coalfields Limited (**NCL**)
  - Central Mine Planning & Design Institute (**CMPDI**)
- **Authority-Based Classification**: Filter reports by commissioning entity: CMPDI, Geological Survey of India (**GSI**), Mineral Exploration Corporation Limited (**MECL**), and Singareni Collieries (**SCCL**).
- **Year Timeline Navigation**: Historical timeline cards spanning 1975 to 2026, allowing geologists to trace five decades of exploration evolution.
- **Embedded Document Viewer**: Interactive in-browser PDF modal viewer with direct section navigation, page jumping, and zoom controls.
- **Target vs. Actual Production Tracking**: Integrated production metrics tracking reserve estimates against actual extraction tonnage.

### 2. Report Studio: The 9 AI Analytical Engines

The flagship analytical workbench of MineHub, providing mining officers with 9 interactive reasoning tools powered by the active document context:

```text
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                                 REPORT STUDIO WORKBENCH                               │
├───────────────────────────────────┬───────────────────────────────────────────────────┤
│ 📄 1. Report Generator            │ Structured operational briefings & executive      │
│                                   │ geological summaries with seam classifications.   │
├───────────────────────────────────┼───────────────────────────────────────────────────┤
│ 🎙️ 2. Audio Briefing              │ Speech-synthesized audio debriefs for general     │
│                                   │ managers on site visits or during field transit.  │
├───────────────────────────────────┼───────────────────────────────────────────────────┤
│ ❓ 3. Auto Question Generator     │ Proactive inquiry discovering overlooked risks,   │
│                                   │ stripping ratio anomalies, and fault lines.       │
├───────────────────────────────────┼───────────────────────────────────────────────────┤
│ 🧠 4. Interactive Mind Map        │ Visual hierarchical decomposition of coal block   │
│                                   │ stratigraphy, quality grades, and infrastructure. │
├───────────────────────────────────┼───────────────────────────────────────────────────┤
│ 🕸️ 5. Knowledge Graph Builder     │ Entity-relationship mapping linking collieries,   │
│                                   │ coal seams, borehole clusters, and faults.        │
├───────────────────────────────────┼───────────────────────────────────────────────────┤
│ 📊 6. Multi-Chart Visualizer      │ Instant charting of historical production trends, │
│                                   │ stripping ratio variations, and ash percentages.  │
├───────────────────────────────────┼───────────────────────────────────────────────────┤
│ 📋 7. Tabular Data Extractor      │ Automated conversion of complex report paragraphs │
│                                   │ into clean, structured, exportable data tables.   │
├───────────────────────────────────┼───────────────────────────────────────────────────┤
│ ⏳ 8. Chronological Timeline      │ Milestone-by-milestone progression of exploration │
│                                   │ clearances, drilling campaigns, and approvals.    │
├───────────────────────────────────┼───────────────────────────────────────────────────┤
│ ☁️ 9. Semantic Word Cloud         │ Lexical importance and thematic keyword density   │
│                                   │ visualization across loaded report dossiers.      │
└───────────────────────────────────┴───────────────────────────────────────────────────┘
```

#### Studio Auxiliary Capabilities
- **Multi-Document Source Manager**: Seamlessly toggle between multiple loaded geological dossiers, enabling cross-block comparative synthesis.
- **Multi-Turn Chat Interface**: Conversational query panel with contextual quick-prompt pills and real-time streaming response simulation.
- **Evidence Binding Drawer**: Side-by-side verification drawer displaying exact document page excerpts, matched tokens, and source provenance for every generated assertion.
- **Live Agent Bench Status Stream**: Transparent progress monitor displaying which specialized agent persona is currently reasoning over the data.

### 3. Executive Production Dashboard

A high-level analytics control center delivering real-time situational awareness across Coal India operations:

- **Subsidiary KPI Metric Cards**: Total coal production (MT), overburden removal (OBR in M.Cu.M), composite stripping ratio, and safety audit score.
- **4 Interactive Dynamic Charts**:
  1. *Subsidiary Output Distribution*: Comparative production breakdown across all subsidiaries.
  2. *Target vs. Actual Variance*: Monthly and annual operational achievement tracking.
  3. *Coal Quality Grade Spread*: G1 to G17 grade distribution across major seams.
  4. *Safety & Compliance Index*: Statutory inspection compliance and environmental clearance milestones.
- **Subsidiary Quick-Switch**: One-click switching between subsidiary views (ECL through CMPDI) with instantaneous data refresh.

### 4. Enterprise Industrial Design System

MineHub features a custom-built, industrial dark-mode user interface engineered for operational command centers and mining field offices:

- **Tailwind-Free Architecture**: Handcrafted Vanilla CSS with strict design token governance (`MineApp/src/styles/theme.js`).
- **Industrial Palette**: Deep coal blacks (`#0D1117`, `#161B22`), rich charcoal surfaces (`#21262D`), industrial safety amber accents (`#F59E0B`, `#E57373`), and precision cyan data highlights (`#38BDF8`).
- **Responsive Layout**: Zero layout shift, fluid data tables, optimized typography (Inter / Outfit), and subtle micro-animations for high-efficiency enterprise use.

---

## 🛡️ Truth in Engineering: Current Implementation Status

In strict accordance with the **Absolute Truth Rule**, the following matrix transparently differentiates between what is currently built and operating in this repository versus what represents our planned architectural roadmap:

| Component / Subsystem | Repository State | Verification Path | Notes & Details |
| :--- | :--- | :--- | :--- |
| **Interactive Frontend Application** | ✅ **IMPLEMENTED** | `MineApp/src/App.jsx` | Full React 18 SPA with client routing, interactive state, and views |
| **Custom Industrial CSS Design System** | ✅ **IMPLEMENTED** | `MineApp/src/styles/` | 100% custom styling, theme variables, zero external Tailwind |
| **Geological Repository & Explorer** | ✅ **IMPLEMENTED** | `MineApp/src/pages/GeologyRepository.jsx` | Subsidiary filters, year timeline, card grid, and target analytics |
| **Interactive In-App PDF Viewer Modal** | ✅ **IMPLEMENTED** | `MineApp/src/components/geology/` | Document viewing modal with section navigation & download trigger |
| **Report Studio & 9 Analytical Engines** | ✅ **IMPLEMENTED** | `MineApp/src/pages/ReportStudio.jsx` | All 9 engines fully interactive with realistic client simulation |
| **Multi-Document Source Manager** | ✅ **IMPLEMENTED** | `MineApp/src/components/studio/` | Dynamic multi-source toggling, badge indicators, and active set |
| **Evidence Binding & Provenance Drawer**| ✅ **IMPLEMENTED** | `MineApp/src/components/studio/` | Slide-out citation drawer linking answers to document excerpts |
| **Executive Production Dashboard** | ✅ **IMPLEMENTED** | `MineApp/src/pages/Dashboard.jsx` | 4 interactive dynamic charts, subsidiary switcher, and KPI cards |
| **Landing Page & Carousel** | ✅ **IMPLEMENTED** | `MineApp/src/pages/LandingPage.jsx` | Interactive hero carousel, hover-reveal capability cards, and CTA |
| **Client-Side Data & Mock Services** | 🟡 **PROTOTYPE** | `MineApp/src/services/` | Structured mock datasets & `localStorage` caching for demo flows |
| **FastAPI Backend & REST Endpoints** | 🔵 **PLANNED** | `docs/architecture/` | Phase 2 roadmap; production API server for multi-tenant auth |
| **LangGraph Multi-Agent Orchestrator** | 🔵 **PLANNED** | `docs/architecture/` | Phase 2 roadmap; autonomous Agent Bench execution environment |
| **50-Year Document OCR Pipeline** | 🔵 **PLANNED** | `docs/architecture/` | Phase 3 roadmap; Surya/DocTR table extraction & batch ingestion |
| **PostgreSQL + pgvector & Neo4j** | 🔵 **PLANNED** | `docs/architecture/` | Phase 3 roadmap; production hybrid vector store & knowledge graph |
| **Live Government API Scrapers** | 🔵 **PLANNED** | `docs/architecture/` | Phase 4 roadmap; live connectors for data.gov.in & coal.gov.in |

> **Audit Summary**: The current repository represents a **high-fidelity, fully interactive Frontend & UI Architecture Prototype**. All user journeys—from repository exploration to report studio analysis and evidence inspection—are operational in the browser using high-integrity client services. The backend services, vector database, and autonomous multi-agent cluster are documented as ready-to-implement engineering blueprints.

---

## 💻 Technology Stack

### Current Implementation (Frontend & Client Architecture)

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Core Framework** | React | `^18.2.0` | Component-driven declarative UI architecture |
| **Build Tooling** | Vite | `^5.0.0` | Fast HMR and optimized production bundling |
| **Styling & Theme** | Vanilla CSS + Theme Tokens | ES6 Modules | Custom industrial dark-mode design system (zero Tailwind) |
| **Icons & Visuals** | Lucide React | `^0.294.0` | Enterprise vector iconography |
| **Micro-Animations** | Canvas-Confetti & CSS3 | Native Web API | Subtle feedback animations and state transitions |
| **Content Rendering**| React-Markdown | `^9.0.1` | Rich markdown parsing for analytical outputs |
| **State & Persistence**| React Hooks + Web Storage | HTML5 API | Client-side session and active document state management |

### Architectural Blueprint (Planned Backend & Agent Bench)

| Layer | Proposed Technology | Architectural Role | Status |
| :--- | :--- | :--- | :--- |
| **API Gateway** | FastAPI (Python 3.11+) | Asynchronous REST and WebSocket communication | Architectural Blueprint |
| **Agent Bench** | LangGraph / LangChain | Multi-agent state machine and persona orchestration | Architectural Blueprint |
| **Embeddings** | BGE-Large / text-embedding-3 | Domain-adapted 1024-dim dense vector generation | Architectural Blueprint |
| **Vector Index** | PostgreSQL + pgvector | High-performance similarity search with metadata filters | Architectural Blueprint |
| **Knowledge Graph**| Neo4j | Entity-relationship graph for coal seams, mines, and faults | Architectural Blueprint |
| **OCR & Parsing** | Surya / DocTR / Tesseract | Table-aware raster extraction for scanned 50-year logs | Architectural Blueprint |
| **Speech Engine** | Whisper / Edge TTS | Natural speech synthesis for mobile audio debriefs | Architectural Blueprint |

---

## 🌐 Public Data Sources Catalog

MineHub is designed to ingest and harmonize data from verified, official Indian mining repositories:

```text
┌─────────────────────────┬──────────────────────────────┬───────────────────────────────┐
│       DATA SOURCE       │          AUTHORITY           │        DATASET DOMAIN         │
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ data.gov.in             │ Open Government Data (OGD)   │ All-India coal production by  │
│                         │ Platform India               │ grade, subsidiary, & state    │
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ coal.gov.in             │ Ministry of Coal             │ Annual reports, provisional   │
│                         │ Government of India          │ statistics, action plans      │
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ coalindia.in            │ Coal India Limited (CIL)     │ Subsidiary production ledgers,│
│                         │                              │ sustainability & CSR filings  │
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ cmpdi.co.in             │ Central Mine Planning &      │ Geological investigation GRs, │
│                         │ Design Institute             │ borehole lithology archives   │
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ bhuvan.nrsc.gov.in      │ ISRO / National Remote       │ Satellite land cover, mine    │
│                         │ Sensing Centre (NRSC)        │ boundaries, geospatial layers │
└─────────────────────────┴──────────────────────────────┴───────────────────────────────┘
```

---

## 🎯 Real-World Mining Use Cases

### Scenario A: Exploration Geologist Evaluating a Greenfield Coal Block
- **Persona**: Senior Geologist at CMPDI Regional Institute-II (Dhanbad).
- **Task**: Correlating borehole lithology logs to determine the depth, thickness, and parting of Seam IX and X in the Jharia Coalfield.
- **Without MineHub**: Sifting through 8 separate scanned volumes, physically cross-referencing borehole drill sheets, taking 3–4 days.
- **With MineHub**: Enters query into Report Studio; the system retrieves exact borehole intercepts, compiles an automated Stratigraphic Mind Map, and outputs a formatted Data Table with citations linked directly to borehole logs. Time: **under 2 minutes**.

### Scenario B: General Manager Analyzing Monthly Stripping Ratio Variance
- **Persona**: Area General Manager at South Eastern Coalfields Limited (SECL).
- **Task**: Investigating an unexpected surge in the stripping ratio across Kusmunda Opencast Project over the preceding two quarters.
- **Without MineHub**: Requisitioning monthly ledgers from survey and planning divisions, manually plotting Excel graphs.
- **With MineHub**: Navigates to the Production Dashboard, selects SECL Kusmunda, launches Multi-Chart Engine in Studio, and receives an instant correlation between heavy monsoon rainfall events and overburden bench slippage.

### Scenario C: Environmental & Safety Officer Preparing Statutory Filings
- **Persona**: Chief Safety Officer at Mahanadi Coalfields Limited (MCL).
- **Task**: Auditing 10 years of statutory environmental compliance directives and air/water quality monitoring reports for DGMS audit.
- **Without MineHub**: Navigating fragmented file cabinets, risking missed compliance notices and statutory deadlines.
- **With MineHub**: Queries the Report Studio using the Statutory Auditor Agent persona, generating a Chronological Timeline of all clearances, conditions, and compliance metrics with page-level verification.

---

## 🚀 Quick Start & Local Development

### Prerequisites

- **Node.js**: Version `18.0.0` or higher
- **npm**: Version `9.0.0` or higher (or `pnpm` / `yarn`)

### Installation & Execution

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/akash14102006/Pehchan-302-MineHub.ai.git
   cd Pehchan-302-MineHub.ai
   ```

2. **Navigate to the Application Directory**:
   ```bash
   cd MineApp
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Local Development Server**:
   ```bash
   npm run dev
   ```
   The application will boot instantly and be accessible at:
   ```text
   http://localhost:5174/
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```
   Emits fully optimized, bundled production assets into `MineApp/dist/`.

6. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 📂 Repository Structure

```text
Pehchan-302-MineHub.ai/
│
├── MineApp/                               # Production Frontend Application (React 18 + Vite)
│   ├── public/                            # Runtime static assets (coal images, lotties, icons)
│   │   ├── coal-bg/                       # Coalfield background textures
│   │   ├── coal-images/                   # Mining operational photography
│   │   └── lottie/                        # Lottie animation JSON definitions
│   │
│   ├── src/                               # Application source code
│   │   ├── assets/                        # Brand emblems, logos, UI iconography, and lotties
│   │   │   ├── minehub-logo.svg           # MineHub vector brandmark
│   │   │   ├── ministry-of-coal-cropped.png # Ministry of Coal official seal
│   │   │   └── Logo.png                   # MineHub master platform crest
│   │   │
│   │   ├── components/                    # Modular UI components
│   │   │   ├── common/                    # Core UI primitives (Navbar, Footer, AudioPlayer, etc.)
│   │   │   ├── dashboard/                 # Production analytics & chart visualizers
│   │   │   ├── geology/                   # Geological explorer, cards, timeline, PDF modal
│   │   │   ├── landingpage/               # Hero carousel, capability cards, CTA sections
│   │   │   └── studio/                    # Report Studio workbench, chat, 9 engines, drawers
│   │   │
│   │   ├── pages/                         # Top-level route views
│   │   │   ├── LandingPage.jsx            # Platform welcome portal & feature overview
│   │   │   ├── Dashboard.jsx              # Executive production analytics dashboard
│   │   │   ├── GeologyRepository.jsx      # Geological report repository & document explorer
│   │   │   └── ReportStudio.jsx           # AI analytical workbench & multi-engine studio
│   │   │
│   │   ├── services/                      # Client-side data providers & mock services
│   │   │   ├── geologyReportRepositoryService.js # Geological records & subsidiary data
│   │   │   ├── reportProductionDataService.js    # Production KPIs & chart time-series
│   │   │   └── studioSessionService.js           # Studio chat session & persistence logic
│   │   │
│   │   ├── styles/                        # Custom design system (Tailwind-free)
│   │   │   ├── index.css                  # Global typography, resets, & utility classes
│   │   │   └── theme.js                   # Industrial color tokens & spacing constants
│   │   │
│   │   ├── constants/                     # Platform configuration & metadata
│   │   │   └── features.js                # Core feature descriptors & navigation items
│   │   │
│   │   ├── App.jsx                        # Root React component & view router
│   │   └── main.jsx                       # Application entry point & DOM mount
│   │
│   ├── index.html                         # SPA HTML entry template
│   ├── package.json                       # Dependencies & build scripts
│   ├── vite.config.js                     # Vite build configuration
│   └── README.md                          # Application developer documentation
│
├── docs/                                  # Project Documentation & Architecture
│   ├── architecture/                      # 20 Enterprise system diagrams & flowcharts
│   │   ├── minehub_solution_architecture.jpg
│   │   ├── minehub_workflow_architecture.png
│   │   ├── minehub_master_architecture_v3.jpg
│   │   └── ...                            # Full visual blueprint suite
│   └── README.md                          # Documentation index & architecture guide
│
├── prompts/                               # Engineering Specifications & Master Prompts
│   ├── design/                            # UI/UX design specifications & interaction prompts
│   └── repository/                        # Repository organization & README generation prompts
│
├── .gitignore                             # Git version control exclusions
└── README.md                              # Master flagship repository documentation
```

---

## 🗺️ Project Roadmap

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  MINEHUB RELEASE ROADMAP                               │
├─────────────────────┬──────────────────────────────────────────────────────────────────┤
│ PHASE 1             │ • Full React 18 / Vite 5 Interactive Frontend (Done)             │
│ UI Prototype &      │ • Geological Report Explorer with Subsidiary & Year Filters (Done)│
│ Experience Engine   │ • Report Studio with 9 Interactive Analytical Engines (Done)     │
│ [CURRENT STAGE]     │ • Zero-Guess Evidence Binding Drawer & PDF Viewer Modal (Done)   │
├─────────────────────┼──────────────────────────────────────────────────────────────────┤
│ PHASE 2             │ • FastAPI Asynchronous Backend Implementation                    │
│ Backend Service &   │ • LangGraph Multi-Agent Orchestration Framework (Agent Bench)    │
│ Deep-Dig RAG        │ • Initial pgvector dense vector store integration                │
│ [Q2 2026]           │ • Citation grounding verification scoring engine                 │
├─────────────────────┼──────────────────────────────────────────────────────────────────┤
│ PHASE 3             │ • 50-Year Scanned PDF Layout OCR Pipeline (Surya / DocTR)        │
│ Ingestion Pipeline  │ • Automatic borehole lithology & proximate table parser          │
│ & Hybrid Storage    │ • Neo4j Geological Knowledge Graph deployment                    │
│ [Q3 2026]           │ • Automated data connector for data.gov.in & coal.gov.in        │
├─────────────────────┼──────────────────────────────────────────────────────────────────┤
│ PHASE 4             │ • Pilot deployment at CMPDI Regional Institute-1 (Asansol)       │
│ Field Deployment &  │ • Offline Edge deployment package for remote colliery offices    │
│ Multi-Lingual Sync  │ • Hindi and regional language interface translation              │
│ [Q4 2026]           │ • Enterprise Role-Based Access Control (RBAC) & CIL SSO auth     │
└─────────────────────┴──────────────────────────────────────────────────────────────────┘
```

---

## 🔒 Security, Compliance & Governance

- **Zero-Guess Gate Hallucination Prevention**: Automated detection ensures no AI-generated metric is presented without an accompanying document ID, page citation, and matching text span.
- **Data Isolation**: Multi-tenant subsidiary partitioning guarantees that sensitive proprietary exploration data remains isolated to authorized subsidiary personnel.
- **Air-Gapped & On-Premises Readiness**: The system architecture is designed to support deployment within secure, air-gapped intranet environments compliant with Ministry of Coal cybersecurity mandates.
- **Auditable Provenance**: Every generated summary, table, and chart retains immutable cryptographic hashes linking directly back to the original source PDF.

---

## 👥 Team Pehchan 302

**Smart India Hackathon 2026** &bull; **Problem Statement ID: 26023**

| Team Detail | Information |
| :--- | :--- |
| **Team Name** | **Pehchan 302** |
| **Team ID** | **163089** |
| **Problem Statement** | **26023 — AI-Powered Geological, Mining and other Reporting Solution for CMPDI/CIL subsidiaries** |
| **Ministry / Department** | **Ministry of Coal / CMPDI / Coal India Limited** |
| **Category** | **Software &bull; Artificial Intelligence &bull; Mining Intelligence** |

---

<div align="center">
  <sub>Developed with pride for the Indian Coal & Mining Community &bull; Smart India Hackathon 2026</sub>
</div>
