// src/components/SettingsKeyDisplay.tsx

import React, { useState } from 'react';

interface SettingsKeyDisplayProps {
  settingsKey: string;
  custId: string;
  shopUrl: string;
}

const SettingsKeyDisplay: React.FC<SettingsKeyDisplayProps> = ({
  settingsKey,
  custId,
  shopUrl,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(settingsKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        backgroundColor: '#fff3cd',
        border: '2px solid #ffc107',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', color: '#856404', marginBottom: '5px' }}>
            <strong>Zákaznické číslo:</strong> {custId} | <strong>E-shop:</strong> {shopUrl}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', color: '#856404', fontWeight: 'bold' }}>
              Settings Key:
            </span>
            <code
              style={{
                backgroundColor: '#fff',
                padding: '5px 10px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#333',
                border: '1px solid #ffc107',
              }}
            >
              {settingsKey}
            </code>
            <button
              onClick={copyToClipboard}
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                backgroundColor: copied ? '#28a745' : '#ffc107',
                color: copied ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              title="Kopírovat do schránky"
            >
              {copied ? '✓ Zkopírováno' : '📋 Kopírovat'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsKeyDisplay;