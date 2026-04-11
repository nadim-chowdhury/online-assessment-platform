"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseTabSwitchDetectionOptions {
  enabled?: boolean;
  onTabSwitch?: (count: number) => void;
}

interface UseTabSwitchDetectionReturn {
  switchCount: number;
  isTabHidden: boolean;
  resetCount: () => void;
}

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
