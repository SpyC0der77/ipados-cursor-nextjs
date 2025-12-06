# iPad Cursor App

A standalone implementation of the iPad-style cursor effect using Next.js and Framer Motion. This cursor provides a smooth, magnetic interaction experience similar to iPadOS, with customizable behavior and appearance.

## Features

### 🎯 Three Cursor Modes

- **Default Cursor**: A subtle circular dot that follows your mouse
- **Block Cursor**: Expands to wrap around interactive elements (buttons, cards) with a magnetic effect
- **Text Cursor**: A vertical bar that adapts to the line height of text elements

### ✨ Interactive Effects

- **Magnetic Pull**: Elements and cursor move together toward your mouse position
- **Dynamic Lighting**: Gradient lighting effect that follows mouse movement on block elements
- **Click Animation**: Smooth scale-down effect when clicking (0.1s duration)
- **Smart Padding**: Block cursor maintains uniform padding on all sides

### ⚙️ Easy Configuration

All cursor behavior can be customized through a single config file (`src/components/cursor/cursorConfig.ts`):

- Padding percentages and minimums
- Animation spring settings
- Magnetic strength
- Colors and gradients
- Click behavior
- Text cursor dimensions

### 🎨 Adaptive Design

- **Auto-detection**: Automatically detects border radius from child elements
- **Line Height Matching**: Text cursor height matches the actual text line height
- **Responsive Sizing**: Block cursor padding scales with element size

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install
# or
npm install
```

### Development

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

### Usage

1. **Wrap your app with the CursorProvider** (in `app/layout.tsx`):

```tsx
import { CursorProvider } from '@/components/cursor/CursorProvider';
import { Cursor } from '@/components/cursor/Cursor';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CursorProvider>
          <Cursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
```

2. **Wrap interactive elements with CursorTarget**:

```tsx
import { CursorTarget } from '@/components/cursor/CursorTarget';

// For buttons and interactive blocks
<CursorTarget>
  <button>Click Me</button>
</CursorTarget>

// For text
<CursorTarget type="text">
  <p>Hover over this text</p>
</CursorTarget>
```

## Customization

Edit `src/components/cursor/cursorConfig.ts` to customize:

```typescript
export const cursorConfig = {
  block: {
    paddingPercent: 0.10,        // 10% padding
    paddingMin: 10,              // Minimum 10px
    paddingClickedPercent: 0.07, // 7% when clicked
    paddingClickedMin: 7,        // Minimum 7px when clicked
  },
  magnetic: {
    strength: 0.8,               // Magnetic pull strength (0-1)
    lightingMultiplier: 4,       // Lighting effect intensity
  },
  colors: {
    blockBackground: "rgba(24, 5, 5, 0.08)",
    defaultBackground: "rgba(150, 150, 150, 0.5)",
  },
  // ... and more!
};
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Framer Motion (motion)** - Animation library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **pnpm** - Package manager

## Architecture

```
src/components/cursor/
├── cursorConfig.ts      # Centralized configuration
├── CursorProvider.tsx   # Context provider for cursor state
├── Cursor.tsx           # Main cursor component
└── CursorTarget.tsx     # Wrapper for interactive elements
```

## Browser Support

Works in all modern browsers that support CSS transforms and the Pointer Events API.

## Credits

This implementation was inspired by and incorporates logic from [ipad-cursor](https://github.com/CatsJuice/ipad-cursor) by CatsJuice.

You can see their original implementation demo at [https://cursor.oooo.so/](https://cursor.oooo.so/)

## License

MIT

