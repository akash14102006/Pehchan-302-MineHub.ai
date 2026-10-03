import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import {
  Download,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  FileCheck2,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
} from 'lucide-react';

import ministryLogo from '../../../assets/ministry-of-coal-cropped.png';
import reportIcon from '../../../assets/report.png';
import ReportTemplateSelector from '../ReportTemplateSelector';
import {
  REPORT_TEMPLATES,
  reportProductionDataService,
} from '../../../services/reportProductionDataService';

/* ========================================================
   EXACT A4 DOCUMENT CONSTANTS (210mm x 297mm at 96 DPI)
   ======================================================== */
const A4_WIDTH_PX = 794;
const A4_MIN_HEIGHT_PX = 1123;

/* ========================================================
   CONTAINER & RESPONSIVE VIEWER ARCHITECTURE
   Layer 1: Studio Panel (Container)
   Layer 2: Toolbar & Template Selector (Studio Chrome)
   Layer 3: Report Viewer Viewport (Scroll area with drafting desk)
   Layer 4: Proportional Scale Wrapper
   Layer 5: Discrete A4 Paper Pages (Page 1, Page 2)
   ======================================================== */
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f1f5f9;
  overflow: hidden;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;

  @media print {
    background: #ffffff;
    height: auto;
    overflow: visible;
  }
`;

/* Studio Top Action Toolbar */
const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 14px;
  border-bottom: 1px solid rgba(22, 72, 99, 0.1);
  background-color: #ffffff;
  flex-shrink: 0;
  box-sizing: border-box;
  min-width: 0;

  .left-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #164863;
    min-width: 0;

    img.tool-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .title-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .a4-tag {
      background: #e2e8f0;
      color: #334155;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 4px;
      letter-spacing: 0.3px;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;

    .zoom-group {
      display: inline-flex;
      align-items: center;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 2px 4px;
      gap: 2px;

      button {
        background: transparent;
        border: none;
        padding: 3px 5px;
        color: #164863;
        cursor: pointer;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: #e2e8f0;
        }
      }

      .zoom-level-text {
        font-size: 10.5px;
        font-weight: 700;
        color: #164863;
        padding: 0 4px;
        min-width: 38px;
        text-align: center;
      }
    }

    button.action-btn {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      color: #164863;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-family: inherit;
      transition: all 0.15s ease;
      white-space: nowrap;

      &:hover {
        background-color: #e2e8f0;
        border-color: #94a3b8;
      }

      &.primary {
        background-color: #164863;
        color: #ffffff;
        border-color: #164863;

        &:hover {
          background-color: #0f3144;
        }
      }
    }
  }

  @media print {
    display: none !important;
  }
`;

/* The Report Viewport - drafting desk background */
const ReportViewer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  background-color: #cbd5e1;
  background-image: radial-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px);
  background-size: 16px 16px;
  box-sizing: border-box;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(12px, 3vw, 24px) 12px;

  @media print {
    padding: 0 !important;
    overflow: visible !important;
    background: #ffffff !important;
    display: block !important;
  }
`;

/* Scaled document wrapper to reserve exact pixel height */
const ScaledDocumentContainer = styled.div`
  width: ${(props) => props.$scaledWidth}px;
  height: ${(props) => props.$scaledHeight}px;
  position: relative;
  flex-shrink: 0;
  transition: width 0.15s ease, height 0.15s ease;

  @media print {
    width: 100% !important;
    height: auto !important;
    transform: none !important;
  }
`;

/* Transform scale origin wrapper */
const ScalingAnchor = styled.div`
  width: ${A4_WIDTH_PX}px;
  transform: scale(${(props) => props.$scale});
  transform-origin: top center;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -${A4_WIDTH_PX / 2}px;

  @media print {
    position: static !important;
    transform: none !important;
    width: 100% !important;
    margin: 0 !important;
  }
`;

/* Authentic A4 Paper Sheet (210mm x 297mm) */
const A4PaperSheet = styled.article`
  width: ${A4_WIDTH_PX}px;
  min-height: ${A4_MIN_HEIGHT_PX}px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 42px 48px;
  margin-bottom: 24px;
  border-radius: 4px;
  border: 1px solid rgba(22, 72, 99, 0.16);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.12), 0 0 1px rgba(0, 0, 0, 0.1);
  font-family: inherit;
  color: #1e293b;
  position: relative;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }

  @media print {
    width: 100% !important;
    min-height: auto !important;
    box-shadow: none !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    page-break-after: always !important;
    break-after: page !important;
  }
`;

/* ========================================================
   INSTITUTIONAL HEADER ARCHITECTURE (NO COLUMN SQUEEZE)
   ======================================================== */
const InstitutionalHeader = styled.header`
  border-bottom: 2.5px solid #164863;
  padding-bottom: 12px;
  margin-bottom: 14px;
  box-sizing: border-box;
  width: 100%;

  .header-top-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 10px;

    .emblem-badge {
      background: #ffffff;
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid rgba(22, 72, 99, 0.15);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      img.ministry-emblem {
        height: 48px;
        max-width: 130px;
        object-fit: contain;
        display: block;
      }
    }

    .govt-identity {
      .sup-gov {
        font-size: 11px;
        font-weight: 800;
        color: #164863;
        letter-spacing: 0.9px;
        text-transform: uppercase;
        margin: 0 0 2px 0;
      }

      .sup-dept {
        font-size: 13px;
        font-weight: 800;
        color: #0f172a;
        margin: 0;
        letter-spacing: 0.4px;
      }
    }
  }

  /* Full-width Title Block - Never compressed horizontally */
  .title-block {
    width: 100%;
    margin-bottom: 8px;

    h1.report-title {
      font-size: 19px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 3px 0;
      line-height: 1.3;
      letter-spacing: 0.2px;
      white-space: normal;
      word-break: normal;
      overflow-wrap: break-word;
    }

    p.report-subtitle {
      font-size: 12px;
      color: #475569;
      margin: 0;
      font-weight: 500;
      line-height: 1.4;
    }
  }

  /* Dedicated Institutional Metadata Strip */
  .metadata-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 11px;

    .meta-item {
      display: flex;
      flex-direction: column;

      .meta-label {
        font-size: 9.5px;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }

      .meta-val {
        font-size: 11.5px;
        font-weight: 700;
        color: #164863;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

/* Secondary Header for Continuation Pages */
const SecondaryPageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1.5px solid #cbd5e1;
  font-size: 10.5px;
  color: #64748b;
  font-weight: 600;

  .left-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #164863;
    font-weight: 700;
  }

  .right-docref {
    font-family: monospace;
    font-weight: 700;
    color: #164863;
  }
`;

/* Provenance and Freshness Banner */
const ProvenanceBanner = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  padding: 6px 12px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11px;
  color: #166534;

  .left-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;

    .live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #16a34a;
    }
  }

  .right-timestamp {
    color: #15803d;
    font-family: monospace;
    font-weight: 600;
  }
`;

/* Typography & Section Styles */
const SectionHeading = styled.h2`
  font-size: 13px;
  font-weight: 800;
  color: #164863;
  background-color: #f1f5f9;
  padding: 6px 10px;
  border-left: 3.5px solid #164863;
  border-radius: 0 4px 4px 0;
  margin: 16px 0 10px 0;
  letter-spacing: 0.3px;
  page-break-after: avoid;
  break-after: avoid;
`;

const Paragraph = styled.p`
  font-size: 12.5px;
  line-height: 1.65;
  color: #334155;
  margin: 0 0 10px 0;
  text-align: justify;
`;

const CitationTag = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background-color: #e0f2fe;
  color: #0284c7;
  border: 1px solid #bae6fd;
  border-radius: 4px;
  padding: 1px 6px;
  font-size: 10.5px;
  font-weight: 700;
  cursor: pointer;
  margin: 0 3px;
  vertical-align: middle;
  font-family: inherit;
  transition: all 0.15s ease;

  &:hover {
    background-color: #bae6fd;
    color: #0369a1;
    text-decoration: underline;
  }
`;

/* KPI Metrics Grid */
const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 12px 0 16px 0;
`;

const KpiCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 12px;
  box-sizing: border-box;

  .label {
    font-size: 10px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 4px;
  }

  .val-row {
    display: flex;
    align-items: baseline;
    gap: 4px;

    .num {
      font-size: 19px;
      font-weight: 800;
      color: #164863;
      font-variant-numeric: tabular-nums;
    }

    .unit {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
    }
  }

  .sub {
    font-size: 10px;
    font-weight: 600;
    color: ${(props) => props.$color || '#16a34a'};
    margin-top: 2px;
  }
`;

/* Exact Table Layout (Fits 100% of A4 Content Area) */
const TableContainer = styled.div`
  width: 100%;
  margin: 10px 0 16px 0;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  overflow: hidden;
  box-sizing: border-box;
`;

const A4Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 11.5px;
  background: #ffffff;

  th {
    background-color: #f8fafc;
    color: #164863;
    padding: 8px 10px;
    border-bottom: 2px solid #cbd5e1;
    font-weight: 700;
    text-align: left;
    white-space: nowrap;
  }

  td {
    padding: 7px 10px;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
    font-variant-numeric: tabular-nums;

    &.bold {
      font-weight: 700;
      color: #0f172a;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    background-color: #fafbfd;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  background-color: ${(props) =>
    props.$status === 'Exceeding' || props.$status === 'Verified' || props.$status === 'Approved'
      ? '#dcfce7'
      : props.$status === 'On Track' || props.$status === 'Complied'
      ? '#dbeafe'
      : '#fef3c7'};
  color: ${(props) =>
    props.$status === 'Exceeding' || props.$status === 'Verified' || props.$status === 'Approved'
      ? '#15803d'
      : props.$status === 'On Track' || props.$status === 'Complied'
      ? '#1d4ed8'
      : '#b45309'};
`;

/* Official Page Footer (Bottom-anchored inside A4) */
const PageFooter = styled.footer`
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10.5px;
  color: #64748b;
  box-sizing: border-box;

  .left-seal {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
  }

  .right-page {
    font-weight: 700;
    color: #164863;
  }
`;

/* ========================================================
   MAIN REPORT COMPONENT
   ======================================================== */
const ReportGeneratorEngine = ({ onSelectEvidence, session }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    'executive-intelligence-dossier'
  );
  const [copySuccess, setCopySuccess] = useState(false);
  const [zoomMode, setZoomMode] = useState('fit'); // 'fit' | 1 | 0.85 | 0.7
  const [scale, setScale] = useState(1);
  const viewerRef = useRef(null);

  const prodData = reportProductionDataService.getProductionMetrics();
  const geoData = reportProductionDataService.getGeologyMetrics();
  const compData = reportProductionDataService.getComplianceMetrics();
  const inqData = reportProductionDataService.getInquiriesMetrics();
  const currentTemplate = reportProductionDataService.getTemplate(selectedTemplateId);

  /* Proportional Fit-to-Width Scaling Observer */
  useLayoutEffect(() => {
    const calculateScale = () => {
      if (!viewerRef.current) return;
      const availableWidth = viewerRef.current.clientWidth;
      if (zoomMode === 'fit') {
        // Leave 28px breathing room for padding and scrollbar
        const computed = (availableWidth - 28) / A4_WIDTH_PX;
        // Clamp scale gracefully between 0.38 and 1.05
        setScale(Math.max(0.38, Math.min(1.02, computed)));
      } else if (typeof zoomMode === 'number') {
        setScale(zoomMode);
      }
    };

    calculateScale();

    const observer = new ResizeObserver(() => {
      calculateScale();
    });

    if (viewerRef.current) {
      observer.observe(viewerRef.current);
    }

    return () => observer.disconnect();
  }, [zoomMode]);

  const handleCiteClick = (refId, claim, source, page, excerpt) => {
    if (onSelectEvidence) {
      onSelectEvidence({
        claim,
        source,
        refId,
        page,
        coordinates: 'Official Gazette & Ledger Citation',
        timestamp: prodData.freshnessTimestamp,
        hash: 'SHA256: 7f83b1657ff1fc53b92dc18148a1d65d',
        excerpt,
        authority: 'Ministry of Coal Directorate of Statutory Planning',
      });
    }
  };

  const handleCopyText = () => {
    const textContent = `MINISTRY OF COAL — GOVERNMENT OF INDIA\nReport: ${currentTemplate.name}\nRef: ${currentTemplate.code}-2026\nPeriod: ${currentTemplate.period}\nData Freshness: ${prodData.freshnessTimestamp}\nNational Mandate Target: ${prodData.nationalTargetMT} MT | YTD Actual: ${prodData.actualYTDOutputMT} MT (${prodData.achievementPct}% Achieved)\nExploration Drilling: ${geoData.totalDrillingMeterage.toLocaleString()} m | DGMS Audits: ${compData.dgmsAuditRate}\n(Generated from MineHub.ai Real-Time Production & Statutory Intelligence Platform)`;
    navigator.clipboard.writeText(textContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // Two discrete A4 pages (Page 1 + Page 2)
  const totalUnscaledHeight = A4_MIN_HEIGHT_PX * 2 + 24; // 2 pages + 24px gap
  const scaledWidth = Math.round(A4_WIDTH_PX * scale);
  const scaledHeight = Math.round(totalUnscaledHeight * scale);

  return (
    <Container>
      {/* 1. Top Action & Zoom Toolbar */}
      <Toolbar>
        <div className="left-info">
          <img src={reportIcon} alt="Report Tool" className="tool-icon" />
          <span className="title-text">{currentTemplate.name}</span>
          <span className="a4-tag">A4 Portrait (2 Pages)</span>
        </div>

        <div className="actions">
          {/* Proportional Zoom Controls */}
          <div className="zoom-group">
            <button
              onClick={() => {
                setZoomMode((prev) => (typeof prev === 'number' ? Math.max(0.4, prev - 0.1) : Math.max(0.4, scale - 0.1)));
              }}
              title="Zoom Out"
            >
              <ZoomOut size={13} />
            </button>
            <span className="zoom-level-text">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => {
                setZoomMode((prev) => (typeof prev === 'number' ? Math.min(1.2, prev + 0.1) : Math.min(1.2, scale + 0.1)));
              }}
              title="Zoom In"
            >
              <ZoomIn size={13} />
            </button>
            <button
              onClick={() => setZoomMode(zoomMode === 'fit' ? 1.0 : 'fit')}
              title={zoomMode === 'fit' ? 'Actual Size (100%)' : 'Fit to Available Width'}
              style={{ fontWeight: 700, fontSize: '10px' }}
            >
              {zoomMode === 'fit' ? '100%' : 'Fit'}
            </button>
          </div>

          <button className="action-btn" onClick={handleCopyText} title="Copy official report summary text">
            {copySuccess ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
            <span>{copySuccess ? 'Copied' : 'Copy Text'}</span>
          </button>
          <button className="action-btn" onClick={handlePrint} title="Print official A4 dossier">
            <Printer size={12} />
            <span>Print</span>
          </button>
          <button className="action-btn primary" onClick={handlePrint} title="Export as PDF document">
            <Download size={12} />
            <span>Export PDF</span>
          </button>
        </div>
      </Toolbar>

      {/* 2. Compact 5-Template Selector (Outside document boundary) */}
      <ReportTemplateSelector
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={(id) => setSelectedTemplateId(id)}
      />

      {/* 3. Document Viewport with Fit-to-Width Proportional Scaling */}
      <ReportViewer ref={viewerRef}>
        <ScaledDocumentContainer $scaledWidth={scaledWidth} $scaledHeight={scaledHeight}>
          <ScalingAnchor $scale={scale}>
            {/* ========================================================
                A4 PAGE 1: COVER, INSTITUTIONAL HEADER & CORE MANDATES
                ======================================================== */}
            <A4PaperSheet className="a4-page">
              <InstitutionalHeader>
                <div className="header-top-row">
                  <div className="emblem-badge" title="Ministry of Coal, Government of India">
                    <img
                      src={ministryLogo}
                      alt="Ministry of Coal Emblem"
                      className="ministry-emblem"
                    />
                  </div>
                  <div className="govt-identity">
                    <div className="sup-gov">GOVERNMENT OF INDIA</div>
                    <div className="sup-dept">MINISTRY OF COAL</div>
                  </div>
                </div>

                <div className="title-block">
                  <h1 className="report-title">{currentTemplate.name}</h1>
                  <p className="report-subtitle">{currentTemplate.shortDesc}</p>
                </div>

                <div className="metadata-strip">
                  <div className="meta-item">
                    <span className="meta-label">Session Period</span>
                    <span className="meta-val">{currentTemplate.period}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Authority</span>
                    <span className="meta-val">Ministry of Coal</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Document Ref</span>
                    <span className="meta-val">{currentTemplate.code}-2026</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Verification</span>
                    <span className="meta-val">Zero Guess Ratified</span>
                  </div>
                </div>
              </InstitutionalHeader>

              <ProvenanceBanner>
                <div className="left-status">
                  <span className="live-dot" />
                  <span>Authoritative Production Data Synchronized</span>
                </div>
                <div className="right-timestamp">
                  Data as of: {prodData.freshnessTimestamp}
                </div>
              </ProvenanceBanner>

              {/* TEMPLATE 1: EXECUTIVE INTELLIGENCE DOSSIER - PAGE 1 */}
              {selectedTemplateId === 'executive-intelligence-dossier' && (
                <>
                  <SectionHeading>1. EXECUTIVE PRODUCTION MANDATE EVALUATION</SectionHeading>
                  <Paragraph>
                    The national coal production target for FY 2025–26 stands at{' '}
                    <strong>{prodData.nationalTargetMT.toFixed(1)} Million Tonnes (MT)</strong>
                    <CitationTag
                      onClick={() =>
                        handleCiteClick(
                          'CIL-PROD-768-MANDATE',
                          'Annual Coal Production Mandate: 768.0 MT',
                          'CIL_Subsidiary_Production_Ledger_2025.xlsx',
                          'Sheet 1, Cell C4',
                          'Coal India Limited production commitment ratified by Ministry of Coal at 768.0 MT aggregate across all operating subsidiaries.'
                        )
                      }
                    >
                      [Ref: CIL-768-MT]
                    </CitationTag>
                    . Cumulative verified output reached <strong>{prodData.actualYTDOutputMT.toFixed(1)} MT</strong>, representing a{' '}
                    <strong>{prodData.achievementPct.toFixed(1)}%</strong> achievement velocity against national commitments. The remaining deficit of{' '}
                    <strong>{prodData.q4RemainingDeficitMT.toFixed(1)} MT</strong> is distributed across Q4 peak dispatch corridors.
                  </Paragraph>

                  <KpiGrid>
                    <KpiCard>
                      <div className="label">National Target</div>
                      <div className="val-row">
                        <span className="num">{prodData.nationalTargetMT.toFixed(1)}</span>
                        <span className="unit">MT</span>
                      </div>
                      <div className="sub">100% CIL Mandate</div>
                    </KpiCard>
                    <KpiCard $color="#16a34a">
                      <div className="label">Actual YTD Output</div>
                      <div className="val-row">
                        <span className="num">{prodData.actualYTDOutputMT.toFixed(1)}</span>
                        <span className="unit">MT</span>
                      </div>
                      <div className="sub">▲ {prodData.achievementPct.toFixed(1)}% Achieved</div>
                    </KpiCard>
                    <KpiCard $color="#2563eb">
                      <div className="label">Top Subsidiary</div>
                      <div className="val-row">
                        <span className="num">168.4</span>
                        <span className="unit">MT</span>
                      </div>
                      <div className="sub">MCL (82.5% Target)</div>
                    </KpiCard>
                    <KpiCard $color="#d97706">
                      <div className="label">Q4 Deficit</div>
                      <div className="val-row">
                        <span className="num">{prodData.q4RemainingDeficitMT.toFixed(1)}</span>
                        <span className="unit">MT</span>
                      </div>
                      <div className="sub">Peak Dispatch Track</div>
                    </KpiCard>
                  </KpiGrid>

                  <SectionHeading>2. OPERATIONAL SUBSIDIARIES PERFORMANCE SUMMARY</SectionHeading>
                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Subsidiary</th>
                          <th>Annual Target (MT)</th>
                          <th>Actual YTD (MT)</th>
                          <th>Achievement %</th>
                          <th>Coalfield Basin</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prodData.subsidiaries.slice(0, 4).map((sub) => (
                          <tr key={sub.code}>
                            <td className="bold">{sub.code} ({sub.name})</td>
                            <td>{sub.target.toFixed(1)}</td>
                            <td>{sub.actual.toFixed(1)}</td>
                            <td className="bold">{sub.pct.toFixed(1)}%</td>
                            <td>{sub.coalfield}</td>
                            <td><StatusBadge $status={sub.status}>{sub.status}</StatusBadge></td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>
                </>
              )}

              {/* TEMPLATE 2: PRODUCTION PERFORMANCE REPORT - PAGE 1 */}
              {selectedTemplateId === 'production-performance' && (
                <>
                  <SectionHeading>1. CONSOLIDATED PRODUCTION VELOCITY & SUBSIDIARY MANDATES</SectionHeading>
                  <Paragraph>
                    Operational tracking across Coal India Limited's seven operating subsidiaries. Production velocity is benchmarked against the national{' '}
                    <strong>{prodData.nationalTargetMT.toFixed(1)} MT</strong> mandate.
                  </Paragraph>

                  <KpiGrid>
                    <KpiCard>
                      <div className="label">National Target</div>
                      <div className="val-row">
                        <span className="num">{prodData.nationalTargetMT.toFixed(1)}</span>
                        <span className="unit">MT</span>
                      </div>
                      <div className="sub">FY 25–26 Total</div>
                    </KpiCard>
                    <KpiCard $color="#16a34a">
                      <div className="label">Cumulative Actual</div>
                      <div className="val-row">
                        <span className="num">{prodData.actualYTDOutputMT.toFixed(1)}</span>
                        <span className="unit">MT</span>
                      </div>
                      <div className="sub">▲ {prodData.achievementPct.toFixed(1)}% Velocity</div>
                    </KpiCard>
                    <KpiCard $color="#3b82f6">
                      <div className="label">Prior FY Output</div>
                      <div className="val-row">
                        <span className="num">{prodData.previousYearActualMT.toFixed(1)}</span>
                        <span className="unit">MT</span>
                      </div>
                      <div className="sub">Historical Baseline</div>
                    </KpiCard>
                    <KpiCard $color="#d97706">
                      <div className="label">Remaining Q4 Gap</div>
                      <div className="val-row">
                        <span className="num">{prodData.q4RemainingDeficitMT.toFixed(1)}</span>
                        <span className="unit">MT</span>
                      </div>
                      <div className="sub">Evacuation Schedule</div>
                    </KpiCard>
                  </KpiGrid>

                  <SectionHeading>2. COMPLETE 7-SUBSIDIARY TARGET VS ACTUAL BREAKDOWN</SectionHeading>
                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Subsidiary</th>
                          <th>Coalfield Basin</th>
                          <th>Target (MT)</th>
                          <th>Actual YTD (MT)</th>
                          <th>Achievement %</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prodData.subsidiaries.map((sub) => (
                          <tr key={sub.code}>
                            <td className="bold">{sub.code} - {sub.name}</td>
                            <td>{sub.coalfield}</td>
                            <td>{sub.target.toFixed(1)}</td>
                            <td>{sub.actual.toFixed(1)}</td>
                            <td className="bold">{sub.pct.toFixed(1)}%</td>
                            <td><StatusBadge $status={sub.status}>{sub.status}</StatusBadge></td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>
                </>
              )}

              {/* TEMPLATE 3: GEOLOGICAL & EXPLORATION DOSSIER - PAGE 1 */}
              {selectedTemplateId === 'geological-exploration-dossier' && (
                <>
                  <SectionHeading>1. CMPDI REGIONAL EXPLORATION CORE DRILLING PROGRESS</SectionHeading>
                  <Paragraph>
                    Central Mine Planning & Design Institute comprehensive drilling progress across 24 exploration blocks. Total exploratory meterage completed is{' '}
                    <strong>{geoData.completedCoreDrilling.toLocaleString()} meters</strong> with {geoData.drillingRigsActive} exploratory rigs deployed.
                  </Paragraph>

                  <KpiGrid>
                    <KpiCard>
                      <div className="label">Total Meterage</div>
                      <div className="val-row">
                        <span className="num">{(geoData.totalDrillingMeterage / 1000).toFixed(0)}k</span>
                        <span className="unit">m</span>
                      </div>
                      <div className="sub">24 Exploration Blocks</div>
                    </KpiCard>
                    <KpiCard $color="#16a34a">
                      <div className="label">Core Recovery</div>
                      <div className="val-row">
                        <span className="num">96.8%</span>
                        <span className="unit">avg</span>
                      </div>
                      <div className="sub">High-Confidence Strata</div>
                    </KpiCard>
                    <KpiCard $color="#2563eb">
                      <div className="label">Completed Drill</div>
                      <div className="val-row">
                        <span className="num">{(geoData.completedCoreDrilling / 1000).toFixed(0)}k</span>
                        <span className="unit">m</span>
                      </div>
                      <div className="sub">{geoData.completedPct}% Ratified</div>
                    </KpiCard>
                    <KpiCard $color="#d97706">
                      <div className="label">Active Rigs</div>
                      <div className="val-row">
                        <span className="num">{geoData.drillingRigsActive}</span>
                        <span className="unit">rigs</span>
                      </div>
                      <div className="sub">CMPDI Field Units</div>
                    </KpiCard>
                  </KpiGrid>

                  <SectionHeading>2. BOREHOLE CORE DRILLING & SEAM LOG REGISTER</SectionHeading>
                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Borehole ID</th>
                          <th>Exploration Block</th>
                          <th>Regional Institute</th>
                          <th>Depth (m)</th>
                          <th>Seams Intersected</th>
                          <th>Recovery</th>
                        </tr>
                      </thead>
                      <tbody>
                        {geoData.boreholes.slice(0, 4).map((b) => (
                          <tr key={b.id}>
                            <td className="bold" style={{ fontFamily: 'monospace' }}>{b.id}</td>
                            <td>{b.block}</td>
                            <td>{b.ri}</td>
                            <td>{b.depth.toFixed(1)}</td>
                            <td>{b.seams}</td>
                            <td className="bold">{b.recovery}</td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>
                </>
              )}

              {/* TEMPLATE 4: SAFETY & COMPLIANCE INTELLIGENCE REPORT - PAGE 1 */}
              {selectedTemplateId === 'safety-compliance-intelligence' && (
                <>
                  <SectionHeading>1. DGMS STATUTORY SAFETY & MINE INSPECTION RECORD</SectionHeading>
                  <Paragraph>
                    Annual mine safety audit summary under Directorate General of Mines Safety directives. DGMS audits achieved{' '}
                    <strong>{compData.dgmsAuditRate}</strong> with zero fatal violation notices across opencast highwall radar benchmarks.
                  </Paragraph>

                  <KpiGrid>
                    <KpiCard $color="#16a34a">
                      <div className="label">DGMS Compliance</div>
                      <div className="val-row">
                        <span className="num">100%</span>
                        <span className="unit">audited</span>
                      </div>
                      <div className="sub">58 of 58 Mines</div>
                    </KpiCard>
                    <KpiCard $color="#16a34a">
                      <div className="label">Fatal Violations</div>
                      <div className="val-row">
                        <span className="num">0</span>
                        <span className="unit">notices</span>
                      </div>
                      <div className="sub">Zero Penalty Record</div>
                    </KpiCard>
                    <KpiCard $color="#2563eb">
                      <div className="label">Environment (EC)</div>
                      <div className="val-row">
                        <span className="num">94.4%</span>
                        <span className="unit">valid</span>
                      </div>
                      <div className="sub">34 of 36 Clearances</div>
                    </KpiCard>
                    <KpiCard $color="#d97706">
                      <div className="label">Forest Stage-II</div>
                      <div className="val-row">
                        <span className="num">91.7%</span>
                        <span className="unit">diverted</span>
                      </div>
                      <div className="sub">22 of 24 Blocks</div>
                    </KpiCard>
                  </KpiGrid>

                  <SectionHeading>2. STATUTORY CLEARANCES STATUS REGISTER</SectionHeading>
                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Clearance Ref ID</th>
                          <th>Statutory Authority</th>
                          <th>Subsidiary / Mine</th>
                          <th>Clearance Type</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {compData.clearances.slice(0, 3).map((c) => (
                          <tr key={c.id}>
                            <td className="bold" style={{ fontFamily: 'monospace' }}>{c.id}</td>
                            <td>{c.auth}</td>
                            <td><strong>{c.sub}</strong> - {c.mine}</td>
                            <td>{c.type}</td>
                            <td><StatusBadge $status={c.status}>{c.status}</StatusBadge></td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>
                </>
              )}

              {/* TEMPLATE 5: PARLIAMENTARY / HIGH-PRIORITY INQUIRY BRIEF - PAGE 1 */}
              {selectedTemplateId === 'parliamentary-priority-brief' && (
                <>
                  <SectionHeading>1. PARLIAMENTARY HANSARD INQUIRY REGISTER</SectionHeading>
                  <Paragraph>
                    Official legislative Hansard citation tracking for 18th Lok Sabha & Rajya Sabha inquiries. All answers are ratified against official ministerial coal records.
                  </Paragraph>

                  <KpiGrid>
                    <KpiCard>
                      <div className="label">Total Inquiries</div>
                      <div className="val-row">
                        <span className="num">{inqData.totalInquiriesTracked}</span>
                        <span className="unit">questions</span>
                      </div>
                      <div className="sub">18th Lok Sabha & RS</div>
                    </KpiCard>
                    <KpiCard $color="#16a34a">
                      <div className="label">Dispatched</div>
                      <div className="val-row">
                        <span className="num">{inqData.repliesDispatched}</span>
                        <span className="unit">replies</span>
                      </div>
                      <div className="sub">98.6% Response Rate</div>
                    </KpiCard>
                    <KpiCard $color="#2563eb">
                      <div className="label">Hansard Citations</div>
                      <div className="val-row">
                        <span className="num">100%</span>
                        <span className="unit">verified</span>
                      </div>
                      <div className="sub">Official Parliamentary</div>
                    </KpiCard>
                    <KpiCard $color="#d97706">
                      <div className="label">Gazette Reviews</div>
                      <div className="val-row">
                        <span className="num">2</span>
                        <span className="unit">pending</span>
                      </div>
                      <div className="sub">Final Gazette Review</div>
                    </KpiCard>
                  </KpiGrid>

                  <SectionHeading>2. RECENT STARRED & UNSTARRED INQUIRIES</SectionHeading>
                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Question ID</th>
                          <th>House</th>
                          <th>Category</th>
                          <th>Subject Matter</th>
                          <th>Citation Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inqData.inquiries.slice(0, 3).map((q) => (
                          <tr key={q.id}>
                            <td className="bold" style={{ fontFamily: 'monospace' }}>{q.id}</td>
                            <td>{q.house}</td>
                            <td>{q.category}</td>
                            <td>{q.subject}</td>
                            <td style={{ fontFamily: 'monospace', color: '#2563eb' }}>{q.citation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>
                </>
              )}

              <PageFooter>
                <div className="left-seal">
                  <ShieldCheck size={13} color="#16a34a" />
                  <span>Ministry of Coal • Statutory Intelligence Directorate</span>
                </div>
                <div className="right-page">Page 1 of 2</div>
              </PageFooter>
            </A4PaperSheet>

            {/* ========================================================
                A4 PAGE 2: DETAILED TECHNICAL ANALYTICS & EVIDENCE
                ======================================================== */}
            <A4PaperSheet className="a4-page">
              <SecondaryPageHeader>
                <div className="left-tag">
                  <Building2 size={13} />
                  <span>MINISTRY OF COAL — GOVERNMENT OF INDIA • {currentTemplate.name}</span>
                </div>
                <div className="right-docref">{currentTemplate.code}-2026 / P.2</div>
              </SecondaryPageHeader>

              {/* TEMPLATE 1: EXECUTIVE INTELLIGENCE DOSSIER - PAGE 2 */}
              {selectedTemplateId === 'executive-intelligence-dossier' && (
                <>
                  <SectionHeading>3. CMPDI GEOLOGICAL EXPLORATION & CORE DRILLING</SectionHeading>
                  <Paragraph>
                    Exploratory drilling across Talcher, Jharia, and Karanpura coalfields has validated core recovery rates exceeding 96.0%. CMPDI reported total drilling meterage of{' '}
                    <strong>{geoData.totalDrillingMeterage.toLocaleString()} meters</strong>
                    <CitationTag
                      onClick={() =>
                        handleCiteClick(
                          'CMPDI-DRILL-1240K',
                          'CMPDI Exploration Drilling: 1,240,000 Meters',
                          'CMPDI_Borehole_Exploration_FY26.pdf',
                          'Page 18, Table 6',
                          'Cumulative exploratory core drilling and non-core geophysical borehole logging completed across 24 exploration blocks totaling 1,240,000 meters.'
                        )
                      }
                    >
                      [Ref: CMPDI-DRILL-1.24M]
                    </CitationTag>
                    .
                  </Paragraph>

                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Borehole ID</th>
                          <th>Exploration Block</th>
                          <th>Regional Institute</th>
                          <th>Depth (m)</th>
                          <th>Coal Grade</th>
                          <th>Recovery</th>
                        </tr>
                      </thead>
                      <tbody>
                        {geoData.boreholes.slice(0, 3).map((b) => (
                          <tr key={b.id}>
                            <td className="bold" style={{ fontFamily: 'monospace' }}>{b.id}</td>
                            <td>{b.block}</td>
                            <td>{b.ri}</td>
                            <td>{b.depth.toFixed(1)}</td>
                            <td>{b.grade}</td>
                            <td className="bold">{b.recovery}</td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>

                  <SectionHeading>4. STATUTORY CLEARANCES & SAFETY CERTIFICATION</SectionHeading>
                  <Paragraph>
                    Directorate General of Mines Safety (DGMS) confirmed 100% compliance across 58 surveyed mines. MoEF&CC Environmental Clearances stand at{' '}
                    <strong>{compData.envClearancesComplied}</strong>, and Forest Clearances Stage-II diversions at{' '}
                    <strong>{compData.forestClearancesComplied}</strong>
                    <CitationTag
                      onClick={() =>
                        handleCiteClick(
                          'STAT-DGMS-58-AUDIT',
                          'DGMS Safety: 100%, EC: 94.4%, FC: 91.7%',
                          'DGMS_Statutory_Safety_Audit_Records.xlsx',
                          'Sheet 2, Row 14',
                          'Statutory safety compliance records confirm 58/58 mines compliant under highwall slope radar and ventilation mandates.'
                        )
                      }
                    >
                      [Ref: STAT-DGMS-58]
                    </CitationTag>
                    .
                  </Paragraph>
                </>
              )}

              {/* TEMPLATE 2: PRODUCTION PERFORMANCE - PAGE 2 */}
              {selectedTemplateId === 'production-performance' && (
                <>
                  <SectionHeading>3. RAILWAY SIDING EVACUATION & THERMAL POWER STOCK BUFFER</SectionHeading>
                  <Paragraph>
                    Daily coal dispatch rakes availability averaged 348 rakes/day, supporting critical thermal plant stocks across Northern and Western regional grids. SECL Gevra expansion project achieved a record 70 MTPA capacity benchmark.
                    <CitationTag
                      onClick={() =>
                        handleCiteClick(
                          'SECL-GEVRA-DISPATCH',
                          'SECL & MCL Evacuation Logistics',
                          'CIL_Subsidiary_Production_Ledger_2025.xlsx',
                          'Sheet 3, Summary Row',
                          'Coal evacuation siding performance logs verify 348 rakes/day dispatch rate supporting national thermal power buffers.'
                        )
                      }
                    >
                      [Ref: LOG-RAKE-348]
                    </CitationTag>
                  </Paragraph>

                  <SectionHeading>4. SUBSIDIARY PERFORMANCE MATRIX CONTINUATION</SectionHeading>
                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Subsidiary</th>
                          <th>Target (MT)</th>
                          <th>Actual YTD (MT)</th>
                          <th>Achievement %</th>
                          <th>Operational Coalfield</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prodData.subsidiaries.slice(4).map((sub) => (
                          <tr key={sub.code}>
                            <td className="bold">{sub.code} ({sub.name})</td>
                            <td>{sub.target.toFixed(1)}</td>
                            <td>{sub.actual.toFixed(1)}</td>
                            <td className="bold">{sub.pct.toFixed(1)}%</td>
                            <td>{sub.coalfield}</td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>
                </>
              )}

              {/* TEMPLATE 3: GEOLOGICAL DOSSIER - PAGE 2 */}
              {selectedTemplateId === 'geological-exploration-dossier' && (
                <>
                  <SectionHeading>3. REGIONAL EXPLORATION INSTITUTE SUMMARY</SectionHeading>
                  <Paragraph>
                    Summary of CMPDI regional institutes deployed across coking and non-coking basins under UNFC geological resource classification guidelines.
                  </Paragraph>

                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Institute</th>
                          <th>Operational Field</th>
                          <th>Exploration Mandate Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {geoData.institutes.map((inst) => (
                          <tr key={inst.ri}>
                            <td className="bold">{inst.ri}</td>
                            <td>{inst.field}</td>
                            <td>{inst.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>

                  <SectionHeading>4. STRATIGRAPHIC SEAM CORRELATION & COAL SPECIFICATIONS</SectionHeading>
                  <Paragraph>
                    Borehole samples analyzed by CMPDI laboratories confirm ash content ranging from 28% to 38% for power coal and volatile matter of 24–32% across the Talcher Karharbari seam formations.
                    <CitationTag
                      onClick={() =>
                        handleCiteClick(
                          'CMPDI-GEO-BLOCK-CERT',
                          'CMPDI Seam Stratification & Core Recovery',
                          'CMPDI_Borehole_Exploration_FY26.pdf',
                          'Page 12, Table 4',
                          'Exploration logs certified under UNFC guidelines confirming G8 to G12 power grade and steel grade coking reserves.'
                        )
                      }
                    >
                      [Ref: GEO-UNFC-FY26]
                    </CitationTag>
                  </Paragraph>
                </>
              )}

              {/* TEMPLATE 4: SAFETY REPORT - PAGE 2 */}
              {selectedTemplateId === 'safety-compliance-intelligence' && (
                <>
                  <SectionHeading>3. HIGHWALL SLOPE STABILITY & RADAR TELEMETRY</SectionHeading>
                  <Paragraph>
                    Continuous slope radar systems at Gevra, Kusmunda, and Bhubaneswari opencast mines show zero millimeter shear displacement during the current audit cycle. All underground continuous miners operate with automatic methane trip sensors.
                  </Paragraph>

                  <SectionHeading>4. STATUTORY CLEARANCES CONTINUATION REGISTER</SectionHeading>
                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Clearance Ref ID</th>
                          <th>Statutory Authority</th>
                          <th>Subsidiary / Mine</th>
                          <th>Validity Period</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {compData.clearances.slice(3).map((c) => (
                          <tr key={c.id}>
                            <td className="bold" style={{ fontFamily: 'monospace' }}>{c.id}</td>
                            <td>{c.auth}</td>
                            <td><strong>{c.sub}</strong> - {c.mine}</td>
                            <td>{c.validity}</td>
                            <td><StatusBadge $status={c.status}>{c.status}</StatusBadge></td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>
                </>
              )}

              {/* TEMPLATE 5: PARLIAMENTARY BRIEF - PAGE 2 */}
              {selectedTemplateId === 'parliamentary-priority-brief' && (
                <>
                  <SectionHeading>3. DETAILED PARLIAMENTARY REPLIES REGISTER</SectionHeading>
                  <Paragraph>
                    Hansard citation repository for parliamentary inquiries concerning coal stock adequacy, environmental compliance, and worker rehabilitation.
                  </Paragraph>

                  <TableContainer>
                    <A4Table>
                      <thead>
                        <tr>
                          <th>Question ID</th>
                          <th>House</th>
                          <th>Subject Matter</th>
                          <th>Responsible Wing</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inqData.inquiries.slice(3).map((q) => (
                          <tr key={q.id}>
                            <td className="bold" style={{ fontFamily: 'monospace' }}>{q.id}</td>
                            <td>{q.house}</td>
                            <td>{q.subject}</td>
                            <td>{q.wing}</td>
                            <td><StatusBadge $status="Approved">{q.status}</StatusBadge></td>
                          </tr>
                        ))}
                      </tbody>
                    </A4Table>
                  </TableContainer>
                </>
              )}

              {/* Secretarial Sign-off & Directorate Certification block */}
              <div
                style={{
                  marginTop: '20px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#164863' }}>
                    DIRECTORATE OF STATUTORY PLANNING & PRODUCTION OVERSIGHT
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>
                    Ministry of Coal • Shastri Bhawan, New Delhi 110001
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>AUTHENTICATED BY</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#164863' }}>
                    Officer on Special Duty (OSD)
                  </div>
                </div>
              </div>

              <PageFooter>
                <div className="left-seal">
                  <ShieldCheck size={13} color="#16a34a" />
                  <span>Ministry of Coal • Statutory Intelligence Directorate</span>
                </div>
                <div className="right-page">Page 2 of 2</div>
              </PageFooter>
            </A4PaperSheet>
          </ScalingAnchor>
        </ScaledDocumentContainer>
      </ReportViewer>
    </Container>
  );
};

export default ReportGeneratorEngine;
