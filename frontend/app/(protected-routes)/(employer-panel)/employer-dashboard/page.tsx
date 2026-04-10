"use client";

import { DashboardToolbar } from "@/components/employer/dashboard-toolbar";

export default function EmployerDashboard() {
  return (
    <section className="px-4 py-6 md:px-8 md:py-8 w-full max-w-7xl mx-auto">
      <DashboardToolbar />
      {/* Content area below the toolbar */}
      <div className="mt-8 rounded-xl border border-border bg-card p-8 min-h-[400px] flex items-center justify-center text-muted-foreground">
        Dashboard Overview (Coming Soon)
      </div>
    </section>
  );
}
