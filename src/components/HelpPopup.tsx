import React from 'react';

interface HelpPopupProps {
  title: string;
  content: string;
  onClose: () => void;
  currentLanguage: 'cs' | 'en';
}

const HelpPopup: React.FC<HelpPopupProps> = ({ title, content, onClose }) => {
  // Zavření při kliknutí mimo obsah
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Kontrolujeme, zda bylo kliknuto na element s třídou 'help-popup' (overlay)
    if ((e.target as HTMLElement).classList.contains('help-popup')) {
      onClose();
    }
  };

  return (
    <div className="help-popup active" onClick={handleOutsideClick}>
      <div className="help-popup-content">
        <button className="help-popup-close" onClick={onClose}>
          &times;
        </button>
        <h3 className="help-popup-title">{title}</h3>
        {/* dangerouslySetInnerHTML je potřeba pro renderování HTML obsahu nápovědy */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default HelpPopup;