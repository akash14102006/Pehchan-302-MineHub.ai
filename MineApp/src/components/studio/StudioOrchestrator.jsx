import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronRight, ArrowLeft, ChevronDown, Maximize2, Minimize2, Check } from 'lucide-react';

// Authentic PRAGATI MITRA PNG Assets (For Header & Secondary Elements)
import reportIcon from '../../assets/report.png';
import chartsIcon from '../../assets/charts.png';
import excelIcon from '../../assets/excel.png';
import eventsIcon from '../../assets/events.png';
import statisticsIcon from '../../assets/statistics.png';
import analysisIcon from '../../assets/analysis.png';
import streamIcon from '../../assets/stream.png';
import digitalIcon from '../../assets/digital.png';

// Engines
import MindMapEngine from './engines/MindMapEngine';
import DataTableEngine from './engines/DataTableEngine';
import ReportGeneratorEngine from './engines/ReportGeneratorEngine';
import TimelineEngine from './engines/TimelineEngine';
import MultiChartEngine from './engines/MultiChartEngine';
import AutoQuestionEngine from './engines/AutoQuestionEngine';
import AudioBriefingEngine from './engines/AudioBriefingEngine';
import WordCloudEngine from './engines/WordCloudEngine';

// ==========================================
// 8 HIGH-VISIBILITY ENTERPRISE UI SVG ICONS
// Distinct semantic colors, crisp strokes,
// clear silhouette, institutional typography.
// ==========================================

// 1. Mind Map (🟣 Violet/Purple #7C3AED)
const MindMapIcon = () => (
  <svg viewBox="0 0 56 56" width="52" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 23 28 C 30 28 30 16 38 16" stroke="#A78BFA" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M 23 28 L 38 28" stroke="#A78BFA" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M 23 28 C 30 28 30 40 38 40" stroke="#A78BFA" strokeWidth="2.4" strokeLinecap="round" />
    <line x1="45" y1="16" x2="49" y2="16" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
    <line x1="45" y1="40" x2="49" y2="40" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
    <circle cx="15" cy="28" r="8" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2.5" />
    <circle cx="15" cy="28" r="3" fill="#7C3AED" />
    <circle cx="41" cy="16" r="5" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
    <circle cx="41" cy="28" r="5" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="2.2" />
    <circle cx="41" cy="40" r="5" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.2" />
    <circle cx="41" cy="16" r="1.8" fill="#7C3AED" />
    <circle cx="41" cy="28" r="1.8" fill="#5B21B6" />
    <circle cx="41" cy="40" r="1.8" fill="#7C3AED" />
  </svg>
);

// 2. Data Table (🔵 Blue #2563EB)
const DataTableIcon = () => (
  <svg viewBox="0 0 56 56" width="52" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="10" width="40" height="36" rx="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
    <path d="M 8 15 C 8 12.2 10.2 10 13 10 L 43 10 C 45.8 10 48 12.2 48 15 L 48 21 L 8 21 Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.5" />
    <line x1="22" y1="10" x2="22" y2="46" stroke="#2563EB" strokeWidth="2.2" />
    <line x1="36" y1="10" x2="36" y2="46" stroke="#2563EB" strokeWidth="2.2" />
    <line x1="8" y1="30" x2="48" y2="30" stroke="#93C5FD" strokeWidth="2" />
    <line x1="8" y1="39" x2="48" y2="39" stroke="#93C5FD" strokeWidth="2" />
    <circle cx="15" cy="15.5" r="2" fill="#2563EB" />
    <circle cx="29" cy="15.5" r="2" fill="#2563EB" />
    <circle cx="42" cy="15.5" r="2" fill="#2563EB" />
    <line x1="12" y1="25.5" x2="18" y2="25.5" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="26" y1="25.5" x2="32" y2="25.5" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="40" y1="25.5" x2="44" y2="25.5" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="12" y1="34.5" x2="18" y2="34.5" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="26" y1="34.5" x2="32" y2="34.5" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="40" y1="34.5" x2="44" y2="34.5" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 3. Executive Report (🟠 Orange #F97316)
const ExecutiveReportIcon = () => (
  <svg viewBox="0 0 56 56" width="52" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 12 8 L 34 8 L 44 18 L 44 48 C 44 49.6 42.6 51 41 51 L 15 51 C 13.4 51 12 49.6 12 48 Z" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 34 8 L 34 18 L 44 18 Z" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="18" y1="16" x2="28" y2="16" stroke="#EA580C" strokeWidth="2.6" strokeLinecap="round" />
    <line x1="18" y1="24" x2="38" y2="24" stroke="#FB923C" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="18" y1="30" x2="38" y2="30" stroke="#FB923C" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="18" y1="36" x2="28" y2="36" stroke="#FB923C" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="36" cy="42" r="6" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2.2" />
    <polyline points="33.5 42 35.2 43.7 38.5 40.2" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 4. Timeline (🟢 Teal #0F766E)
const TimelineIcon = () => (
  <svg viewBox="0 0 56 56" width="52" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="8" y1="34" x2="48" y2="34" stroke="#0F766E" strokeWidth="2.6" strokeLinecap="round" />
    <line x1="14" y1="27" x2="14" y2="23" stroke="#5EEAD4" strokeWidth="2" strokeDasharray="2 2" />
    <rect x="9" y="16" width="10" height="7" rx="2" fill="#CCFBF1" stroke="#0F766E" strokeWidth="1.8" />
    <circle cx="14" cy="34" r="5.5" fill="#E6FFFA" stroke="#0F766E" strokeWidth="2.4" />
    <polyline points="12 34 13.5 35.5 16 32.5" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    <circle cx="28" cy="12" r="5.5" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2" />
    <polyline points="28 9.5 28 12 30 13" fill="none" stroke="#0F766E" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="28" y1="39.5" x2="28" y2="44" stroke="#5EEAD4" strokeWidth="2" strokeDasharray="2 2" />
    <rect x="23" y="44" width="10" height="6" rx="2" fill="#CCFBF1" stroke="#0F766E" strokeWidth="1.8" />
    <circle cx="28" cy="34" r="5.5" fill="#99F6E4" stroke="#0F766E" strokeWidth="2.4" />
    <circle cx="28" cy="34" r="2.2" fill="#115E59" />
    
    <circle cx="42" cy="34" r="5.5" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.4" />
    <circle cx="42" cy="34" r="2" fill="#2DD4BF" />
  </svg>
);

// 5. Multi-Chart (🟩 Green #16A34A)
const MultiChartIcon = () => (
  <svg viewBox="0 0 56 56" width="52" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="8" y1="46" x2="48" y2="46" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="8" y1="10" x2="8" y2="46" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="8" y1="28" x2="48" y2="28" stroke="#BBF7D0" strokeWidth="1.8" strokeDasharray="3 3" />
    <rect x="13" y="32" width="6" height="14" rx="1.5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
    <rect x="23" y="22" width="6" height="24" rx="1.5" fill="#16A34A" stroke="#15803D" strokeWidth="2" />
    <rect x="33" y="16" width="6" height="30" rx="1.5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
    <rect x="43" y="26" width="6" height="20" rx="1.5" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
    <path d="M 16 28 L 26 17 L 36 11 L 46 19" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="28" r="2.4" fill="#FFFFFF" stroke="#15803D" strokeWidth="2.2" />
    <circle cx="26" cy="17" r="2.4" fill="#FFFFFF" stroke="#15803D" strokeWidth="2.2" />
    <circle cx="36" cy="11" r="2.4" fill="#FFFFFF" stroke="#15803D" strokeWidth="2.2" />
    <circle cx="46" cy="19" r="2.4" fill="#FFFFFF" stroke="#15803D" strokeWidth="2.2" />
  </svg>
);

// 6. Auto Questions (🟡 Amber/Gold #D97706)
const AutoQuestionsIcon = () => (
  <svg viewBox="0 0 56 56" width="52" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 14 C 10 10.7 12.7 8 16 8 L 36 8 C 39.3 8 42 10.7 42 14 L 42 30 C 42 33.3 39.3 36 36 36 L 24 36 L 16 43 L 16 36 L 16 36 C 12.7 36 10 33.3 10 30 Z" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 23 18 C 23 15.2 24.8 13.8 26.8 13.8 C 28.8 13.8 30.6 15.2 30.6 17.2 C 30.6 19.2 29.2 20.2 27.8 21.6 C 26.8 22.4 26.8 23.4 26.8 24.5" fill="none" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="26.8" cy="29" r="1.6" fill="#D97706" />
    <path d="M 44 11 C 44 15 48 15 48 15 C 48 15 44 15 44 19 C 44 15 40 15 40 15 C 40 15 44 15 44 11 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
    <path d="M 46 5 C 46 6.5 48 6.5 48 6.5 C 48 6.5 46 6.5 46 8 C 46 6.5 44 6.5 44 6.5 C 44 6.5 46 6.5 46 5 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
  </svg>
);

// 7. Audio (🔴 Rose/Crimson #E11D48)
const AudioWaveformIcon = () => (
  <svg viewBox="0 0 56 56" width="52" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="28" x2="50" y2="28" stroke="#FECDD3" strokeWidth="1.8" strokeDasharray="2 2" />
    <line x1="9" y1="23" x2="9" y2="33" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
    <line x1="14" y1="18" x2="14" y2="38" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
    <line x1="19" y1="12" x2="19" y2="44" stroke="#BE123C" strokeWidth="3" strokeLinecap="round" />
    <line x1="24" y1="7" x2="24" y2="49" stroke="#E11D48" strokeWidth="3.2" strokeLinecap="round" />
    <line x1="29" y1="10" x2="29" y2="46" stroke="#BE123C" strokeWidth="3.2" strokeLinecap="round" />
    <line x1="34" y1="15" x2="34" y2="41" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
    <line x1="39" y1="20" x2="39" y2="36" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
    <line x1="44" y1="24" x2="44" y2="32" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="5" r="1.6" fill="#BE123C" />
    <circle cx="29" cy="8" r="1.6" fill="#E11D48" />
  </svg>
);

// 8. Topic Cloud (🩷 Magenta/Pink #DB2777)
const TopicCloudIcon = () => (
  <svg viewBox="0 0 56 56" width="52" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="28" y1="21" x2="28" y2="14" stroke="#F472B6" strokeWidth="2" strokeDasharray="2 2" />
    <line x1="35" y1="28" x2="42" y2="28" stroke="#F472B6" strokeWidth="2" strokeDasharray="2 2" />
    <line x1="28" y1="35" x2="28" y2="42" stroke="#F472B6" strokeWidth="2" strokeDasharray="2 2" />
    <line x1="21" y1="28" x2="14" y2="28" stroke="#F472B6" strokeWidth="2" strokeDasharray="2 2" />
    
    <rect x="20" y="8" width="16" height="7" rx="3.5" fill="#FDF2F8" stroke="#DB2777" strokeWidth="2" />
    <line x1="24" y1="11.5" x2="32" y2="11.5" stroke="#DB2777" strokeWidth="1.8" strokeLinecap="round" />
    
    <rect x="41" y="24" width="12" height="8" rx="4" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2" />
    <line x1="44" y1="28" x2="50" y2="28" stroke="#BE185D" strokeWidth="1.8" strokeLinecap="round" />
    
    <rect x="18" y="41" width="20" height="7" rx="3.5" fill="#FDF2F8" stroke="#DB2777" strokeWidth="2" />
    <line x1="22" y1="44.5" x2="34" y2="44.5" stroke="#DB2777" strokeWidth="1.8" strokeLinecap="round" />
    
    <rect x="4" y="24" width="11" height="8" rx="4" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2" />
    <line x1="7" y1="28" x2="12" y2="28" stroke="#BE185D" strokeWidth="1.8" strokeLinecap="round" />
    
    <circle cx="28" cy="28" r="8" fill="#FDF2F8" stroke="#DB2777" strokeWidth="2.5" />
    <circle cx="28" cy="28" r="3" fill="#BE185D" />
  </svg>
);

const OrchestratorContainer = styled.div`
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
  padding: 14px 18px;
  background-color: #f8fafc;
  border-bottom: 1px solid #edf2f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  .left-group {
    display: flex;
    align-items: center;
    gap: 10px;

    img.brand-icon {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }

    .title-box {
      display: flex;
      flex-direction: column;

      h4 {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
        color: #164863;
        letter-spacing: -0.2px;
      }

      span.sub {
        font-size: 10px;
        color: #64748b;
        font-weight: 600;
      }
    }
  }

  .right-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const BackButton = styled.button`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 11.5px;
  font-weight: 700;
  color: #164863;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
  box-shadow: 1px 1px 3px rgba(22, 72, 99, 0.06);

  &:hover {
    background: #e2e8f0;
    border-color: #164863;
  }
`;

const ModeDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ModeDropdownTrigger = styled.button`
  background: ${(props) => props.$theme.bg};
  border: 1.5px solid ${(props) => props.$theme.borderColor};
  color: ${(props) => props.$theme.color};
  border-radius: 8px;
  padding: 5px 11px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  box-shadow: 1px 1px 4px rgba(22, 72, 99, 0.06);

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${(props) => props.$theme.color};
  }

  .chevron {
    transition: transform 0.2s ease;
    &.open {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: ${(props) => props.$theme.hoverBg};
    border-color: ${(props) => props.$theme.color};
  }
`;

const ModeDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 220px;
  background: #ffffff;
  border: 1px solid rgba(22, 72, 99, 0.12);
  border-radius: 12px;
  box-shadow: 0 12px 28px -4px rgba(22, 72, 99, 0.2), 0 0 0 1px rgba(22, 72, 99, 0.05);
  padding: 6px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: dropIn 0.15s ease-out;

  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .menu-header {
    font-size: 9.5px;
    font-weight: 800;
    color: #64748b;
    letter-spacing: 0.5px;
    padding: 6px 8px 4px 8px;
    border-bottom: 1px solid #f1f5f9;
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => (props.$active ? props.$theme.bg : 'transparent')};
  transition: all 0.15s ease;

  .item-left {
    display: flex;
    align-items: center;
    gap: 8px;

    .color-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }

    img {
      width: 15px;
      height: 15px;
      object-fit: contain;
    }

    .item-name {
      font-size: 11.5px;
      font-weight: ${(props) => (props.$active ? '700' : '600')};
      color: ${(props) => (props.$active ? props.$theme.color : '#1e293b')};
    }
  }

  .check-icon {
    color: ${(props) => props.$theme.color};
  }

  &:hover {
    background: ${(props) => props.$theme.hoverBg};
    .item-name {
      color: ${(props) => props.$theme.color};
    }
  }
`;

const ElaborateBtn = styled.button`
  background: ${(props) => (props.$isExpanded ? '#164863' : '#ffffff')};
  color: ${(props) => (props.$isExpanded ? '#ffffff' : '#164863')};
  border: 1px solid ${(props) => (props.$isExpanded ? '#164863' : '#cbd5e1')};
  border-radius: 7px;
  padding: 5px 9px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 1px 1px 4px rgba(22, 72, 99, 0.08);

  .btn-label {
    @media (max-width: 600px) {
      display: none;
    }
  }

  &:hover {
    background: #164863;
    color: #ffffff;
    border-color: #164863;
    transform: translateY(-1px);
  }
`;

const SliderArrowBtn = styled.button`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #164863;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 1px 1px 4px rgba(22, 72, 99, 0.08);

  &:hover {
    background: #164863;
    color: #ffffff;
    border-color: #164863;
  }
`;


const GridScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #f8fafc;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const CurvedStudioCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1.5px solid ${(props) => (props.$isSelected ? props.$theme.activeBorder : '#e2e8f0')};
  box-shadow: ${(props) =>
    props.$isSelected
      ? `0 0 0 1px ${props.$theme.activeBorder}, 0 6px 16px ${props.$theme.color}25`
      : '4px 4px 12px rgba(22, 72, 99, 0.05), -3px -3px 8px rgba(255, 255, 255, 0.95)'};
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  user-select: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 6px 10px 20px ${(props) => props.$theme.color}22, -4px -4px 12px #ffffff;
    border-color: ${(props) => props.$theme.color};

    .inner-icon-box {
      background: ${(props) => props.$theme.hoverBg};
      border-color: ${(props) => props.$theme.color}60;
    }

    .icon-wrapper svg {
      transform: scale(1.06);
    }

    .card-title {
      color: ${(props) => props.$theme.color};
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: inset 1px 1px 3px ${(props) => props.$theme.color}25;
  }
`;

const InnerIconBox = styled.div`
  width: 100%;
  height: 96px;
  border-radius: 12px;
  background: ${(props) => props.$theme.bg};
  border: 1.5px solid ${(props) => props.$theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.25s ease;

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      transition: transform 0.2s ease;
      filter: drop-shadow(0 2px 4px ${(props) => props.$theme.color}15);
    }
  }
`;

const CardTitle = styled.div`
  margin-top: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #164863;
  text-align: center;
  letter-spacing: -0.2px;
  transition: color 0.2s ease;
`;

const EngineWorkspace = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
`;

// Exactly 8 Studio Tools with Distinct Semantic Color System:
// 🟣 Mind Map: #7C3AED (Violet/Purple)
// 🔵 Data Table: #2563EB (Blue)
// 🟠 Executive Report: #F97316 (Orange)
// 🟢 Timeline: #0F766E (Teal)
// 🟩 Multi-Chart: #16A34A (Green)
// 🟡 Auto Questions: #D97706 (Amber/Gold)
// 🔴 Audio: #E11D48 (Rose/Crimson)
// 🩷 Topic Cloud: #DB2777 (Magenta/Pink)
const toolsData = [
  {
    id: 'mindmap',
    name: 'Mind Map',
    renderIcon: () => <MindMapIcon />,
    tabIcon: chartsIcon,
    theme: {
      color: '#7C3AED',
      bg: '#F5F3FF',
      hoverBg: '#EDE9FE',
      borderColor: '#DDD6FE',
      activeBorder: '#7C3AED',
    },
  },
  {
    id: 'table',
    name: 'Data Table',
    renderIcon: () => <DataTableIcon />,
    tabIcon: excelIcon,
    theme: {
      color: '#2563EB',
      bg: '#EFF6FF',
      hoverBg: '#DBEAFE',
      borderColor: '#BFDBFE',
      activeBorder: '#2563EB',
    },
  },
  {
    id: 'report',
    name: 'Executive Report',
    renderIcon: () => <ExecutiveReportIcon />,
    tabIcon: reportIcon,
    theme: {
      color: '#F97316',
      bg: '#FFF7ED',
      hoverBg: '#FFEDD5',
      borderColor: '#FED7AA',
      activeBorder: '#EA580C',
    },
  },
  {
    id: 'timeline',
    name: 'Timeline',
    renderIcon: () => <TimelineIcon />,
    tabIcon: eventsIcon,
    theme: {
      color: '#0F766E',
      bg: '#F0FDFA',
      hoverBg: '#CCFBF1',
      borderColor: '#99F6E4',
      activeBorder: '#0F766E',
    },
  },
  {
    id: 'charts',
    name: 'Multi-Chart',
    renderIcon: () => <MultiChartIcon />,
    tabIcon: statisticsIcon,
    theme: {
      color: '#16A34A',
      bg: '#F0FDF4',
      hoverBg: '#DCFCE7',
      borderColor: '#BBF7D0',
      activeBorder: '#16A34A',
    },
  },
  {
    id: 'questions',
    name: 'Auto Questions',
    renderIcon: () => <AutoQuestionsIcon />,
    tabIcon: analysisIcon,
    theme: {
      color: '#D97706',
      bg: '#FFFBEB',
      hoverBg: '#FEF3C7',
      borderColor: '#FDE68A',
      activeBorder: '#D97706',
    },
  },
  {
    id: 'audio',
    name: 'Audio',
    renderIcon: () => <AudioWaveformIcon />,
    tabIcon: streamIcon,
    theme: {
      color: '#E11D48',
      bg: '#FFF1F2',
      hoverBg: '#FFE4E6',
      borderColor: '#FECDD3',
      activeBorder: '#E11D48',
    },
  },
  {
    id: 'wordcloud',
    name: 'Topic Cloud',
    renderIcon: () => <TopicCloudIcon />,
    tabIcon: digitalIcon,
    theme: {
      color: '#DB2777',
      bg: '#FDF2F8',
      hoverBg: '#FCE7F3',
      borderColor: '#FBCFE8',
      activeBorder: '#DB2777',
    },
  },
];

const StudioOrchestrator = ({
  session,
  onSelectEvidence,
  onInjectQuestion,
  onToggleCollapse,
  activeTool,
  onSelectTool,
  onToggleExpand,
  isExpanded,
}) => {
  const [internalTool, setInternalTool] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentTool = activeTool !== undefined ? activeTool : internalTool;
  const setTool = onSelectTool || setInternalTool;

  const activeToolObj = toolsData.find((t) => t.id === currentTool);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <OrchestratorContainer>
      {/* Panel Top Header */}
      <PanelHeader>
        <div className="left-group">
          {currentTool ? (
            <>
              <BackButton onClick={() => setTool(null)} title="Back to All 8 Tools">
                <ArrowLeft size={14} />
                <span>Studio Tools</span>
              </BackButton>

              {/* Requirement #2: Compact Mode Switcher (replaces persistent horizontal bar) */}
              {activeToolObj && (
                <ModeDropdownContainer ref={dropdownRef}>
                  <ModeDropdownTrigger
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    $theme={activeToolObj.theme}
                    title="Switch Studio Mode"
                  >
                    <span className="dot" />
                    <span className="name">{activeToolObj.name}</span>
                    <ChevronDown size={13} className={`chevron ${isMenuOpen ? 'open' : ''}`} />
                  </ModeDropdownTrigger>

                  {isMenuOpen && (
                    <ModeDropdownMenu>
                      <div className="menu-header">SWITCH STUDIO TOOL</div>
                      {toolsData.map((t) => (
                        <DropdownItem
                          key={t.id}
                          $active={t.id === currentTool}
                          $theme={t.theme}
                          onClick={() => {
                            setTool(t.id);
                            setIsMenuOpen(false);
                          }}
                        >
                          <span className="item-left">
                            <span className="color-dot" style={{ backgroundColor: t.theme.color }} />
                            <img src={t.tabIcon} alt={t.name} />
                            <span className="item-name">{t.name}</span>
                          </span>
                          {t.id === currentTool && <Check size={14} className="check-icon" />}
                        </DropdownItem>
                      ))}
                    </ModeDropdownMenu>
                  )}
                </ModeDropdownContainer>
              )}
            </>
          ) : (
            <>
              <img src={reportIcon} alt="Studio" className="brand-icon" />
              <div className="title-box">
                <h4>Studio</h4>
                <span className="sub">8 Analytical Output Tools</span>
              </div>
            </>
          )}
        </div>

        <div className="right-group">
          {/* Requirement #4: Elaborate / Expand Workspace Arrow */}
          {onToggleExpand && (
            <ElaborateBtn
              onClick={onToggleExpand}
              title={isExpanded ? 'Contract to Standard Workspace' : 'Elaborate / Expand Full Workspace'}
              $isExpanded={isExpanded}
            >
              {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              <span className="btn-label">{isExpanded ? 'Contract' : 'Elaborate'}</span>
            </ElaborateBtn>
          )}

          {onToggleCollapse && (
            <SliderArrowBtn onClick={onToggleCollapse} title="Collapse Studio">
              <ChevronRight size={16} />
            </SliderArrowBtn>
          )}
        </div>
      </PanelHeader>

      {/* Main Content: 8-Card Grid with Distinct Semantic Color System OR Active Engine */}
      {!currentTool ? (
        <GridScrollArea>
          <ToolsGrid>
            {toolsData.map((tool) => (
              <CurvedStudioCard
                key={tool.id}
                $theme={tool.theme}
                $isSelected={currentTool === tool.id}
                onClick={() => setTool(tool.id)}
                title={`Open ${tool.name}`}
              >
                <InnerIconBox className="inner-icon-box" $theme={tool.theme}>
                  <div className="icon-wrapper">
                    {tool.renderIcon()}
                  </div>
                </InnerIconBox>
                <CardTitle className="card-title" $theme={tool.theme}>
                  {tool.name}
                </CardTitle>
              </CurvedStudioCard>
            ))}
          </ToolsGrid>
        </GridScrollArea>
      ) : (
        <EngineWorkspace>
          {currentTool === 'mindmap' && <MindMapEngine onSelectEvidence={onSelectEvidence} />}
          {currentTool === 'table' && <DataTableEngine onSelectEvidence={onSelectEvidence} />}
          {currentTool === 'report' && (
            <ReportGeneratorEngine
              onSelectEvidence={onSelectEvidence}
              session={session}
            />
          )}
          {currentTool === 'timeline' && <TimelineEngine onSelectEvidence={onSelectEvidence} />}
          {currentTool === 'charts' && <MultiChartEngine onSelectEvidence={onSelectEvidence} />}
          {currentTool === 'questions' && <AutoQuestionEngine onInjectQuestion={onInjectQuestion} />}
          {currentTool === 'audio' && <AudioBriefingEngine />}
          {currentTool === 'wordcloud' && (
            <WordCloudEngine
              onSelectTopic={(t) =>
                onInjectQuestion && onInjectQuestion(`Summarize evidence related to ${t}`)
              }
            />
          )}
        </EngineWorkspace>
      )}
    </OrchestratorContainer>
  );
};

export default StudioOrchestrator;
