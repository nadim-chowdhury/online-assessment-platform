"use client";

import { DashboardToolbar } from "@/components/employer/dashboard-toolbar";
import { TestListCard } from "@/components/employer/test-list-card";
import { TablePagination } from "@/components/common/table-pagination";
import { mockTests } from "@/lib/mock-tests";

export default function EmployerDashboard() {
  return (
    <section className="px-4 py-6 md:px-8 md:py-8 w-full max-w-7xl mx-auto flex flex-col gap-6">
      <DashboardToolbar />

      {/* Content area below the toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTests.map((test) => (
          <TestListCard key={test.id} test={test} />
        ))}
      </div>

      <TablePagination />
    </section>
  );
}
