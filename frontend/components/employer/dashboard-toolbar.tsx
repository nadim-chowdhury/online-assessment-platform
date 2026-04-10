"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

interface DashboardToolbarProps {
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
  hideCreateButton?: boolean;
}

export function DashboardToolbar({ searchQuery = "", setSearchQuery, hideCreateButton = false }: DashboardToolbarProps = {}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      <h2 className="text-xl font-semibold text-foreground whitespace-nowrap select-none">
        Online Tests
      </h2>

      {/* Search Input */}
      <div
        className="relative w-full max-w-[621px] h-12 flex-1 mx-0 sm:mx-4"
        style={{ filter: "drop-shadow(2px 2px 6px rgba(73, 124, 241, 0.24))" }}
      >
        <div className="absolute inset-0 rounded-[8px] bg-linear-to-r from-[#A086F7] via-[#ECDBFF] to-[#B199FF] p-px">
          <div className="flex items-center h-full w-full bg-card rounded-[7px] overflow-hidden px-[2px]">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery?.(e.target.value)}
              placeholder="Search by exam title"
              className="h-full border-0 shadow-none focus-visible:ring-0 text-[13px] text-muted-foreground bg-transparent placeholder:text-muted-foreground font-medium tracking-[0.015em] pr-12 px-4 rounded-none"
            />
          </div>
        </div>
        {/* Icon Container */}
        <Button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center pointer-events-none cursor-pointer hover:bg-accent/20 transition-colors">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="gl1"
                x1="7.166"
                y1="1.75"
                x2="7.166"
                y2="13.417"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#27ACFF" />
                <stop offset="0.505" stopColor="#A000E9" />
                <stop offset="1" stopColor="#673FED" />
              </linearGradient>
              <linearGradient
                id="gl2"
                x1="13"
                y1="11.75"
                x2="13"
                y2="15.083"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#27ACFF" />
                <stop offset="0.505" stopColor="#A000E9" />
                <stop offset="1" stopColor="#673FED" />
              </linearGradient>
              <linearGradient
                id="gl3"
                x1="10.917"
                y1="0.917"
                x2="10.917"
                y2="6.75"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#27ACFF" />
                <stop offset="0.505" stopColor="#A000E9" />
                <stop offset="1" stopColor="#673FED" />
              </linearGradient>
            </defs>
            <path
              d="M11.333 11.75L14.666 15.083"
              stroke="url(#gl2)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 7.583C13 10.805 10.388 13.417 7.166 13.417C3.945 13.417 1.333 10.805 1.333 7.583C1.333 4.362 3.945 1.75 7.166 1.75"
              stroke="url(#gl1)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.917 0.917L11.132 1.498C11.413 2.26 11.554 2.64 11.832 2.918C12.11 3.196 12.491 3.337 13.252 3.619L13.833 3.834L13.252 4.049C12.491 4.33 12.11 4.471 11.832 4.749C11.554 5.027 11.413 5.408 11.132 6.17L10.917 6.75L10.702 6.17C10.42 5.408 10.279 5.027 10.001 4.749C9.723 4.471 9.342 4.33 8.581 4.049L8 3.834L8.581 3.619C9.342 3.337 9.723 3.196 10.001 2.918C10.279 2.64 10.42 2.26 10.702 1.498L10.917 0.917Z"
              stroke="url(#gl3)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

      {!hideCreateButton && (
        <Link href="/employer-tests/create">
          <button className="flex items-center justify-center w-full sm:w-[192px] h-12 bg-accent rounded-lg cursor-pointer select-none shrink-0 transition-opacity hover:opacity-90">
            <span className="text-[13px] font-semibold text-accent-foreground tracking-[-0.01em] whitespace-nowrap">
              Create Online Test
            </span>
          </button>
        </Link>
      )}
    </div>
  );
}
