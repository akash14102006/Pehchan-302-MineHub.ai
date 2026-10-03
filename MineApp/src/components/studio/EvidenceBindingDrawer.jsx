import React from 'react';
import styled from 'styled-components';
import { X, CheckCircle2, ShieldCheck, FileText, Download, ExternalLink } from 'lucide-react';
import reportIcon from '../../assets/report.png';
import databaseIcon from '../../assets/database.png';

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(22, 72, 99, 0.35);
  backdrop-filter: blur(2px);
  z-index: 1050;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const DrawerContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 440px;
  max-width: 90vw;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 1060;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const DrawerHeader = styled.div`
  background-color: #164863;
  color: #ffffff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title-group {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 26px;
      height: 26px;
      object-fit: contain;
    }

    h4 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #ffffff;
    }
  }

  button {
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }
`;

const DrawerBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const VerificationBanner = styled.div`
  background-color: #e8f5e9;
  border: 1px solid #c8e6c9;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2e7d32;

  .status-text {
    font-size: 13px;
    font-weight: 700;
  }

  .audit-id {
    font-size: 11px;
    color: #558b2f;
    font-family: monospace;
  }
`;

const MetaCard = styled.div`
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    .label {
      color: #718096;
      font-weight: 600;
    }

    .val {
      color: #164863;
      font-weight: 700;
    }
  }
`;

const ExcerptBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  padding: 14px;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.05);

  .heading {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #718096;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .text {
    font-size: 12.5px;
    line-height: 1.5;
    color: #2d3748;
    background-color: #fffde7;
    padding: 8px;
    border-left: 3px solid #fbc02d;
    border-radius: 4px;
    font-style: italic;
  }
`;

const CoordinatesBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  .coord-item {
    background-color: #f1f5f9;
    border-radius: 6px;
    padding: 8px 10px;
    font-size: 11.5px;

    .title {
      color: #64748b;
      font-weight: 600;
    }
    .data {
      color: #0f172a;
      font-weight: 700;
      font-family: monospace;
    }
  }
`;

const DrawerFooter = styled.div`
  padding: 14px 20px;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
  display: flex;
  gap: 10px;
`;

const ActionBtn = styled.button`
  flex: 1;
  background-color: ${(props) => (props.$primary ? '#164863' : '#ffffff')};
  color: ${(props) => (props.$primary ? '#ffffff' : '#164863')};
  border: 1px solid ${(props) => (props.$primary ? '#164863' : '#cbd5e0')};
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$primary ? '#0f3144' : '#edf2f7')};
  }
`;

const EvidenceBindingDrawer = ({ isOpen, onClose, evidenceData }) => {
  const data = evidenceData || {
    claim: 'Actual YTD Output: 584.2 MT (76.1% Mandate Achieved)',
    source: 'CIL_Subsidiary_Production_Ledger_2025.xlsx',
    refId: 'CIL-PROD-MANDATE-FY26',
    page: 'Sheet 2 / Summary Table 4',
    coordinates: 'Row 18, Cols C:H',
    timestamp: '2026-03-24 10:15 IST',
    hash: 'SHA256: 8f4b2e8a1d7c9e0a',
    excerpt: 'Total aggregate coal production across 7 operating subsidiaries recorded at 584.2 MT against annual mandate of 768.0 MT.',
    authority: 'Coal India Limited Secretariat & CMPDI Directorate',
  };

  return (
    <>
      <DrawerOverlay $isOpen={isOpen} onClick={onClose} />
      <DrawerContent $isOpen={isOpen}>
        <DrawerHeader>
          <div className="title-group">
            <img src={databaseIcon} alt="Evidence" />
            <h4>Evidence & Provenance Inspector</h4>
          </div>
          <button onClick={onClose} aria-label="Close Evidence Inspector">
            <X size={18} />
          </button>
        </DrawerHeader>

        <DrawerBody>
          <VerificationBanner>
            <ShieldCheck size={24} />
            <div>
              <div className="status-text">Verified Institutional Evidence</div>
              <div className="audit-id">{data.refId}</div>
            </div>
          </VerificationBanner>

          <MetaCard>
            <div className="row">
              <span className="label">Target Claim:</span>
              <span className="val">{data.claim}</span>
            </div>
            <div className="row">
              <span className="label">Official Source:</span>
              <span className="val">{data.source}</span>
            </div>
            <div className="row">
              <span className="label">Authority:</span>
              <span className="val">{data.authority}</span>
            </div>
            <div className="row">
              <span className="label">Audit Timestamp:</span>
              <span className="val">{data.timestamp}</span>
            </div>
          </MetaCard>

          <ExcerptBox>
            <div className="heading">
              <FileText size={14} /> Source Excerpt
            </div>
            <div className="text">"{data.excerpt}"</div>
          </ExcerptBox>

          <CoordinatesBox>
            <div className="coord-item">
              <div className="title">Document Page / Sheet</div>
              <div className="data">{data.page}</div>
            </div>
            <div className="coord-item">
              <div className="title">Grid Coordinates</div>
              <div className="data">{data.coordinates}</div>
            </div>
            <div className="coord-item">
              <div className="title">Integrity Verification</div>
              <div className="data">CMPDI PKI Verified</div>
            </div>
            <div className="coord-item">
              <div className="title">Checksum</div>
              <div className="data">{data.hash}</div>
            </div>
          </CoordinatesBox>
        </DrawerBody>

        <DrawerFooter>
          <ActionBtn onClick={() => window.print()}>
            <Download size={14} /> Export Provenance
          </ActionBtn>
          <ActionBtn $primary onClick={onClose}>
            <CheckCircle2 size={14} /> Confirm Audit
          </ActionBtn>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
};

export default EvidenceBindingDrawer;
