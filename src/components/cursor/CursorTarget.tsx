"use client";

import React, { useRef, useEffect } from "react";
import { useCursor, CursorType } from "./CursorProvider";
import { cn } from "@/lib/utils";

interface CursorTargetProps {
  children: React.ReactNode;
  type?: CursorType;
  className?: string;
}

export function CursorTarget({ children, type = "block", className }: CursorTargetProps) {
  const { updateCursor } = useCursor();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      const rect = element.getBoundingClientRect();
      
      // Auto-detect border radius from the first child element
      let computedRadius = "0px";
      const firstChild = element.firstElementChild;
      if (firstChild) {
        const style = window.getComputedStyle(firstChild as HTMLElement);
        computedRadius = style.borderRadius;
      }
      
      // For text type, capture line height
      let lineHeight: number | undefined;
      if (type === "text") {
        // Get line height from the first child element (the actual text element)
        const textElement = element.firstElementChild || element;
        const style = window.getComputedStyle(textElement as HTMLElement);
        const lineHeightStr = style.lineHeight;
        // Parse line height (could be 'normal', px, or unitless)
        if (lineHeightStr === 'normal') {
          // Use font size * 1.2 as default for 'normal'
          const fontSize = parseFloat(style.fontSize);
          lineHeight = fontSize * 1.2;
        } else if (lineHeightStr.endsWith('px')) {
          lineHeight = parseFloat(lineHeightStr);
        } else {
          // Unitless multiplier
          const fontSize = parseFloat(style.fontSize);
          lineHeight = parseFloat(lineHeightStr) * fontSize;
        }
      }
      
      updateCursor({ type, rect, radius: computedRadius, lineHeight });
      // Remove transition for direct 1:1 movement
      element.style.transition = "none";
      
      // Store original rect for offset calculations
      (element as any)._originalRect = rect;
    };

    const handleMouseLeave = () => {
      updateCursor({ type: "default", rect: null });
      // Add transition for smooth snap-back
      element.style.transition = "transform 0.3s cubic-bezier(0.58, 0.09, 0.46, 1.46)";
      element.style.transform = "translate3d(0,0,0)";
      // Clear stored rect
      delete (element as any)._originalRect;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Only apply magnetic effect for block types
      if (type !== "block") return;
      
      // Use stored original rect for consistent offset calculation
      const originalRect = (element as any)._originalRect;
      if (!originalRect) return;
      
      const centerX = originalRect.left + originalRect.width / 2;
      const centerY = originalRect.top + originalRect.height / 2;
      
      // Magnetic strength for the element itself
      const strength = 0.2;
      const offsetX = (e.clientX - centerX) * strength;
      const offsetY = (e.clientY - centerY) * strength;
      
      element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [type, updateCursor]);

  return (
    <div 
      ref={ref} 
      className={cn(className)} 
      style={{ display: type === "text" ? 'inline' : 'inline-block' }}
    >
      {children}
    </div>
  );
}
