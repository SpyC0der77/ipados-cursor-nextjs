"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CursorType } from "./CursorProvider";

interface CursorTargetProps {
  children: React.ReactNode;
  type?: CursorType;
  magnetic?: boolean;
  stickiness?: boolean;
  className?: string;
}

export function CursorTarget({ children, type = "block", magnetic = true, stickiness = false, className }: CursorTargetProps) {
  return (
    <div 
      className={cn(className)} 
      style={{ display: type === "text" ? 'inline' : 'inline-block' }}
      data-cursor-target=""
      data-cursor-type={type}
      data-cursor-magnetic={magnetic}
      data-cursor-stickiness={stickiness}
    >
      {children}
    </div>
  );
}
