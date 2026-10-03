import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
    margin: 3px 0;
    font-weight: 500;
  }

  .title {
    font-weight: 700;
    color: #ffda79;
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 3px;
  }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipBox>
        <p className="title">{label} Subsidiary</p>
        <p style={{ color: '#90cdf4' }}>
          Target: {payload[0]?.value} MT
        </p>
        <p style={{ color: '#68d391' }}>
          Actual: {payload[1]?.value} MT
        </p>
        <p style={{ color: '#e2e8f0', fontSize: '11px' }}>
          Achievement:{' '}
          {Math.round((payload[1]?.value / payload[0]?.value) * 100)}%
        </p>
      </CustomTooltipBox>
    );
  }
  return null;
};

const ProductionBarChart = () => {
  const data = [
    { name: 'MCL', Target: 204.0, Actual: 168.4 },
    { name: 'SECL', Target: 182.0, Actual: 141.2 },
    { name: 'NCL', Target: 138.0, Actual: 108.6 },
    { name: 'CCL', Target: 84.0, Actual: 62.8 },
    { name: 'WCL', Target: 68.0, Actual: 49.3 },
    { name: 'BCCL', Target: 42.0, Actual: 31.7 },
    { name: 'ECL', Target: 36.0, Actual: 22.2 },
  ];

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#555555', fontSize: 12, fontWeight: 500 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#555555', fontSize: 11 }}
            tickLine={false}
            unit=" MT"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
          />
          <Bar dataKey="Target" fill="#164863" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Actual" fill="#4CAF50" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default ProductionBarChart;
