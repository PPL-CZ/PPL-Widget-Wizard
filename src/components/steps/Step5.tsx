import React, { useState } from 'react';
import type { Translation, WizardFormData } from '../../types';

interface Step5Props {
  generatedCode: {
    headCode: string;
    bodyCode: string;
    scriptCode: string;
  };
  onPrev: () => void;
  onPreview: () => void;
  onShowHelp: (popup: string) => void;
  translations: Translation;
  currentLanguage: string;
  formData: WizardFormData;
  trackEvent: (category: string, action: string, label?: string) => void;
}

const Step5: React.FC<Step5Props> = ({
  generatedCode,
  onPrev,
  onPreview,
  onShowHelp,
  translations,
  currentLanguage
}) => {

  const [copiedStatus, setCopiedStatus] = useState<{
    head: boolean;
    body: boolean;
    script: boolean;
  }>({
    head: false,
    body: false,
    script: false,
  });

  const copyToClipboard = (text: string, type: 'head' | 'body' | 'script') => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedStatus((prev) => ({ ...prev, [type]: true }));
        setTimeout(() => {
          setCopiedStatus((prev) => ({ ...prev, [type]: false }));
        }, 2000);
      })
      .catch((err) => {
        console.error('Kopírování do schránky selhalo: ', err);
        alert('Kopírování do schránky selhalo. Zkopírujte kód ručně.'); // Fallback
      });
  };

  const downloadFullCode = () => {
    const fullHtmlCode = `<!DOCTYPE html>
<html lang="${currentLanguage}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PPL Widget - Ukázka implementace</title>
    ${generatedCode.headCode}
    <style>
        body { font-family: 'Roboto', sans-serif; padding: 20px; margin: 0; background-color: #f8f9fa; }
        .widget-container {
            width: 100%;
            max-width: 1100px; /* Max šířka jako u wizardu */
            height: 600px; /* Výchozí výška pro widget */
            border: 1px solid #ccc;
            margin: 20px auto; /* Centrování */
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        h1 { color: #00519e; text-align: center; margin-bottom: 30px; }
    </style>
</head>
<body>
    <h1>Ukázka implementace PPL Widgetu</h1>
    <div class="widget-container">
        ${generatedCode.bodyCode}
    </div>
    ${generatedCode.scriptCode}
</body>
</html>`;
    const blob = new Blob([fullHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ppl-widget-implementace.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="wizard-content" id="step5">
      <h2 className="step-title">{translations.step5Title}</h2>
      <p className="description">{translations.step5Description}</p>

      <div className="result-container">
        {/* Kód Hlavičky */}
        <h3>{translations.headCodeTitle}</h3>
        <div className="code-block" id="head-code">
          {generatedCode.headCode}
        </div>
        <div className="buttons-container">
          <button
            className="copy-button"
            onClick={() => copyToClipboard(generatedCode.headCode, 'head')}
            disabled={copiedStatus.head}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>
              {copiedStatus.head 
                ? translations.copied
                : translations.copyHead}
            </span>
          </button>
          <button
            className="info-button"
            onClick={() => onShowHelp(currentLanguage === 'cs' ? 'head-help' : 'head-help-en')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>{translations.helpButton}</span>
          </button>
        </div>

        {/* Kód Těla */}
        <h3>{translations.bodyCodeTitle}</h3>
        <div className="code-block" id="body-code">
          {generatedCode.bodyCode}
        </div>
        <div className="buttons-container">
          <button
            className="copy-button"
            onClick={() => copyToClipboard(generatedCode.bodyCode, 'body')}
            disabled={copiedStatus.body}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>
              {copiedStatus.body
                ? translations.copied
                : translations.copyBody}
            </span>
          </button>
          <button
            className="info-button"
            onClick={() => onShowHelp(currentLanguage === 'cs' ? 'body-help' : 'body-help-en')} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>{translations.helpButton}</span>
          </button>
        </div>

        {/* JavaScript Kód */}
        <h3>{translations.scriptCodeTitle}</h3>
        <div className="code-block" id="script-code">
          {generatedCode.scriptCode}
        </div>
        <div className="buttons-container">
          <button
            className="copy-button"
            onClick={() => copyToClipboard(generatedCode.scriptCode, 'script')}
            disabled={copiedStatus.script}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>
              {copiedStatus.script
                ? translations.copied
                : translations.copyScript}
            </span>
          </button>
          <button
            className="info-button"
            onClick={() => onShowHelp(currentLanguage === 'cs' ? 'script-help' : 'script-help-en')} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>{translations.helpButton}</span>
          </button>
        </div>

        <p className="description">
          <strong>{translations.noteSizeTitle}</strong>
          {/* Vložení HTML textu poznámky. Ujistěte se, že text je bezpečný. */}
          <span
            dangerouslySetInnerHTML={{
              __html: ' ' + translations.noteSizeText,
            }}
          ></span>
        </p>
      </div>

      <div className="button-group">
        <button className="prev" id="step5-prev" onClick={onPrev}>
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
          <span>{translations.changeSettings}</span>
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          {' '}
          {/* Obal pro tlačítka vpravo */}
          <button
            className="generate"
            id="download-code"
            onClick={downloadFullCode}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>{translations.download}</span>
          </button>
          <button className="next" id="go-to-preview" onClick={onPreview}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{translations.preview}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5;
