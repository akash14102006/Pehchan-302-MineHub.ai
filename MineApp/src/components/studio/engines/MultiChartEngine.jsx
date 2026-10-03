import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import statisticsIcon from '../../../assets/statistics.png';
import chartsIcon from '../../../assets/charts.png';

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
  flex-wrap: wrap;
  gap: 10px;
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

  .tabs {
    display: flex;
    gap: 6px;

    button {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        background-color: #164863;
        color: #ffffff;
        border-color: #164863;
      }
    }
  }
`;

const ChartCanvas = styled.div`
  flex: 1;
  padding: 24px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const productionData = [
  { name: 'MCL', Target: 204.0, Actual: 168.4 },
  { name: 'SECL', Target: 182.0, Actual: 141.2 },
  { name: 'NCL', Target: 138.0, Actual: 108.6 },
  { name: 'CCL', Target: 84.0, Actual: 62.8 },
  { name: 'WCL', Target: 68.0, Actual: 49.3 },
  { name: 'BCCL', Target: 42.0, Actual: 31.7 },
  { name: 'ECL', Target: 36.0, Actual: 22.2 },
];

const drillingData = [
  { name: 'Completed Core Drilling', value: 793600, color: '#164863' },
  { name: 'Active Core Exploration', value: 347200, color: '#3182CE' },
  { name: '2D/3D Seismic Logging', value: 99200, color: '#FFA000' },
];

const trendData = [
  { month: 'Apr', Cumulative: 52.4, Target: 64.0 },
  { month: 'May', Cumulative: 108.2, Target: 128.0 },
  { month: 'Jun', Cumulative: 164.5, Target: 192.0 },
  { month: 'Jul', Cumulative: 219.8, Target: 256.0 },
  { month: 'Aug', Cumulative: 275.4, Target: 320.0 },
  { month: 'Sep', Cumulative: 334.1, Target: 384.0 },
  { month: 'Oct', Cumulative: 395.7, Target: 448.0 },
  { month: 'Nov', Cumulative: 458.0, Target: 512.0 },
  { month: 'Dec', Cumulative: 521.6, Target: 576.0 },
  { month: 'Jan', Cumulative: 584.2, Target: 640.0 },
  { month: 'Feb (Proj)', Cumulative: 668.0, Target: 704.0 },
  { month: 'Mar (Proj)', Cumulative: 768.0, Target: 768.0 },
];

const MultiChartEngine = ({ onSelectEvidence }) => {
  const [mode, setMode] = useState('production');

  return (
    <Container>
      <Toolbar>
        <div className="left">
          <img src={statisticsIcon} alt="Charts" />
          <span>Multi-Chart Analytical Visualization Engine</span>
        </div>
        <div className="tabs">
          <button
            className={mode === 'production' ? 'active' : ''}
            onClick={() => setMode('production')}
          >
            Production Target vs Actual
          </button>
          <button
            className={mode === 'drilling' ? 'active' : ''}
            onClick={() => setMode('drilling')}
          >
            Geological Drilling Share
          </button>
          <button
            className={mode === 'trend' ? 'active' : ''}
            onClick={() => setMode('trend')}
          >
            768 MT Mandate Velocity
          </button>
        </div>
      </Toolbar>

      <ChartCanvas>
        {mode === 'production' && (
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={productionData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
              <YAxis unit=" MT" tick={{ fill: '#475569', fontSize: 11 }} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '14px' }} />
              <Bar dataKey="Target" fill="#164863" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Actual" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {mode === 'drilling' && (
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={drillingData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={4}
                dataKey="value"
              >
                {drillingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '15px' }} />
            </PieChart>
          </ResponsiveContainer>
        )}

        {mode === 'trend' && (
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
              <YAxis unit=" MT" domain={[0, 800]} tick={{ fill: '#475569', fontSize: 11 }} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '14px' }} />
              <Area type="monotone" dataKey="Target" stroke="#3182ce" fill="#ebf8fa" strokeWidth={2} />
              <Area type="monotone" dataKey="Cumulative" stroke="#164863" fill="#D0E8F0" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartCanvas>
    </Container>
  );
};

export default MultiChartEngine;
