// src/components/steps/Step0.tsx

import React from 'react';
import type { WizardFormData, Translation } from '../../types';

interface Step0Props {
  formData: WizardFormData;
  onChange: (section: string | null, field: string, value: string) => void;
  onNext: () => void;
  validationError: string;
  translations: Translation;
}

const Step0: React.FC<Step0Props> = ({
  formData,
  onChange,
  onNext,
  validationError,
  translations,
}) => {
  const handleCustIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 8); // Jen čísla, max 8
    onChange(null, 'custId', value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(null, 'shopUrl', event.target.value);
  };

  return (
    <div className="wizard-content" id="step0">
      <h2 className="step-title">{translations.step0Title}</h2>
      <p className="description">{translations.step0Description}</p>

      <div className="form-container" style={{ marginTop: '30px' }}>
        {/* Zákaznické číslo */}
        <div className="form-group" style={{ marginBottom: '25px' }}>
          <label
            htmlFor="custId"
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '8px',
              fontSize: '16px',
            }}
          >
            {translations.step0CustIdLabel}
          </label>
          <input
            type="text"
            id="custId"
            value={formData.custId}
            onChange={handleCustIdChange}
            placeholder={translations.step0CustIdPlaceholder || '12345678'}
            maxLength={8}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid var(--ppl-medium-gray)',
              borderRadius: 'var(--border-radius)',
              boxSizing: 'border-box',
            }}
          />
          <small
            style={{
              color: '#666',
              fontSize: '13px',
              marginTop: '5px',
              display: 'block',
            }}
          >
            {translations.step0CustIdHint || 'Zadejte 8místné zákaznické číslo'}
          </small>
        </div>

        {/* URL eshopu */}
        <div className="form-group" style={{ marginBottom: '25px' }}>
          <label
            htmlFor="shopUrl"
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '8px',
              fontSize: '16px',
            }}
          >
            {translations.step0UrlLabel}
          </label>
          <input
            type="text"
            id="shopUrl"
            value={formData.shopUrl}
            onChange={handleUrlChange}
            placeholder={translations.step0UrlPlaceholder || 'www.vas-eshop.cz'}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid var(--ppl-medium-gray)',
              borderRadius: 'var(--border-radius)',
              boxSizing: 'border-box',
            }}
          />
          <small
            style={{
              color: '#666',
              fontSize: '13px',
              marginTop: '5px',
              display: 'block',
            }}
          >
            {translations.step0UrlHint ||
              'Zadejte URL vašeho eshopu (bez https://)'}
          </small>
        </div>
      </div>

      {/* Validační chyba */}
      {validationError && (
        <div className="validation-message active" id="step0-validation">
          {validationError}
        </div>
      )}

      {/* Informační box */}
      <div
        style={{
          backgroundColor: '#f0f7ff',
          border: '1px solid #0066cc',
          borderRadius: 'var(--border-radius)',
          padding: '20px',
          marginTop: '30px',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>
          💡 {translations.step0InfoTitle || 'Co tento průvodce nabízí?'}
        </h4>
        <ul
          style={{ margin: '10px 0', paddingLeft: '20px', lineHeight: '1.8' }}
        >
          <li>
            {translations.step0Info1 ||
              'Jednoduchá konfigurace PPL widgetu pro váš e-shop'}
          </li>
          <li>
            {translations.step0Info2 ||
              'Výběr typů výdejních míst (ParcelShop, ParcelBox, AlzaBox)'}
          </li>
          <li>{translations.step0Info3 || 'Podpora pro více zemí a jazyků'}</li>
          <li>
            {translations.step0Info4 ||
              'Automatické vygenerování implementačního kódu'}
          </li>
          <li>{translations.step0Info5 || 'Náhled widgetu před nasazením'}</li>
        </ul>
      </div>

      <div className="button-group">
        <div></div> {/* Placeholder pro zarovnání */}
        <button className="next" id="step0-next" onClick={onNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>{translations.continue}</span>
        </button>
      </div>
    </div>
  );
};

export default Step0;
