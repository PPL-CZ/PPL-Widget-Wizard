import React from 'react';
import type { WizardFormData, Translation } from '../../types';
import { allCountries, ACTIVE_PHASES, productTemplates } from '../../config';

interface Step2Props {
  formData: WizardFormData;
  onChange: (section: string | null, field: string, value: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  validationError: string;
  translations: Translation;
}

const Step2: React.FC<Step2Props> = ({
  formData,
  onChange,
  onNext,
  onPrev,
  validationError,
  translations,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    onChange('countries', id, checked);
  };

  // Filtrujeme země, které se mají zobrazit, podle aktivních fází
  const availableCountries = allCountries.filter((country) =>
    ACTIVE_PHASES.includes(country.phase)
  );

  return (
    <div className="wizard-content" id="step2">
      <h2 className="step-title">{translations.step2Title}</h2>
      <p className="description">{translations.step2Description}</p>

      <div className="checkbox-group" id="step2-options">
        {/* Dynamicky generujeme checkboxy */}
        {availableCountries.map((country) => {
          // Zjistíme, zda je země deaktivovaná šablonou
          const isTemplateActive = formData.selectedTemplate !== 'none';
          const currentTemplate = productTemplates.find(
            (t) => t.id === formData.selectedTemplate
          );
          let isDisabled = false;
          if (isTemplateActive && currentTemplate) {
            if (currentTemplate.allowedCountries) {
              isDisabled = !currentTemplate.allowedCountries.includes(
                country.code
              );
            } else if (currentTemplate.disallowedCountries) {
              isDisabled = currentTemplate.disallowedCountries.includes(
                country.code
              );
            }
          }

          return (
            <div
              className={`checkbox-item ${isDisabled ? 'disabled' : ''}`}
              key={country.code}
            >
              <input
                type="checkbox"
                id={country.code}
                checked={!isDisabled && !!formData.countries[country.code]}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor={country.code}>
                {translations[country.nameKey]}
              </label>
            </div>
          );
        })}
      </div>

      {/* TATO ČÁST CHYBĚLA - ZOBRAZENÍ VALIDAČNÍ HLÁŠKY */}
      {validationError && (
        <div className="validation-message active" id="step2-validation">
          {validationError}
        </div>
      )}

      <div className="button-group">
        <button className="prev" id="step2-prev" onClick={onPrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>{translations.back}</span>
        </button>
        <button className="next" id="step2-next" onClick={onNext}>
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

export default Step2;
