"use client";

import Image from "next/image";
import { DashboardToolbar } from "@/components/employer/dashboard-toolbar";
import { TestListCard } from "@/components/employer/test-list-card";
import { TablePagination } from "@/components/common/table-pagination";
import { mockTests } from "@/lib/mock-tests";

export default function EmployerDashboard() {
  return (
    <section className="px-4 py-6 md:px-8 md:py-8 w-full max-w-7xl mx-auto flex flex-col gap-6">
      <DashboardToolbar />

      {/* Content area below the toolbar */}
      {mockTests.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTests.map((test) => (
              <TestListCard key={test.id} test={test} />
            ))}
          </div>

          <TablePagination />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center pt-10 pb-14 w-full animate-in fade-in duration-500 bg-card rounded-xl">
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
