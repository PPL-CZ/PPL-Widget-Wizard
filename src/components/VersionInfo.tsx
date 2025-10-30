// Soubor: src/components/VersionInfo.tsx
import React from 'react';

// Co tato kostička potřebuje vědět od hlavní desky (App.tsx):
interface VersionInfoProps {
  aktualniVerze: string; // Např. "1.0"
  textVerze: string; // Text "Verze" ve správném jazyce
  textCoJeNoveho: string; // Text "Co je nového?" ve správném jazyce
  kdyzSeKlikneNaCoJeNoveho: () => void; // Co se má stát, když se klikne na "Co je nového?"
}

const VersionInfo: React.FC<VersionInfoProps> = ({
  aktualniVerze,
  textVerze,
  textCoJeNoveho,
  kdyzSeKlikneNaCoJeNoveho,
}) => {
  // Styly, aby to vypadalo hezky (můžete mít i v CSS souboru)
  const stylVerzeInfo: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '13px',
    color: '#888888', // Šedá barva
    padding: '15px 0',
    marginTop: '30px',
    borderTop: '1px solid #e9ecef', // Světle šedá čára nahoře
  };

  const stylOdkazu: React.CSSProperties = {
    color: '#0087cd', // Modrá PPL barva
    textDecoration: 'none',
    cursor: 'pointer', // Aby myš vypadala jako ruka
  };

  return (
    <div style={stylVerzeInfo}>
      {textVerze} <span id="app-version">{aktualniVerze}</span> –{' '}
      <a style={stylOdkazu} onClick={kdyzSeKlikneNaCoJeNoveho}>
        {textCoJeNoveho}
      </a>
    </div>
  );
};

export default VersionInfo;