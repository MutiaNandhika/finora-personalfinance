"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8 pb-24 lg:pb-8 overflow-x-hidden min-w-0">
          <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6 min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
