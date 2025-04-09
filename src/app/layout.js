"use client"

import localFont from "next/font/local";
import "./globals.css";
import { SiteSettingsProvider, useSiteSettings } from './context/SiteSettingsContext';
import { useState, useEffect } from "react";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function LayoutContent({ children }) {
  const { siteSettings, isLoading } = useSiteSettings();
  const [title, setTitle] = useState("Lumina Blue");

  useEffect(() => {
    if (siteSettings?.name) {
      setTitle(siteSettings.name);
    }
  }, [siteSettings]);

  return (
    <html lang="en">
      <Head>
        <title>{isLoading ? "Loading..." : title}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <SiteSettingsProvider>
      <LayoutContent>{children}</LayoutContent>
    </SiteSettingsProvider>
  );
}
