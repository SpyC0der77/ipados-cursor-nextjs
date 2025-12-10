"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useCursor, CursorType } from "./CursorProvider";
import { cn } from "@/lib/utils";
import { cursorConfig } from "./cursorConfig";

// Helper to extract cursor styles from an element
function getCursorStyle(element: HTMLElement, type: CursorType) {
  const style = window.getComputedStyle(element);
  
  let radius = "0px";
  // Try to get radius from first child if available (common pattern for wrappers)
  const child = element.firstElementChild;
  if (child) {
    const childStyle = window.getComputedStyle(child);
    radius = childStyle.borderRadius;
  } else {
    radius = style.borderRadius;
  }

  let lineHeight: number | undefined;
  if (type === "text") {
    const targetEl = element.firstElementChild || element;
    const targetStyle = window.getComputedStyle(targetEl);
    const lhStr = targetStyle.lineHeight;
    
    if (lhStr === 'normal') {
      lineHeight = parseFloat(targetStyle.fontSize) * 1.2;
    } else if (lhStr.endsWith('px')) {
      lineHeight = parseFloat(lhStr);
    } else {
      lineHeight = parseFloat(lhStr) * parseFloat(targetStyle.fontSize);
    }
  }

  return { radius, lineHeight };
}

export function Cursor() {
  const { config, setConfig, updateCursor } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  // Track active target state locally to avoid context lag for physics
  const activeTargetRef = useRef<{
    element: HTMLElement;
    baseRect: DOMRect; // The rect WITHOUT transform
    lastRect: DOMRect; // The last reported visual rect
    transform: { x: number; y: number };
  } | null>(null);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cursor rendering target
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Smooth physics
  // Use sticky spring if configured
  const springConfig = config.stickiness ? cursorConfig.animation.sticky : cursorConfig.animation.position;

  const cursorX = useSpring(targetX, springConfig);
  const cursorY = useSpring(targetY, springConfig);
  const lightingX = useSpring(0, cursorConfig.animation.lighting);
  const lightingY = useSpring(0, cursorConfig.animation.lighting);

  const scaleMotion = useMotionValue(1);


  const scale = useSpring(scaleMotion, cursorConfig.animation.clickScale);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.matchMedia("(pointer: fine)").matches);
  }, []);

  // Main Event Loop
  useEffect(() => {
    if (!isVisible) return;
    
    let mousePos = { x: 0, y: 0 };
    let rafId: number;

    const handleInput = (e?: MouseEvent | Event) => {
      // Update mouse pos if it's a mouse event
      if (e instanceof MouseEvent) {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
      
      // On scroll, we use the last known mouse pos
    };

    const updateLoop = () => {
      // 1. Hit Test directly
      let targetEl: HTMLElement | null = null;
      let targetType: CursorType = "default";
      let targetMagnetic = true;
      let targetStickiness = false;

      // Only check if mouse is on screen
      if (mousePos.x !== 0 || mousePos.y !== 0) {
        const el = document.elementFromPoint(mousePos.x, mousePos.y);
        const hit = el?.closest('[data-cursor-target]') as HTMLElement;
        if (hit) {
          targetEl = hit;
          targetType = (hit.getAttribute("data-cursor-type") as CursorType) || "block";
          const magAttr = hit.getAttribute("data-cursor-magnetic");
          targetMagnetic = magAttr !== "false";
          const stickAttr = hit.getAttribute("data-cursor-stickiness");
          targetStickiness = stickAttr === "true";
        }
      }

      // 2. Handle Target Change
      const currentActive = activeTargetRef.current;
      
      if (targetEl !== (currentActive?.element || null)) {
        // cleanup old
        if (currentActive) {
          currentActive.element.style.transition = "transform 0.3s cubic-bezier(0.58, 0.09, 0.46, 1.46)";
          currentActive.element.style.transform = "translate3d(0,0,0)";
        }

        if (targetEl) {
           // Setup new
           const rect = targetEl.getBoundingClientRect();
           const style = getCursorStyle(targetEl, targetType);
           
           // Remove transition for immediate magnetic grab ONLY if magnetic
           if (targetMagnetic) {
             targetEl.style.transition = "none";
           }
           
           activeTargetRef.current = {
             element: targetEl,
             baseRect: rect, // Initial rect is untransformed usually
             lastRect: rect,
             transform: { x: 0, y: 0 }
           };
           
           setConfig({
             type: targetType,
             rect: rect,
             radius: style.radius,
             lineHeight: style.lineHeight,
             activeElement: targetEl,
             stickiness: targetStickiness,
           });
        } else {
          // No target
          activeTargetRef.current = null;
          setConfig({ type: "default", rect: null, activeElement: null, stickiness: false });
        }
      }

      // 3. Process Active Target (Physics & Magnetic)
      if (activeTargetRef.current && targetEl) {
        const { element, transform, lastRect } = activeTargetRef.current;
        
        // Refresh base rect (compensating for our own transform)
        const visualRect = element.getBoundingClientRect();
        
        // Check for resize (e.g. dnd-kit scaling or content change)
        if (Math.abs(visualRect.width - lastRect.width) > 0.5 || Math.abs(visualRect.height - lastRect.height) > 0.5) {
            activeTargetRef.current.lastRect = visualRect;
            updateCursor({ rect: visualRect });
        }

        const baseRect = {
          left: visualRect.left - transform.x,
          top: visualRect.top - transform.y,
          width: visualRect.width,
          height: visualRect.height
        };
        // Update ref's baseRect for stability
        activeTargetRef.current.baseRect = baseRect as DOMRect;

        // --- Magnetic Logic ---
        if (targetType === "block") {
          const centerX = baseRect.left + baseRect.width / 2;
          const centerY = baseRect.top + baseRect.height / 2;
          
          const distRawX = (mousePos.x - centerX);
          const distRawY = (mousePos.y - centerY);
          
          // Calculate theoretical magnetic pull
          const strength = cursorConfig.magnetic.strength;
          let magX = distRawX * strength;
          let magY = distRawY * strength;
           
          // Clamp values
          const maxX = baseRect.width * cursorConfig.magnetic.limitMultiplier;
          const maxY = baseRect.height * cursorConfig.magnetic.limitMultiplier;
           
          magX = Math.max(-maxX, Math.min(maxX, magX));
          magY = Math.max(-maxY, Math.min(maxY, magY));
          
          let offX = 0;
          let offY = 0;

          if (targetMagnetic) {
             offX = magX;
             offY = magY;
             
             // Apply to element
             element.style.transform = `translate3d(${offX}px, ${offY}px, 0)`;
             activeTargetRef.current.transform = { x: offX, y: offY };
          }
          
          // Update cursor targets
          targetX.set(centerX + offX);
          targetY.set(centerY + offY);
          
          // Use magX/magY for lighting regardless of actual element movement
          lightingX.set(magX * cursorConfig.magnetic.lightingMultiplier);
          lightingY.set(magY * cursorConfig.magnetic.lightingMultiplier);
        } else {
          // Text mode - just follow mouse, no magnetic element move
          targetX.set(mousePos.x);
          targetY.set(mousePos.y);
        }
      } else {
        // Default mode
        targetX.set(mousePos.x);
        targetY.set(mousePos.y);
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("mousemove", handleInput);
    window.addEventListener("scroll", handleInput, { capture: true, passive: true });
    window.addEventListener("mousedown", () => setIsMouseDown(true));
    window.addEventListener("mouseup", () => setIsMouseDown(false));

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleInput);
      window.removeEventListener("scroll", handleInput);
      window.removeEventListener("mousedown", () => setIsMouseDown(true));
      window.removeEventListener("mouseup", () => setIsMouseDown(false));
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, targetX, targetY, lightingX, lightingY, setConfig, isVisible]);

  // Derived state for rendering
  const isBlock = config.type === "block" && config.activeElement;
  const isText = config.type === "text";

  // Calculate target size
  let targetWidth, targetHeight, targetRadius;

  if (isBlock && config.rect && config.activeElement) {
    // We actively read the rect from the element because it might have resized/moved
    // But for size calcs, the cached Config rect is usually fine as long as we don't need pixel-perfect resize-handling every frame
    const minDimension = Math.min(config.rect.width, config.rect.height);
    const padding = Math.max(
      cursorConfig.block.paddingMin,
      minDimension * cursorConfig.block.paddingPercent
    );
    targetWidth = config.rect.width + padding;
    targetHeight = config.rect.height + padding;
    targetRadius = config.radius || cursorConfig.block.defaultRadius;
  } else if (isText) {
    targetWidth = cursorConfig.text.width;
    targetHeight = config.lineHeight || cursorConfig.text.defaultHeight;
    targetRadius = cursorConfig.text.radius;
  } else {
    targetWidth = cursorConfig.default.size;
    targetHeight = cursorConfig.default.size;
    targetRadius = cursorConfig.default.radius;
  }

  // Update scale based on click state
  useEffect(() => {
    let clickScale = 1;
    if (isMouseDown) {
      if (isBlock && config.rect) {
        const minDimension = Math.min(config.rect.width, config.rect.height);
        const paddingNormal = Math.max(
          cursorConfig.block.paddingMin,
          minDimension * cursorConfig.block.paddingPercent
        );
        const paddingClicked = Math.max(
          cursorConfig.block.paddingClickedMin,
          minDimension * cursorConfig.block.paddingClickedPercent
        );
        const widthScale = (config.rect.width + paddingClicked) / (config.rect.width + paddingNormal);
        const heightScale = (config.rect.height + paddingClicked) / (config.rect.height + paddingNormal);
        clickScale = (widthScale + heightScale) / 2;
      } else {
        clickScale = cursorConfig.click.defaultScale;
      }
    }
    scaleMotion.set(clickScale);
  }, [isMouseDown, isBlock, config.rect, scaleMotion]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={cn(
        "fixed pointer-events-none z-50 flex items-center justify-center overflow-hidden",
        isBlock ? "bg-gray-400/10" : "bg-gray-400/50"
      )}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scale: scale,
      }}
      animate={{
        width: targetWidth,
        height: targetHeight,
        borderRadius: targetRadius,
        backgroundColor: isBlock ? cursorConfig.colors.blockBackground : cursorConfig.colors.defaultBackground,
      }}
      transition={cursorConfig.animation.sizeShape}
    >
      <AnimatePresence>
        {isBlock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none"
            style={{
              width: "300%",
              height: "300%",
              background: cursorConfig.colors.lightingGradient,
              x: lightingX,
              y: lightingY,
              left: "-100%",
              top: "-100%",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
