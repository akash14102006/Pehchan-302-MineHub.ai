import React, { useState } from 'react';
import styled from 'styled-components';
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  FileText,
  FileSpreadsheet,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Calendar,
  Hash,
  Database,
} from 'lucide-react';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  animation: fadeIn 0.18s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  width: 100%;
  max-width: 1100px;
  height: 90vh;
  max-height: 840px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(22, 72, 99, 0.2);
  overflow: hidden;
  animation: scaleUp 0.18s ease-out;

  @keyframes scaleUp {
    from {
      transform: scale(0.97);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

/* HEADER */
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #164863;
  color: #ffffff;
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  overflow: hidden;

  .file-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .title-group {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sub-meta {
      font-size: 11.5px;
      color: #d0e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 3px;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const HeaderBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

/* BODY LAYOUT */
const ModalBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

/* PROVENANCE METADATA SIDEBAR */
const MetadataSidebar = styled.div`
  width: 310px;
  background-color: #f8fafc;
  border-right: 1px solid #e2e8f0;
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
  flex-shrink: 0;

  @media (max-width: 860px) {
    width: 100%;
    max-height: 180px;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #164863;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MetaBlock = styled.div`
  margin-bottom: 16px;

  .meta-title {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 3px;
  }

  .meta-val {
    font-size: 12.5px;
    color: #1e293b;
    font-weight: 600;
    word-break: break-all;
  }

  .hash-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f1f5f9;
    padding: 6px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 10.5px;
    color: #334155;
    border: 1px solid #e2e8f0;

    button {
      background: none;
      border: none;
      cursor: pointer;
      color: #64748b;
      padding: 2px;
      &:hover {
        color: #164863;
      }
    }
  }
`;

/* VIEWER CANVAS */
const ViewerCanvas = styled.div`
  flex: 1;
  background-color: #f1f5f9;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

/* REALISTIC DOCUMENT PREVIEW CONTAINER */
const DocumentSheet = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 720px;
  min-height: 980px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 44px 48px;
  box-sizing: border-box;
  font-family: 'Georgia', serif;
  color: #1e293b;

  @media (max-width: 600px) {
    padding: 24px 20px;
  }
`;

const OfficialGovHeader = styled.div`
  text-align: center;
  border-bottom: 2px solid #164863;
  padding-bottom: 20px;
  margin-bottom: 24px;

  .emblem-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #475569;
    margin-bottom: 4px;
  }

  .ministry-title {
    font-size: 17px;
    font-weight: 700;
    color: #164863;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .institute-title {
    font-size: 13.5px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 8px;
  }

  .doc-ref-row {
    font-family: monospace;
    font-size: 11px;
    color: #64748b;
  }
`;

const DocSection = styled.div`
  margin-bottom: 24px;

  h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    color: #164863;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 6px;
    margin: 0 0 12px 0;
  }

  p {
    font-size: 13px;
    line-height: 1.65;
    color: #334155;
    margin: 0 0 12px 0;
  }
`;

const DataTableWrapper = styled.div`
  overflow-x: auto;
  margin: 14px 0;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Poppins', sans-serif;
  font-size: 11.5px;

  th {
    background-color: #164863;
    color: #ffffff;
    padding: 8px 10px;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
  }

  td {
    padding: 8px 10px;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
    white-space: nowrap;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }
`;

const SignOffFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px dashed #cbd5e1;
  font-family: 'Poppins', sans-serif;

  .seal-box {
    border: 2px solid #164863;
    padding: 6px 12px;
    border-radius: 4px;
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    color: #164863;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .sign-details {
    text-align: right;
    font-size: 11px;
    color: #334155;
    line-height: 1.5;

    .name {
      font-weight: 700;
      color: #164863;
    }
  }
`;

const GeologyDocumentViewerModal = ({ report, onClose }) => {
  const [copiedHash, setCopiedHash] = useState(false);

  if (!report) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(report.checksum);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDownload = () => {
    // Generate authoritative simulated download
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <ModalHeader>
          <HeaderLeft>
            <div className="file-icon-box">
              {report.fileType === 'xlsx' ? (
                <FileSpreadsheet size={20} color="#ffffff" />
              ) : (
                <FileText size={20} color="#ffffff" />
              )}
            </div>
            <div className="title-group">
              <h3>{report.title}</h3>
              <div className="sub-meta">
                <span>{report.authorityName}</span>
                <span>•</span>
                <span>{report.documentCode}</span>
                <span>•</span>
                <span>{report.version}</span>
              </div>
            </div>
          </HeaderLeft>

          <HeaderActions>
            <HeaderBtn onClick={handleDownload} title="Download verified original document">
              <Download size={14} />
              <span>Download</span>
            </HeaderBtn>
            <HeaderBtn onClick={() => window.print()} title="Print Document">
              <Printer size={14} />
              <span>Print</span>
            </HeaderBtn>
            <CloseBtn onClick={onClose} title="Close Viewer">
              <X size={20} />
            </CloseBtn>
          </HeaderActions>
        </ModalHeader>

        {/* BODY */}
        <ModalBody>
          {/* LEFT METADATA & PROVENANCE PANEL */}
          <MetadataSidebar>
            <SectionLabel>
              <ShieldCheck size={14} />
              Document Provenance
            </SectionLabel>

            <MetaBlock>
              <div className="meta-title">Authority / Issuer</div>
              <div className="meta-val">{report.authorityName}</div>
            </MetaBlock>

            <MetaBlock>
              <div className="meta-title">Reporting Period</div>
              <div className="meta-val">{report.yearPeriod} ({report.fiscalYear})</div>
            </MetaBlock>

            <MetaBlock>
              <div className="meta-title">Classification</div>
              <div className="meta-val">{report.classification}</div>
            </MetaBlock>

            <MetaBlock>
              <div className="meta-title">Clearance / Dossier Code</div>
              <div className="meta-val" style={{ fontFamily: 'monospace' }}>
                {report.documentCode}
              </div>
            </MetaBlock>

            <MetaBlock>
              <div className="meta-title">File Identity &amp; Size</div>
              <div className="meta-val">
                {report.fileName} ({report.fileSize}, {report.pages} Pages)
              </div>
            </MetaBlock>

            <MetaBlock>
              <div className="meta-title">Verified Cryptographic Hash</div>
              <div className="hash-box">
                <span>{report.checksum.substring(0, 22)}…</span>
                <button onClick={handleCopyHash} title="Copy SHA-256 Checksum">
                  {copiedHash ? <Check size={13} color="#15803d" /> : <Copy size={13} />}
                </button>
              </div>
            </MetaBlock>

            <MetaBlock>
              <div className="meta-title">Immutable Storage Vault URI</div>
              <div className="meta-val" style={{ fontSize: '11px', color: '#475569' }}>
                {report.provenance?.storageUri || 'gs://minehub-vault/geology/verified/original'}
              </div>
            </MetaBlock>

            <MetaBlock>
              <div className="meta-title">Vetting &amp; Signatory</div>
              <div className="meta-val" style={{ fontSize: '11.5px', color: '#334155' }}>
                {report.provenance?.signatory}
              </div>
            </MetaBlock>
          </MetadataSidebar>

          {/* MAIN DOCUMENT CANVAS */}
          <ViewerCanvas>
            <DocumentSheet>
              <OfficialGovHeader>
                <div className="emblem-title">सत्यमेव जयते • Government of India</div>
                <div className="ministry-title">Ministry of Coal &amp; Ministry of Mines</div>
                <div className="institute-title">{report.authorityName}</div>
                <div className="doc-ref-row">
                  DOCUMENT NO: {report.documentCode} • DATE OF GAZETTE: {report.date}
                </div>
              </OfficialGovHeader>

              <DocSection>
                <h4>1. Executive Summary &amp; Scope</h4>
                <p>{report.summary}</p>
              </DocSection>

              {report.tables && report.tables.length > 0 ? (
                report.tables.map((tbl, idx) => (
                  <DocSection key={idx}>
                    <h4>2. {tbl.name}</h4>
                    <DataTableWrapper>
                      <StyledTable>
                        <thead>
                          <tr>
                            {tbl.columns.map((col, cIdx) => (
                              <th key={cIdx}>{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tbl.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </StyledTable>
                    </DataTableWrapper>
                  </DocSection>
                ))
              ) : (
                <DocSection>
                  <h4>2. Authoritative Geological Observations</h4>
                  <p>
                    Drillhole stratification and proximate core evaluations affirm superior grade
                    recoveries within targeted coal blocks. Continuous ultrasonic borehole radar
                    logging confirms seam continuity and structural stability across the Barakar
                    geological formations.
                  </p>
                  <p>
                    All extraction schedules adhere to DGMS technical circulars and MoEF&amp;CC
                    environmental mitigation requirements. Core extraction logs have been certified
                    and ingested into the National Geoscience Data Repository (NGDR).
                  </p>
                </DocSection>
              )}

              <DocSection>
                <h4>3. Certification &amp; Statutory Integrity</h4>
                <p>
                  This official document has been cryptographically preserved in accordance with the
                  Ministry of Coal Statutory Archives Mandate. Any revision requires re-certification
                  and updates the immutable version lineage without overwriting the master artifact.
                </p>
              </DocSection>

              <SignOffFooter>
                <div className="seal-box">
                  Verified Government Record
                  <br />
                  MineHub.ai Repository
                </div>
                <div className="sign-details">
                  <div className="name">{report.provenance?.signatory}</div>
                  <div>{report.provenance?.vettedBy}</div>
                  <div>Vetted: {report.provenance?.approvedDate}</div>
                </div>
              </SignOffFooter>
            </DocumentSheet>
          </ViewerCanvas>
        </ModalBody>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default GeologyDocumentViewerModal;
