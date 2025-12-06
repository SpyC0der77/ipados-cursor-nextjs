"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useCursor } from "./CursorProvider";
import { cn } from "@/lib/utils";
import { cursorConfig } from "./cursorConfig";

export function Cursor() {
  const { config } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  // Mouse position (raw)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Final target position (updated instantly based on mode)
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Smooth final position
  const cursorX = useSpring(targetX, cursorConfig.animation.position);
  const cursorY = useSpring(targetY, cursorConfig.animation.position);

  // Lighting movement springs (keep these smooth/laggy for effect)
  const lightingX = useSpring(0, cursorConfig.animation.lighting);
  const lightingY = useSpring(0, cursorConfig.animation.lighting);

  // Scale for click animation
  const scaleMotion = useMotionValue(1);
  const scale = useSpring(scaleMotion, cursorConfig.animation.clickScale);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Update targets based on mode and mouse
    const updateTargets = () => {
      const mX = mouseX.get();
      const mY = mouseY.get();

      if (config.type === "block" && config.rect) {
        const centerX = config.rect.left + config.rect.width / 2;
        const centerY = config.rect.top + config.rect.height / 2;
        
        // Magnetic effect
        const offX = (mX - centerX) * cursorConfig.magnetic.strength;
        const offY = (mY - centerY) * cursorConfig.magnetic.strength;
        
        // Set target to center + magnetic offset
        targetX.set(centerX + offX);
        targetY.set(centerY + offY);

        // Lighting follows the offset amplified
        lightingX.set(offX * cursorConfig.magnetic.lightingMultiplier); 
        lightingY.set(offY * cursorConfig.magnetic.lightingMultiplier);
      } else {
        // In default mode, target is the mouse
        targetX.set(mX);
        targetY.set(mY);
      }
    };

    // Subscribe to mouse changes
    const unsubscribeX = mouseX.on("change", updateTargets);
    const unsubscribeY = mouseY.on("change", updateTargets);
    // Also update when config changes
    updateTargets();

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [config, mouseX, mouseY, targetX, targetY, lightingX, lightingY]);

  // Derived state for animation
  const isBlock = config.type === "block" && config.rect;
  const isText = config.type === "text";

  // Calculate target size
  let targetWidth, targetHeight, targetRadius;

  if (isBlock && config.rect) {
    // Use uniform padding based on the smaller dimension to ensure equal padding on all sides
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
    // Use line height from config if available, otherwise default
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
        // Calculate scale to shrink padding when clicked
        const minDimension = Math.min(config.rect.width, config.rect.height);
        const paddingNormal = Math.max(
          cursorConfig.block.paddingMin,
          minDimension * cursorConfig.block.paddingPercent
        );
        const paddingClicked = Math.max(
          cursorConfig.block.paddingClickedMin,
          minDimension * cursorConfig.block.paddingClickedPercent
        );
        // Calculate the scale needed to shrink the padding
        const widthScale = (config.rect.width + paddingClicked) / (config.rect.width + paddingNormal);
        const heightScale = (config.rect.height + paddingClicked) / (config.rect.height + paddingNormal);
        // Use average to maintain proportions
        clickScale = (widthScale + heightScale) / 2;
      } else {
        clickScale = cursorConfig.click.defaultScale;
      }
    }
    scaleMotion.set(clickScale);
  }, [isMouseDown, isBlock, config.rect, scaleMotion]);

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
