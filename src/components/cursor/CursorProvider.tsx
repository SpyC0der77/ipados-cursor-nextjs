"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CursorType = "default" | "text" | "block";

interface CursorConfig {
  type: CursorType;
  rect?: DOMRect | null;
  radius?: string;
  lineHeight?: number;
  activeElement?: HTMLElement | null;
  stickiness?: boolean;
}

interface CursorContextType {
  config: CursorConfig;
  setConfig: (config: CursorConfig) => void;
  updateCursor: (config: Partial<CursorConfig>) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<CursorConfig>({
    type: "default",
    rect: null,
    activeElement: null,
  });

  const setConfig = useCallback((newConfig: CursorConfig) => {
    setConfigState(newConfig);
  }, []);

  const updateCursor = useCallback((updates: Partial<CursorConfig>) => {
    setConfigState((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <CursorContext.Provider value={{ config, setConfig, updateCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
