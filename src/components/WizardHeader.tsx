import React from 'react';
import type { Translation } from '../types'; // Importujeme typ Translation

// Interface pro props
interface WizardHeaderProps {
  translations: Translation;
}

const WizardHeader: React.FC<WizardHeaderProps> = ({ translations }) => {
  return (
    <div className="wizard-header">
      <img
        src="https://www.ppl.cz/documents/20122/6525005/hlavi%C4%8Dka+logo+%281%29.svg"
        alt="PPL Logo"
        className="logo"
      />
      {/* Titulek se nyní bere přímo z překladů */}
      <h1>{translations.title}</h1>
    </div>
  );
};

export default WizardHeader;