import React, { useState } from 'react';
import styled from 'styled-components';
import { Tag, Filter, CheckCircle2 } from 'lucide-react';
import digitalIcon from '../../../assets/digital.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  border-bottom: 1px solid #edf2f7;
  background-color: #f8fafc;

  .left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #164863;

    img {
      width: 26px;
      height: 26px;
      object-fit: contain;
    }
  }

  .meta {
    font-size: 11.5px;
    color: #64748b;
    font-weight: 600;
  }
`;

const CloudContent = styled.div`
  flex: 1;
  padding: 28px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f8fafc;
`;

const CloudGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  min-height: 240px;
`;

const WordTag = styled.button`
  background-color: ${(props) => (props.$selected ? '#164863' : props.$bg || '#f1f5f9')};
  color: ${(props) => (props.$selected ? '#ffffff' : props.$color || '#164863')};
  border: 1px solid ${(props) => (props.$selected ? '#164863' : '#cbd5e1')};
  padding: ${(props) => (props.$size >= 18 ? '10px 18px' : props.$size >= 14 ? '7px 14px' : '5px 10px')};
  border-radius: 20px;
  font-size: ${(props) => props.$size}px;
  font-weight: ${(props) => (props.$size >= 16 ? '800' : '600')};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  .count {
    font-size: 10px;
    font-weight: 700;
    background-color: ${(props) => (props.$selected ? '#D0E8F0' : '#ffffff')};
    color: #164863;
    padding: 1px 6px;
    border-radius: 8px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const TopicDetailCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info {
    h4 {
      font-size: 13.5px;
      font-weight: 700;
      color: #164863;
      margin: 0 0 4px 0;
    }
    p {
      font-size: 11.5px;
      color: #64748b;
      margin: 0;
    }
  }

  button {
    background-color: #164863;
    color: #ffffff;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: #0f3144;
    }
  }
`;

const topics = [
  { text: '768 MT Mandate', size: 22, count: 148, bg: '#e0f2fe', color: '#0369a1', desc: 'Central national coal production commitment for FY 2025-26.' },
  { text: 'Core Drilling', size: 20, count: 124, bg: '#ecfdf5', color: '#047857', desc: 'CMPDI exploratory drill logs spanning 1,240,000 meters.' },
  { text: 'DGMS Safety', size: 18, count: 96, bg: '#fef3c7', color: '#b45309', desc: 'Directorate General of Mines Safety inspections and slope radar verification.' },
  { text: 'Gevra Expansion', size: 17, count: 88, bg: '#ede9fe', color: '#6d28d9', desc: 'SECL flagship mega opencast project targeting 70 MTPA capacity.' },
  { text: 'Talcher Basin', size: 16, count: 82, bg: '#f1f5f9', color: '#334155', desc: 'Mahanadi Coalfields thermal coal reservoir in Odisha.' },
  { text: 'Lok Sabha Starred', size: 16, count: 74, bg: '#e0f2fe', color: '#0369a1', desc: 'Parliamentary inquiry replies vetted by Ministry Secretariat.' },
  { text: 'Forest Stage-II', size: 15, count: 68, bg: '#ecfdf5', color: '#047857', desc: 'Statutory diversion orders for 22 operating coal blocks.' },
  { text: 'Borehole Strata', size: 15, count: 62, bg: '#f1f5f9', color: '#334155', desc: 'Geological seam profiles and core recovery benchmarks.' },
  { text: 'Moonidih CBM', size: 14, count: 54, bg: '#fef3c7', color: '#b45309', desc: 'Coal Bed Methane exploration and deep seam prime coking reserves.' },
  { text: 'Singrauli Pithead', size: 13, count: 46, bg: '#f1f5f9', color: '#334155', desc: 'Northern Coalfields dedicated thermal utility supply linkages.' },
  { text: 'CAAQMS Air Quality', size: 13, count: 42, bg: '#ecfdf5', color: '#047857', desc: 'Continuous Ambient Air Quality Monitoring Systems compliance.' },
];

const WordCloudEngine = ({ onSelectTopic }) => {
  const [activeTopic, setActiveTopic] = useState(topics[0]);

  return (
    <Container>
      <Toolbar>
        <div className="left">
          <img src={digitalIcon} alt="Word Cloud" />
          <span>Mining Domain Taxonomy & Topic Frequency Cloud</span>
        </div>
        <div className="meta">11 Core Domain Categories / 888 Indexed Citations</div>
      </Toolbar>

      <CloudContent>
        <CloudGrid>
          {topics.map((t, idx) => (
            <WordTag
              key={idx}
              $size={t.size}
              $bg={t.bg}
              $color={t.color}
              $selected={activeTopic?.text === t.text}
              onClick={() => setActiveTopic(t)}
            >
              <span>{t.text}</span>
              <span className="count">{t.count}</span>
            </WordTag>
          ))}
        </CloudGrid>

        {activeTopic && (
          <TopicDetailCard>
            <div className="info">
              <h4>{activeTopic.text} (Indexed Citations: {activeTopic.count})</h4>
              <p>{activeTopic.desc}</p>
            </div>
            <button onClick={() => onSelectTopic && onSelectTopic(activeTopic.text)}>
              Filter Related Evidence
            </button>
          </TopicDetailCard>
        )}
      </CloudContent>
    </Container>
  );
};

export default WordCloudEngine;
