# MineHub.ai Documentation Hub

Welcome to the comprehensive documentation repository for **MineHub.ai** — the AI-Powered Geological, Mining, and Statutory Reporting Intelligence Platform developed for the **Smart India Hackathon 2026** (Problem Statement ID: **26023**, Team **Pehchan 302**).

This directory houses the complete architectural specifications, system diagrams, research references, and technical blueprints that guide the MineHub platform.

---

## 📑 Documentation Index

1. [Product Overview](#-product-overview)
2. [Architecture Blueprint & Diagram Catalog](#-architecture-blueprint--diagram-catalog)
3. [AI & Deep-Dig RAG Pipeline](#-ai--deep-dig-rag-pipeline)
4. [Data Taxonomy & Public Sources](#-data-taxonomy--public-sources)
5. [Design System & UI Guidelines](#-design-system--ui-guidelines)
6. [Planning & Engineering Roadmap](#-planning--engineering-roadmap)
7. [Research & Reference Benchmarks](#-research--reference-benchmarks)

---

## 🧭 Product Overview

MineHub.ai is designed to solve the critical knowledge fragmentation problem across **Coal India Limited (CIL)** and **CMPDI (Central Mine Planning & Design Institute)**.

- **Primary Challenge**: Decades of valuable geological records (geological reports, borehole lithology logs, chemical assay sheets, statutory compliance filings) are trapped in scanned raster PDFs and physical archives across 7 operational subsidiaries.
- **Our Solution**: A unified intelligence platform featuring a **Geological Report Explorer**, an AI-powered **Report Studio** with 9 analytical engines, an **Executive Production Dashboard**, and an automated **Zero-Guess Verification Gate** to eliminate AI hallucinations.

---

## 🏛️ Architecture Blueprint & Diagram Catalog

The [`architecture/`](./architecture/) directory contains 20 visual diagrams illustrating the system's structural tiers, data ingestion pipelines, multi-agent interactions, and verification gates.

| Diagram Asset | Description | Focus Area |
| :--- | :--- | :--- |
| [`minehub_solution_architecture.jpg`](./architecture/minehub_solution_architecture.jpg) | High-level solution breakdown across Presentation, Orchestration, Retrieval, and Storage layers. | High-Level Overview |
| [`minehub_workflow_architecture.png`](./architecture/minehub_workflow_architecture.png) | End-to-end data lifecycle from raw multi-subsidiary PDF ingestion to interactive Studio deliverables. | Data Pipeline & Flow |
| [`minehub_architecture_judges_edition.jpg`](./architecture/minehub_architecture_judges_edition.jpg) | Streamlined, judge-tailored architecture diagram emphasizing SIH 2026 Problem Statement 26023 alignment. | SIH Evaluation |
| [`minehub_master_architecture_v3.jpg`](./architecture/minehub_master_architecture_v3.jpg) | Comprehensive enterprise architecture v3 displaying Agent Bench, Zero-Guess Gate, and storage engine. | Complete Blueprint |
| [`minehub_process_flow_architecture.jpg`](./architecture/minehub_process_flow_architecture.jpg) | Step-by-step document parsing, stratigraphy chunking, vector indexing, and citation verification. | Ingestion & Verification |
| [`minehub_enterprise_system_architecture.jpg`](./architecture/minehub_enterprise_system_architecture.jpg) | Multi-tenant subsidiary partitioning, air-gapped deployment readiness, and role-based security. | Enterprise Deployment |
| [`minehub_end_to_end_workflow.jpg`](./architecture/minehub_end_to_end_workflow.jpg) | Detailed operational sequence from user prompt to multi-agent consensus and final rendered artifact. | Execution Lifecycle |
| [`minehub_advanced_system_architecture.jpg`](./architecture/minehub_advanced_system_architecture.jpg) | Microservice communication pathways, API gateways, and asynchronous task queues. | Service Topology |
| [`minehub_workflow_unified_blue.jpg`](./architecture/minehub_workflow_unified_blue.jpg) | Unified operational flow blueprint rendered in industrial theme. | Visual Presentation |
| [`minehub_system_architecture.html`](./architecture/minehub_system_architecture.html) | Interactive web-based rendering of the MineHub architectural framework. | Interactive Inspection |

---

## 🤖 AI & Deep-Dig RAG Pipeline

### 1. Stratigraphic & Table-Aware Chunking
Traditional RAG splits documents arbitrarily by token count, often slicing coal seam tables or borehole lithology layers in half. MineHub's planned ingestion pipeline enforces:
- **Stratigraphic Unit Preservation**: Preserves continuous lithology blocks from surface soil down to basement rock.
- **Tabular Integrity**: Extracts proximate analysis tables (Ash %, Moisture %, Volatile Matter, Fixed Carbon, GCV) as unified markdown and structured JSON representations.

### 2. Zero-Guess Verification Gate
To prevent hallucination in critical mining decisions:
- Every generated statement must match an exact, verified text span from an ingested document.
- The system binds the assertion to a **Source Document ID**, **Page Number**, and **Verbatim Excerpt**.
- If the grounding confidence falls below an established safety threshold, the system abstains from answering and alerts the officer.

### 3. Agent Bench: Multi-Agent Personas
- **Geology Specialist Agent**: Analyzes seam depths, faults, parting thicknesses, and coal grades.
- **Mining Operations Analyst Agent**: Evaluates stripping ratios, overburden removal (OBR), and equipment productivity.
- **Statutory & Environmental Auditor Agent**: Audits environmental clearances, DGMS safety directives, and forest diversion compliance.
- **Synthesis Orchestrator**: Harmonizes multi-agent findings into a cohesive, evidence-backed brief.

---

## 📊 Data Taxonomy & Public Sources

MineHub is architected to ingest and standardize data across key public Indian mining repositories:

1. **data.gov.in**: Open government coal statistics, state-wise reserve estimates, and subsidiary production ledgers.
2. **coal.gov.in**: Ministry of Coal provisional coal statistics, statutory notifications, and annual project reports.
3. **coalindia.in**: Coal India Limited corporate disclosures, ESG filings, and quarterly operational reviews.
4. **cmpdi.co.in**: Geological exploration reports, borehole archives, and block allocation documentation.
5. **bhuvan.nrsc.gov.in**: ISRO geospatial satellite imagery, mine lease boundaries, and land use classification.

---

## 🎨 Design System & UI Guidelines

The user interface of MineHub is built strictly without external utility frameworks like Tailwind, relying on custom CSS and a cohesive design token system:

- **Tokens**: Located in `MineApp/src/styles/theme.js`.
- **Global Resets & Typographic Scale**: Located in `MineApp/src/styles/index.css`.
- **Aesthetic Principles**:
  - Dark-mode coal theme with industrial slate, amber, and cyan accents.
  - Zero layout shift with responsive tabular data displays.
  - High information density tailored for engineering control rooms.

---

## 🗺️ Planning & Engineering Roadmap

Detailed milestone tracking for platform development:

- **Phase 1 (Completed)**: High-fidelity interactive UI prototype, Geological Repository Explorer, Report Studio with 9 engines, and client-side session management.
- **Phase 2 (Planned Q2 2026)**: FastAPI backend implementation, LangGraph multi-agent execution bench, pgvector hybrid search.
- **Phase 3 (Planned Q3 2026)**: 50-year document OCR pipeline, automated borehole table parser, Neo4j knowledge graph integration.
- **Phase 4 (Planned Q4 2026)**: Field trials with CMPDI Regional Institute-1, offline edge deployment, and localized multi-lingual support.

---

## 🔬 Research & Reference Benchmarks

The MineHub architectural direction is informed by established research in domain-adapted retrieval and agentic reasoning:
- *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (Lewis et al.)
- *Layout-Aware Document Understanding for Tabular and Scanned PDFs*
- *Multi-Agent Orchestration and Reflection Architectures* (Wu et al.)

> *Note: Research references establish the technical rationale for MineHub's design. Actual implementation state is strictly documented in the [Root README](../README.md#%EF%B8%8F-truth-in-engineering-current-implementation-status).*
