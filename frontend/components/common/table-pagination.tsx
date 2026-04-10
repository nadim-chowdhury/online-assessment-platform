import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange?: (items: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: TablePaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 py-4">
      {/* Page Navigation */}
      <div className="flex items-center gap-[6px]">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-[8px] border-[1.5px] border-border bg-card text-muted-foreground transition-colors hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card"
        >
          <ChevronLeft className="h-[18px] w-[18px] stroke-[2.5]" />
        </button>

        {/* Active Page Number */}
        <button className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-background border border-border text-[15px] font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:bg-accent/10">
          {currentPage}
        </button>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages || totalPages === 0}
          className="flex h-10 w-10 items-center justify-center rounded-[8px] border-[1.5px] border-border bg-card text-muted-foreground transition-colors hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card dark:text-foreground"
        >
          <ChevronRight className="h-[18px] w-[18px] stroke-[2.5]" />
        </button>
      </div>

      {/* Items Per Page Selector */}
      <div className="flex items-center gap-4">
        <span className="text-[14.5px] font-medium text-muted-foreground">
          Online Test Per Page
        </span>
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
            className="flex h-10 w-[64px] appearance-none items-center justify-between rounded-[8px] border-[1.5px] border-border bg-card pl-3.5 pr-6 text-[14.5px] font-medium text-foreground cursor-pointer shadow-[0px_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
          <ChevronUp className="h-[14px] w-[14px] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground stroke-[2.5] dark:text-foreground" />
        </div>
      </div>
    </div>
  );
}
