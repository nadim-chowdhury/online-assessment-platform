"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseTabSwitchDetectionOptions {
  /** Whether detection is enabled (default: true) */
  enabled?: boolean;
  /** Callback fired each time the user leaves the tab */
  onTabSwitch?: (count: number) => void;
}

interface UseTabSwitchDetectionReturn {
  /** How many times the user switched away */
  switchCount: number;
  /** Whether the tab is currently hidden */
  isTabHidden: boolean;
  /** Reset the switch counter */
  resetCount: () => void;
}

/**
 * Custom hook for detecting tab/window switches during an exam.
 * Uses the Page Visibility API to track when the user navigates away.
 */
export function useTabSwitchDetection({
  enabled = true,
  onTabSwitch,
}: UseTabSwitchDetectionOptions = {}): UseTabSwitchDetectionReturn {
  const [switchCount, setSwitchCount] = useState(0);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const onTabSwitchRef = useRef(onTabSwitch);

  useEffect(() => {
    onTabSwitchRef.current = onTabSwitch;
  }, [onTabSwitch]);

  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabHidden(true);
        setSwitchCount((prev) => {
          const newCount = prev + 1;
          onTabSwitchRef.current?.(newCount);
          return newCount;
        });
      } else {
        setIsTabHidden(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);

  const resetCount = useCallback(() => {
    setSwitchCount(0);
  }, []);

  return {
    switchCount,
    isTabHidden,
    resetCount,
  };
}
