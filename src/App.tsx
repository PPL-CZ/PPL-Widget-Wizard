// App.tsx - Hlavní komponenta aplikace
import { useState, useEffect, useMemo } from 'react';
import './App.css';
import type { WizardFormData, GeneratedCode, ValidationErrors } from './types';
import WizardHeader from './components/WizardHeader';
import LanguageSelector from './components/LanguageSelector';
import ProgressIndicator from './components/ProgressIndicator';
import Step0 from './components/steps/Step0';
import Step1 from './components/steps/Step1';
import Step2 from './components/steps/Step2';
import Step3 from './components/steps/Step3';
import Step4 from './components/steps/Step4';
import Step5 from './components/steps/Step5';
import Step6 from './components/steps/Step6';
import HelpPopup from './components/HelpPopup';
import { translations } from './translations';
import { generateSettingsKey } from './utils/settingsKey';
import {
  allCountries,
  productTemplates,
  ACTIVE_PHASES,
  countryToLanguage,
  ENABLE_STEP0,
} from './config';
import SettingsKeyDisplay from './components/SettingsKeyDisplay';

// Rozhraní pro Google Analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: Record<string, string | number | undefined>
    ) => void;
    ga?: (
      command: string,
      hitType: string,
      category: string,
      action: string,
      label: string,
      value?: number
    ) => void;
  }
}

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<'cs' | 'en'>('cs');
  const [currentStep, setCurrentStep] = useState<number>(ENABLE_STEP0 ? 0 : 1);
  const [activeHelpPopupKey, setActiveHelpPopupKey] = useState<string | null>(
    null
  );

  // Dynamicky vytvoříme počáteční stav pro všechny země
  const initialCountriesState = allCountries.reduce((acc, country) => {
    // Pro jednoduchost můžeme nastavit CZ jako výchozí, ostatní false
    acc[country.code] = country.code === 'cz';
    return acc;
  }, {} as { [key: string]: boolean });

  const [formData, setFormData] = useState<WizardFormData>({
    // Step0 pole
    custId: '',
    shopUrl: '',

    pickupPoints: {
      parcelshop: false,
      parcelbox: false,
      alzabox: false,
    },
    countries: initialCountriesState,
    defaultCountry: 'cz',
    widgetLanguage: 'cs',
    mapType: 'default',
    coordinates: {
      lat: '',
      lng: '',
    },
    selectedTemplate: 'none',
  });

  const [generatedCode, setGeneratedCode] = useState<GeneratedCode>({
    headCode: '',
    bodyCode: '',
    scriptCode: '',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    step0: '',
    step1: '',
    step2: '',
    step3Country: '',
    step4Coords: '',
  });

  const trackEvent = (
    category: string,
    action: string,
    label?: string,
    value?: number
  ): void => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    if (typeof window.ga === 'function') {
      window.ga('send', 'event', category, action, label || '', value);
    }

    console.log(
      `Analytics Event: ${category} - ${action} - ${label}${
        value ? ` - ${value}` : ''
      }`
    );
  };

  const trackStepNavigation = (fromStep: number, toStep: number): void => {
    trackEvent('Navigation', 'Step Change', `From ${fromStep} to ${toStep}`);
  };

  const validateStep = (step: number): boolean => {
    let isValid = true;
    const newErrors = { ...validationErrors };

    switch (step) {
      case 0:
        // Validace Step0 - CustId a URL
        if (!formData.custId || formData.custId.length < 5 || formData.custId.length > 8) {
          // Chyba: CustId buď chybí, nebo je příliš krátké (méně než 5), nebo příliš dlouhé (více než 8).
          newErrors.step0 = translations[currentLanguage].step0ValidationCustId;
          isValid = false;
        } else if (!formData.shopUrl || formData.shopUrl.trim() === '') {
          newErrors.step0 = translations[currentLanguage].step0ValidationUrl;
          isValid = false;
        } else {
          newErrors.step0 = '';
        }
        break;

      case 1:
        if (
          !formData.pickupPoints.parcelshop &&
          !formData.pickupPoints.parcelbox &&
          !formData.pickupPoints.alzabox
        ) {
          newErrors.step1 = translations[currentLanguage].selectAtLeastOnePoint;
          isValid = false;
        } else {
          newErrors.step1 = '';
        }
        break;

      case 2:
        // Zkontrolujeme, zda je vybrána ALESPOŇ JEDNA země z dostupných
        const hasAnyCountry = allCountries
          .filter((country) => ACTIVE_PHASES.includes(country.phase))
          .some((country) => formData.countries[country.code]);

        if (!hasAnyCountry) {
          newErrors.step2 =
            translations[currentLanguage].selectAtLeastOneCountry;
          isValid = false;
        } else {
          newErrors.step2 = '';
        }
        break;

      case 3:
        newErrors.step3Country = '';
        break;

      case 4:
        if (formData.mapType === 'static') {
          const { lat, lng } = formData.coordinates;

          if (!lat || !lng) {
            newErrors.step4Coords =
              translations[currentLanguage].enterCoordinates;
            isValid = false;
          } else if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
            newErrors.step4Coords =
              translations[currentLanguage].enterValidCoordinates;
            isValid = false;
          } else {
            newErrors.step4Coords = '';
          }
        } else {
          newErrors.step4Coords = '';
        }
        break;

      default:
        break;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const generateCode = (): void => {
    const hiddenPoints: string[] = [];
    if (!formData.pickupPoints.parcelshop) hiddenPoints.push('ParcelShop');
    if (!formData.pickupPoints.parcelbox) hiddenPoints.push('ParcelBox');
    if (!formData.pickupPoints.alzabox) hiddenPoints.push('AlzaBox');

    // Dynamicky sestavíme seznam vybraných zemí z configu
    const countries: string[] = allCountries
      .filter((country) => ACTIVE_PHASES.includes(country.phase))
      .map((country) => country.code)
      .filter((code) => formData.countries[code]);

    const headCode = `<link rel="stylesheet" href="https://www.ppl.cz/sources/map/main.css">
    <script type="text/javascript" src="https://www.ppl.cz/sources/map/main.js" async><\/script>`;

    let bodyAttributes = '';

    if (hiddenPoints.length > 0) {
      bodyAttributes += ` data-hiddenpoints="${hiddenPoints.join(', ')}"`;
    }

    bodyAttributes += ` data-country="${formData.defaultCountry}"`;
    bodyAttributes += ` data-countries="${countries.join(', ')}"`;
    bodyAttributes += ` data-language="${formData.widgetLanguage}"`;
    bodyAttributes += ` data-mode="${formData.mapType}"`;

    if (formData.mapType === 'static') {
      const { lat, lng } = formData.coordinates;
      bodyAttributes += ` data-lat="${lat}" data-lng="${lng}"`;
    }

    const bodyCode = `<div id="ppl-parcelshop-map"${bodyAttributes}></div>`;

    let scriptCode = '';
    if (formData.mapType === 'default') {
      scriptCode = `<script>
// Standardní listener pro message události (dle ppl.cz dokumentace)
window.addEventListener('message', function(event) {
    if (event.data && event.data.event === 'pplPickupPointSelected') {
        const selectedPoint = event.data.point;
        console.log('Vybráno výdejní místo (message event):', selectedPoint);
        
        // Zde můžete přidat vlastní kód pro zpracování vybraného místa
    }
});

// Alternativní listener pro custom event 'ppl-parcelshop-map' 
document.addEventListener("ppl-parcelshop-map", function(event) {
    const detailVM = event.detail;
    console.log('Vybráno výdejní místo (custom event):', detailVM);
    
    if (detailVM) {
        // Zde máte přístup ke všem detailům výdejního místa
    }
});
<\/script>`;
    } else {
      scriptCode = `<script>
// Pro vybraný typ mapy "${formData.mapType}" není potřeba kód pro zpracování výběru výdejního místa.
<\/script>`;
    }

    setGeneratedCode({
      headCode,
      bodyCode,
      scriptCode,
    });
  };

  // Generování settingsKey tokenu
  const getSettingsKey = (): string => {
    if (!formData.custId || !formData.shopUrl) {
      return '';
    }

    const selectedCountries = Object.entries(formData.countries)
      .filter(([_, isSelected]) => isSelected)
      .map(([code]) => code);

    return generateSettingsKey({
      custId: formData.custId,
      shopUrl: formData.shopUrl,
      countries: selectedCountries,
      defaultCountry: formData.defaultCountry,
      language: formData.widgetLanguage,
    });
  };

  const goToNextStep = (): void => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep === 4) {
      generateCode();
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    trackStepNavigation(currentStep, nextStep);
  };

  const goToPrevStep = (): void => {
    const prevStep = currentStep - 1;
    const minStep = ENABLE_STEP0 ? 0 : 1;
    setCurrentStep(prevStep >= minStep ? prevStep : minStep);
    trackStepNavigation(currentStep, prevStep);
  };

  const jumpToStep = (step: number): void => {
    if (step < currentStep && validateStep(step)) {
      setCurrentStep(step);
      trackStepNavigation(currentStep, step);
    }
  };

  const handleNestedChange = (
    section: 'pickupPoints' | 'countries' | 'coordinates',
    field: string,
    value: string | boolean
  ): void => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleTopLevelChange = (field: string, value: string): void => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFormChange = (
    section: string | null,
    field: string,
    value: string | boolean
  ): void => {
    if (
      section &&
      (section === 'pickupPoints' ||
        section === 'countries' ||
        section === 'coordinates')
    ) {
      handleNestedChange(section, field, value);
    } else {
      handleTopLevelChange(field, value as string);
    }
  };

  // Automatické nastavení jazyka podle výchozí země
  useEffect(() => {
    const suggestedLanguage = countryToLanguage[formData.defaultCountry];

    if (suggestedLanguage) {
      setFormData((prev) => ({
        ...prev,
        widgetLanguage: suggestedLanguage,
      }));
    }
  }, [formData.defaultCountry]);

  useEffect(() => {
    if (formData.selectedTemplate === 'none') {
      return; // Pokud není vybrána šablona, nic neděláme
    }

    const template = productTemplates.find(
      (t) => t.id === formData.selectedTemplate
    );
    if (!template) return;

    // Vynutíme ParcelBox a odznačíme ostatní typy míst
    const newPickupPoints = {
      parcelshop: false,
      parcelbox: true,
      alzabox: false,
    };

    // Vytvoříme nový stav pro země podle pravidel šablony
    const newCountries = { ...formData.countries };

    // Projdeme všechny existující země
    Object.keys(newCountries).forEach((code) => {
      let isEnabled = true;

      if (template.allowedCountries) {
        // Pokud má šablona seznam povolených, povolíme JEN ty
        isEnabled = template.allowedCountries.includes(code);
      } else if (template.disallowedCountries) {
        // Pokud má šablona seznam zakázaných, zakážeme JEN ty
        isEnabled = !template.disallowedCountries.includes(code);
      }

      newCountries[code] = isEnabled;
    });

    // Aktualizujeme stav najednou
    setFormData((prev) => ({
      ...prev,
      pickupPoints: newPickupPoints,
      countries: newCountries,
    }));
  }, [formData.selectedTemplate]);

  const widgetConfig = useMemo(() => {
    const hiddenPoints: string[] = [];
    if (!formData.pickupPoints.parcelshop) hiddenPoints.push('ParcelShop');
    if (!formData.pickupPoints.parcelbox) hiddenPoints.push('ParcelBox');
    if (!formData.pickupPoints.alzabox) hiddenPoints.push('AlzaBox');

    // Dynamicky sestavíme seznam vybraných zemí z configu
    const countries: string[] = allCountries
      .filter((country) => ACTIVE_PHASES.includes(country.phase))
      .map((country) => country.code)
      .filter((code) => formData.countries[code]);

    return {
      defaultCountry: formData.defaultCountry,
      language: formData.widgetLanguage,
      mode: formData.mapType,
      hiddenPoints: hiddenPoints,
      countries: countries,
      lat: formData.coordinates.lat,
      lng: formData.coordinates.lng,
      shopUrl: formData.shopUrl,
    };
  }, [formData]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step0
            formData={formData}
            onChange={handleFormChange}
            onNext={goToNextStep}
            validationError={validationErrors.step0}
            translations={translations[currentLanguage]}
          />
        );
      case 1:
        return (
          <Step1
            formData={formData}
            onChange={handleFormChange}
            onNext={goToNextStep}
            validationError={validationErrors.step1}
            translations={translations[currentLanguage]}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            onChange={handleFormChange}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
            validationError={validationErrors.step2}
            translations={translations[currentLanguage]}
          />
        );
      case 3:
        const settingsKey = getSettingsKey();
        return (
          <>
            {settingsKey && (
              <SettingsKeyDisplay
                settingsKey={settingsKey}
                custId={formData.custId}
                shopUrl={formData.shopUrl}
              />
            )}
            <Step3
              formData={formData}
              onChange={handleFormChange}
              onNext={goToNextStep}
              onPrev={goToPrevStep}
              validationError={validationErrors.step3Country}
              translations={translations[currentLanguage]}
            />
          </>
        );
      case 4:
        return (
          <Step4
            formData={formData}
            onChange={handleFormChange}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
            validationError={validationErrors.step4Coords}
            translations={translations[currentLanguage]}
          />
        );
      case 5:
        return (
          <Step5
            generatedCode={generatedCode}
            onPrev={() => setCurrentStep(1)}
            onPreview={() => {
              setCurrentStep(6);
              trackEvent('User Action', 'View Preview', 'Open Preview');
            }}
            onShowHelp={setActiveHelpPopupKey}
            translations={translations[currentLanguage]}
            currentLanguage={currentLanguage}
            formData={formData}
            trackEvent={trackEvent}
          />
        );
      case 6:
        return (
          <Step6
            onPrev={() => setCurrentStep(5)}
            onReload={() =>
              trackEvent('User Action', 'Reload Preview', 'Refresh Preview')
            }
            translations={translations[currentLanguage]}
            widgetConfig={widgetConfig}
          />
        );
      default:
        return null;
    }
  };

  const helpContentMap: { [key: string]: { title: string; content: string } } =
    {
      'head-help': {
        title: translations.cs.headHelpTitle,
        content: translations.cs.headHelpContent,
      },
      'body-help': {
        title: translations.cs.bodyHelpTitle,
        content: translations.cs.bodyHelpContent,
      },
      'script-help': {
        title: translations.cs.scriptHelpTitle,
        content: translations.cs.scriptHelpContent,
      },
      'head-help-en': {
        title: translations.en.headHelpTitle,
        content: translations.en.headHelpContent,
      },
      'body-help-en': {
        title: translations.en.bodyHelpTitle,
        content: translations.en.bodyHelpContent,
      },
      'script-help-en': {
        title: translations.en.scriptHelpTitle,
        content: translations.en.scriptHelpContent,
      },
    };

  const activeHelpContent = activeHelpPopupKey
    ? helpContentMap[activeHelpPopupKey]
    : null;

  return (
    <div className="container">
      <WizardHeader translations={translations[currentLanguage]} />
      <LanguageSelector
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={ENABLE_STEP0 ? 7 : 6}
        onStepClick={jumpToStep}
        translations={translations[currentLanguage]}
      />
      {renderCurrentStep()}
      {activeHelpContent && (
        <HelpPopup
          title={activeHelpContent.title}
          content={activeHelpContent.content}
          onClose={() => setActiveHelpPopupKey(null)}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
}

export default App;
