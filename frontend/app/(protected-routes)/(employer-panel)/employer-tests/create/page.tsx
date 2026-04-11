"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, ChevronDown, Check } from "lucide-react";
import { QuestionSetsForm } from "@/components/employer/question-sets-form";

// ─── Zod Validation Schema for Step 1 ──────────────────────────
const basicInfoSchema = z.object({
  title: z.string().min(1, "Test title is required"),
  totalCandidates: z
    .number({ error: "Candidates count is required" })
    .min(1, "Must have at least 1 candidate"),
  totalSlots: z.string().min(1, "Please select total slots"),
  questionSet: z.string().min(1, "Please select a question set"),
  questionType: z.string().min(1, "Please select a question type"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

type BasicInfoValues = z.infer<typeof basicInfoSchema>;

// ─── Helper: Calculate duration from start/end time strings ────
function computeDuration(startTime: string, endTime: string): string {
  if (!startTime || !endTime) return "";
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  let diffMinutes = eh * 60 + em - (sh * 60 + sm);
  if (diffMinutes < 0) diffMinutes += 24 * 60; // handle overnight
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
}

export default function TestCreateEditPage() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BasicInfoValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: "",
      totalCandidates: undefined,
      totalSlots: "",
      questionSet: "",
      questionType: "",
      startTime: "",
      endTime: "",
    },
  });

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  // Computed duration derived from start/end time
  const duration = useMemo(
    () => computeDuration(startTime, endTime),
    [startTime, endTime],
  );

  // Step 1 form submit handler
  const onBasicInfoSubmit = useCallback(
    (data: BasicInfoValues) => {
      console.log("Step 1 — Basic Info:", data);
      toast.success("Basic info saved successfully!");
      setStep(2);
    },
    [],
  );

  const handleNextStep = useCallback(() => {
    if (step === 1) {
      // Trigger form validation and submit
      handleSubmit(onBasicInfoSubmit)();
    } else {
      // Step 2 final submission
      toast.success("Online test created successfully!");
      console.log("Submitting final payload...");
    }
  }, [step, handleSubmit, onBasicInfoSubmit]);

  const handlePrevStep = useCallback(() => {
    if (step === 2) {
      setStep(1);
    }
  }, [step]);

  return (
    <section className="px-4 py-6 md:px-8 md:py-8 w-full max-w-[1140px] mx-auto flex flex-col gap-6">
      {/* Top Header / Breadcrumb / Steps Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between bg-card rounded-[14px] p-5 shadow-xs gap-4">
        <div className="flex flex-col gap-6">
          <h1 className="text-[19px] font-semibold text-foreground tracking-tight">
            Manage Online Test
          </h1>

          {/* Multi-step progress tracker */}
          <div className="flex items-center gap-4">
            {/* Step 1 */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[12px] font-bold text-white shadow-xs shadow-accent/40">
                {step > 1 ? (
                  <Check className="h-3.5 w-3.5 stroke-[3px]" />
                ) : (
                  "1"
                )}
              </div>
              <span className="text-[14px] font-semibold text-accent">
                Basic Info
              </span>
            </div>

            {/* Divider Line */}
            <div className="w-12 h-px bg-border" />

            {/* Step 2 */}
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold transition-colors ${
                  step >= 2
                    ? "bg-accent text-white shadow-xs shadow-accent/40"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 2 ? (
                  <Check className="h-3.5 w-3.5 stroke-[3px]" />
                ) : (
                  "2"
                )}
              </div>
              <span
                className={`text-[14px] font-semibold transition-colors ${
                  step >= 2 ? "text-accent" : "text-muted-foreground"
                }`}
              >
                Questions Sets
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="h-9 px-5 border-border rounded-[8px] text-[13.5px] font-semibold text-foreground hover:bg-accent/5 transition-colors"
        >
          <Link href="/employer-dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      {/* Main Form Content */}
      <div className="max-w-4xl mx-auto w-full">
        {step === 1 ? (
          <div className="animate-in fade-in zoom-in-95 duration-300 bg-card rounded-[12px] p-6 sm:p-7 flex flex-col shadow-xs">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[17px] font-bold text-foreground tracking-tight">
                Basic Information
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(onBasicInfoSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Row 1 - Title */}
              <div>
                <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                  Online Test Title{" "}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input
                  placeholder="Enter online test title"
                  className={`h-[46px] rounded-[8px] border-[1.5px] text-[14px] text-foreground placeholder:text-muted-foreground focus-visible:ring-offset-0 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 ${
                    errors.title ? "border-destructive" : "border-border"
                  }`}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Row 2 - Candidates & Slots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                    Total Candidates{" "}
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter total candidates"
                    className={`h-[46px] rounded-[8px] border-[1.5px] text-[14px] text-foreground placeholder:text-muted-foreground focus-visible:ring-offset-0 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 ${
                      errors.totalCandidates
                        ? "border-destructive"
                        : "border-border"
                    }`}
                    {...register("totalCandidates", { valueAsNumber: true })}
                  />
                  {errors.totalCandidates && (
                    <p className="text-xs text-destructive mt-1.5">
                      {errors.totalCandidates.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                    Total Slots{" "}
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Controller
                      name="totalSlots"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`h-[46px] w-full appearance-none rounded-[8px] border-[1.5px] bg-transparent px-4 pr-10 text-[14px] text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 ${
                            errors.totalSlots
                              ? "border-destructive"
                              : "border-border"
                          }`}
                        >
                          <option value="" disabled hidden>
                            Select total slots
                          </option>
                          <option value="1">1 Selection</option>
                          <option value="2">2 Selections</option>
                          <option value="3">3 Selections</option>
                        </select>
                      )}
                    />
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none" />
                  </div>
                  {errors.totalSlots && (
                    <p className="text-xs text-destructive mt-1.5">
                      {errors.totalSlots.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3 - Question Sets & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                    Total Question Set{" "}
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Controller
                      name="questionSet"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`h-[46px] w-full appearance-none rounded-[8px] border-[1.5px] bg-transparent px-4 pr-10 text-[14px] text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 ${
                            errors.questionSet
                              ? "border-destructive"
                              : "border-border"
                          }`}
                        >
                          <option value="" disabled hidden>
                            Select total question set
                          </option>
                          <option value="set-1">Set 1</option>
                          <option value="set-2">Set 2</option>
                          <option value="set-3">Set 3</option>
                        </select>
                      )}
                    />
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none" />
                  </div>
                  {errors.questionSet && (
                    <p className="text-xs text-destructive mt-1.5">
                      {errors.questionSet.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                    Question Type{" "}
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Controller
                      name="questionType"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`h-[46px] w-full appearance-none rounded-[8px] border-[1.5px] bg-transparent px-4 pr-10 text-[14px] text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 ${
                            errors.questionType
                              ? "border-destructive"
                              : "border-border"
                          }`}
                        >
                          <option value="" disabled hidden>
                            Select question type
                          </option>
                          <option value="mcq">Multiple Choice Questions</option>
                          <option value="coding">Coding Assessment</option>
                        </select>
                      )}
                    />
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none" />
                  </div>
                  {errors.questionType && (
                    <p className="text-xs text-destructive mt-1.5">
                      {errors.questionType.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4 - Timers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                    Start Time{" "}
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="time"
                      placeholder="Enter start time"
                      className={`h-[46px] rounded-[8px] border-[1.5px] text-[14px] text-foreground placeholder:text-muted-foreground pr-10 w-full relative z-10 bg-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 ${
                        errors.startTime
                          ? "border-destructive"
                          : "border-border"
                      }`}
                      {...register("startTime")}
                    />
                    <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none z-0" />
                  </div>
                  {errors.startTime && (
                    <p className="text-xs text-destructive mt-1.5">
                      {errors.startTime.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                    End Time{" "}
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="time"
                      placeholder="Enter end time"
                      className={`h-[46px] rounded-[8px] border-[1.5px] text-[14px] text-foreground placeholder:text-muted-foreground pr-10 w-full relative z-10 bg-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 ${
                        errors.endTime
                          ? "border-destructive"
                          : "border-border"
                      }`}
                      {...register("endTime")}
                    />
                    <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none z-0" />
                  </div>
                  {errors.endTime && (
                    <p className="text-xs text-destructive mt-1.5">
                      {errors.endTime.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                    Duration
                  </Label>
                  <Input
                    placeholder="Duration Time"
                    disabled
                    value={duration}
                    className="h-[46px] rounded-[8px] border-[1.5px] border-border bg-muted/50 text-[14px] text-muted-foreground placeholder:text-muted-foreground/70 cursor-not-allowed focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                  />
                </div>
              </div>
            </form>
          </div>
        ) : (
          <QuestionSetsForm />
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="flex items-center justify-between bg-card rounded-[16px] p-5 shadow-xs mt-2 max-w-4xl mx-auto w-full">
        {step === 1 ? (
          <Link href="/employer-dashboard">
            <Button
              variant="outline"
              className="h-[46px] px-10 rounded-[10px] border-[1.5px] border-border text-[14.5px] font-semibold text-foreground hover:bg-accent/5 transition-colors"
            >
              Cancel
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            onClick={handlePrevStep}
            className="h-[46px] px-10 rounded-[10px] border-[1.5px] border-border text-[14.5px] font-semibold text-foreground hover:bg-accent/5 transition-colors"
          >
            Back
          </Button>
        )}

        <Button
          onClick={handleNextStep}
          className="h-[46px] px-8 rounded-[10px] bg-accent hover:bg-accent/90 text-white text-[14.5px] font-semibold transition-colors"
        >
          {step === 1 ? "Save & Continue" : "Submit"}
        </Button>
      </div>
    </section>
  );
}
