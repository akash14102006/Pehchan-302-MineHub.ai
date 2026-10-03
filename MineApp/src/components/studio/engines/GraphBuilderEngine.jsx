import React, { useState } from 'react';
import styled from 'styled-components';
import { Share2, Info, CheckCircle2, RotateCcw } from 'lucide-react';
import customIcon from '../../../assets/custom.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 520px;
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

const GraphArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const SvgCanvas = styled.div`
  flex: 1;
  min-height: 440px;
  background: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
  background-size: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;

const SideInspector = styled.div`
  width: 280px;
  background-color: #f8fafc;
  border-left: 1px solid #e2e8f0;
  padding: 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h4 {
    font-size: 13px;
    font-weight: 700;
    color: #164863;
    margin: 0;
  }

  .entity-type {
    font-size: 11px;
    font-weight: 600;
    color: #3182ce;
    text-transform: uppercase;
  }

  .detail-card {
    background-color: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 10px;
    font-size: 11.5px;
    color: #334155;
    line-height: 1.45;
  }

  button {
    background-color: #164863;
    color: #ffffff;
    border: none;
    padding: 7px 12px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 4px;

    &:hover {
      background-color: #0f3144;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid #e2e8f0;
  }
`;

const nodes = [
  { id: 'moc', label: 'Ministry of Coal', type: 'Sovereign Authority', x: 260, y: 70, color: '#164863' },
  { id: 'cil', label: 'Coal India Ltd (CIL)', type: 'Apex Producer', x: 120, y: 190, color: '#2e7d32' },
  { id: 'cmpdi', label: 'CMPDI Planning Unit', type: 'Exploration & Design', x: 400, y: 190, color: '#3182ce' },
  { id: 'mcl', label: 'MCL (Talcher)', type: 'Operating Subsidiary', x: 60, y: 330, color: '#2e7d32' },
  { id: 'secl', label: 'SECL (Gevra OCP)', type: 'Operating Subsidiary', x: 200, y: 340, color: '#2e7d32' },
  { id: 'ri7', label: 'CMPDI RI-VII', type: 'Regional Institute', x: 360, y: 340, color: '#3182ce' },
  { id: 'dgms', label: 'DGMS Safety Directorate', type: 'Statutory Regulator', x: 480, y: 330, color: '#d97706' },
];

const links = [
  { from: 'moc', to: 'cil', label: 'Mandates 768 MT' },
  { from: 'moc', to: 'cmpdi', label: 'Commissions Core Drilling' },
  { from: 'cil', to: 'mcl', label: 'Controls 204 MT Target' },
  { from: 'cil', to: 'secl', label: 'Controls 182 MT Target' },
  { from: 'cmpdi', to: 'ri7', label: 'Deploys 2D/3D Seismic' },
  { from: 'dgms', to: 'secl', label: 'Audits Slope Radar' },
];

const GraphBuilderEngine = ({ onSelectEvidence }) => {
  const [selected, setSelected] = useState(nodes[0]);

  const getNode = (id) => nodes.find((n) => n.id === id);

  return (
    <Container>
      <Toolbar>
        <div className="left">
          <img src={customIcon} alt="Knowledge Graph" />
          <span>Entity & Mandate Knowledge Graph Network</span>
        </div>
        <div className="meta">7 Core Entities / 6 Governance Relations</div>
      </Toolbar>

      <GraphArea>
        <SvgCanvas>
          <svg viewBox="0 0 560 420" width="100%" height="420">
            {/* Edges */}
            {links.map((link, idx) => {
              const fromNode = getNode(link.from);
              const toNode = getNode(link.to);
              const midX = (fromNode.x + toNode.x) / 2;
              const midY = (fromNode.y + toNode.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <rect
                    x={midX - 45}
                    y={midY - 9}
                    width="90"
                    height="18"
                    rx="3"
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                  <text
                    x={midX}
                    y={midY + 3}
                    fontSize="7.5"
                    fontWeight="600"
                    fill="#475569"
                    textAnchor="middle"
                  >
                    {link.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((n) => {
              const isSelected = selected?.id === n.id;
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x}, ${n.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(n)}
                >
                  <circle
                    r={isSelected ? 26 : 22}
                    fill={isSelected ? '#D0E8F0' : '#ffffff'}
                    stroke={n.color}
                    strokeWidth={isSelected ? 3.5 : 2.5}
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                  />
                  <text
                    y="4"
                    fontSize="9.5"
                    fontWeight="700"
                    fill="#164863"
                    textAnchor="middle"
                  >
                    {n.id.toUpperCase()}
                  </text>
                  <text
                    y="36"
                    fontSize="9.5"
                    fontWeight="600"
                    fill="#1e293b"
                    textAnchor="middle"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </SvgCanvas>

        <SideInspector>
          <h4>Entity Inspector</h4>
          {selected ? (
            <>
              <div className="entity-type">{selected.type}</div>
              <div className="detail-card">
                <strong>{selected.label}</strong>
                <p style={{ margin: '6px 0 0 0', color: '#64748b' }}>
                  Integrated governance node linked with statutory reporting, geological exploration logs, and mandate tracking.
                </p>
              </div>
              <button
                onClick={() =>
                  onSelectEvidence &&
                  onSelectEvidence({
                    claim: `${selected.label} (${selected.type})`,
                    source: 'Ministry of Coal Enterprise Knowledge Graph',
                    refId: `GRAPH-NODE-${selected.id.toUpperCase()}`,
                    page: 'Entity Relationship Network',
                    coordinates: `Node ID: ${selected.id}`,
                    timestamp: '2026-03-24 11:00 IST',
                    hash: 'SHA256: 9b2d3c4e5f6a7b8c',
                    excerpt: `${selected.label} is an authenticated primary entity in the MineHub statutory reporting domain model.`,
                    authority: 'Government of India / Ministry of Coal',
                  })
                }
              >
                Inspect Evidence Source
              </button>
            </>
          ) : (
            <p style={{ fontSize: '11px', color: '#64748b' }}>Select any graph node to inspect details.</p>
          )}
        </SideInspector>
      </GraphArea>
    </Container>
  );
};

export default GraphBuilderEngine;
