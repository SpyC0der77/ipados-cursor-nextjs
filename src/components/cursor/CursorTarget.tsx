"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CursorType } from "./CursorProvider";

interface CursorTargetProps {
  children: React.ReactNode;
  type?: CursorType;
  className?: string;
}

export function CursorTarget({ children, type = "block", className }: CursorTargetProps) {
  return (
    <div 
      className={cn(className)} 
      style={{ display: type === "text" ? 'inline' : 'inline-block' }}
      data-cursor-target=""
      data-cursor-type={type}
    >
      {children}
    </div>
  );
}
