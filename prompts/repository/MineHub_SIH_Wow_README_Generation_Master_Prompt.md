# MineHub.ai — SIH WOW README Generation Master Prompt

## Mission

Act as a world-class GitHub README architect, enterprise technical writer,
SIH documentation specialist, product architect, and technical storyteller.

Analyze the **entire MineHub repository** and the supplied SIH PDF/PPT
materials before writing anything.

The goal is to produce professional README documentation that lets:

- SIH judges
- technical reviewers
- mining/geology reviewers
- government/enterprise reviewers
- developers

understand MineHub quickly and accurately.

The README must answer:

```text
WHAT IS MINEHUB?
WHAT PROBLEM DOES IT SOLVE?
WHO HAS THE PROBLEM?
HOW DOES MINEHUB WORK?
WHAT IS ACTUALLY IMPLEMENTED?
WHAT IS PROTOTYPE / PLANNED?
WHAT TECHNOLOGY IS USED?
WHAT MAKES IT DIFFERENT?
HOW CAN IT BE RUN?
```

---

# 1. PRIMARY SIH SOURCE

Use the supplied **Smart India Hackathon 2026 MineHub PDF** as a mandatory
source.

It identifies:

```text
Smart India Hackathon 2026
MineHub
Problem Statement ID: 26023
Problem Statement:
AI-Powered Geological, Mining and other Reporting Solution for CMPDI/CIL subsidiaries
Theme: Smart Automation
Category: Software
Team ID: 163089
Team Name: Pehchan 302
```

The submission describes MineHub as:

> “The single home for every CMPDI and Coal India report”

and describes the problem of historical coal information being spread
across scans, PDFs and old Excel sheets, requiring manual searching and
creating delay and knowledge-loss risk. fileciteturn7file0L16-L24

The submission describes capabilities including MineHub Studio, Deep-Dig RAG,
Coal-Tuned Brain, Transfer Superior Memory (MAG), GeoMap, Zero Guess Gate,
Agent Bench and Workflow Orchestration. fileciteturn7file0L25-L54

The document also states that approximately 30% of the prototype was
completed and outlines further work as the remaining implementation target.
Therefore, NEVER present planned work as completed without repository
evidence. fileciteturn7file0L81-L87

---

# 2. ABSOLUTE TRUTH RULE

Every important README claim must be classified as one of:

```text
IMPLEMENTED
PARTIALLY IMPLEMENTED
PROTOTYPE
PLANNED
FUTURE
REFERENCE
```

Use the repository/code as the strongest source for **current
implementation**.

Use the SIH PDF/PPT/docs to understand:

```text
project intent
problem
proposed architecture
innovation
future direction
```

If sources disagree:

```text
CURRENT IMPLEMENTATION → repository/code
PROJECT INTENT → SIH/PPT/docs
```

Do not silently reconcile contradictions.

---

# 3. ANALYZE EVERYTHING FIRST

Before creating or changing README files, inspect:

```text
all folders
all files
all Markdown
all PDF
all PPT/PPTX
all images
all diagrams
all architecture documents
all planning documents
all prompts
all source code
all config
all assets
all Lotties
all existing README files
all route definitions
all package files
all service files
all documentation
```

Do not skip files because their names appear unimportant.

---

# 4. VISUAL ANALYSIS IS REQUIRED

Text extraction alone is insufficient.

For every important PDF/PPT/document containing:

- architecture diagrams
- workflow diagrams
- screenshots
- tables
- charts
- system diagrams
- feature maps
- UI previews

inspect the rendered visual content too.

The supplied SIH PDF contains:

- Problem + Innovation/Uniqueness on page 2
- Technical Approach + Architecture Flow on page 3
- Feasibility/Viability on page 4
- Impact/Benefits on page 5
- Research/References on page 6

Use these visuals as source material but do not blindly reproduce poor
diagrams.

---

# 5. SIH PAGE-BY-PAGE UNDERSTANDING

## PAGE 1 — PROJECT IDENTITY

Capture:

```text
SIH 2026
MineHub
PS 26023
Pehchan 302
```

Do not add facts not present in the document. fileciteturn7file0L2-L12

## PAGE 2 — PROBLEM + INNOVATION

Understand:

```text
50 years of fragmented reports
scans
PDFs
old Excel
manual search
slow response
retiring expert knowledge
```

and the proposed innovations:

```text
MineHub Studio
Deep-Dig RAG
Coal-Tuned Brain
Zero Guess Gate
Transfer Superior Memory
GeoMap
Agent Bench
Workflow Orchestration
```

Use the page's concepts, but verify current implementation from the code. fileciteturn7file0L18-L54

## PAGE 3 — TECHNICAL APPROACH

Analyze:

```text
Mining Data Gateway
Government/Ministry sources
OCR scanning
Deep-Dig RAG
MAG
Coal-Tuned Brain
Mining agents
Workflow
GeoMap
Guardrails
Verified Request
Truth Response
```

The page also lists technologies such as React JS, Zoho Catalyst,
FastAPI, LangGraph, Neo4j, Chroma and OCR, plus data sources including
data.gov.in, coal.gov.in, coalindia.in and Bhuvan. fileciteturn7file0L64-L99

Do not mark these as current production technologies until verified.

## PAGE 4 — FEASIBILITY / VIABILITY

Understand the stated strategy around:

```text
Open-source/open-weight technology
RAG/CAG/MAG
PostgreSQL + pgvector
Graph store
LangGraph
Human-in-the-loop
Self-hosted infrastructure
Public government data
Scanned-document OCR
Evidence/page references
Role-based access
Logging
```

These are source-described feasibility/viability ideas. Validate actual
implementation before claiming them as live. fileciteturn7file0L104-L134

## PAGE 5 — IMPACT

The source identifies:

```text
Ministry officials
Parliament response teams
CMPDI geologists
CIL corporate
```

and describes benefits around trusted figures, faster drafting, reduced
searching and shared memory. fileciteturn7file0L144-L164

Use these concepts concisely.

## PAGE 6 — RESEARCH

Analyze cited:

```text
CMPDI
Coal India
Ministry of Coal
Open Government Data
CMPDI laboratory services
GeoGraphRAG
GeoGPT-RAG
Graph RAG research
```

Do not fabricate additional references. fileciteturn7file0L176-L204

---

# 6. REPOSITORY ANALYSIS

Inspect the actual MineHub project.

Determine:

```text
Application root
Frontend
Backend/service layer
Pages
Components
Assets
Routes
Data services
AI/RAG implementation
Report Studio
Geology
Dashboard
Authentication
Configuration
Deployment
Testing
Documentation
```

---

# 7. CURRENT APPLICATION STRUCTURE

The visible repository currently has a structure similar to:

```text
MineHub/
├── Assets/
│   ├── Coal BG/
│   ├── Coal Image/
│   └── Under Construction.json
├── docs/
├── Features List Lotties/
├── Logo/
├── MineApp/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── geology/
│   │   │   ├── landing/
│   │   │   ├── layout/
│   │   │   └── studio/
│   │   ├── constants/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── catalyst.json
│   └── ...
├── prompts/
├── Reference style/
├── .gitignore
└── README.md
```

This is only contextual guidance.

**The real repository is authoritative.**

---

# 8. GRAPHIFY / KNOWLEDGE GRAPH ANALYSIS

If the project's Graphify knowledge graph/workflow is available:

use it before documenting architecture.

Query for:

```text
MineHub
Report Studio
Dashboard
Geology
components
pages
services
routes
feature registry
AI
RAG
OCR
knowledge graph
database
API
security
deployment
assets
documentation
```

Use actual Graphify instructions from the repository.

Do not invent Graphify commands.

---

# 9. TRACE THE ACTUAL USER FLOW

Determine the current real flow:

```text
User
 ↓
Dashboard / Feature Navigation
 ↓
Feature
 ↓
Input / Source
 ↓
Processing
 ↓
Query
 ↓
Evidence / Analysis
 ↓
Output
```

Only document stages that are actually implemented.

---

# 10. REPORT STUDIO ANALYSIS

Report Studio is a central MineHub capability.

Inspect:

```text
sources
sessions
chat/evidence query
studio tools
report templates
mind map
data table
timeline
graph
charts
auto questions
report rendering
export
history
```

Determine exactly:

```text
LIVE
PARTIAL
MOCK
PLANNED
```

---

# 11. GEOLOGY ANALYSIS

Inspect:

```text
authority selector
year-wise repository
report list
production graph
CIL directory
geological data
```

Determine which are:

```text
real
mock
static
future
```

Never call fake numbers “live”.

---

# 12. DASHBOARD ANALYSIS

Inspect:

```text
sidebar
feature launcher
feature navigation
feature status
routes
```

Document only real behavior.

---

# 13. UNDER-CONSTRUCTION FEATURES

Identify features currently represented by Under Construction UI.

The README must clearly distinguish them from active functionality.

Do not write:

```text
Fully implemented
```

for an Under Construction page.

---

# 14. ASSET ANALYSIS

Inspect:

```text
Assets/
Features List Lotties/
Logo/
MineApp/src/assets/
MineApp/public/
```

Classify:

```text
runtime
prototype
reference
unused
duplicate
```

Use only actual MineHub assets in README documentation.

---

# 15. SCREENSHOT ANALYSIS

Use actual screenshots to document:

```text
current UI
actual workflow
prototype state
feature state
```

Do not use reference images as proof of implementation.

---

# 16. README FILE STRATEGY

Do not create one giant README containing everything.

Recommended:

```text
README.md
docs/README.md
MineApp/README.md
```

Create only the files justified by the existing repository.

If an existing README already fills a role, improve it rather than
duplicating it.

---

# 17. ROOT README PURPOSE

The root README is the public-facing project story.

Its job:

```text
WHAT
WHY
HOW
STATUS
TECH
DEMO
SETUP
DOCUMENTATION
```

It should be concise but visually impressive.

---

# 18. ROOT README HERO

Create a strong opening:

```text
MINEHUB.AI

The single home for every CMPDI and Coal India report

AI-powered geological, mining and reporting intelligence
for CMPDI / CIL subsidiaries

SIH 2026 • PS 26023 • Pehchan 302
```

The SIH identity is source-confirmed. fileciteturn7file0L2-L12

---

# 19. HERO CONTENT RULE

Above the fold, show:

```text
project name
one-line value
SIH / PS identity
status
demo, if real
```

Do not fill the hero with paragraphs.

---

# 20. PROJECT STATUS

Use the real current status.

Possible:

```text
Prototype
In Development
Partial Implementation
```

Do not claim:

```text
Production Ready
Fully Implemented
Official Government System
```

without evidence.

---

# 21. ONE-LINE VALUE

Use a simple explanation derived from the sources:

> MineHub turns fragmented mining reports and datasets into searchable,
evidence-backed intelligence.

Only use this if it remains consistent with actual implementation.

---

# 22. PROBLEM SECTION

Use a visual compact structure:

```text
50 years of records
        ↓
scans + PDFs + Excel
        ↓
manual search
        ↓
slow response
        ↓
knowledge loss
        ↓
verification difficulty
```

Source problem framing supports the first stages of this story. fileciteturn7file0L18-L24

---

# 23. SOLUTION SECTION

Explain MineHub as a process:

```text
Official data
   ↓
Read / extract
   ↓
Structure
   ↓
Retrieve evidence
   ↓
Verify
   ↓
Reason
   ↓
Generate output
   ↓
Trace back to source
```

The README should emphasize the process, not just feature names.

---

# 24. ARCHITECTURE DIAGRAM

Create a clean architecture/process diagram.

Required story:

```text
OFFICIAL SOURCES
        ↓
INGEST
        ↓
PARSE / OCR
        ↓
NORMALIZE
        ↓
INDEX / KNOWLEDGE
        ↓
USER QUERY
        ↓
RETRIEVE EVIDENCE
        ↓
VERIFY
        ↓
AI REASONING
        ↓
GENERATE OUTPUT
        ↓
PROVENANCE
        ↓
USER
```

Do not use an unreadable feature showcase diagram.

---

# 25. FEATURE GRID

Create a compact feature table:

| Feature | Purpose | Status |
|---|---|---|
| MineHub Report Studio | Reports and analytical outputs | ... |
| Deep-Dig RAG | Search complex mining documents | ... |
| Zero Guess Gate | Validate evidence before answer | ... |
| Coal-Tuned Brain | Coal-domain model capability | ... |
| MAG | Preserve institutional knowledge | ... |
| GeoMap | Connect mining data and geography | ... |
| Agent Bench | Governed agent development/evaluation | ... |
| Workflow Orchestration | Automate repeatable workflows | ... |

The SIH submission establishes these proposed capabilities. fileciteturn7file0L25-L54

Fill status from actual code.

---

# 26. ZERO GUESS SECTION

If implemented, explain:

```text
Retrieve
 ↓
Check evidence
 ↓
Supported → answer
Unsupported → abstain
```

If not fully implemented:

mark it:

```text
Planned / prototype
```

Do not promise “100% hallucination-free”.

---

# 27. MAG SECTION

Explain the institutional-memory concept:

```text
Experienced officer knowledge
        ↓
captured / preserved
        ↓
reusable by future officers
```

This is directly aligned with the SIH concept. fileciteturn7file0L46-L54

---

# 28. DEEP-DIG RAG

Explain in simple terms:

```text
Scanned / messy documents
        ↓
document understanding
        ↓
retrieval
        ↓
evidence
```

Use actual implementation status.

---

# 29. COAL-TUNED BRAIN

Explain only what exists.

If fine-tuning has not yet been completed:

write:

```text
Domain-model direction / planned capability
```

not:

```text
Production fine-tuned model
```

---

# 30. GEOMAP

Explain the intended relationship:

```text
geography
+
mine / block information
+
geological context
```

Only mention 2D/2.5D/3D/VR stages when supported by project documentation,
and clearly mark future stages.

---

# 31. AGENT BENCH

Document current agent capabilities only.

If the SIH submission describes future multi-agent work, mark it future
when not yet implemented. fileciteturn7file0L81-L87

---

# 32. WORKFLOW ORCHESTRATION

Describe:

```text
repeatable process
automation
approval / execution flow
```

only where supported.

---

# 33. SCREENSHOT SHOWCASE

Create a compact visual section using only real MineHub screenshots.

Suggested order:

```text
Feature Navigation
Recent Studio Sessions
Report Studio
Source Panel
Evidence Query
Studio Output
Geology Repository
Implemented feature screens
```

Do not use fake screens.

---

# 34. IMAGE RULES

Each README image must:

```text
exist
have correct relative path
render on GitHub
represent the actual product/reference state accurately
```

---

# 35. IMAGE CAPTIONS

Use short captions:

```text
MineHub feature navigation
Report Studio evidence workflow
Year-wise geological repository
```

No long paragraphs underneath.

---

# 36. LIVE DEMO

If a real demo URL exists:

include it prominently.

If there is only a prototype URL:

label:

```text
Prototype Demo
```

Do not invent URLs.

---

# 37. VIDEO

If a real product/demo video exists:

include it.

If not:

do not fabricate a YouTube link.

---

# 38. TECH STACK

Create a simple table:

| Layer | Technology | Status |
|---|---|---|
| Frontend | ... | ... |
| Backend | ... | ... |
| AI / LLM | ... | ... |
| RAG | ... | ... |
| OCR | ... | ... |
| Knowledge Graph | ... | ... |
| Vector Store | ... | ... |
| Cloud | ... | ... |
| GIS | ... | ... |

Do not claim technologies purely because they appear in the SIH PPT/PDF.
Verify repository usage.

---

# 39. DATA SOURCES

Create:

```text
Connected
Available for testing
Planned integration
Reference
```

This is especially important because the SIH document references
government sources such as data.gov.in, coal.gov.in, coalindia.in and
Bhuvan. fileciteturn7file0L90-L99

---

# 40. USE CASES

Use source-supported use cases:

```text
Parliamentary response
Production reporting
Geological report retrieval
Historical comparison
Cross-subsidiary analysis
Institutional knowledge transfer
```

Do not invent operational deployments.

---

# 41. REAL USER JOURNEY

Show:

```text
1. Select / upload sources
2. Ask a question
3. Retrieve evidence
4. Verify
5. Analyze
6. Generate output
7. Inspect source
8. Export
```

Include only steps supported by the product.

---

# 42. EXAMPLE

Use one concrete but non-fabricated example:

```text
Officer:
"Find the production figure for a subsidiary."

MineHub:
Question
 ↓
Relevant source
 ↓
Evidence
 ↓
Verification
 ↓
Answer / report
 ↓
Source reference
```

Do not invent a numeric result.

---

# 43. AI / RAG SECTION

Keep it process-oriented:

```text
Document understanding
        ↓
Retrieval
        ↓
Evidence validation
        ↓
Domain reasoning
        ↓
Output generation
```

---

# 44. CURRENT VS TARGET TABLE

Create:

| Capability | Current State | Evidence |
|---|---|---|
| Report Studio | ... | repository |
| Deep-Dig RAG | ... | repository/docs |
| Zero Guess Gate | ... | repository/docs |
| Coal-Tuned Brain | ... | repository/docs |
| MAG | ... | repository/docs |
| GeoMap | ... | repository/docs |
| Agent Bench | ... | repository/docs |
| Workflow Orchestration | ... | repository/docs |

This table is mandatory to prevent overclaiming.

---

# 45. ROADMAP

Create:

```text
✅ Implemented
🟡 In Development
🔵 Planned
```

Use no fake dates.

Use the SIH document's stated future work only after repository validation.
The source specifically mentions future full multi-agent functionality,
integration of the 50 years of coal data for fine-tuning, and further
delivery of verified source-backed responses. fileciteturn7file0L81-L87

---

# 46. FEASIBILITY

Create a compact section explaining:

```text
Open-source technologies
Public government data
Human-in-the-loop
Self-hosted option
Evidence-backed workflow
```

only where supported.

---

# 47. IMPACT

Create a simple table:

| Stakeholder | Value |
|---|---|
| Ministry officials | Faster evidence-backed drafting |
| Parliament response teams | Faster verified response preparation |
| CMPDI geologists | Less document searching |
| CIL corporate | Shared structured reporting view |

These stakeholder categories come from the SIH source. fileciteturn7file0L144-L164

Do not claim measured improvements unless measured.

---

# 48. RESEARCH BASIS

Keep research concise.

Possible:

```text
Geoscience RAG
Graph-based retrieval
Domain-tuned retrieval
Knowledge graphs
Government source integration
```

Link to actual research/reference documents where available.

---

# 49. SECURITY

Document actual security mechanisms.

Possible categories if confirmed:

```text
Authentication
RBAC
Source governance
Audit logging
Evidence traceability
Secure document access
```

Do not claim certifications.

---

# 50. PRIVACY

Explain how sensitive/official documents are treated only if supported by
actual architecture.

Do not invent:

```text
AES-256
zero data retention
air-gapped deployment
```

unless documented and implemented.

---

# 51. DEPLOYMENT

Inspect actual deployment configuration.

Document:

```text
local development
build
hosting
Catalyst
cloud
```

only where verified.

---

# 52. QUICK START

Inspect:

```text
MineApp/package.json
```

and derive real commands.

Only include commands that actually work.

Typical structure:

```bash
git clone <repository>
cd <actual-app-directory>
npm install
npm run dev
```

Use the actual repository/application directory.

---

# 53. BUILD COMMAND

Use the actual package script.

Do not assume:

```bash
npm run build
```

if the script differs.

---

# 54. ENVIRONMENT VARIABLES

Inspect source/config for required variable names.

Document variable names only.

NEVER expose:

```text
API keys
tokens
passwords
private credentials
```

---

# 55. REPOSITORY STRUCTURE

Generate an accurate tree from the real repository:

```text
MineHub/
├── MineApp/
├── docs/
├── prompts/
├── README.md
└── ...
```

Do not invent folders.

---

# 56. DOCUMENTATION INDEX

Create links to:

```text
Product
Architecture
AI / RAG
Data
Design
Planning
Research
```

only if actual documents exist.

---

# 57. `docs/README.md`

Purpose:

```text
documentation map
```

It should briefly explain where:

```text
architecture
product
design
planning
research
```

are stored.

Do not duplicate the entire root README.

---

# 58. `MineApp/README.md`

Purpose:

```text
developer setup
application structure
run
build
environment
development notes
```

Use actual commands from the repository.

---

# 59. NO DUPLICATED README CONTENT

Root README:

```text
project story
```

Docs README:

```text
documentation index
```

App README:

```text
developer guide
```

---

# 60. README VISUAL STYLE

The GitHub README should look polished:

```text
hero
badges
short problem
architecture diagram
feature grid
screenshots
tech stack
status
setup
docs
team
```

Use whitespace and compact tables.

---

# 61. NO WALLS OF TEXT

Do not create:

```text
huge paragraphs
essay-style sections
repeated explanations
```

Use:

```text
short paragraph
+
diagram
+
table
```

---

# 62. NO MARKETING HYPE

Do NOT write:

```text
World's first
Revolutionary
100% accurate
Zero hallucinations guaranteed
Official Government software
Production-ready
Military-grade
```

unless independently substantiated.

---

# 63. NO UNVERIFIED METRICS

Do not invent:

```text
90% faster
99.9% accuracy
50x retrieval
100% coverage
```

---

# 64. NO UNVERIFIED CURRENT DATA

Do not claim:

```text
live Ministry data
real-time CIL production
real-time DGMS
live government API
```

unless the current repository proves it.

---

# 65. BRANDING

Use MineHub branding consistently.

Use SIH identity correctly.

Do not imply Government of India endorsement merely by displaying
government logos.

---

# 66. LICENSE

Inspect the actual repository.

If no license exists:

do not invent one.

---

# 67. CONTRIBUTING

Create a compact contributing section:

```text
Fork
Branch
Change
Test
Pull Request
```

Use repository-specific rules if available.

---

# 68. TEAM

Use source-confirmed project identity:

```text
Pehchan 302
SIH 2026
PS 26023
Team ID 163089
```

Source-confirmed in the SIH document. fileciteturn7file0L2-L12

---

# 69. FOOTER

End compactly:

```text
Smart India Hackathon 2026
Problem Statement 26023
Team Pehchan 302
```

---

# 70. README CLAIM MATRIX

Before writing, create an internal matrix:

| Claim | Source | Current Status | README Location |
|---|---|---|---|
| PS 26023 | SIH PDF | Confirmed | Hero |
| 50-year fragmented reports | SIH PDF | Problem | Problem |
| Report Studio | Code + SIH | ... | Features |
| MAG | Docs + code | ... | Features |
| Fine-tuned model | ... | ... | AI |
| GeoMap | ... | ... | Features |
| Agent Bench | ... | ... | Roadmap |
| Workflow | ... | ... | Roadmap |

Do not leave important claims unverified.

---

# 71. SOURCE PRIORITY

For each claim use this priority:

```text
1. Current repository/code
2. Current project documentation
3. Current approved UI
4. SIH submission
5. Older presentations/reference files
```

For the original problem statement itself:

```text
SIH submission = primary source
```

---

# 72. OUTDATED FILE RULE

If a PPT/PDF describes an older architecture:

mark it:

```text
Earlier architecture
Historical
Concept
```

Do not present it as current.

---

# 73. SCREENSHOT STATUS

If a screenshot shows something not currently implemented:

label appropriately:

```text
Prototype
Concept
Earlier UI
```

---

# 74. RESEARCH STATUS

Do not present research references as proof that MineHub implements a
research technique.

Research supports the direction; repository evidence proves implementation.

---

# 75. DESIGN REFERENCES

Do not present reference UI screenshots as actual MineHub functionality.

---

# 76. GITHUB-SAFE CONTENT

Never expose:

```text
Windows local paths
personal directories
API keys
tokens
credentials
private links
secret environment values
```

---

# 77. RELATIVE IMAGE PATHS

Prefer:

```text
./assets/...
./docs/...
```

or correct relative GitHub paths based on the actual repository.

Verify them.

---

# 78. LINK VALIDATION

Check every README link.

Never invent a link.

---

# 79. README RENDER VALIDATION

Validate:

```text
headings
tables
code blocks
images
links
HTML, if used
badges
```

and check likely GitHub rendering.

---

# 80. VISUAL HIERARCHY

The root README should visually prioritize:

```text
MineHub identity
Problem
How it works
Features
Current status
Demo
Setup
```

---

# 81. ONE-SECOND TEST

A reviewer looking at the first screen should understand:

```text
MineHub
=
AI-powered mining report intelligence
```

---

# 82. THIRTY-SECOND TEST

A reviewer should understand:

```text
Problem
Solution
Process
Current status
```

---

# 83. FIVE-MINUTE TEST

A technical reviewer should be able to locate:

```text
Architecture
Tech stack
Data sources
Setup
Roadmap
Documentation
```

---

# 84. JUDGE-FRIENDLY LANGUAGE

Avoid excessive jargon.

Use:

```text
RAG = Retrieval-Augmented Generation
OCR = Optical Character Recognition
GIS = Geographic Information System
```

only where necessary.

---

# 85. MINING-FRIENDLY LANGUAGE

Use simple terms:

```text
report
production
geology
borehole
subsidiary
evidence
historical record
```

when supported.

---

# 86. PROCESS DIAGRAM > FEATURE POSTER

The README's primary architecture visual must explain:

```text
data in
→ processing
→ evidence
→ validation
→ AI
→ output
```

not just:

```text
feature names
```

---

# 87. CURRENT PRODUCT BOUNDARY

Clearly distinguish:

```text
Current MineHub implementation
```

from:

```text
Future MineHub architecture
```

---

# 88. FUTURE FEATURES

Show future features in roadmap rather than pretending they are live.

---

# 89. IMPLEMENTED FEATURES

Show only features verified by code/UI.

---

# 90. PARTIAL FEATURES

Use:

```text
Prototype
Partial
In Development
```

where applicable.

---

# 91. NO FAKE DEMO DATA

Screenshots and examples must not introduce fake production numbers.

---

# 92. NO FAKE INCIDENTS

If real-world incidents are referenced, use actual sources only.

---

# 93. NO FAKE GOVERNMENT CLAIMS

Do not state that MineHub is an official Ministry platform unless formally
verified.

---

# 94. NO FAKE RESEARCH CLAIMS

Do not state that a research result proves MineHub's performance unless
MineHub itself was evaluated accordingly.

---

# 95. NO PERFORMANCE CLAIMS WITHOUT MEASUREMENT

Do not include latency, accuracy, recall, cost savings or speed claims
unless supported by measured project evidence.

---

# 96. NO SECURITY CERTIFICATION CLAIMS

Do not claim:

```text
ISO certified
SOC 2
CERT-In certified
government certified
```

unless explicitly documented.

---

# 97. NO AI MODEL CLAIMS WITHOUT EVIDENCE

If a model is:

```text
planned fine-tuning
prototype
base model
```

state exactly that.

---

# 98. NO API CLAIMS WITHOUT EVIDENCE

Separate:

```text
available public source
configured connector
working integration
planned integration
```

---

# 99. NO DATABASE CLAIMS WITHOUT EVIDENCE

Do not claim:

```text
Neo4j
PostgreSQL
Chroma
pgvector
```

as implemented unless actual repository evidence exists.

The SIH PDF may describe them as proposed/feasible technologies. fileciteturn7file0L104-L124

---

# 100. CURRENT IMPLEMENTATION AUDIT

Before finalizing the README, produce a concise internal status audit:

```text
Implemented:
...

Partial:
...

Prototype:
...

Planned:
...
```

---

# 101. README FILE CHANGE REPORT

Before changing files, identify:

```text
Existing README files
Files to modify
Files to create
Files to leave untouched
```

---

# 102. NO APPLICATION CHANGES

README creation must NOT modify:

```text
MineApp source
routes
services
styles
AI
database
deployment
```

unless a link/path in documentation needs updating.

---

# 103. NO GIT OPERATIONS

This README-generation task does NOT authorize:

```text
git add
git commit
git push
```

Do not perform them unless explicitly requested later.

---

# 104. NO DEPLOYMENT

Do not deploy.

---

# 105. FINAL README SET

Recommended final set:

```text
README.md
docs/README.md
MineApp/README.md
```

Use only when justified.

---

# 106. ROOT README SECTION ORDER

Recommended:

```text
Hero
↓
Problem
↓
Why MineHub
↓
How It Works
↓
Architecture
↓
Features
↓
Screenshots
↓
Tech Stack
↓
Data Sources
↓
Use Cases
↓
Current Status
↓
Roadmap
↓
Quick Start
↓
Repository Structure
↓
Documentation
↓
Security
↓
Contributing
↓
SIH / Team
```

Keep every section concise.

---

# 107. DOCS README SECTION ORDER

```text
Documentation
Product
Architecture
AI / RAG
Data
Design
Planning
Research
```

---

# 108. APP README SECTION ORDER

```text
MineApp
Prerequisites
Install
Run
Build
Environment
Folder Structure
Development
Troubleshooting
```

Only include actual commands.

---

# 109. WOW FACTOR

The README should feel polished because of:

```text
clarity
visual hierarchy
process diagrams
real screenshots
accurate status
clean tables
strong architecture explanation
```

NOT because of:

```text
huge text
excessive emojis
marketing hype
fake metrics
giant badges
```

---

# 110. FINAL QUALITY CHECK

Before finishing, verify:

## Clarity

Can a first-time reader explain MineHub?

## Accuracy

Can every important claim be traced to a source?

## Status honesty

Are current and future capabilities separated?

## Architecture

Does the process diagram explain what happens?

## SIH relevance

Is PS 26023 clearly connected?

## Technical usability

Can a developer run the application?

## Visual quality

Does the README look professional on GitHub?

## Scanability

Can important information be found quickly?

---

# 111. REQUIRED FINAL INTERNAL REVIEW

Ask:

```text
Does the first screen explain MineHub?

Does the architecture explain the process?

Do screenshots represent real MineHub state?

Are planned capabilities clearly marked?

Are technology claims verified?

Are all links valid?

Are no secrets exposed?

Is the README concise?

Is there any fake data?

Is there any unsupported claim?
```

Anything failing these checks must be corrected before final output.

---

# 112. FINAL README STORY

The final README must tell this story:

```text
MINING INFORMATION IS FRAGMENTED
            ↓
OFFICERS SPEND TIME FINDING IT
            ↓
MINEHUB INGESTS / UNDERSTANDS IT
            ↓
MINEHUB RETRIEVES THE RIGHT EVIDENCE
            ↓
MINEHUB VALIDATES THE EVIDENCE
            ↓
AI REASONS OVER TRUSTED INFORMATION
            ↓
MINEHUB CREATES USEFUL OUTPUT
            ↓
THE OUTPUT REMAINS TRACEABLE
```

This is the story the README must make obvious.

---

# 113. FINAL PRINCIPLE

The README is not a catalog of everything in the repository.

It is the clearest trustworthy explanation of:

```text
PROBLEM
  ↓
SYSTEM
  ↓
PROCESS
  ↓
CURRENT PRODUCT
  ↓
TECHNOLOGY
  ↓
IMPACT
  ↓
FUTURE
```

A judge should finish reading and understand:

> **What MineHub is, why it exists, how it works, what is actually built,
and what comes next.**

# END OF MASTER PROMPT
