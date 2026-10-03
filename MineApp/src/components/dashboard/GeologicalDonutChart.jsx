import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
    const data = payload[0];
    return (
      <CustomTooltipBox>
        <p className="title">{data.name}</p>
        <p>Meterage: {data.value.toLocaleString()} m</p>
        <p style={{ color: '#68d391' }}>Share: {data.payload.percent}%</p>
      </CustomTooltipBox>
    );
  }
  return null;
};

const GeologicalDonutChart = () => {
  const data = [
    { name: 'Completed & Verified', value: 793600, percent: 64, color: '#164863' },
    { name: 'Active Core Drilling', value: 347200, percent: 28, color: '#3182CE' },
    { name: 'Scheduled / Geophysical', value: 99200, percent: 8, color: '#FFA000' },
  ];

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default GeologicalDonutChart;
