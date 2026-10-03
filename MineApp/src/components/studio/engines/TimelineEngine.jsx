import React from 'react';
import styled from 'styled-components';
import { Clock, ShieldCheck, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import eventsIcon from '../../../assets/events.png';
import databaseIcon from '../../../assets/database.png';

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

const TimelineScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 30px;
  background-color: #f8fafc;
`;

const TimelineList = styled.div`
  position: relative;
  max-width: 780px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 20px;
    width: 3px;
    background: #cbd5e1;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 54px;
  margin-bottom: 24px;

  .bullet {
    position: absolute;
    left: 8px;
    top: 14px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: ${(props) => props.$color || '#164863'};
    border: 3px solid #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 16px 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;

    .quarter {
      font-size: 11px;
      font-weight: 700;
      color: #3182ce;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status {
      font-size: 10.5px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 10px;
      background-color: ${(props) =>
        props.$status === 'Completed' ? '#e6f4ea' : props.$status === 'Active' ? '#e8f0fe' : '#fef7e0'};
      color: ${(props) =>
        props.$status === 'Completed' ? '#137333' : props.$status === 'Active' ? '#1a73e8' : '#b06000'};
    }
  }

  .title {
    font-size: 13.5px;
    font-weight: 700;
    color: #164863;
  }

  .desc {
    font-size: 12px;
    line-height: 1.5;
    color: #4a5568;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: #718096;
    border-top: 1px solid #edf2f7;
    padding-top: 8px;
    margin-top: 4px;

    .agency {
      font-weight: 600;
      color: #164863;
    }

    button {
      background: none;
      border: none;
      color: #3182ce;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 3px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const timelineEvents = [
  {
    period: 'Q1 FY 2025–26 (April–June)',
    title: 'CMPDI Regional Institute VII Initiates Deep Seismic Exploration in Talcher Basin',
    desc: 'Commenced 2D high-resolution seismic reflection profiling across Gopalprasad West exploration block. 120,000 meters exploratory drilling target allocated.',
    agency: 'CMPDI RI-VII & Directorate',
    status: 'Completed',
    color: '#2e7d32',
    ref: 'CMPDI-SEIS-Q1-2025',
  },
  {
    period: 'Q2 FY 2025–26 (July–September)',
    title: 'MoEF&CC Grants Environmental Clearance (EC) for SECL Gevra Expansion to 70 MTPA',
    desc: 'Expert Appraisal Committee (EAC) recommended environmental approval following Continuous Ambient Air Quality Monitoring (CAAQMS) compliance and slope radar certification.',
    agency: 'MoEF&CC / SECL',
    status: 'Completed',
    color: '#2e7d32',
    ref: 'EC-MOEF-2024-CIL-08',
  },
  {
    period: 'Q3 FY 2025–26 (October–December)',
    title: 'Parliamentary Winter Session: 142 Inquiries Vetted with Citation Proof',
    desc: 'Ministry of Coal Secretariat and CIL finalized verified replies for 48 Lok Sabha Starred Questions and 94 Rajya Sabha queries with zero pending backlogs.',
    agency: 'Ministry of Coal Reply Cell',
    status: 'Completed',
    color: '#2e7d32',
    ref: 'MOC-PARL-18LS-Q3',
  },
  {
    period: 'Q4 FY 2025–26 (January–March)',
    title: 'CIL Achieves 584.2 MT Output Velocity; Final Q4 Production Drive Underway',
    desc: 'Cumulative annual output reached 76.1% of the 768.0 MT mandate. Daily dispatch tracking instituted across pithead thermal utilities and washeries.',
    agency: 'Coal India Limited HQ',
    status: 'Active',
    color: '#3182ce',
    ref: 'CIL-DISP-DAILY-FY26',
  },
  {
    period: 'Q1 FY 2026–27 (Scheduled Milestone)',
    title: 'Statutory Safety Audit & Moonidih CBM Phase-II Commercial Handover',
    desc: 'Final DGMS highwall stability inspection and CMPDI Coal Bed Methane extraction commercial handover scheduled.',
    agency: 'DGMS / BCCL',
    status: 'Scheduled',
    color: '#d97706',
    ref: 'DGMS-SCHED-FY27',
  },
];

const TimelineEngine = ({ onSelectEvidence }) => {
  return (
    <Container>
      <Toolbar>
        <div className="left">
          <img src={eventsIcon} alt="Timeline" />
          <span>Exploration & Mandate Milestones Timeline</span>
        </div>
        <div className="meta">Temporal Sequence (FY 2025–26 & Roadmap)</div>
      </Toolbar>

      <TimelineScroll>
        <TimelineList>
          {timelineEvents.map((evt, idx) => (
            <TimelineItem key={idx} $color={evt.color}>
              <div className="bullet">
                <Clock size={12} />
              </div>
              <Card $status={evt.status}>
                <div className="header">
                  <span className="quarter">{evt.period}</span>
                  <span className="status">{evt.status}</span>
                </div>
                <div className="title">{evt.title}</div>
                <div className="desc">{evt.desc}</div>
                <div className="footer">
                  <span className="agency">Authority: {evt.agency}</span>
                  <button
                    onClick={() =>
                      onSelectEvidence &&
                      onSelectEvidence({
                        claim: evt.title,
                        source: `${evt.agency} Official Milestone Registry`,
                        refId: evt.ref,
                        page: 'Timeline Milestone Verification',
                        coordinates: evt.period,
                        timestamp: '2026-03-24 10:55 IST',
                        hash: 'SHA256: 4f1a2b3c4d5e6f7a',
                        excerpt: evt.desc,
                        authority: evt.agency,
                      })
                    }
                  >
                    <ExternalLink size={10} /> Inspect Evidence
                  </button>
                </div>
              </Card>
            </TimelineItem>
          ))}
        </TimelineList>
      </TimelineScroll>
    </Container>
  );
};

export default TimelineEngine;
