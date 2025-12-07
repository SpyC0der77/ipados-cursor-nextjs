"use client";

import { CursorTarget } from "@/components/cursor/CursorTarget";
import { ArrowRight, Copy, Terminal, MousePointer2, Zap, Layout, Code2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] font-[family-name:var(--font-geist-sans)] text-gray-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900/30">
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 pb-32 space-y-32">
        
        {/* Header */}
        <header className="text-center space-y-6 pt-12">
          <CursorTarget type="text">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-xs font-mono mb-4 border border-gray-200 dark:border-gray-800">
              v1.0.0-beta
            </div>
          </CursorTarget>
          <div>
            <CursorTarget type="text">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                iPad Cursor for Web
              </h1>
            </CursorTarget>
            <CursorTarget type="text">
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                A physics-based cursor engine that faithfully recreates the iPadOS interaction model. 
                Zero-config magnetic snapping, auto-radius detection, and scroll-aware tracking.
              </p>
            </CursorTarget>
          </div>
          
          <div className="flex justify-center gap-4">
            <CursorTarget>
              <button className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium text-sm hover:scale-105 active:scale-95 transition-transform">
                <Terminal className="w-4 h-4" />
                NPM Package Coming Soon
              </button>
            </CursorTarget>
            <CursorTarget>
              <a 
                href="https://github.com/SpyC0der77/ipados-cursor-nextjs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-lg font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View Source
              </a>
            </CursorTarget>
          </div>
        </header>

        {/* Component Playground */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <MousePointer2 className="w-5 h-5" />
            </div>
            <CursorTarget type="text">
              <h2 className="text-2xl font-bold">Interactive Playground</h2>
            </CursorTarget>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Buttons Demo */}
            <div className="space-y-8">
              <div className="space-y-2">
                <CursorTarget type="text">
                  <h3 className="font-semibold text-lg">Button Variants</h3>
                </CursorTarget>
                <CursorTarget type="text">
                  <p className="text-sm text-gray-500">The cursor adapts to the shape and size of interactive elements.</p>
                </CursorTarget>
              </div>

              <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-8">
                {/* Primary/Solid */}
                <div className="flex flex-wrap gap-4 items-center">
                  <CursorTarget>
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm">
                      Primary Button
                    </button>
                  </CursorTarget>
                  <CursorTarget>
                    <button className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium text-sm">
                      Pill Shape
                    </button>
                  </CursorTarget>
                </div>

                {/* Secondary/Outline */}
                <div className="flex flex-wrap gap-4 items-center">
                  <CursorTarget>
                    <button className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      Outline
                    </button>
                  </CursorTarget>
                  <CursorTarget>
                    <button className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium text-sm">
                      Secondary
                    </button>
                  </CursorTarget>
                </div>

                {/* Icon Buttons */}
                <div className="flex flex-wrap gap-4 items-center">
                  <CursorTarget>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Layout className="w-4 h-4" />
                    </button>
                  </CursorTarget>
                  <CursorTarget>
                    <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                      <Zap className="w-5 h-5" />
                    </button>
                  </CursorTarget>
                  <CursorTarget>
                    <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-500">
                      Ghost Button
                    </button>
                  </CursorTarget>
                </div>
              </div>
            </div>

            {/* Typography Demo */}
            <div className="space-y-8">
              <div className="space-y-2">
                <CursorTarget type="text">
                  <h3 className="font-semibold text-lg">Smart Text Handling</h3>
                </CursorTarget>
                <CursorTarget type="text">
                  <p className="text-sm text-gray-500">Vertical bar cursor matches line-height and font-size automatically.</p>
                </CursorTarget>
              </div>

              <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
                <div>
                  <CursorTarget type="text">
                    <h1 className="text-4xl font-bold tracking-tight">Display Heading</h1>
                  </CursorTarget>
                </div>
                <div>
                  <CursorTarget type="text">
                    <h2 className="text-2xl font-semibold">Section Title</h2>
                  </CursorTarget>
                </div>
                <div className="space-y-4">
                  <CursorTarget type="text">
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      This is a standard paragraph showing how the cursor flows over body text. 
                      It morphs into a thin vertical bar that aids in text selection and readability.
                    </p>
                  </CursorTarget>
                  <CursorTarget type="text">
                    <p className="text-sm text-gray-500">
                      <span className="font-mono text-blue-500">const</span> <span className="text-purple-500">developerMode</span> = <span className="text-orange-500">true</span>;
                    </p>
                  </CursorTarget>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Code2 className="w-5 h-5" />
            </div>
            <CursorTarget type="text">
              <h2 className="text-2xl font-bold">How It Works</h2>
            </CursorTarget>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-800">
                <Zap className="w-6 h-6" />
              </div>
              <CursorTarget type="text">
                <h3 className="font-bold text-lg">Motion Spring Physics</h3>
              </CursorTarget>
              <CursorTarget type="text">
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  The cursor core is built on <strong>Motion</strong> (formerly Framer Motion). We use independent <code>useSpring</code> hooks for X/Y coordinates, width, height, and radius. This ensures that every state transition—whether entering a button or moving between text lines—is interpolated with fluid, organic momentum (stiffness: 300, damping: 25) rather than linear tweening.
                </p>
              </CursorTarget>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-800">
                <Layout className="w-6 h-6" />
              </div>
              <CursorTarget type="text">
                <h3 className="font-bold text-lg">Reconciliation Loop</h3>
              </CursorTarget>
              <CursorTarget type="text">
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  To handle scroll-aware hit testing without performance overhead, we run a single <code>requestAnimationFrame</code> loop. This loop constantly polls <code>document.elementFromPoint</code> to determine the active target, bypassing the need for thousands of <code>onMouseEnter</code> listeners. This decouples the physics engine from React's render cycle, ensuring 60fps performance even on complex pages.
                </p>
              </CursorTarget>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-800">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <CursorTarget type="text">
                <h3 className="font-bold text-lg">Magnetic Projection</h3>
              </CursorTarget>
              <CursorTarget type="text">
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  The magnetic effect isn't just a CSS transform. We calculate the delta between the mouse pointer and the element's center, then apply a clamped spring force. We directly manipulate the DOM element's <code>transform: translate3d(...)</code> property inside the physics frame, allowing the button to "pull" towards the cursor up to a defined limit (e.g., 40% of its size) before breaking free.
                </p>
              </CursorTarget>
            </div>
          </div>

          {/* Usage Example */}
          <div className="rounded-2xl bg-[#0d1117] border border-gray-800 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-[#161b22]">
              <div className="w-3 h-3 rounded-full bg-[#fa7970]" />
              <div className="w-3 h-3 rounded-full bg-[#faa356]" />
              <div className="w-3 h-3 rounded-full bg-[#7ce38b]" />
              <span className="ml-2 text-xs text-gray-500 font-mono">ExampleUsage.tsx</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono text-gray-300">
{`import { CursorTarget } from "@ipad-cursor/react";

export function MyComponent() {
  return (
    <div className="flex gap-4">
      {/* Interactive Button (Block Cursor) */}
      <CursorTarget>
        <button className="btn-primary">
          Submit Form
        </button>
      </CursorTarget>

      {/* Text Content (Bar Cursor) */}
      <CursorTarget type="text">
        <h1>Welcome to the future</h1>
      </CursorTarget>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
