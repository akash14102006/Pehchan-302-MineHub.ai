import React from 'react';
import './SubsidiaryList.css';

const SubsidiaryList = () => {
  const subsidiaries = [
    { code: 'MCL', name: 'Mahanadi Coalfields Limited', color: '#FF6666' },
    { code: 'SECL', name: 'South Eastern Coalfields Limited', color: '#FFB366' },
    { code: 'NCL', name: 'Northern Coalfields Limited', color: '#FF9933' },
    { code: 'BCCL', name: 'Bharat Coking Coal Limited', color: '#48BB78' },
    { code: 'CCL', name: 'Central Coalfields Limited', color: '#38B2AC' },
    { code: 'WCL', name: 'Western Coalfields Limited', color: '#805AD5' },
    { code: 'ECL', name: 'Eastern Coalfields Limited', color: '#D53F8C' },
    { code: 'CMPDI', name: 'Central Mine Planning & Design Institute', color: '#3182CE' },
  ];

  return (
    <div className="subsidiary-list">
      <h2>CIL Subsidiaries &amp; Planning Institute Directory</h2>
      <div className="subsidiaries-container">
        {subsidiaries.map((sub) => (
          <div
            key={sub.code}
            className="subsidiary-item"
            style={{ backgroundColor: sub.color }}
          >
            <span className="sub-code">{sub.code}</span>
            <span className="sub-name">{sub.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubsidiaryList;
