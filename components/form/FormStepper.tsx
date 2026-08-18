// components/form/FormStepper.tsx
"use client";

import React from "react";
import { Check } from "lucide-react";

interface FormStepperProps {
  currentStep: 1 | 2 | 3;
}

export const FormStepper: React.FC<FormStepperProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: "Identité" },
    { number: 2, title: "Places & Billet" },
    { number: 3, title: "Confirmation" },
  ];

  return (
    <div className="flex items-center justify-between w-full relative">
      {/* Ligne connectrice de fond */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#0B1B33]/20 -translate-y-1/2 z-0" />

      {steps.map((step) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-xs border-2 border-[#0B1B33] flex items-center justify-center font-black text-sm transition-all ${
                isCompleted
                  ? "bg-[#556B2F] text-white shadow-[2px_2px_0px_0px_#0B1B33]"
                  : isActive
                  ? "bg-[#FEF08A] text-[#0B1B33] shadow-[3px_3px_0px_0px_#0B1B33] scale-110"
                  : "bg-white text-gray-400"
              }`}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : step.number}
            </div>
            <span className="text-[10px] font-mono font-bold uppercase mt-2 text-[#0B1B33]">
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};