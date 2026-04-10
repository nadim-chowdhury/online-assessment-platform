import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

export function TablePagination() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-2 gap-4 py-4">
      {/* Page Navigation */}
      <div className="flex items-center gap-[6px]">
        {/* Previous Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-[8px] border-[1.5px] border-border bg-card text-muted-foreground transition-colors hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          <ChevronLeft className="h-[18px] w-[18px] stroke-[2.5]" />
        </button>

        {/* Active Page Number */}
        <button className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-background text-[15px] font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:bg-accent/10">
          1
        </button>

        {/* Next Button */}
        <button className="flex h-10 w-10 items-center justify-center rounded-[8px] border-[1.5px] border-border bg-card text-muted-foreground transition-colors hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:text-foreground">
          <ChevronRight className="h-[18px] w-[18px] stroke-[2.5]" />
        </button>
      </div>

      {/* Items Per Page Selector */}
      <div className="flex items-center gap-4">
        <span className="text-[14.5px] font-medium text-muted-foreground">
          Online Test Per Page
        </span>
        <button className="flex h-10 w-[64px] items-center justify-between rounded-[8px] border-[1.5px] border-border bg-card px-3 shadow-[0px_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
          <span className="text-[14.5px] font-medium text-foreground">8</span>
          <ChevronUp className="h-[18px] w-[18px] text-muted-foreground stroke-[2.5] dark:text-foreground" />
        </button>
      </div>
    </div>
  );
}
