import React from 'react';
import type { WizardFormData, Translation } from '../../types';
import { productTemplates, } from '../../config'; // Importujeme šablony

interface Step1Props {
  formData: WizardFormData;
  onChange: (
    section: string | null,
    field: string,
    value: string | boolean
  ) => void;
  onNext: () => void;
  validationError: string;
  translations: Translation;
}

const Step1: React.FC<Step1Props> = ({
  formData,
  onChange,
  onNext,
  validationError,
  translations,
}) => {
  const handlePickupPointsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, checked } = event.target;
    onChange('pickupPoints', id, checked);
  };

  const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const templateId = event.target.value as WizardFormData['selectedTemplate'];
    onChange(null, 'selectedTemplate', templateId);
  };

  const isTemplateActive = formData.selectedTemplate !== 'none';

  return (
    <div className="wizard-content" id="step1">
      {/* --- SEKCE PRO TYPY MÍST (PRVNÍ) --- */}
      <h2 className="step-title">{translations.step1Title}</h2>
      <p className="description">{translations.step1Description}</p>

      <div
        className="checkbox-group"
        id="step1-options"
        style={{ marginBottom: '40px' }}
      >
        <div className={`checkbox-item ${isTemplateActive ? 'disabled' : ''}`}>
          <input
            type="checkbox"
            id="parcelshop"
            checked={formData.pickupPoints.parcelshop}
            onChange={handlePickupPointsChange}
            disabled={isTemplateActive}
          />
          <label htmlFor="parcelshop">{translations.parcelshop}</label>
        </div>
        <div className={`checkbox-item ${isTemplateActive ? 'disabled' : ''}`}>
          <input
            type="checkbox"
            id="parcelbox"
            checked={formData.pickupPoints.parcelbox}
            onChange={handlePickupPointsChange}
            disabled={isTemplateActive}
          />
          <label htmlFor="parcelbox">{translations.parcelbox}</label>
        </div>
        <div className={`checkbox-item ${isTemplateActive ? 'disabled' : ''}`}>
          <input
            type="checkbox"
            id="alzabox"
            checked={formData.pickupPoints.alzabox}
            onChange={handlePickupPointsChange}
            disabled={isTemplateActive}
          />
          <label htmlFor="alzabox">{translations.alzabox}</label>
        </div>
      </div>

      {/* --- SEKCE PRO VÝBĚR ŠABLON (DRUHÁ) --- */}
      <h2 className="step-title">{translations.templatesTitle}</h2>

      <p className="info-hint">{translations.templatesHint}</p>

      <div className="checkbox-group">
      {productTemplates
          .filter((template) => template.enabled !== false)
          .map((template) => {
            let tooltipText: string | null = null;
            if (template.id === 's2box_cz') {
              tooltipText = translations.tooltipS2Box;
            } else if (template.id === 's2box_eu') {
              tooltipText = translations.tooltipS2BoxEurope;
            }

          return (
            <div className="checkbox-item" key={template.id}>
              <input
                type="radio"
                id={`template-${template.id}`}
                name="product-template"
                value={template.id}
                checked={formData.selectedTemplate === template.id}
                onChange={handleTemplateChange}
              />
              <label htmlFor={`template-${template.id}`}>
                {translations[template.nameKey]}
              </label>

              {tooltipText && (
                <div className="tooltip-container">
                  <span className="tooltip-icon" tabIndex={0}>
                    ?
                  </span>
                  <span className="tooltip-text">{tooltipText}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {validationError && (
        <div className="validation-message active" id="step1-validation">
          {validationError}
        </div>
      )}

      <div className="button-group">
        <div></div>
        <button className="next" id="step1-next" onClick={onNext}>
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

export default Step1;
