import React from 'react';
import type { WizardFormData, Translation } from '../../types';

interface Step4Props {
  formData: WizardFormData;
  onChange: (section: string | null, field: string, value: string | boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  validationError: string;
  translations: Translation;
}

const Step4: React.FC<Step4Props> = ({
  formData,
  onChange,
  onNext,
  onPrev,
  validationError,
  translations
}) => {

  const handleMapTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMapType = event.target.value as 'default' | 'static' | 'catalog';
    onChange(null, 'mapType', newMapType);
  };

  const handleCoordinatesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const field = id === 'map-lat' ? 'lat' : 'lng';
    onChange('coordinates', field, value);
  };

  return (
    <div className={`wizard-content ${validationError && formData.mapType === 'static' ? 'has-validation-error' : ''}`}>
      <h2 className="step-title">{translations.step4Title}</h2>
      <p className="description">{translations.step4Description}</p>

      <div className="checkbox-group">
        {/* Default Map Type */}
        <div className="checkbox-item">
          <input
            type="radio"
            id="map-default"
            name="map-type"
            value="default"
            checked={formData.mapType === 'default'}
            onChange={handleMapTypeChange}
          />
          {/* Pro vložení HTML z překladů použijeme dangerouslySetInnerHTML */}
          {/* Ujisti se, že HTML v překladech je bezpečné! */}
          <label htmlFor="map-default" dangerouslySetInnerHTML={{ __html: translations.mapDefault }}></label>
          <div className="tooltip-container">
            <span className="tooltip-icon" tabIndex={0}>?</span>
            <span className="tooltip-text">{translations.tooltipDefault}</span>
          </div>
        </div>

        {/* Static Map Type */}
        <div className="checkbox-item">
          <input
            type="radio"
            id="map-static"
            name="map-type"
            value="static"
            checked={formData.mapType === 'static'}
            onChange={handleMapTypeChange}
          />
          <label htmlFor="map-static" dangerouslySetInnerHTML={{ __html: translations.mapStatic }}></label>
          <div className="tooltip-container">
            <span className="tooltip-icon" tabIndex={0}>?</span>
            <span className="tooltip-text">{translations.tooltipStatic}</span>
          </div>
        </div>

        {/* Catalog Map Type */}
        <div className="checkbox-item">
          <input
            type="radio"
            id="map-catalog"
            name="map-type"
            value="catalog"
            checked={formData.mapType === 'catalog'}
            onChange={handleMapTypeChange}
          />
          <label htmlFor="map-catalog" dangerouslySetInnerHTML={{ __html: translations.mapCatalog }}></label>
          <div className="tooltip-container">
            <span className="tooltip-icon" tabIndex={0}>?</span>
            <span className="tooltip-text">{translations.tooltipCatalog}</span>
          </div>
        </div>
      </div>

      {/* Podmíněně zobrazená sekce pro souřadnice */}
      {formData.mapType === 'static' && (
        <div id="static-map-coordinates" className={validationError ? 'has-validation-error' : ''}>
          <h3 className="step-title">{translations.coordinatesTitle}</h3>
          <p className="description">{translations.coordinatesDescription}</p>
          <div> {/* Flex container pro inputy */}
            <div>
              <label htmlFor="map-lat">{translations.latitude}</label>
              <input
                type="text"
                id="map-lat"
                placeholder="např. 50.0755"
                value={formData.coordinates.lat}
                onChange={handleCoordinatesChange}
              />
            </div>
            <div>
              <label htmlFor="map-lng">{translations.longitude}</label>
              <input
                type="text"
                id="map-lng"
                placeholder="např. 14.4378"
                value={formData.coordinates.lng}
                onChange={(e) => onChange('coordinates', 'lng', e.target.value)}
              />
            </div>
          </div>
          {validationError && ( // Zobrazujeme pouze jednu validační hlášku pro tento krok
            <div className="validation-message active" id="step4-validation-coords">
              {validationError}
            </div>
          )}
        </div>
      )}

      <div className="button-group">
        <button className="prev" id="step4-prev" onClick={onPrev}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
          <span>{translations.back}</span>
        </button>
        <button className="next" id="step4-next" onClick={onNext}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          <span>{translations.continue}</span>
        </button>
      </div>
    </div>
  );
};

export default Step4;