"use client";

import { CursorTarget } from "@/components/cursor/CursorTarget";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center space-y-4">
        <CursorTarget type="text">
          <h1 className="text-5xl font-bold tracking-tighter">iPad Cursor Demo</h1>
        </CursorTarget>
        <CursorTarget type="text">
          <p className="text-xl text-gray-500">
            A standalone implementation using Framer Motion.
          </p>
        </CursorTarget>
      </header>

      <main className="flex flex-col gap-8 items-center w-full max-w-2xl">
        <section className="grid grid-cols-2 gap-4 w-full">
          <CursorTarget className="col-span-1">
            <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-40 flex items-center justify-center">
              <span className="font-medium">Block Cursor Card</span>
            </div>
          </CursorTarget>
          
          <CursorTarget className="col-span-1">
            <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-40 flex items-center justify-center">
              <span className="font-medium">Hover Me</span>
            </div>
          </CursorTarget>
        </section>

        <section className="flex gap-4">
          <CursorTarget>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium">
              Button
            </button>
          </CursorTarget>

          <CursorTarget>
            <button className="px-6 py-3 bg-gray-200 text-gray-900 rounded-full font-medium dark:bg-gray-800 dark:text-white">
              Button
            </button>
          </CursorTarget>
        </section>

        <section className="text-center max-w-md space-y-4">
          <CursorTarget type="text">
            <p className="leading-relaxed">
              This text triggers the text cursor. It should turn into a thin vertical bar that follows the mouse. 
              The animation should be smooth and fluid, mimicking the iPadOS experience.
            </p>
          </CursorTarget>
        </section>
      </main>
      
      <footer className="text-sm text-gray-400">
        <CursorTarget type="text">
          <p>Built with Next.js 16 & Motion</p>
        </CursorTarget>
      </footer>
    </div>
  );
}
