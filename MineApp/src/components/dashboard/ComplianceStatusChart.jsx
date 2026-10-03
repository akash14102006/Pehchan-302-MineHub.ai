import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import styled from 'styled-components';

const ChartWrapper = styled.div`
  width: 100%;
  height: 280px;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomTooltipBox = styled.div`
  background-color: #1e293b;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  p {
    margin: 2px 0;
  }

  .title {
    font-weight: 700;
    color: #ffda79;
    margin-bottom: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 2px;
  }
`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <CustomTooltipBox>
        <p className="title">{d.category}</p>
        <p>Resolved: {d.resolved} / {d.total}</p>
        <p style={{ color: '#68d391' }}>Compliance Rate: {d.rate}%</p>
      </CustomTooltipBox>
    );
  }
  return null;
};

const ComplianceStatusChart = () => {
  const data = [
    { category: 'Lok Sabha', rate: 100, resolved: 48, total: 48, color: '#4CAF50' },
    { category: 'Rajya Sabha', rate: 98, resolved: 94, total: 96, color: '#4CAF50' },
    { category: 'Env. Clearances', rate: 94, resolved: 34, total: 36, color: '#2B6CB0' },
    { category: 'Forest Clearances', rate: 92, resolved: 22, total: 24, color: '#2B6CB0' },
    { category: 'DGMS Safety', rate: 100, resolved: 58, total: 58, color: '#164863' },
  ];

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis
            type="number"
            domain={[80, 100]}
            unit="%"
            tick={{ fill: '#555555', fontSize: 11 }}
          />
          <YAxis
            type="category"
            dataKey="category"
            tick={{ fill: '#333333', fontSize: 11, fontWeight: 500 }}
            width={95}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default ComplianceStatusChart;
