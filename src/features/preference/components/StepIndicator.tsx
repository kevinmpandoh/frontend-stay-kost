import React from "react";

type StepIndicatorProps = {
  steps: string[];
  step: number;
};

export default function StepIndicator({ steps, step }: StepIndicatorProps) {
  return (
    <ol className="flex w-full items-center text-xs font-medium text-gray-900 sm:text-base">
      {steps.map((label, index) => (
        <li
          key={index}
          className={`relative flex ${
            step > index
              ? "w-full text-indigo-600 after:absolute after:top-3 after:left-4 after:inline-block after:h-0.5 after:w-full after:bg-indigo-600 after:content-[''] lg:after:top-5"
              : step === index && index !== 4
                ? "w-full text-gray-900 after:absolute after:top-3 after:left-4 after:inline-block after:h-0.5 after:w-full after:bg-gray-200 after:content-[''] lg:after:top-5"
                : index === 4
                  ? "relative flex text-gray-900"
                  : "w-full text-gray-900 after:absolute after:top-3 after:left-4 after:inline-block after:h-0.5 after:w-full after:bg-gray-200 after:content-[''] lg:after:top-5"
          }`}
        >
          <div className="z-10 block whitespace-nowrap">
            <span
              className={`h-6 w-6 ${
                step > index
                  ? "border-2 border-transparent bg-indigo-600 text-white"
                  : step === index
                    ? "border-2 border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-2 border-gray-200 bg-gray-50 text-gray-500"
              } mx-auto mb-3 flex items-center justify-center rounded-full text-sm lg:h-10 lg:w-10`}
            >
              {index + 1}
            </span>
            {label}
          </div>
        </li>
      ))}
    </ol>
  );
}
