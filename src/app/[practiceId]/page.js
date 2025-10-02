"use client";

import React from "react";
import { use } from "react";
import dynamic from 'next/dynamic';
import Navbar from "../pages/Navbar"
import FooterPage from "../pages/FooterPage";
import { SiteSettingsProvider } from "../context/SiteSettingsContext";

// Dynamically import PracticePageClient with no SSR to ensure client-side only rendering
const PracticePageClient = dynamic(
  () => import('./PracticePageClient'),
  { ssr: false }
);

// Function to check if the identifier is a customer code
// Could be in format -DEMO- or alphanumeric like E007
function isCustomerCode(identifier) {
  // Check if it's in the format -DEMO- (starts and ends with a dash)
  if (/^-.+-$/.test(identifier)) return true;
  
  // Check if it's alphanumeric (letters and numbers only, no spaces or special chars)
  if (/^[a-zA-Z0-9]+$/.test(identifier)) {
    // If it's all digits, it's more likely a practice ID
    if (/^\d+$/.test(identifier)) return false;
    // Otherwise, treat it as a customer code
    return true;
  }
  
  return false;
}

export default function PracticePage({ params }) {
  const { practiceId: identifier } = use(params);
  const isCode = isCustomerCode(identifier);

  if (!identifier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Invalid Identifier</h2>
          <p className="text-gray-600">Please provide a valid practice identifier or customer code</p>
        </div>
      </div>
    );
  }

  return (
    <SiteSettingsProvider 
      initialPracticeId={isCode ? null : identifier}
      customerCode={isCode ? identifier : null}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <PracticePageClient isCustomerCode={isCode} />
        </main>
        <FooterPage />
      </div>
    </SiteSettingsProvider>
  );
}
