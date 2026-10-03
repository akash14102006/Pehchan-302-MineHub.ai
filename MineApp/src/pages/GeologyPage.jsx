import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import {
  Database,
  FileText,
  RotateCw,
  FileDown,
  Layers,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import GeologyAuthoritySelector from '../components/geology/GeologyAuthoritySelector';
import GeologyYearCard from '../components/geology/GeologyYearCard';
import GeologyDocumentViewerModal from '../components/geology/GeologyDocumentViewerModal';
import GeologyProductionTargetChart from '../components/geology/GeologyProductionTargetChart';
import {
  geologyReportRepositoryService,
  REPORT_YEAR_PERIODS,
} from '../services/geologyReportRepositoryService';

const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 25px 56px 25px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px 14px 40px 14px;
  }
`;

/* TOP HEADER & CONTROLS */
const TopControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
`;

const HeaderTitleGroup = styled.div`
  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: #164863;
    letter-spacing: -0.3px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    margin: 4px 0 0 0;
    font-size: 13px;
    color: #64748b;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.$primary ? '#164863' : '#ffffff')};
  color: ${(props) => (props.$primary ? '#ffffff' : '#164863')};
  border: 1px solid ${(props) => (props.$primary ? '#164863' : 'rgba(22, 72, 99, 0.2)')};
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 12.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(22, 72, 99, 0.12);
    background-color: ${(props) => (props.$primary ? '#0f3448' : '#f8fafc')};
  }
`;

/* REPOSITORY FILTER STRIP */
const FilterStrip = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 18px 22px;
  border: 1px solid rgba(22, 72, 99, 0.08);
  box-shadow: 4px 4px 12px rgba(22, 72, 99, 0.04), -2px -2px 8px rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const SelectorBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 280px;

  .filter-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: #475569;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const RepositoryMetaPills = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  .meta-pill {
    padding: 6px 12px;
    background-color: #f1f5f9;
    border-radius: 6px;
    font-size: 12px;
    color: #334155;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    gap: 6px;

    strong {
      color: #164863;
      font-weight: 700;
    }
  }
`;

/* SECTION TITLE BANNER */
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-left: 2px;

  h3 {
    margin: 0;
    font-size: 16.5px;
    font-weight: 700;
    color: #164863;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hint {
    font-size: 12px;
    color: #64748b;
  }
`;

const GeologyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAuth = searchParams.get('auth') || 'all';

  const [selectedAuthorityId, setSelectedAuthorityId] = useState(initialAuth);
  const [expandedYearIds, setExpandedYearIds] = useState([]); // Default all years collapsed
  const [inspectingReport, setInspectingReport] = useState(null);

  // Sync state with URL params
  useEffect(() => {
    const authFromUrl = searchParams.get('auth');
    if (authFromUrl && authFromUrl !== selectedAuthorityId) {
      setSelectedAuthorityId(authFromUrl);
    }
  }, [searchParams]);

  const handleSelectAuthority = (authId) => {
    setSelectedAuthorityId(authId);
    const newParams = new URLSearchParams(searchParams);
    if (authId === 'all') {
      newParams.delete('auth');
    } else {
      newParams.set('auth', authId);
    }
    setSearchParams(newParams);
  };

  const handleToggleExpandYear = (yearId) => {
    setExpandedYearIds((prev) =>
      prev.includes(yearId) ? prev.filter((id) => id !== yearId) : [...prev, yearId]
    );
  };

  // Compute total reports matching current authority filter
  const allFilteredReports = geologyReportRepositoryService.getReports(selectedAuthorityId);

  const selectedAuthObj =
    selectedAuthorityId === 'all'
      ? { name: 'All Authorities & Subsidiaries', code: 'ALL' }
      : geologyReportRepositoryService.getAuthorityById(selectedAuthorityId) || {
          name: 'All Authorities & Subsidiaries',
          code: 'ALL',
        };

  return (
    <PageContainer>
      {/* 1. TOP HEADER & SYSTEM ACTIONS */}
      <TopControlsRow>
        <HeaderTitleGroup>
          <h2>
            <Database size={22} color="#164863" />
            Geological &amp; Statutory Report Repository
          </h2>
          <p>
            Year-wise authoritative mining, borehole stratigraphy &amp; exploration dossier archive
          </p>
        </HeaderTitleGroup>

        <ActionsGroup>
          <ActionButton onClick={() => window.location.reload()} title="Reload latest repository records">
            <RotateCw size={14} />
            <span>Sync Vault</span>
          </ActionButton>
          <ActionButton $primary onClick={() => window.print()} title="Export complete catalog as PDF">
            <FileDown size={14} />
            <span>Export Catalog</span>
          </ActionButton>
        </ActionsGroup>
      </TopControlsRow>

      {/* 2. AUTHORITY / SUBSIDIARY FILTER STRIP */}
      <FilterStrip>
        <SelectorBlock>
          <div className="filter-label">
            <Filter size={13} color="#164863" />
            Authority / Subsidiary Selection
          </div>
          <GeologyAuthoritySelector
            selectedAuthorityId={selectedAuthorityId}
            onSelectAuthority={handleSelectAuthority}
          />
        </SelectorBlock>

        <RepositoryMetaPills>
          <div className="meta-pill">
            Active Scope: <strong>{selectedAuthObj.code}</strong>
          </div>
          <div className="meta-pill">
            Total Vault Documents: <strong>{allFilteredReports.length}</strong>
          </div>
          <div className="meta-pill">
            <CheckCircle2 size={13} color="#16a34a" />
            DGMS &amp; CCO Certified
          </div>
        </RepositoryMetaPills>
      </FilterStrip>

      {/* 3. YEAR-WISE REPORT REPOSITORY */}
      <SectionHeader>
        <h3>
          <Layers size={16} color="#164863" />
          Year-Wise Report Repository
        </h3>
        <span className="hint">Click year box or + to expand official documents</span>
      </SectionHeader>

      {REPORT_YEAR_PERIODS.map((period) => {
        const periodReports = geologyReportRepositoryService.getReports(
          selectedAuthorityId,
          period.id
        );
        const isExpanded = expandedYearIds.includes(period.id);

        return (
          <GeologyYearCard
            key={period.id}
            period={period}
            reports={periodReports}
            isExpanded={isExpanded}
            onToggleExpand={() => handleToggleExpandYear(period.id)}
            onInspectReport={(report) => setInspectingReport(report)}
          />
        );
      })}

      {/* 4. SUBSIDIARY PRODUCTION VS TARGET (MT) */}
      <GeologyProductionTargetChart selectedAuthorityId={selectedAuthorityId} />

      {/* 5. IMMUTABLE ORIGINAL DOCUMENT VIEWER MODAL */}
      {inspectingReport && (
        <GeologyDocumentViewerModal
          report={inspectingReport}
          onClose={() => setInspectingReport(null)}
        />
      )}
    </PageContainer>
  );
};

export default GeologyPage;
