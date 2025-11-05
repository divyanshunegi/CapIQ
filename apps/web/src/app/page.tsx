"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitHubLogoIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Instrument_Serif } from "next/font/google";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import TiltCard from "@/components/ui/tilt-card";
 

const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], style: ["normal"], display: "swap" });

function ParallaxLayers() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let raf = 0;
    let latest = 0;
    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setScrollY(latest);
        raf = 0;
      });
    };
    const onScroll = () => {
      latest = window.scrollY || 0;
      schedule();
    };
    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Gentle parallax with clamps to keep imagery in frame
  const bgTranslate = -Math.min(scrollY * 0.03, 80);
  const fgTranslate = -Math.min(scrollY * 0.14, 240);
  const fgStartOffset = 80; // start mountains slightly lower so user scrolls a bit first

  return (
    <>
      {/* Back layer: original scenery image */}
      <img
        src="/scenery.png"
        alt="Scenery Background"
        className="fixed inset-0 h-screen w-full object-cover z-0 select-none pointer-events-none will-change-transform"
        style={{ transform: `translateX(-2px) translateY(${bgTranslate}px) scale(1.08)` }}
      />
      {/* Front layer: mountains overlay that moves above text */}
      <img
        src="/SceneryMountains.png"
        alt="Scenery Mountains Foreground"
        className="fixed inset-x-0 top-0 h-screen w-full object-cover z-30 select-none pointer-events-none will-change-transform"
        style={{ transform: `translateX(-2px) translateY(${fgStartOffset + fgTranslate}px)` }}
      />
    </>
  );
}

function App() {
  const handleDownloadClick = () => {
    alert("New version launching soon! Stay tuned.");
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  // Butter-smooth scrolling without external deps (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(max-width: 767px)").matches) {
      return; // keep native touch scroll on small screens
    }

    let current = window.scrollY;
    let target = current;
    let rafId = 0;

    const animate = () => {
      const delta = target - current;
      current += delta * 0.08; // smoothing factor
      if (Math.abs(delta) > 0.5) {
        window.scrollTo(0, current);
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = 0;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target += e.deltaY;
      target = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight));
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("wheel", onWheel, { passive: false } as AddEventListenerOptions);
    return () => {
      window.removeEventListener("wheel", onWheel as any);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // No-scroll entrance animation handled by Framer Motion below

  // Track scroll for hero text to sink behind foreground before Features
  const [heroScroll, setHeroScroll] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setHeroScroll(window.scrollY || 0);
          raf = 0;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${instrumentSerif.className} min-h-screen bg-transparent overflow-x-hidden`}>
      {/* Header using Resizable Navbar */}
      <ResizableNavbar className="fixed inset-x-0 top-6 z-[60]">
        <NavBody className="rounded-full border border-white/30 bg-white/30 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm">
            <img src="/icons/icon.png" alt="CapIQ Logo" width={28} height={28} className="rounded" />
            <span className="text-white">CapIQ</span>
          </div>
          <NavItems
            items={[
              { name: "Features", link: "#features" },
              { name: "Pricing", link: "#pricing" },
              { name: "Documentation", link: "https://github.com/divyanshunegi/CapIQ" },
            ]}
            className="text-base lg:text-lg"
          />
          <NavbarButton as="a" href="#" onClick={handleDownloadClick}>
            Download for Mac OS
          </NavbarButton>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center space-x-2">
              <img src="/icons/icon.png" alt="CapIQ Logo" width={24} height={24} className="rounded" />
              <span className="text-white">CapIQ</span>
            </div>
            <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen((o) => !o)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
            <a href="#features" className="w-full py-2" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#pricing" className="w-full py-2" onClick={() => setMobileOpen(false)}>Pricing</a>
            <a href="https://github.com/divyanshunegi/CapIQ" target="_blank" rel="noopener noreferrer" className="w-full py-2" onClick={() => setMobileOpen(false)}>Documentation</a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setMobileOpen(false); handleDownloadClick(); }}
              className="mt-2 inline-block rounded-md bg-black px-4 py-2 text-white"
            >
              Download for Mac OS
            </a>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>

      {/* Hero Section */}
      <main className="pt-0 pb-0">
        <section className="relative isolate overflow-hidden">
          {/* Layers: back scenery, hero text, front mountains */}
          <ParallaxLayers />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Spacer section for layout flow; hero text is fixed */}
            <div className="h-screen" />
          </div>

          {/* Fixed hero text: entrance animation from bottom to middle on load */}
          <motion.div
            className="fixed top-[28vh] left-0 right-0 z-20 w-full px-4 flex justify-center"
            initial={{ y: 240, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 22, mass: 0.9 }}
            style={{ transform: `translateY(calc(-50% + ${Math.min(heroScroll * 0.6, 320)}px))` }}
          >
            <div className="max-w-7xl mx-auto text-center space-y-3 pointer-events-none">
              <h1 className={`text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] text-3xl md:text-5xl lg:text-6xl font-normal max-w-4xl mx-auto leading-snug`}>
                Streamline Your Photo & Video Workflow
              </h1>
              <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-base">
                Automate your media organization with AI-powered sorting, labeling, and categorization.
                Perfect for photographers and videographers managing large libraries.
              </p>
              <div className="flex items-center justify-center pointer-events-auto">
                <button
                  onClick={handleDownloadClick}
                  className="bg-white text-gray-900 px-6 py-3 rounded-full shadow hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Download for Mac OS</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/80">Compatible with macOS 11.0 (Big Sur) and later</p>
            </div>
          </motion.div>
        </section>

        {/* Spacer so hero text can fully sink behind mountains before Features */}
        <div aria-hidden className="relative z-10 h-[35vh] md:h-[40vh]" />

        {/* Straight transition to the next section (rectangle) */}

        {/* Stacked sections: Features sticks, Pricing slides over it */}
        <div className="relative z-10">
          <section id="features" className="sticky top-0 z-10 bg-[#32641A] text-white">
            <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-10">
              <header className="space-y-3">
                <h2 className="text-3xl md:text-4xl inline-flex items-center gap-3">Features <span className="h-px w-24 bg-white/40"></span></h2>
                <p className="text-white/90 max-w-3xl">CapIQ is built to make post‑processing fast, intelligent, and effortless for photographers and videographers.</p>
              </header>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <TiltCard className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <h3 className="text-xl mb-3">Media Intelligence</h3>
                  <ul className="list-disc list-inside space-y-1 text-white/95">
                    <li>AI-powered classification of subjects, locations, and themes.</li>
                    <li>Smart labeling with descriptive tags and captions.</li>
                    <li>Duplicate/similar detection to save storage.</li>
                    <li>Context-aware sorting by event, date, or location.</li>
                  </ul>
                </TiltCard>

                <TiltCard className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <h3 className="text-xl mb-3">AI Automation</h3>
                  <ul className="list-disc list-inside space-y-1 text-white/95">
                    <li>Batch processing to sort, label, and rename at scale.</li>
                    <li>AI summaries for quick understanding of large folders.</li>
                    <li>Face & object recognition (coming soon).</li>
                  </ul>
                </TiltCard>

                <TiltCard className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <h3 className="text-xl mb-3">Workflow Enhancements</h3>
                  <ul className="list-disc list-inside space-y-1 text-white/95">
                    <li>Custom rules and folder structures.</li>
                    <li>Drag‑and‑drop import from SD cards, cameras, or drives.</li>
                    <li>Versioned, non‑destructive edits.</li>
                    <li>Works with Lightroom, DaVinci Resolve, Final Cut Pro.</li>
                  </ul>
                </TiltCard>
              </div>
            </div>
          </section>

          <section id="pricing" className="relative z-20 bg-[#1073C2] text-white">
            <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-10">
              <h2 className="text-3xl md:text-4xl inline-flex items-center gap-3">Pricing <span className="h-px w-24 bg-white/60"></span></h2>
              <p className="text-white/90 max-w-3xl">CapIQ is open source and will always offer a free community edition.</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <TiltCard className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <h3 className="text-xl mb-2">Community (Open Source)</h3>
                  <p className="text-white/90 mb-4">Full access to core features, ideal for individual creators.</p>
                  <div className="text-2xl font-semibold">Free</div>
                  <div className="text-green-300 mt-1">Available Now</div>
                </TiltCard>

                <TiltCard className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <h3 className="text-xl mb-2">Pro (Coming Soon)</h3>
                  <p className="text-white/90 mb-4">Advanced AI modules, multi‑user projects, premium model access.</p>
                  <div className="text-2xl font-semibold">TBD</div>
                  <div className="text-amber-300 mt-1">Planned</div>
                </TiltCard>

                <TiltCard className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <h3 className="text-xl mb-2">Enterprise (Coming Soon)</h3>
                  <p className="text-white/90 mb-4">Custom integrations, priority support, and workflow automation.</p>
                  <div className="text-2xl font-semibold">Custom</div>
                  <div className="text-amber-300 mt-1">Planned</div>
                </TiltCard>
              </div>

              <p className="text-white/90">CapIQ Community Edition is completely free to use and contribute to. Join our Discord to get early access to Pro features during beta testing.</p>
            </div>
          </section>
        </div>

        {/* Documentation section removed; nav points directly to GitHub repository */}

        {/* Footer */}
        <footer className="relative z-10 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <img src="/icons/icon.png" alt="CapIQ Logo" width={24} height={24} className="rounded" />
              <span className="text-gray-800">CapIQ</span>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} CapIQ. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#features" className="hover:text-gray-800">Features</a>
              <a href="#pricing" className="hover:text-gray-800">Pricing</a>
              <a href="https://github.com/divyanshunegi/CapIQ" className="hover:text-gray-800">Documentation</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
