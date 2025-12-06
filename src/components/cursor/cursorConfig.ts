/**
 * Configuration for the iPad-style cursor
 * Adjust these values to customize cursor behavior and appearance
 */

export const cursorConfig = {
  // Block cursor padding
  block: {
    // Normal state padding (percentage of smaller dimension)
    paddingPercent: 0.10, // 10%
    // Minimum padding in pixels
    paddingMin: 10,
    // Clicked state padding (percentage of smaller dimension)
    paddingClickedPercent: 0.07, // 7%
    // Minimum clicked padding in pixels
    paddingClickedMin: 7,
    // Default border radius if not detected
    defaultRadius: "12px",
  },

  // Text cursor
  text: {
    // Width of the text cursor bar
    width: 4,
    // Default height if line height not detected
    defaultHeight: 24,
    // Border radius
    radius: "2px",
  },

  // Default cursor (dot)
  default: {
    // Size of the default cursor
    size: 20,
    // Border radius (50% makes it circular)
    radius: "50%",
  },

  // Magnetic effect
  magnetic: {
    // Strength of the magnetic pull (0-1)
    strength: 0.2,
    // Lighting effect multiplier
    lightingMultiplier: 4,
  },

  // Animation settings
  animation: {
    // Spring configuration for cursor position
    position: {
      damping: 25,
      stiffness: 300,
      mass: 0.5,
    },
    // Spring configuration for lighting effect
    lighting: {
      damping: 20,
      stiffness: 200,
    },
    // Spring configuration for size/shape changes
    sizeShape: {
      type: "spring" as const,
      stiffness: 400,
      damping: 28,
      mass: 0.5,
    },
    // Spring configuration for click scale animation
    clickScale: {
      stiffness: 400,
      damping: 30,
    },
  },

  // Colors
  colors: {
    // Block cursor background
    blockBackground: "rgba(24, 5, 5, 0.08)",
    // Default cursor background
    defaultBackground: "rgba(150, 150, 150, 0.5)",
    // Lighting gradient
    lightingGradient: "radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%)",
  },

  // Click animation
  click: {
    // Scale for non-block cursors when clicked
    defaultScale: 0.9,
  },
} as const;

export type CursorConfig = typeof cursorConfig;
