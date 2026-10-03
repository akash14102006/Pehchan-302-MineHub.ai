import React from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AUTHORITATIVE_PRODUCTION_METRICS } from '../../services/reportProductionDataService';

const ChartCardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 24px 28px;
  border: 1px solid rgba(22, 72, 99, 0.08);
  box-shadow: 4px 4px 14px rgba(22, 72, 99, 0.05), -3px -3px 8px rgba(255, 255, 255, 0.95);
  margin-top: 28px;
  margin-bottom: 28px;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

const TitleGroup = styled.div`
  h3 {
    margin: 0;
    font-size: 17.5px;
    font-weight: 700;
    color: #164863;
    letter-spacing: -0.2px;
  }

  p {
    margin: 4px 0 0 0;
    font-size: 12px;
    color: #64748b;
  }
`;

const MetricsOverviewPills = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  .stat-pill {
    padding: 6px 12px;
    background-color: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    font-size: 11.5px;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 6px;

    strong {
      color: #164863;
      font-weight: 700;
    }
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 320px;
  min-height: 320px;
`;

const TooltipCard = styled.div`
  background-color: #1e293b;
  color: #ffffff;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  .tooltip-title {
    font-weight: 700;
    font-size: 13px;
    color: #f8fafc;
    margin-bottom: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 4px;
  }

  .tooltip-basin {
    font-size: 10.5px;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  .metric-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 3px;
  }

  .achievement-tag {
    margin-top: 6px;
    padding-top: 4px;
    border-top: 1px dashed rgba(255, 255, 255, 0.2);
    font-weight: 700;
    color: #4ade80;
    display: flex;
    justify-content: space-between;
  }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataObj = payload[0]?.payload;
    const targetVal = payload[0]?.value;
    const actualVal = payload[1]?.value;
    const achievement = targetVal ? Math.round((actualVal / targetVal) * 100) : 0;

    return (
      <TooltipCard>
        <div className="tooltip-title">{dataObj.name} ({label})</div>
        <div className="tooltip-basin">{dataObj.coalfield}</div>
        <div className="metric-row">
          <span style={{ color: '#93c5fd' }}>Target:</span>
          <strong>{targetVal} MT</strong>
        </div>
        <div className="metric-row">
          <span style={{ color: '#86efac' }}>Actual Output:</span>
          <strong>{actualVal} MT</strong>
        </div>
        <div className="achievement-tag">
          <span>Achievement:</span>
          <span>{achievement}%</span>
        </div>
      </TooltipCard>
    );
  }
  return null;
};

const GeologyProductionTargetChart = ({ selectedAuthorityId }) => {
  const { subsidiaries, nationalTargetMT, actualYTDOutputMT, reportingPeriod, freshnessTimestamp } =
    AUTHORITATIVE_PRODUCTION_METRICS;

  const chartData = subsidiaries.map((sub) => ({
    name: sub.name,
    code: sub.code,
    Target: sub.target,
    Actual: sub.actual,
    coalfield: sub.coalfield,
    isHighlighted:
      selectedAuthorityId &&
      selectedAuthorityId !== 'all' &&
      sub.code.toLowerCase() === selectedAuthorityId.toLowerCase(),
  }));

  return (
    <ChartCardContainer>
      <ChartHeader>
        <TitleGroup>
          <h3>Subsidiary Production vs Target (MT)</h3>
          <p>
            {reportingPeriod} • Source: Ministry of Coal / CIL Statutory Directorate • Updated: {freshnessTimestamp}
          </p>
        </TitleGroup>

        <MetricsOverviewPills>
          <div className="stat-pill">
            National Mandate: <strong>{nationalTargetMT} MT</strong>
          </div>
          <div className="stat-pill">
            YTD Output: <strong style={{ color: '#15803d' }}>{actualYTDOutputMT} MT</strong>
          </div>
          <div className="stat-pill">
            Achievement: <strong style={{ color: '#164863' }}>76.1%</strong>
          </div>
        </MetricsOverviewPills>
      </ChartHeader>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            margin={{ top: 12, right: 15, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="code"
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              unit=" MT"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '14px', fontSize: '12px', fontWeight: 600 }}
            />
            <Bar dataKey="Target" fill="#164863" radius={[4, 4, 0, 0]} maxBarSize={36}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`target-${index}`}
                  fill={entry.isHighlighted ? '#0e2b3c' : '#164863'}
                  stroke={entry.isHighlighted ? '#38bdf8' : 'none'}
                  strokeWidth={entry.isHighlighted ? 2 : 0}
                />
              ))}
            </Bar>
            <Bar dataKey="Actual" fill="#4CAF50" radius={[4, 4, 0, 0]} maxBarSize={36}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`actual-${index}`}
                  fill={entry.isHighlighted ? '#15803d' : '#4CAF50'}
                  stroke={entry.isHighlighted ? '#86efac' : 'none'}
                  strokeWidth={entry.isHighlighted ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartCardContainer>
  );
};

export default GeologyProductionTargetChart;
