import React from 'react';
import styled from 'styled-components';
import { FileText, TrendingUp, Compass, ShieldAlert, BookOpen, Check } from 'lucide-react';
import { REPORT_TEMPLATES } from '../../services/reportProductionDataService';

const SelectorContainer = styled.div`
  width: 100%;
  padding: 8px 14px;
  background: #ffffff;
  border-bottom: 1px solid rgba(22, 72, 99, 0.1);
  box-sizing: border-box;
  flex-shrink: 0;

  .selector-label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;

    .label-left {
      font-size: 11px;
      font-weight: 700;
      color: #164863;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .count-tag {
      font-size: 10.5px;
      font-weight: 600;
      color: #64748b;
      background: #f1f5f9;
      padding: 1px 7px;
      border-radius: 6px;
    }
  }
`;

const ScrollTrack = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const TemplateCard = styled.button`
  flex: 0 0 auto;
  min-width: 130px;
  max-width: 175px;
  padding: 7px 10px;
  background: ${(props) => (props.$isSelected ? '#EFF6FF' : '#f8fafc')};
  border: 1.5px solid ${(props) => (props.$isSelected ? '#2563EB' : 'rgba(22, 72, 99, 0.12)')};
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${(props) =>
    props.$isSelected
      ? '0 2px 8px rgba(37, 99, 235, 0.15)'
      : '0 1px 2px rgba(0, 0, 0, 0.03)'};

  &:hover {
    border-color: #2563EB;
    background: #ffffff;
    transform: translateY(-1px);
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .icon-wrap {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: ${(props) => (props.$isSelected ? '#2563EB' : '#164863')};
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .badge {
      font-size: 9.5px;
      font-weight: 700;
      color: ${(props) => (props.$isSelected ? '#1D4ED8' : '#64748b')};
      background: ${(props) => (props.$isSelected ? '#DBEAFE' : '#e2e8f0')};
      padding: 1px 5px;
      border-radius: 4px;
    }
  }

  .template-name {
    font-size: 11px;
    font-weight: 700;
    color: ${(props) => (props.$isSelected ? '#1E3A8A' : '#164863')};
    line-height: 1.25;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const getTemplateIcon = (id) => {
  switch (id) {
    case 'executive-intelligence-dossier':
      return <FileText size={12} strokeWidth={2.5} />;
    case 'production-performance':
      return <TrendingUp size={12} strokeWidth={2.5} />;
    case 'geological-exploration-dossier':
      return <Compass size={12} strokeWidth={2.5} />;
    case 'safety-compliance-intelligence':
      return <ShieldAlert size={12} strokeWidth={2.5} />;
    case 'parliamentary-priority-brief':
      return <BookOpen size={12} strokeWidth={2.5} />;
    default:
      return <FileText size={12} strokeWidth={2.5} />;
  }
};

const ReportTemplateSelector = ({ selectedTemplateId, onSelectTemplate }) => {
  return (
    <SelectorContainer>
      <div className="selector-label-row">
        <span className="label-left">
          <span>Official Report Templates</span>
        </span>
        <span className="count-tag">5 Prebuilt Templates</span>
      </div>

      <ScrollTrack role="tablist" aria-label="Official Report Templates">
        {REPORT_TEMPLATES.map((tmpl) => {
          const isSelected = tmpl.id === selectedTemplateId;
          return (
            <TemplateCard
              key={tmpl.id}
              role="tab"
              aria-selected={isSelected}
              $isSelected={isSelected}
              onClick={() => onSelectTemplate(tmpl.id)}
              title={tmpl.name}
            >
              <div className="top-row">
                <div className="icon-wrap">{getTemplateIcon(tmpl.id)}</div>
                <span className="badge">{tmpl.badge}</span>
              </div>
              <span className="template-name">{tmpl.name}</span>
            </TemplateCard>
          );
        })}
      </ScrollTrack>
    </SelectorContainer>
  );
};

export default ReportTemplateSelector;
