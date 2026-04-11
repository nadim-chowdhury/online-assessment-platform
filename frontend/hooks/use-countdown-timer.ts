"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseCountdownTimerOptions {
  /** Total duration in seconds */
  totalSeconds: number;
  /** Callback fired when timer reaches zero */
  onTimeout?: () => void;
  /** Whether the timer should start immediately (default: true) */
  autoStart?: boolean;
}

interface UseCountdownTimerReturn {
  /** Remaining time in seconds */
  remaining: number;
  /** Formatted string "MM:SS" */
  formatted: string;
  /** Whether the timer is currently running */
  isRunning: boolean;
  /** Whether the timer has reached zero */
  isExpired: boolean;
  /** Start or resume the timer */
  start: () => void;
  /** Pause the timer */
  pause: () => void;
  /** Reset timer to initial duration */
  reset: () => void;
}

/**
 * Custom hook for managing a countdown timer.
 * Used in the candidate exam screen for exam time tracking.
 */
export function useCountdownTimer({
  totalSeconds,
  onTimeout,
  autoStart = true,
}: UseCountdownTimerOptions): UseCountdownTimerReturn {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onTimeoutRef = useRef(onTimeout);

  // Keep the callback ref current without causing re-renders
  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          // Fire timeout callback on next tick to avoid state update during render
          setTimeout(() => onTimeoutRef.current?.(), 0);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remaining]);

  const formatted = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;

  const start = useCallback(() => {
    if (remaining > 0) setIsRunning(true);
  }, [remaining]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setRemaining(totalSeconds);
    setIsRunning(false);
  }, [totalSeconds]);

  return {
    remaining,
    formatted,
    isRunning,
    isExpired: remaining <= 0,
    start,
    pause,
    reset,
  };
}
