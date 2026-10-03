import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Play, Pause, RotateCcw, FastForward, Rewind, Volume2, ShieldCheck } from 'lucide-react';
import streamIcon from '../../../assets/stream.png';

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

const AudioContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f8fafc;
`;

const PlayerCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 24px 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;

  .track-info {
    h3 {
      font-size: 15px;
      font-weight: 700;
      color: #164863;
      margin: 0 0 4px 0;
    }
    p {
      font-size: 12px;
      color: #64748b;
      margin: 0;
    }
  }
`;

const WaveformVisualizer = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px;
  background-color: #f1f5f9;
  border-radius: 8px;

  .bar {
    flex: 1;
    background-color: ${(props) => (props.$active ? '#164863' : '#cbd5e1')};
    height: ${(props) => props.$height}%;
    border-radius: 2px;
    transition: height 0.2s;
  }
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  .time {
    font-family: monospace;
    font-size: 12px;
    color: #64748b;
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #164863;
      cursor: pointer;

      &:hover {
        background-color: #e2e8f0;
      }
    }

    button.play-btn {
      background-color: #164863;
      color: #ffffff;
      width: 44px;
      height: 44px;
      border-color: #164863;

      &:hover {
        background-color: #0f3144;
      }
    }
  }

  .speed-select {
    display: flex;
    align-items: center;
    gap: 6px;

    select {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 11.5px;
      color: #164863;
      font-weight: 600;
    }
  }
`;

const TranscriptBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h4 {
    font-size: 13.5px;
    font-weight: 700;
    color: #164863;
    margin: 0;
  }
`;

const TranscriptLine = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: ${(props) => (props.$active ? '#ebf8fa' : 'transparent')};
  border-left: 3px solid ${(props) => (props.$active ? '#164863' : 'transparent')};
  cursor: pointer;

  .timestamp {
    font-family: monospace;
    font-size: 11px;
    font-weight: 700;
    color: #3182ce;
    white-space: nowrap;
  }

  .text {
    font-size: 12px;
    color: #334155;
    line-height: 1.5;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const transcript = [
  { time: '00:15', sec: 15, text: 'Ministry of Coal Executive Briefing for FY 2025–26 Q4 session initiated.' },
  { time: '00:45', sec: 45, text: 'Coal India Limited subsidiaries recorded 584.2 MT YTD production, tracking at 76.1% of the 768.0 MT annual mandate.' },
  { time: '01:30', sec: 90, text: 'CMPDI reports 1.24 million meters of exploratory core drilling, verified by Regional Institutes I through VII.' },
  { time: '02:15', sec: 135, text: 'DGMS safety compliance audit verified at 100% across all 58 inspection rounds with zero fatal notices.' },
  { time: '03:00', sec: 180, text: 'Parliamentary inquiry replies finalized for 48 Lok Sabha and 94 Rajya Sabha starred inquiries with 100% citation backing.' },
];

const AudioBriefingEngine = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSec, setCurrentSec] = useState(45);
  const [speed, setSpeed] = useState('1.0x');

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSec((s) => (s >= 210 ? 0 : s + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <Container>
      <Toolbar>
        <div className="left">
          <img src={streamIcon} alt="Audio Briefing" />
          <span>Executive Intelligence Audio Briefing & Synchronized Transcript</span>
        </div>
        <div className="meta">Audio Synthesis & Citation Feed</div>
      </Toolbar>

      <AudioContent>
        <PlayerCard>
          <div className="track-info">
            <h3>Ministry of Coal — Executive Intelligence & Briefing (FY 2025–26 Q4 Review)</h3>
            <p>Official briefing voice synthesized from validated CIL & CMPDI statutory dossier</p>
          </div>

          <WaveformVisualizer $active={isPlaying}>
            {[40, 65, 30, 80, 55, 90, 70, 45, 85, 60, 95, 50, 75, 40, 80, 65, 50, 85, 70, 90, 45, 60].map((h, i) => (
              <div key={i} className="bar" style={{ height: isPlaying ? `${h}%` : '30%' }} />
            ))}
          </WaveformVisualizer>

          <ControlsRow>
            <div className="time">{formatTime(currentSec)} / 03:30</div>

            <div className="buttons">
              <button onClick={() => setCurrentSec((s) => Math.max(s - 15, 0))} aria-label="Rewind 15 seconds">
                <Rewind size={16} />
              </button>
              <button
                className="play-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause Briefing' : 'Play Briefing'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button onClick={() => setCurrentSec((s) => Math.min(s + 15, 210))} aria-label="Fast forward 15 seconds">
                <FastForward size={16} />
              </button>
            </div>

            <div className="speed-select">
              <span style={{ fontSize: '11px', color: '#64748b' }}>Speed:</span>
              <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
                <option value="1.0x">1.0x</option>
                <option value="1.25x">1.25x</option>
                <option value="1.5x">1.5x</option>
              </select>
            </div>
          </ControlsRow>
        </PlayerCard>

        <TranscriptBox>
          <h4>Synchronized Verified Transcript</h4>
          {transcript.map((item, idx) => {
            const isActive = currentSec >= item.sec && (idx === transcript.length - 1 || currentSec < transcript[idx + 1].sec);
            return (
              <TranscriptLine
                key={idx}
                $active={isActive}
                onClick={() => setCurrentSec(item.sec)}
              >
                <span className="timestamp">{item.time}</span>
                <span className="text">{item.text}</span>
              </TranscriptLine>
            );
          })}
        </TranscriptBox>
      </AudioContent>
    </Container>
  );
};

export default AudioBriefingEngine;
