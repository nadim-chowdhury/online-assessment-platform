"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="bg-card shadow-sm">
      <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6">
        {/* Left — Logo + Dashboard */}
        <div className="flex items-center gap-4 md:gap-24">
          <div className="shrink-0">
            <Image
              src="/assets/logo-primary.png"
              alt="Akij Resource Logo"
              width={480}
              height={160}
              className="h-7 w-auto object-contain md:h-9"
              priority
            />
          </div>
          <span className="hidden sm:inline text-base font-medium text-foreground">
            {pathname === "/employer-dashboard" ||
            pathname === "/candidate-dashboard"
              ? "Dashboard"
              : ""}
          </span>
        </div>

        {/* Right — User profile (desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Avatar */}
          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <svg
              className="h-6 w-6 text-muted-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>

          {/* Name + Ref ID */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-foreground">
              Arif Hossain
            </span>
            <span className="text-xs text-muted-foreground">
              Ref. ID - 16101121
            </span>
          </div>

          {/* Dropdown chevron */}
          <button
            type="button"
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            aria-label="User menu"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="sm:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border px-4 py-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="block text-sm font-medium text-foreground">
            Dashboard
          </span>

          <div className="flex items-center gap-3 pt-2 border-t border-border">
            {/* Avatar */}
            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <svg
                className="h-6 w-6 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-foreground">
                Arif Hossain
              </span>
              <span className="text-xs text-muted-foreground">
                Ref. ID - 16101121
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
