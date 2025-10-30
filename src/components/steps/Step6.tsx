// src/components/steps/Step6.tsx

import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { Translation } from '../../types';

interface WidgetConfig {
  defaultCountry: string;
  language: string;
  mode: 'default' | 'static' | 'catalog';
  hiddenPoints: string[];
  countries: string[];
  lat?: string;
  lng?: string;
  shopUrl?: string;
}

interface Step6Props {
  onPrev: () => void;
  onReload: () => void;
  widgetConfig: WidgetConfig; 
  translations: Translation;
}


const Step6: React.FC<Step6Props> = ({
  // formData, // ODEBRÁNO
  onPrev,
  // onReload, // ODEBRÁNO
  widgetConfig,
  translations
}) => {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const pplScriptRef = useRef<HTMLScriptElement | null>(null);
  const widgetHostRef = useRef<HTMLDivElement | null>(null); // Div, který my vytvoříme pro PPL widget

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedVmDetail, setSelectedVmDetail] = useState<any>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  const cleanupPplAssets = useCallback(() => {
    if (pplScriptRef.current) {
      if (pplScriptRef.current.parentNode) {
        pplScriptRef.current.parentNode.removeChild(pplScriptRef.current);
      }
      pplScriptRef.current = null;
    }
    if (widgetHostRef.current && widgetHostRef.current.parentNode) {
      widgetHostRef.current.parentNode.removeChild(widgetHostRef.current);
    }
    widgetHostRef.current = null;
    // CSS link můžeme nechat, protože se jeho URL nemění a může být sdílen.
    // Pokud by i CSS způsobovalo problémy, přidali bychom i jeho odstranění.
  }, []); // Prázdné pole závislostí, protože pracuje jen s refs

  const loadPplWidget = useCallback(() => {
    if (!previewContainerRef.current) {
      console.warn(
        'Step6 loadPplWidget: Preview container is not yet available. Aborting.'
      );
      setIsLoading(true); // Udržíme spinner, pokud by se toto stalo
      setLoadError('Chyba: Kontejner pro náhled není připraven.');
      return;
    }

    setIsLoading(true);
    setLoadError(null);
    setSelectedVmDetail(null);
    setShowDetailPanel(false);

    cleanupPplAssets(); // Nejprve vyčistíme předchozí instanci

    // Vytvoření hostitelského divu pro PPL widget
    const hostElement = document.createElement('div');
    // POUŽIJEME ID, KTERÉ PPL SKRIPT S NEJVĚTŠÍ PRAVDĚPODOBNOSTÍ HLEDÁ JAKO VÝCHOZÍ
    hostElement.id = 'ppl-parcelshop-map';
    widgetHostRef.current = hostElement; // Uložíme referenci

    // Nastavení data atributů s fallbacky pro zajištění jejich existence
    hostElement.setAttribute(
      'data-country',
      widgetConfig.defaultCountry || 'cz'
    );
    hostElement.setAttribute('data-language', widgetConfig.language || 'cs');
    hostElement.setAttribute('data-mode', widgetConfig.mode || 'default');

    const hiddenPoints = widgetConfig.hiddenPoints || [];
    hostElement.setAttribute('data-hiddenpoints', hiddenPoints.join(','));

    const countries =
      widgetConfig.countries && widgetConfig.countries.length > 0
        ? widgetConfig.countries
        : [widgetConfig.defaultCountry || 'cz'];
    hostElement.setAttribute('data-countries', countries.join(','));

    if (widgetConfig.mode === 'static') {
      hostElement.setAttribute('data-lat', widgetConfig.lat || '');
      hostElement.setAttribute('data-lng', widgetConfig.lng || '');
    }

    // Přidání hostitelského divu do našeho kontejneru
    previewContainerRef.current.appendChild(hostElement);

    // Načtení PPL CSS, pokud ještě není na stránce
    if (!document.getElementById('ppl-widget-css-preview-link')) {
      const cssLink = document.createElement('link');
      cssLink.id = 'ppl-widget-css-preview-link';
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://www.ppl.cz/sources/map/main.css';
      document.head.appendChild(cssLink);
    }

    // Vytvoření a přidání PPL skriptu
    const script = document.createElement('script');
    script.id = 'ppl-widget-js-preview-script'; // Unikátní ID pro případné odstranění
    script.src = `https://www.ppl.cz/sources/map/main.js?v=${new Date().getTime()}`; // Cache busting
    script.async = true;

    script.onload = () => {
      setIsLoading(false);
      // Pokus o explicitní inicializaci, pokud je dostupná
      if (typeof (window as any).PPL?.initMap === 'function') {
        try {
          (window as any).PPL.initMap(); // Můžete zkusit i (window as any).PPL.initMap('ppl-parcelshop-map');
        } catch (e) {
          console.error('Step6 Error calling window.PPL.initMap():', e);
        }
      } else {
          }
    };
    script.onerror = (errorEvent) => {
      console.error(
        'Step6 PPL Widget script FAILED to load (e.g., network error):',
        errorEvent
      );
      setIsLoading(false);
      setLoadError('Chyba při načítání skriptu PPL widgetu.');
    };

    document.body.appendChild(script);
    pplScriptRef.current = script;
  }, [widgetConfig, cleanupPplAssets]); // Závislost na widgetConfig a stabilní cleanupPplAssets

  useEffect(() => {
    const handleWidgetData = (event: Event) => { // ZMĚNA: Typ parametru je nyní obecný 'Event'
      let data;

      // Logika pro rozlišení typu události zůstává, jen přidáme přetypování,
      // abychom mohli bezpečně přistupovat k vlastnostem 'data' a 'detail'.
      if ('data' in event && 'origin' in event) {
        // Toto je MessageEvent
        data = (event as MessageEvent).data;
      } else if ('detail' in event) {
        // Toto je CustomEvent
        data = (event as CustomEvent).detail;
      }

      if (
        data &&
        (data.event === 'pplPickupPointSelected' ||
          (event.type === 'ppl-parcelshop-map' && data))
      ) {
        const pointData = data.point || data;
        setSelectedVmDetail(pointData);
        setShowDetailPanel(true);
      }
    };

    window.addEventListener('message', handleWidgetData);
    document.addEventListener('ppl-parcelshop-map', handleWidgetData); // Nyní je to typově správně

    // Načteme widget, pokud máme konfiguraci. `widgetConfig` by měl být stabilní díky `useMemo` v App.tsx.
    if (widgetConfig && widgetConfig.defaultCountry) {
      // OPRAVA: Přidáme prodlevu 1s pro správnou inicializaci
      const timer = setTimeout(() => {
        loadPplWidget();
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        cleanupPplAssets();
        window.removeEventListener('message', handleWidgetData);
        document.removeEventListener('ppl-parcelshop-map', handleWidgetData);
      };
    } else {
      console.warn(
        'Step6 useEffect [widgetConfig]: Skipping loadPplWidget due to incomplete/missing widgetConfig.',
        widgetConfig
      );
      setIsLoading(false); // Aby nezůstal viset spinner
      setLoadError('Konfigurace pro náhled není kompletní.');
    }

    return () => {
      cleanupPplAssets();
      window.removeEventListener('message', handleWidgetData);
      document.removeEventListener('ppl-parcelshop-map', handleWidgetData); // I zde je to nyní správně
    };
  }, [widgetConfig, loadPplWidget, cleanupPplAssets]);

  const formatOpeningHours = (hours: any): string => {
    if (!hours) return 'N/A';
    if (Array.isArray(hours)) return hours.join('<br />');
    if (typeof hours === 'object' && hours !== null) {
      // Kontrola na null pro jistotu
      return Object.entries(hours)
        .map(([day, time]) => `${day}: ${time}`)
        .join('<br />');
    }
    return String(hours);
  };

  return (
    <div className="wizard-content" id="step6">
      <div
        className="button-group"
        style={{
          marginTop: 0,
          marginBottom: '20px',
          justifyContent: 'flex-start',
          gap: '10px',
        }}
      >
        <button className="prev" id="step6-prev" onClick={onPrev}>
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
        <button
          className="next"
          id="step6-reload"
          onClick={loadPplWidget}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          <span>{translations.reloadPreview}</span>
        </button>
      </div>

      <h2 className="step-title">{translations.step6Title}</h2>
      <p className="description">{translations.step6Description}</p>

      {loadError && (
        <div
          className="validation-message active"
          style={{ marginBottom: '15px' }}
        >
          {loadError}
        </div>
      )}

      <div
        id="mapa-a-detaily-wrapper"
        style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
      >
        <div
          ref={previewContainerRef}
          id="preview-container-pro-react"
          style={{
            flex: showDetailPanel && selectedVmDetail ? 3 : 1,
            width:
              showDetailPanel && selectedVmDetail
                ? 'calc(100% - 280px - 20px)'
                : '100%',
            height: '600px',
            minHeight: '550px',
            border: '1px solid var(--ppl-medium-gray)',
            borderRadius: 'var(--border-radius)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {isLoading && (
            <div
              className="spinner active"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
            ></div>
          )}
          
          {/* Vodoznak s URL */}
          {widgetConfig.shopUrl && (
            <div
              style={{
                position: 'absolute',
                bottom: '5px',
                left: '5px',
                fontSize: '10px',
                color: 'rgba(0, 0, 0, 0.3)',
                fontFamily: 'monospace',
                pointerEvents: 'none',
                zIndex: 1000,
              }}
            >
              {widgetConfig.shopUrl}
            </div>
            )}
          </div>
        {showDetailPanel && selectedVmDetail && (
          <div
            id="vybrane-vm-detail"
            style={{
              flexShrink: 0,
              width: '280px', // Šířka panelu
              padding: '15px',
              border: '1px solid var(--ppl-medium-gray)',
              borderRadius: 'var(--border-radius)',
              backgroundColor: '#f9f9f9',
              position: 'relative',
              maxHeight: '600px',
              overflowY: 'auto',
            }}
          >
            <button
              id="zavrit-detaily-btn"
              title="Zavřít detaily"
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                fontSize: '22px',
                lineHeight: 1,
                color: '#777',
                padding: '2px 5px',
              }}
              onClick={() => setShowDetailPanel(false)}
            >
              &times;
            </button>
            <h3>{translations.vmDetailTitle || 'Detail vybraného místa:'}</h3>
            <p>
              <strong>{translations.vmType || 'Typ:'}</strong>{' '}
              <span>
                {selectedVmDetail.accessPointType ||
                  selectedVmDetail.type ||
                  'N/A'}
              </span>
            </p>
            <p>
              <strong>{translations.vmCode || 'Kód:'}</strong>{' '}
              <span>
                {selectedVmDetail.code || selectedVmDetail.id || 'N/A'}
              </span>
            </p>
            <p>
              <strong>{translations.vmName || 'Název:'}</strong>{' '}
              <span>{selectedVmDetail.name || 'N/A'}</span>
            </p>
            <p>
              <strong>{translations.vmAddress || 'Adresa:'}</strong>{' '}
              <span>
                {`${selectedVmDetail.street || ''}${
                  selectedVmDetail.street &&
                  (selectedVmDetail.city || selectedVmDetail.zipCode)
                    ? ', '
                    : ''
                }${selectedVmDetail.city || ''} ${
                  selectedVmDetail.zipCode || selectedVmDetail.zip || ''
                }`
                  .replace(/^, |, $/g, '')
                  .trim() || 'N/A'}
              </span>
            </p>
            <p>
              <strong>{translations.vmCardPayment || 'Platba kartou:'}</strong>{' '}
              <span>
                {/* Vylepšená kontrola pro platbu kartou, PPL widget může vracet různé formáty */}
                {typeof selectedVmDetail.activeCardPayment === 'boolean'
                  ? selectedVmDetail.activeCardPayment
                    ? 'Ano'
                    : 'Ne'
                  : Array.isArray(selectedVmDetail.paymentMethods) &&
                    selectedVmDetail.paymentMethods.some(
                      (pm: any) =>
                        typeof pm === 'string' &&
                        pm.toLowerCase().includes('card')
                    )
                  ? 'Ano'
                  : 'N/A'}
              </span>
            </p>
            <p>
              <strong>
                {translations.vmOpeningHours || 'Otevírací doba:'}
              </strong>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: formatOpeningHours(
                  selectedVmDetail.openHours || selectedVmDetail.openingHours
                ),
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6;
