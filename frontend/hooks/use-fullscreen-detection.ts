"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseFullscreenDetectionOptions {
  /** Whether detection is enabled (default: true) */
  enabled?: boolean;
  /** Callback fired when the user exits fullscreen */
  onFullscreenExit?: (exitCount: number) => void;
}

interface UseFullscreenDetectionReturn {
  /** Whether the browser is currently in fullscreen */
  isFullscreen: boolean;
  /** How many times the user exited fullscreen */
  exitCount: number;
  /** Request the browser to enter fullscreen */
  enterFullscreen: () => Promise<void>;
  /** Exit fullscreen mode */
  exitFullscreen: () => Promise<void>;
  /** Reset the exit counter */
  resetCount: () => void;
}

/**
 * Custom hook for managing and detecting fullscreen mode during an exam.
 * Tracks how many times the user exits fullscreen and provides controls.
 */
export function useFullscreenDetection({
  enabled = true,
  onFullscreenExit,
}: UseFullscreenDetectionOptions = {}): UseFullscreenDetectionReturn {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [exitCount, setExitCount] = useState(0);
  const wasFullscreenRef = useRef(false);
  const onFullscreenExitRef = useRef(onFullscreenExit);

  useEffect(() => {
    onFullscreenExitRef.current = onFullscreenExit;
  }, [onFullscreenExit]);

  useEffect(() => {
    if (!enabled) return;

    const handleFullscreenChange = () => {
      const currentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(currentlyFullscreen);

      // Detect exit: was fullscreen, now is not
      if (wasFullscreenRef.current && !currentlyFullscreen) {
        setExitCount((prev) => {
          const newCount = prev + 1;
          onFullscreenExitRef.current?.(newCount);
          return newCount;
        });
      }

      wasFullscreenRef.current = currentlyFullscreen;
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [enabled]);

  const enterFullscreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen();
    } catch (err) {
      console.warn("Failed to enter fullscreen:", err);
    }
  }, []);

  const exitFullscreenFn = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Failed to exit fullscreen:", err);
    }
  }, []);

  const resetCount = useCallback(() => {
    setExitCount(0);
  }, []);

  return {
    isFullscreen,
    exitCount,
    enterFullscreen,
    exitFullscreen: exitFullscreenFn,
    resetCount,
  };
}
