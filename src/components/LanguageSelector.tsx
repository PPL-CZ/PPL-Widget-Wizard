import React from 'react';

// Interface pro props
interface LanguageSelectorProps {
  currentLanguage: 'cs' | 'en';
  onLanguageChange: (lang: 'cs' | 'en') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="language-selector-container">
      <div className="language-selector">
        <button
          id="lang-switch-cs"
          className={`lang-button ${currentLanguage === 'cs' ? 'active' : ''}`}
          onClick={() => onLanguageChange('cs')}
        >
          Česky
        </button>
        <button
          id="lang-switch-en"
          className={`lang-button ${currentLanguage === 'en' ? 'active' : ''}`}
          onClick={() => onLanguageChange('en')}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;