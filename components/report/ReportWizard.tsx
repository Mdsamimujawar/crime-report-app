"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReportForm } from "./ReportForm";
import { ReportSubmitted } from "./ReportFormCompleted";

const steps = [
  { id: 1, title: "Report Details" },
  { id: 2, title: "Confirmation" },
];

export function ReportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<any>(null);

  const handleStepComplete = async (data: any) => {
    setReportData({ ...reportData, ...data });
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
      {/* Stepper Progress */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center w-full">
              {/* Step Circle */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-sky-500 bg-sky-500/20 text-sky-400"
                    : isCompleted
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                    : "border-neutral-700 bg-neutral-800 text-neutral-500"
                }`}
              >
                {step.id}
              </div>

              {/* Step Title */}
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    isActive
                      ? "text-white"
                      : isCompleted
                      ? "text-emerald-400"
                      : "text-neutral-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? "bg-emerald-500" : "bg-neutral-800"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && <ReportForm onComplete={handleStepComplete} />}
          {currentStep === 2 && (
            <ReportSubmitted data={reportData} onComplete={handleStepComplete} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}