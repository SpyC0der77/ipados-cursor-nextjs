"use client";

import { CursorTarget } from "@/components/cursor/CursorTarget";
import { MoveRight, Star, Heart, MessageCircle, Share2, Play, Pause, SkipForward, SkipBack } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] font-[family-name:var(--font-geist-sans)] selection:bg-blue-100 dark:selection:bg-blue-900/30">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 pb-32">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-24">
          <CursorTarget type="text">
            <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">iPadOS Cursor</span>
          </CursorTarget>
          <div className="flex gap-4">
            <CursorTarget>
              <button className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-full">
                Documentation
              </button>
            </CursorTarget>
            <CursorTarget>
              <button className="px-5 py-2.5 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg shadow-black/5 dark:shadow-white/5 active:scale-95 transition-all">
                Download
              </button>
            </CursorTarget>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center space-y-8 mb-32">
          <div className="space-y-4">
            <CursorTarget type="text">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-500/20">
                New v2.0
              </div>
            </CursorTarget>
            <CursorTarget type="text">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-gray-900 dark:text-white">
                Fluid. Magnetic. <br />
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Alive.</span>
              </h1>
            </CursorTarget>
          </div>
          
          <CursorTarget type="text">
            <p className="max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              A faithful recreation of the iPadOS cursor engine. 
              Hit-testing, magnetic snapping, and fluid text morphism.
            </p>
          </CursorTarget>

          <div className="flex justify-center gap-4">
            <CursorTarget>
              <button className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-semibold text-lg overflow-hidden transition-transform">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </CursorTarget>
          </div>
        </section>

        {/* Bento Grid Showcase */}
        <section className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-3 gap-6">
          
          {/* Music Player Card - Large Square */}
          <div className="md:col-span-3 md:row-span-2 relative group overflow-hidden bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none p-8">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-800/50 pointer-events-none" />
            
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <CursorTarget type="text">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Now Playing</span>
                </CursorTarget>
                <CursorTarget>
                  <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <Heart className="w-5 h-5" />
                  </button>
                </CursorTarget>
              </div>

              <div className="space-y-6">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg flex items-center justify-center text-white text-4xl">
                  🎵
                </div>
                <div>
                  <CursorTarget type="text">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Midnight City</h3>
                  </CursorTarget>
                  <CursorTarget type="text">
                    <p className="text-gray-500 text-lg">M83 • Hurry Up, We're Dreaming</p>
                  </CursorTarget>
                </div>

                {/* Music Controls */}
                <div className="flex items-center gap-6">
                  <CursorTarget>
                    <button className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full">
                      <SkipBack className="w-6 h-6" fill="currentColor" />
                    </button>
                  </CursorTarget>
                  <CursorTarget>
                    <button className="w-16 h-16 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-105 transition-transform shadow-xl">
                      <Pause className="w-6 h-6" fill="currentColor" />
                    </button>
                  </CursorTarget>
                  <CursorTarget>
                    <button className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full">
                      <SkipForward className="w-6 h-6" fill="currentColor" />
                    </button>
                  </CursorTarget>
                </div>
              </div>
            </div>
          </div>

          {/* Social Card - Tall */}
          <div className="md:col-span-2 md:row-span-3 bg-[#1DA1F2]/5 dark:bg-[#1DA1F2]/10 rounded-[2.5rem] p-8 border border-[#1DA1F2]/10 relative overflow-hidden">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1DA1F2] to-[#0d8bd9]" />
                <div>
                  <CursorTarget type="text">
                    <h4 className="font-bold text-gray-900 dark:text-white">Twitter / X</h4>
                  </CursorTarget>
                  <CursorTarget type="text">
                    <p className="text-sm text-gray-500">@ipad_cursor</p>
                  </CursorTarget>
                </div>
              </div>

              <CursorTarget type="text">
                <p className="text-xl leading-relaxed text-gray-900 dark:text-white font-medium">
                  The magnetic interaction model is fascinating. It's not just about snapping; it's about <span className="text-[#1DA1F2]">intent prediction</span>.
                </p>
              </CursorTarget>

              <div className="pt-4 border-t border-gray-200/50 dark:border-white/5 flex justify-between">
                <CursorTarget>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#1DA1F2]/10 text-gray-600 dark:text-gray-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">24</span>
                  </button>
                </CursorTarget>
                <CursorTarget>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-500/10 text-gray-600 dark:text-gray-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">12</span>
                  </button>
                </CursorTarget>
                <CursorTarget>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-pink-500/10 text-gray-600 dark:text-gray-400 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">182</span>
                  </button>
                </CursorTarget>
              </div>
            </div>
          </div>

          {/* Metrics Card - Small */}
          <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-orange-400 to-pink-500 rounded-[2rem] p-6 text-white flex flex-col justify-between shadow-lg">
             <CursorTarget type="text">
               <span className="text-sm font-medium text-white/80">Revenue</span>
             </CursorTarget>
             <div>
               <CursorTarget type="text">
                 <h3 className="text-3xl font-bold tracking-tight">$84.2k</h3>
               </CursorTarget>
               <CursorTarget type="text">
                 <span className="text-xs bg-white/20 px-2 py-1 rounded-full mt-2 inline-block">+12.5%</span>
               </CursorTarget>
             </div>
          </div>

          {/* Active Users - Small */}
           <div className="md:col-span-1 md:row-span-1 bg-white dark:bg-gray-800 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
             <div className="flex justify-between items-start">
               <CursorTarget type="text">
                 <span className="text-sm font-medium text-gray-500">Users</span>
               </CursorTarget>
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             </div>
             <CursorTarget type="text">
               <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">2.4k</h3>
             </CursorTarget>
          </div>

          {/* Action Row - Wide */}
          <div className="md:col-span-3 md:row-span-1 bg-gray-900 dark:bg-white rounded-[2.5rem] p-8 flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10 max-w-sm">
              <CursorTarget type="text">
                <h3 className="text-2xl font-bold text-white dark:text-black mb-2">Ready to ship?</h3>
              </CursorTarget>
              <CursorTarget type="text">
                <p className="text-gray-400 dark:text-gray-600">Integrate in less than 5 minutes.</p>
              </CursorTarget>
            </div>
            
            <div className="flex gap-4 relative z-10">
              <CursorTarget>
                <button className="h-14 px-8 rounded-2xl bg-white/10 dark:bg-black/5 text-white dark:text-black font-semibold backdrop-blur-md border border-white/10 dark:border-black/5 hover:bg-white/20 transition-colors">
                  Copy
                </button>
              </CursorTarget>
              <CursorTarget>
                <button className="h-14 px-8 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow">
                  Install
                </button>
              </CursorTarget>
            </div>

            {/* Decor code bg */}
            <div className="absolute right-[-50px] top-[-50px] opacity-10 rotate-12 pointer-events-none select-none">
              <pre className="text-xs text-white dark:text-black font-mono">
                {`npm install @ipad-cursor
import { Cursor } from ...`}
              </pre>
            </div>
          </div>

          {/* Footer Card */}
           <div className="md:col-span-1 md:row-span-1 bg-gray-100 dark:bg-gray-800/50 rounded-[2rem] flex items-center justify-center p-6 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors group">
              <CursorTarget>
                <button className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 group-hover:text-blue-500 transition-colors">
                  <Star className="w-8 h-8" />
                  <span className="text-xs font-semibold uppercase">Github</span>
                </button>
              </CursorTarget>
           </div>

        </section>

        {/* Footer */}
        <footer className="mt-32 text-center text-gray-400 dark:text-gray-600">
           <CursorTarget type="text">
             <p className="text-sm">Designed with absolute precision.</p>
           </CursorTarget>
        </footer>

      </div>
    </div>
  );
}
