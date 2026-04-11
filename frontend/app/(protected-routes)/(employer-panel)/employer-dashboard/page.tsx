"use client";

import Image from "next/image";
import { useState } from "react";
import { DashboardToolbar } from "@/components/employer/dashboard-toolbar";
import { TestListCard } from "@/components/employer/test-list-card";
import { TablePagination } from "@/components/common/table-pagination";
import { useAppSelector } from "@/store";
import { useDebounce } from "@/hooks/use-debounce";

export default function EmployerDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const allTests = useAppSelector((state) => state.exam.tests);

  const filteredTests = allTests.filter((test) =>
    test.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTests = filteredTests.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <section className="px-4 py-6 md:px-8 md:py-8 w-full max-w-7xl mx-auto flex flex-col gap-6 mt-6">
      <DashboardToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Content area below the toolbar */}
      {filteredTests.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedTests.map((test) => (
              <TestListCard key={test.id} test={test} />
            ))}
          </div>

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center pt-10 pb-14 w-full animate-in fade-in duration-300 bg-card rounded-xl">
          <div className="relative w-[180px] h-[140px] mb-6">
            <Image
              src="/assets/no-test.png"
              alt="No Online Test Available"
              fill
              className="object-contain h-30 w-30"
              priority
            />
          </div>
          <h3 className="text-[19px] font-semibold text-foreground mb-2 text-center tracking-tight">
            No Online Test Available
          </h3>
          <p className="text-[14.5px] font-medium text-muted-foreground text-center leading-relaxed">
            Currently, there are no online tests available. Please check back
            later for updates.
          </p>
        </div>
      )}
    </section>
  );
}
