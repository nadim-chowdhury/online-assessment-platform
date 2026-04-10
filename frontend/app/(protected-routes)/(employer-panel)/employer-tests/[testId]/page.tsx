"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function TestDetailsPage() {
  const params = useParams();
  const testId = params?.testId;

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

      {/* Main View Content */}
      <div className="bg-card border border-border rounded-[16px] p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[17px] font-bold text-foreground tracking-tight">
            Basic Information
          </h2>
          {/* Link configures proper edit mode invocation passing testsId context */}
          <Link
            href={`/employer-tests/create?testId=${testId}`}
            className="flex items-center gap-1.5 text-[14px] font-medium text-accent hover:opacity-80 transition-opacity"
          >
            <Pencil className="h-[14px] w-[14px]" />
            Edit
          </Link>
        </div>

        <div className="flex flex-col gap-6">
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
              <p className="text-[14.5px] font-semibold text-foreground">30</p>
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
      </div>

      {/* Footer Action Buttons */}
      <div className="flex items-center justify-between bg-card border border-border rounded-[16px] p-5 shadow-xs mt-2">
        <Button
          variant="outline"
          className="h-[46px] px-10 rounded-[10px] border-[1.5px] border-border text-[14.5px] font-semibold text-foreground hover:bg-accent/5 transition-colors"
        >
          <Link href="/employer-dashboard">Cancel</Link>
        </Button>
        <Button className="h-[46px] px-8 rounded-[10px] bg-accent hover:bg-accent/90 text-white text-[14.5px] font-semibold transition-colors">
          Save & Continue
        </Button>
      </div>
    </section>
  );
}
