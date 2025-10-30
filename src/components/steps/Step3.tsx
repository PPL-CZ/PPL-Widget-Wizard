import React from 'react';
import type { WizardFormData, Translation } from '../../types';
// Importujeme novou konfiguraci jazyků
import { availableWidgetLanguages, allCountries } from '../../config';

interface Step3Props {
  formData: WizardFormData;
  onChange: (
    section: string | null,
    field: string,
    value: string | boolean
  ) => void;
  onNext: () => void;
  onPrev?: () => void;
  validationError: string;
  translations: Translation;
}

const Step3: React.FC<Step3Props> = ({
  formData,
  onChange,
  onNext,
  onPrev,
  validationError,
  translations,
}) => {
  // Použijeme allCountries pro zachování správného pořadí
  const availableCountriesForSelection = allCountries
    .filter(country => formData.countries[country.code] === true)
    .map(country => country.code);

  const handleDefaultCountryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(null, 'defaultCountry', event.target.value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(null, 'widgetLanguage', event.target.value);
  };

    // Najdeme zemi v allCountries a vrátíme její název z translations
    const getCountryName = (countryCode: string): string => {
      const country = allCountries.find(c => c.code === countryCode);
      if (country) {
        return translations[country.nameKey] || countryCode.toUpperCase();
      }
      return countryCode.toUpperCase();
    };

  return (
    <div className="wizard-content" id="step3">
      <h2 className="step-title">{translations.step3Title}</h2>
      <p className="description">{translations.step3Description}</p>

      <h3 className="step-title">{translations.defaultCountry}</h3>
      <div className="checkbox-group" id="default-country-container">
        {availableCountriesForSelection.length > 0 ? (
          availableCountriesForSelection.map((countryCode) => (
            <div className="checkbox-item" key={countryCode}>
              <input
                type="radio"
                id={`default-country-${countryCode}`}
                name="default-country"
                value={countryCode}
                checked={formData.defaultCountry === countryCode}
                onChange={handleDefaultCountryChange}
              />
              <label htmlFor={`default-country-${countryCode}`}>
                {getCountryName(countryCode)}
              </label>
            </div>
          ))
        ) : (
          <p>{translations.selectAtLeastOneCountry}</p>
        )}
      </div>
      {validationError && (
        <div className="validation-message active" id="step3-validation">
          {validationError}
        </div>
      )}

      <h3 className="step-title">{translations.languageTitle}</h3>
      <p className="description">{translations.languageDescription}</p>

      <div className="checkbox-group">
          {availableWidgetLanguages.map((lang) => (
            <div className="checkbox-item" key={lang.code}>
              <input
                type="radio"
                id={`lang-${lang.code}`}
                name="language"
                value={lang.code}
                checked={formData.widgetLanguage === lang.code}
                onChange={handleLanguageChange}
              />
              <label htmlFor={`lang-${lang.code}`}>
                {translations[lang.nameKey]}
              </label>
            </div>
          ))}
        </div>

      <div className="button-group">
        <button className="prev" id="step3-prev" onClick={onPrev}>
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
        <button className="next" id="step3-next" onClick={onNext}>
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

export default Step3;
