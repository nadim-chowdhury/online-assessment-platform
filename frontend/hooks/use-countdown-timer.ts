"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseCountdownTimerOptions {
  totalSeconds: number;
  onTimeout?: () => void;
  autoStart?: boolean;
}

interface UseCountdownTimerReturn {
  remaining: number;
  formatted: string;
  isRunning: boolean;
  isExpired: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useCountdownTimer({
  totalSeconds,
  onTimeout,
  autoStart = true,
}: UseCountdownTimerOptions): UseCountdownTimerReturn {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onTimeoutRef = useRef(onTimeout);

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
