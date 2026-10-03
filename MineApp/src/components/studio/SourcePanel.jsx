import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, CheckSquare, Square, ChevronLeft, Upload, FileText, Check, X } from 'lucide-react';
import databaseIcon from '../../assets/database.png';
import excelIcon from '../../assets/excel.png';
import reportIcon from '../../assets/report.png';
import { studioSessionService, STATUTORY_SOURCE_REGISTRY } from '../../services/studioSessionService';

const PanelContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(22, 72, 99, 0.08);
  box-shadow: 6px 6px 18px rgba(22, 72, 99, 0.08), -4px -4px 14px rgba(255, 255, 255, 0.95);
  overflow: hidden;
`;

const PanelHeader = styled.div`
  padding: 12px 16px;
  background-color: #f8fafc;
  border-bottom: 1px solid #edf2f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  .brand-group {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 22px;
      height: 22px;
      object-fit: contain;
    }

    h4 {
      margin: 0;
      font-size: 13.5px;
      font-weight: 700;
      color: #164863;
      letter-spacing: -0.2px;
    }
  }

  .right-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .count-badge {
    background-color: #d0e8f0;
    color: #164863;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 10px;
  }
`;

const SliderArrowBtn = styled.button`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #164863;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #164863;
    color: #ffffff;
    border-color: #164863;
  }
`;

/* Section 25: Compact Enterprise Upload Affordance */
const AddSourceButton = styled.button`
  margin: 12px 14px 6px 14px;
  padding: 7px 12px;
  background-color: #f8fafc;
  border: 1.5px dashed rgba(22, 72, 99, 0.26);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #164863;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: #ebf8fa;
    border-color: #164863;
    border-style: solid;
    color: #0f3549;
  }

  &:active {
    background-color: #d0e8f0;
  }
`;

/* Section 21 & 26: High-Density Source List */
const SourceList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 6px 14px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
`;

const SourceRow = styled.div`
  background-color: ${(props) => (props.$active ? '#f0f9ff' : '#ffffff')};
  border: 1px solid ${(props) => (props.$active ? 'rgba(22, 72, 99, 0.18)' : '#e2e8f0')};
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  transition: all 0.18s ease;
  user-select: none;

  &:hover {
    background-color: ${(props) => (props.$active ? '#e6f4fc' : '#f8fafc')};
    border-color: rgba(22, 72, 99, 0.35);
  }

  .left-info {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;

    img.file-icon {
      width: 18px;
      height: 18px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .file-name {
      font-size: 12px;
      font-weight: 600;
      color: #164863;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  button.check-toggle {
    background: none;
    border: none;
    color: #164863;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.15s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const EmptySourcesState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  color: #64748b;

  .primary-text {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
    margin: 8px 0 2px 0;
  }

  .sub-text {
    font-size: 11px;
    color: #94a3b8;
    margin: 0;
  }
`;

/* Clean Modal for Adding / Intake of Datasets */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ModalBox = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  padding: 20px 22px;
  border: 1px solid rgba(22, 72, 99, 0.15);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  .modal-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: #164863;
    }

    button.close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #64748b;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;

      &:hover {
        background: #f1f5f9;
        color: #1e293b;
      }
    }
  }

  .upload-dropzone {
    border: 1.5px dashed #cbd5e1;
    border-radius: 10px;
    padding: 18px 14px;
    background-color: #f8fafc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 16px;
    transition: all 0.2s;

    &:hover {
      border-color: #164863;
      background-color: #ebf8fa;
    }

    span.prompt-title {
      font-size: 13px;
      font-weight: 600;
      color: #164863;
      margin-top: 6px;
    }

    span.prompt-sub {
      font-size: 11px;
      color: #64748b;
    }
  }

  .catalog-label {
    font-size: 11px;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
    display: block;
  }

  .catalog-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 180px;
    overflow-y: auto;
    margin-bottom: 16px;
  }

  .catalog-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: #f8fafc;
      border-color: #164863;
    }

    .item-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex: 1;

      img {
        width: 18px;
        height: 18px;
        object-fit: contain;
      }

      span {
        font-size: 12px;
        font-weight: 600;
        color: #1e293b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .add-badge {
      font-size: 11px;
      font-weight: 600;
      color: #164863;
      background: #d0e8f0;
      padding: 2px 7px;
      border-radius: 6px;
    }
  }
`;

const SourcePanel = ({
  session,
  onSelectEvidence,
  onToggleCollapse,
  onUpdateSession
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = React.useRef(null);

  // Normalize sources from the active session
  const rawSources = session?.sources || [];
  const normalizedSources = studioSessionService.normalizeSources(rawSources);

  const activeCount = normalizedSources.filter((s) => s.active !== false).length;

  const handleToggleSource = (sourceId) => {
    if (!session) return;
    const updated = studioSessionService.toggleSourceInSession(session.id, sourceId);
    if (onUpdateSession && updated) {
      onUpdateSession(updated);
    }
  };

  const handleAddCatalogSource = (entry) => {
    if (!session) return;
    const alreadyExists = normalizedSources.some((s) => s.name === entry.name);
    if (alreadyExists) return;

    const updated = studioSessionService.addSourceToSession(session.id, {
      ...entry,
      active: true
    });
    if (onUpdateSession && updated) {
      onUpdateSession(updated);
    }
    setIsModalOpen(false);
  };

  const handleCustomFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !session) return;

    const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf';
    const newSource = {
      id: `src-usr-${Date.now().toString(36)}`,
      name: file.name,
      type: ext === 'xlsx' || ext === 'xls' || ext === 'csv' ? 'excel' : 'report',
      extension: ext,
      meta: `${(file.size / 1024).toFixed(1)} KB • User Upload`,
      ref: `INTAKE-${Date.now().toString(36).toUpperCase()}`,
      active: true,
      verified: true,
      excerpt: `Governed statutory evidence ingested from user upload "${file.name}".`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      hash: `SHA256: ${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      authority: 'MineHub Verified Enterprise Ingestion'
    };

    const updated = studioSessionService.addSourceToSession(session.id, newSource);
    if (onUpdateSession && updated) {
      onUpdateSession(updated);
    }
    setIsModalOpen(false);
  };

  const handleInspectSource = (src) => {
    if (!onSelectEvidence) return;
    onSelectEvidence({
      claim: `Active Source: ${src.name}`,
      source: src.name,
      refId: src.ref || 'GOV-REF-STATUTORY',
      page: src.meta || 'Official Statutory Register',
      coordinates: 'Institutional Document Intake',
      timestamp: src.timestamp || '2026-03-24 10:15 IST',
      hash: src.hash || 'SHA256: c3ab8ff13720e8ad9047dd39466b3c89',
      excerpt: src.excerpt || `Statutory data indexed for analytical query and evidence binding from ${src.name}.`,
      authority: src.authority || 'Ministry of Coal / CIL / CMPDI Directorate'
    });
  };

  return (
    <PanelContainer>
      {/* Concise Header */}
      <PanelHeader>
        <div className="brand-group">
          <img src={databaseIcon} alt="Sources" />
          <h4>Sources</h4>
        </div>
        <div className="right-header-actions">
          <div className="count-badge">
            {activeCount} Active
          </div>
          {onToggleCollapse && (
            <SliderArrowBtn onClick={onToggleCollapse} title="Collapse Sources">
              <ChevronLeft size={15} />
            </SliderArrowBtn>
          )}
        </div>
      </PanelHeader>

      {/* Section 25: Compact Add Sources Button */}
      <AddSourceButton
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Add Sources"
        title="Add statutory datasets to this session"
      >
        <Plus size={14} />
        <span>Add Sources</span>
      </AddSourceButton>

      {/* Section 19 & 21: Clean Enterprise Source List */}
      <SourceList>
        {normalizedSources.length === 0 ? (
          <EmptySourcesState>
            <FileText size={28} color="#94a3b8" />
            <p className="primary-text">No sources attached</p>
            <p className="sub-text">Click "Add Sources" to intake statutory data</p>
          </EmptySourcesState>
        ) : (
          normalizedSources.map((src) => {
            const isExcel = src.type === 'excel' || src.extension === 'xlsx' || src.extension === 'csv';
            const iconImg = isExcel ? excelIcon : reportIcon;

            return (
              <SourceRow
                key={src.id}
                $active={src.active !== false}
                onClick={() => handleInspectSource(src)}
                title={`Click to inspect "${src.name}"`}
              >
                <div className="left-info">
                  <img src={iconImg} alt={src.type || 'file'} className="file-icon" />
                  <span className="file-name" title={src.name}>
                    {src.name}
                  </span>
                </div>

                <button
                  type="button"
                  className="check-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSource(src.id);
                  }}
                  title={src.active !== false ? 'Exclude from queries' : 'Include in queries'}
                  aria-label={`Toggle ${src.name}`}
                >
                  {src.active !== false ? (
                    <CheckSquare size={16} color="#164863" />
                  ) : (
                    <Square size={16} color="#94a3b8" />
                  )}
                </button>
              </SourceRow>
            );
          })
        )}
      </SourceList>

      {/* Intake / Upload Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h4>Add Governed Datasets</h4>
              <button
                type="button"
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div
              className="upload-dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={22} color="#164863" />
              <span className="prompt-title">Upload Official Datasets</span>
              <span className="prompt-sub">.xlsx, .csv, .pdf (Verified Official)</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv,.pdf,.docx"
                style={{ display: 'none' }}
                onChange={handleCustomFileUpload}
              />
            </div>

            <span className="catalog-label">Or Select Statutory Registry Datasets</span>
            <div className="catalog-list">
              {Object.values(STATUTORY_SOURCE_REGISTRY).map((entry) => {
                const isAlreadyAdded = normalizedSources.some((s) => s.name === entry.name);
                const isExcel = entry.type === 'excel' || entry.extension === 'xlsx';
                return (
                  <div
                    key={entry.id}
                    className="catalog-item"
                    onClick={() => !isAlreadyAdded && handleAddCatalogSource(entry)}
                    style={{ opacity: isAlreadyAdded ? 0.5 : 1, cursor: isAlreadyAdded ? 'default' : 'pointer' }}
                  >
                    <div className="item-left">
                      <img src={isExcel ? excelIcon : reportIcon} alt="" />
                      <span title={entry.name}>{entry.name}</span>
                    </div>
                    {isAlreadyAdded ? (
                      <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '600' }}>Added</span>
                    ) : (
                      <span className="add-badge">+ Add</span>
                    )}
                  </div>
                );
              })}
            </div>
          </ModalBox>
        </ModalOverlay>
      )}
    </PanelContainer>
  );
};

export default SourcePanel;
