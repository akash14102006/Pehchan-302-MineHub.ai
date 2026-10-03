import React from 'react';
import styled from 'styled-components';
import { Plus, Minus, FileText, Table, FileSpreadsheet, Eye, ShieldCheck, ChevronRight } from 'lucide-react';

const CardContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

/* CURVED NEUMORPHIC YEAR HEADER BOX */
const YearHeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 22px;
  background-color: #ffffff;
  border-radius: 14px;
  border: 1px solid ${(props) => (props.$isExpanded ? 'rgba(22, 72, 99, 0.28)' : 'rgba(22, 72, 99, 0.08)')};
  /* Soft Pragati-Mitra Neumorphism: outer soft shadow + light surface highlight */
  box-shadow: ${(props) =>
    props.$isExpanded
      ? 'inset 1px 1px 3px rgba(22, 72, 99, 0.05), 4px 6px 16px rgba(22, 72, 99, 0.08), -3px -3px 10px rgba(255, 255, 255, 0.95)'
      : '4px 4px 12px rgba(22, 72, 99, 0.05), -3px -3px 8px rgba(255, 255, 255, 0.95)'};
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(22, 72, 99, 0.3);
    box-shadow: 4px 6px 16px rgba(22, 72, 99, 0.09), -3px -3px 10px rgba(255, 255, 255, 1);
  }
`;

const YearTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: nowrap;

  .year-text {
    font-size: 16.5px;
    font-weight: 700;
    color: #164863;
    letter-spacing: -0.2px;
    white-space: nowrap;
  }
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => (props.$isExpanded ? '#164863' : '#edf7fa')};
  color: ${(props) => (props.$isExpanded ? '#ffffff' : '#164863')};
  border: 1px solid ${(props) => (props.$isExpanded ? '#164863' : 'rgba(22, 72, 99, 0.12)')};
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    background-color: #164863;
    color: #ffffff;
    border-color: #164863;
  }
`;

/* EXPANDED REPORTS LIST */
const ReportsContainer = styled.div`
  margin-top: 10px;
  padding: 12px 14px 6px 14px;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 1px solid rgba(22, 72, 99, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/* COMPACT REPORT ROW */
const ReportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid rgba(22, 72, 99, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.18s ease;
  gap: 12px;

  &:hover {
    border-color: #164863;
    box-shadow: 0 2px 6px rgba(22, 72, 99, 0.06);
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ReportLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  overflow: hidden;
`;

const FileBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  flex-shrink: 0;
  gap: 4px;
  background-color: ${(props) => {
    if (props.$type === 'pdf') return '#fee2e2';
    if (props.$type === 'xlsx') return '#dcfce7';
    if (props.$type === 'scanned') return '#f3e8ff';
    return '#e0f2fe';
  }};
  color: ${(props) => {
    if (props.$type === 'pdf') return '#b91c1c';
    if (props.$type === 'xlsx') return '#15803d';
    if (props.$type === 'scanned') return '#7e22ce';
    return '#0369a1';
  }};
  border: 1px solid
    ${(props) => {
      if (props.$type === 'pdf') return '#fca5a5';
      if (props.$type === 'xlsx') return '#86efac';
      if (props.$type === 'scanned') return '#d8b4fe';
      return '#7dd3fc';
    }};
`;

const ReportInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .report-title {
    font-size: 13px;
    font-weight: 600;
    color: #1e293b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .report-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
    flex-wrap: wrap;

    .code {
      font-family: monospace;
      font-weight: 600;
      color: #164863;
    }

    .auth-tag {
      font-weight: 600;
      color: #334155;
    }

    .separator {
      color: #cbd5e1;
    }
  }
`;

const ReportRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px dashed #e2e8f0;
  }
`;

const VersionPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 10.5px;
  font-weight: 600;
  background-color: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
`;

const InspectButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  background-color: #164863;
  color: #ffffff;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(22, 72, 99, 0.15);
  transition: all 0.18s ease;

  &:hover {
    background-color: #0f3448;
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(22, 72, 99, 0.22);
  }
`;

const EmptyRow = styled.div`
  padding: 16px;
  text-align: center;
  font-size: 12.5px;
  color: #64748b;
  font-style: italic;
`;

const GeologyYearCard = ({
  period,
  reports = [],
  isExpanded = false,
  onToggleExpand,
  onInspectReport,
}) => {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'xlsx':
        return <FileSpreadsheet size={13} />;
      case 'scanned':
        return <Table size={13} />;
      case 'pdf':
      default:
        return <FileText size={13} />;
    }
  };

  return (
    <CardContainer>
      <YearHeaderBox
        $isExpanded={isExpanded}
        onClick={onToggleExpand}
        role="button"
        aria-expanded={isExpanded}
        title={`Click to ${isExpanded ? 'collapse' : 'expand'} ${period.label} reports`}
      >
        <YearTitleGroup>
          <span className="year-text">{period.label}</span>
        </YearTitleGroup>

        <ExpandButton
          $isExpanded={isExpanded}
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? <Minus size={15} /> : <Plus size={15} />}
        </ExpandButton>
      </YearHeaderBox>

      {isExpanded && (
        <ReportsContainer>
          {reports.length === 0 ? (
            <EmptyRow>No reports available for {period.label} under selected authority filter.</EmptyRow>
          ) : (
            reports.map((report) => (
              <ReportRow key={report.id}>
                <ReportLeft>
                  <FileBadge $type={report.fileType}>
                    {getFileIcon(report.fileType)}
                    <span>{report.fileType}</span>
                  </FileBadge>

                  <ReportInfo>
                    <span className="report-title" title={report.title}>
                      {report.title}
                    </span>
                    <div className="report-meta">
                      <span className="auth-tag">{report.authorityName}</span>
                      <span className="separator">•</span>
                      <span className="code">{report.documentCode}</span>
                      <span className="separator">•</span>
                      <span>{report.fiscalYear}</span>
                      <span className="separator">•</span>
                      <span>{report.fileSize}</span>
                    </div>
                  </ReportInfo>
                </ReportLeft>

                <ReportRight>
                  <VersionPill>
                    <ShieldCheck size={12} />
                    {report.version}
                  </VersionPill>

                  <InspectButton onClick={() => onInspectReport(report)}>
                    <Eye size={13} />
                    <span>Inspect</span>
                  </InspectButton>
                </ReportRight>
              </ReportRow>
            ))
          )}
        </ReportsContainer>
      )}
    </CardContainer>
  );
};

export default GeologyYearCard;
