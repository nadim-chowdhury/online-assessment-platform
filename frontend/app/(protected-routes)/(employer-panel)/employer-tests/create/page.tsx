"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, ChevronDown, Pencil } from "lucide-react";

export default function TestCreateEditPage() {
  const searchParams = useSearchParams();
  console.log("🚀 ~ searchParams:", searchParams);
  const isCreateMode = searchParams.get("testId") === "create";

  const [isEditing, setIsEditing] = useState(isCreateMode);

  return (
    <section className="px-4 py-6 md:px-8 md:py-8 w-full max-w-[1140px] mx-auto flex flex-col gap-6">
      {/* Top Header / Breadcrumb / Steps Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between bg-card border border-border rounded-[14px] p-5 shadow-xs gap-4">
        <div className="flex flex-col gap-6">
          <h1 className="text-[19px] font-semibold text-foreground tracking-tight">
            Manage Online Test
          </h1>

          {/* Multi-step progress tracker */}
          <div className="flex items-center gap-4">
            {/* Step 1 */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[12px] font-bold text-white shadow-xs shadow-accent/40">
                1
              </div>
              <span className="text-[14px] font-semibold text-accent">
                Basic Info
              </span>
            </div>

            {/* Divider Line */}
            <div className="w-12 h-px bg-border" />

            {/* Step 2 */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[12px] font-bold text-muted-foreground">
                2
              </div>
              <span className="text-[14px] font-semibold text-muted-foreground">
                Questions
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

      {/* Main Form/View Content */}
      <div className="bg-card border border-border rounded-[16px] p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[17px] font-bold text-foreground tracking-tight">
            Basic Information
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 text-[14px] font-medium text-accent hover:opacity-80 transition-opacity"
            >
              <Pencil className="h-[14px] w-[14px]" />
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form className="flex flex-col gap-6 animate-in fade-in duration-300">
            {/* Row 1 - Title */}
            <div>
              <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                Online Test Title{" "}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                placeholder="Enter online test title"
                className="h-[46px] rounded-[8px] border-[1.5px] border-border text-[14px] text-foreground placeholder:text-muted-foreground focus-visible:ring-offset-0 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
              />
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
                  className="h-[46px] rounded-[8px] border-[1.5px] border-border text-[14px] text-foreground placeholder:text-muted-foreground focus-visible:ring-offset-0 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                />
              </div>
              <div>
                <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                  Total Slots <span className="text-destructive ml-1">*</span>
                </Label>
                <div className="relative">
                  <select
                    defaultValue=""
                    className="h-[46px] w-full appearance-none rounded-[8px] border-[1.5px] border-border bg-transparent px-4 pr-10 text-[14px] text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                  >
                    <option value="" disabled hidden>
                      Select total slots
                    </option>
                    <option value="1">1 Selection</option>
                    <option value="2">2 Selections</option>
                    <option value="3">3 Selections</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none" />
                </div>
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
                  <select
                    defaultValue=""
                    className="h-[46px] w-full appearance-none rounded-[8px] border-[1.5px] border-border bg-transparent px-4 pr-10 text-[14px] text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                  >
                    <option value="" disabled hidden>
                      Select total question set
                    </option>
                    <option value="set-1">Set 1</option>
                    <option value="set-2">Set 2</option>
                    <option value="set-3">Set 3</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none" />
                </div>
              </div>
              <div>
                <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                  Question Type <span className="text-destructive ml-1">*</span>
                </Label>
                <div className="relative">
                  <select
                    defaultValue=""
                    className="h-[46px] w-full appearance-none rounded-[8px] border-[1.5px] border-border bg-transparent px-4 pr-10 text-[14px] text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                  >
                    <option value="" disabled hidden>
                      Select question type
                    </option>
                    <option value="mcq">Multiple Choice Questions</option>
                    <option value="coding">Coding Assessment</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 4 - Timers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                  Start Time <span className="text-destructive ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="time"
                    placeholder="Enter start time"
                    className="h-[46px] rounded-[8px] border-[1.5px] border-border text-[14px] text-foreground placeholder:text-muted-foreground pr-10 w-full relative z-10 bg-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                  />
                  <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none z-0" />
                </div>
              </div>

              <div>
                <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                  End Time <span className="text-destructive ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="time"
                    placeholder="Enter end time"
                    className="h-[46px] rounded-[8px] border-[1.5px] border-border text-[14px] text-foreground placeholder:text-muted-foreground pr-10 w-full relative z-10 bg-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                  />
                  <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none z-0" />
                </div>
              </div>

              <div>
                <Label className="text-[14px] font-semibold text-foreground mb-2 flex pb-[2px]">
                  Duration
                </Label>
                <Input
                  placeholder="Duration Time"
                  disabled
                  className="h-[46px] rounded-[8px] border-[1.5px] border-border bg-muted/50 text-[14px] text-muted-foreground placeholder:text-muted-foreground/70 cursor-not-allowed focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            {/* View Mode Fields */}
            {/* Row 1 */}
            <div>
              <p className="text-[13px] font-medium text-muted-foreground mb-2">
                Online Test Title
              </p>
              <p className="text-[14.5px] font-semibold text-foreground">
                Psychometric Test for Management Trainee Officer
              </p>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-[13px] font-medium text-muted-foreground mb-2">
                  Total Candidates
                </p>
                <p className="text-[14.5px] font-semibold text-foreground">
                  10,000
                </p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-muted-foreground mb-2">
                  Total Slots
                </p>
                <p className="text-[14.5px] font-semibold text-foreground">3</p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-muted-foreground mb-2">
                  Total Question Set
                </p>
                <p className="text-[14.5px] font-semibold text-foreground">2</p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-muted-foreground mb-2">
                  Duration Per Slots (Minutes)
                </p>
                <p className="text-[14.5px] font-semibold text-foreground">
                  30
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div>
              <p className="text-[13px] font-medium text-muted-foreground mb-2">
                Question Type
              </p>
              <p className="text-[14.5px] font-semibold text-foreground">MCQ</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="flex items-center justify-between bg-card border border-border rounded-[16px] p-5 shadow-xs mt-2">
        <Button
          variant="outline"
          onClick={() => {
            // Revert back to view mode if canceling an edit session
            if (isEditing && !isCreateMode) setIsEditing(false);
          }}
          className="h-[46px] px-10 rounded-[10px] border-[1.5px] border-border text-[14.5px] font-semibold text-foreground hover:bg-accent/5 transition-colors"
        >
          Cancel
        </Button>
        <Button className="h-[46px] px-8 rounded-[10px] bg-accent hover:bg-accent/90 text-white text-[14.5px] font-semibold transition-colors">
          Save & Continue
        </Button>
      </div>
    </section>
  );
}
