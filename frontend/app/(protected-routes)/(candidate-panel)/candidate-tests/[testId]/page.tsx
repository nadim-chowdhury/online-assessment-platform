"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RichEditor } from "@/components/employer/question-sets-form";

const demoQuestions = [
  {
    id: 1,
    type: "radio",
    text: "Q1. Which of the following indicators is used to measure market volatility?",
    options: [
      "Relative Strength Index (RSI)",
      "Moving Average Convergence Divergence (MACD)",
      "Bollinger Bands",
      "Fibonacci Retracement",
    ],
  },
  {
    id: 2,
    type: "checkbox",
    text: "Q2. Which of the following are server-side Next.js features? (Select multiple)",
    options: [
      "Server Components",
      "Server Actions",
      "useEffect standard fetching",
      "Static Site Generation (SSG)",
    ],
  },
  {
    id: 3,
    type: "text",
    text: "Q3. Describe the strategic difference between monolithic and microservice scaling architectures.",
    options: [],
  },
];

export default function CandidateTestDetailsPage() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeQuestion = demoQuestions[currentIdx];

  const handleNext = () => {
    if (currentIdx < demoQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentIdx < demoQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  return (
    <section className="px-4 py-6 md:px-8 md:py-8 w-full max-w-5xl mx-auto flex flex-col gap-5 my-4">
      {/* Top Bar / Header */}
      <div className="bg-card border border-border/80 rounded-[12px] p-5 flex items-center justify-between shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
        <h2 className="text-[17px] font-bold text-slate-700 tracking-tight">
          Question ({activeQuestion.id}/{demoQuestions.length})
        </h2>
        <div className="bg-slate-100/80 px-7 py-2.5 rounded-[10px]">
          <span className="text-[14.5px] font-bold text-slate-700">
            20:31 left
          </span>
        </div>
      </div>

      {/* Main Content Body Card */}
      <div className="bg-card border border-border/80 rounded-[12px] p-7 md:p-8 flex flex-col shadow-[0px_2px_4px_rgba(0,0,0,0.02)] min-h-[440px]">
        {/* Question Text */}
        <h3 className="text-[16px] font-bold text-slate-700 mb-8 leading-snug tracking-tight">
          {activeQuestion.text}
        </h3>

        {/* Dynamic Options Body */}
        <div className="flex-1 flex flex-col gap-3.5 mb-11">
          {activeQuestion.type === "text" ? (
            <div className="mt-2 animate-in fade-in duration-300">
              <RichEditor minHeight="220px" />
            </div>
          ) : (
            activeQuestion.options.map((opt, i) => (
              <label
                key={i}
                className="flex items-center gap-4 p-4 border border-border/60 rounded-[8px] cursor-pointer hover:bg-slate-50 transition-colors animate-in fade-in duration-300"
              >
                <input
                  type={activeQuestion.type}
                  name={`q-${activeQuestion.id}`}
                  className={`w-[17px] h-[17px] text-accent focus:ring-accent border-slate-300 ${activeQuestion.type === "checkbox" ? "rounded-[4px]" : "rounded-full"}`}
                />
                <span className="text-[14.5px] text-slate-600 font-medium tracking-tight">
                  {opt}
                </span>
              </label>
            ))
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            onClick={handleSkip}
            disabled={currentIdx === demoQuestions.length - 1}
            className="h-[46px] px-6 rounded-[8px] border-slate-200 text-slate-600 font-bold text-[14px] hover:bg-slate-50 shadow-none transition-colors disabled:opacity-50"
          >
            Skip this Question
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentIdx === demoQuestions.length - 1}
            className="h-[46px] px-8 rounded-[8px] bg-[#673FED] hover:bg-[#5A35DB] text-white font-bold text-[14px] shadow-xs transition-colors disabled:opacity-50"
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </section>
  );
}
