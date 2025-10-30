import React from 'react';
import type { Translation } from '../types'; // Importujeme typ Translation

// Interface pro props
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number; // I když je to teď 6, je dobré to mít jako prop
  onStepClick: (step: number) => void;
  translations: Translation;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  onStepClick,
  translations,
}) => {
  // Generování kroků v navigaci
  const steps = [
    { number: 1, title: translations.step1 },
    { number: 2, title: translations.step2 },
    { number: 3, title: translations.step3 },
    { number: 4, title: translations.step4 },
    { number: 5, title: translations.step5 },
    { number: 6, title: translations.step6 },
  ];

  return (
    <ol className="wizard-progress">
      {steps.map((step) => (
        <li
          key={step.number}
          className={`wizard-step ${
            step.number === currentStep ? 'active' : ''
          } ${step.number < currentStep ? 'completed' : ''}`}
          data-step={step.number}
          // Povolíme kliknutí pouze na dokončené kroky
          onClick={() => (step.number < currentStep ? onStepClick(step.number) : undefined)}
          style={{ cursor: step.number < currentStep ? 'pointer' : 'default' }}
        >
          {step.title}
        </li>
      ))}
    </ol>
  );
};

export default ProgressIndicator;