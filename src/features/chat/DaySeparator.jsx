import React from 'react';
import { formatDayLabel } from '../../utils/date';

const DaySeparator = ({ timestamp }) => (
  <div style={{ textAlign: 'center', margin: '16px 0', color: '#aaa' }}>
    <span style={{ background: '#111', padding: '4px 8px', borderRadius: 12, border: '1px solid #333' }}>
      {formatDayLabel(timestamp)}
    </span>
  </div>
);

export default DaySeparator;


