"use client";

import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

function App() {
  const handleDownloadClick = () => {
    alert("New version launching soon! Stay tuned.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img
                src="/icons/icon.png" // Adjust this path based on your icon's location
                alt="CapIQ Logo"
                width={32}
                height={32}
                className="text-indigo-600"
              />
              <span className="text-xl font-bold text-gray-900">CapIQ</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-indigo-600"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-indigo-600"
              >
                Pricing
              </a>
              <a
                href="https://github.com/divyanshunegi/CapIQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600"
              >
                Documentation
              </a>
              <a
                href="https://github.com/divyanshunegi/CapIQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600"
              >
                <GitHubLogoIcon className="w-5 h-5" />
              </a>
              <button
                onClick={handleDownloadClick}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Download for macOS
              </button>
            </nav>

            <button className="md:hidden">
              <HamburgerMenuIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 py-12 md:py-20">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full">
              <MagnifyingGlassIcon className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">
                Intelligent Media Organization
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
              Streamline Your Photo & Video Workflow
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Automate your media organization with AI-powered sorting,
              labeling, and categorization. Perfect for photographers and
              videographers managing large libraries.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleDownloadClick}
                className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Download for macOS</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <a
                href="https://github.com/divyanshunegi/CapIQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-gray-700 px-8 py-3 rounded-lg border border-gray-200 hover:border-indigo-600 transition-colors"
              >
                View Documentation
              </a>
            </div>

            <p className="text-sm text-gray-500">
              Compatible with macOS 11.0 (Big Sur) and later
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto max-w-5xl">
            <div className="bg-gradient-to-b from-indigo-100 to-white rounded-2xl p-4">
              <img
                src="/sample.png"
                alt="CapIQ Interface"
                className="rounded-xl shadow-2xl border border-gray-200"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
