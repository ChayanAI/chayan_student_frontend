import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

const steps = [
  { name: 'Personal Information', description: 'Vitae sed mi luctus laoreet.', status: 'complete' },
  { name: 'Academics', description: 'Cursus semper viverra facilisis et et.', status: 'current' },
  { name: 'Professional Goals', description: 'Penatibus eu quis ante.', status: 'upcoming' },
  { name: 'Skill Assessment', description: 'Faucibus nec enim leo et.', status: 'upcoming' },
  { name: 'Internships', description: 'Iusto et officia maiores porro ad non quas.', status: 'upcoming' },
  { name: 'Projects', description: 'Iusto et officia maiores porro ad non quas.', status: 'upcoming' },
  { name: 'Volunteer Experience', description: 'Iusto et officia maiores porro ad non quas.', status: 'upcoming' },
  { name: 'Extra-Curricular Activities', description: 'Iusto et officia maiores porro ad non quas.', status: 'upcoming' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProgressBar = ({ currentStep, onStepClick }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
            {stepIdx < currentStep ? (
              <>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-blue-600" aria-hidden="true" />
                )}
                <button onClick={() => onStepClick(stepIdx)} className="group relative flex items-start">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800">
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{step.name}</span>
                    
                  </span>
                </button>
              </>
            ) : stepIdx === currentStep ? (
              <>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                )}
                <button onClick={() => onStepClick(stepIdx)} className="group relative flex items-start" aria-current="step">
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    </span>
                  </span>
                  <span className="ml-4 flex text-left min-w-0 flex-col">
                    <span className="text-sm font-bold text-blue-700 lg:text-xl">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </button>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                )}
                <button onClick={() => onStepClick(stepIdx)} className="group relative flex items-start">
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-500">{step.name}</span>
                  </span>
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ProgressBar;
