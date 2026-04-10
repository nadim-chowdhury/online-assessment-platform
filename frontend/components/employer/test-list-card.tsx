import { Users, FileText, Timer } from "lucide-react";
import type { MockTest } from "@/lib/mock-tests";
import Link from "next/link";

interface TestListCardProps {
  test: MockTest;
}

export function TestListCard({ test }: TestListCardProps) {
  return (
    <Link
      href={`/employer-tests/${test.id}`}
      className="cursor-pointer hover:shadow-md transition-all duration-300 rounded-2xl"
    >
      <div className="w-full rounded-2xl border border-border bg-card p-6 flex flex-col gap-6 shadow-xs">
        <h3 className="text-[17px] font-semibold text-foreground tracking-tight">
          {test.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {/* Candidates */}
          <div className="flex items-center gap-2.5 text-[15px]">
            <Users className="h-[22px] w-[22px] text-muted-foreground stroke-[1.5]" />
            <span className="text-muted-foreground font-medium">
              Candidates:
            </span>
            <span className="text-foreground font-semibold">
              {test.candidatesCount.toLocaleString()}
            </span>
          </div>

          {/* Question Set */}
          <div className="flex items-center gap-2.5 text-[15px]">
            <FileText className="h-[22px] w-[22px] text-muted-foreground stroke-[1.5]" />
            <span className="text-muted-foreground font-medium">
              Question Set:
            </span>
            <span className="text-foreground font-semibold">
              {test.questionSetCount}
            </span>
          </div>

          {/* Exam Slots */}
          <div className="flex items-center gap-2.5 text-[15px]">
            <Timer className="h-[22px] w-[22px] text-muted-foreground stroke-[1.5]" />
            <span className="text-muted-foreground font-medium">
              Exam Slots:
            </span>
            <span className="text-foreground font-semibold">
              {test.examSlotsCount}
            </span>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-[8px] border-[1.5px] border-accent px-5 py-2.5 text-[14px] font-semibold tracking-[-0.01em] text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            View Candidates
          </button>
        </div>
      </div>
    </Link>
  );
}
