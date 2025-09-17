// src/app/pages/PaiaManualPage.jsx
"use client";

import React from "react";
import FooterPage from "../pages/FooterPage";
import { useSiteSettings } from "../context/SiteSettingsContext";

export default function PaiaManualPage() {
  const { siteSettings: fetchedSettings, isLoading, error } = useSiteSettings();

  // Fallback / default data
  const fallbackSettings = {
    name: "Demo Practice",
    short_name: "Demo Practice",
    address_1: "123 Demo Street",
    tel: "+27 123 456 7890",
    email: "info@demo.com",
    primaryColor: "#1f2937",
    working_hours: [
      { days: "Monday - Friday", start: "08:00", end: "17:00", open: true },
      { days: "Saturday", start: "08:00", end: "12:00", open: true },
      { days: "Sunday", open: false },
    ],
  };

  const siteSettings = fetchedSettings || fallbackSettings;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading PAIA Manual...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠</div>
          <p className="text-red-600 text-lg font-medium mb-2">Failed to Load PAIA Manual</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Extract data safely
  const practiceName = siteSettings.name || siteSettings.short_name || "Practice Name";
  const practiceAddress = siteSettings.address_1 || "Physical address not available";
  const practicePhone = siteSettings.tel || "Contact number not available";
  const practiceEmail = siteSettings.email || "Email not available";

  // Format working hours
  const workingHours = Array.isArray(siteSettings.working_hours)
    ? siteSettings.working_hours.map((schedule) => ({
        days: schedule.days || "N/A",
        hours: schedule.open ? `${schedule.start || "N/A"} - ${schedule.end || "N/A"}` : "Closed",
      }))
    : [{ days: "N/A", hours: "N/A" }];

  const currentYear = new Date().getFullYear();

  return (
    <div
      className="bg-gray-50 min-h-screen"
      style={{ "--primary-color": siteSettings.primaryColor || "#1f2937" }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-2">PAIA Manual</h1>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">{practiceName}</h2>
          <div className="w-24 h-1 bg-[var(--primary-color)] mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Document Info */}
          <div className="bg-gray-100 px-8 py-4 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
              <span className="font-medium">Promotion of Access to Information Act Manual</span>
              <span>Last Updated: {currentYear}</span>
            </div>
          </div>

          <div className="px-8 py-8 prose prose-lg max-w-none">
            {/* 1. Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-6 pb-2 border-b-2 border-gray-200">1. Introduction</h2>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                <p className="text-gray-700 leading-relaxed">
                  The Promotion of Access to Information Act, No. 2 of 2000 (PAIA) gives effect to the constitutional 
                  right of access to information held by public and private bodies. <strong>{practiceName}</strong> acknowledges the 
                  importance of transparency and accountability and is committed to fulfilling its obligations under PAIA.
                </p>
              </div>
            </section>

            {/* 2. Contact Details */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-6 pb-2 border-b-2 border-gray-200">2. Contact Details of Information Officer</h2>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Practice Information</h3>
                </div>
                <div className="p-6">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <dt className="font-semibold text-gray-700 mb-1">Organization Name</dt>
                        <dd className="text-gray-600 bg-gray-50 p-3 rounded">{practiceName}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-700 mb-1">Physical Address</dt>
                        <dd className="text-gray-600 bg-gray-50 p-3 rounded">{practiceAddress}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-700 mb-1">Postal Address</dt>
                        <dd className="text-gray-600 bg-gray-50 p-3 rounded">{practiceAddress}</dd>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <dt className="font-semibold text-gray-700 mb-1">Telephone Number</dt>
                        <dd className="text-gray-600 bg-gray-50 p-3 rounded">{practicePhone}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-700 mb-1">Email Address</dt>
                        <dd className="text-gray-600 bg-gray-50 p-3 rounded">{practiceEmail}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-700 mb-1">Business Hours</dt>
                        <dd className="text-gray-600 bg-gray-50 p-3 rounded">
                          {workingHours.map((schedule, i) => (
                            <div key={i} className="flex justify-between">
                              <span>{schedule.days}:</span>
                              <span>{schedule.hours}</span>
                            </div>
                          ))}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            {/* 3. Guide to Using Manual */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-6 pb-2 border-b-2 border-gray-200">3. Guide to Using this Manual</h2>
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-400">
                <p className="text-gray-700 leading-relaxed">
                  This manual provides comprehensive information about the types of records held by <strong>{practiceName}</strong> and 
                  the procedures for accessing them. It outlines the request process, associated fees, and the rights and 
                  obligations of both the organization and information requesters under PAIA.
                </p>
              </div>
            </section>

            {/* 5. Records Available */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-6 pb-2 border-b-2 border-gray-200">5. Records Available in Terms of Other Legislation</h2>
              <div className="space-y-4">
                {[
                  { title: "Companies Act Records", description: "Company incorporation documents, shareholder info, director appointments, financial statements, and annual returns." },
                  { title: "Income Tax Act Records", description: "Tax obligations, financial statements, payroll records, correspondence with tax authorities." },
                  { title: "Labour Relations Records", description: "Employment contracts, remuneration, leave, disciplinary proceedings, health and safety compliance." },
                  { title: "Consumer Protection Records", description: "Consumer transactions, warranties, refunds, and complaint records." },
                  { title: "Healthcare Regulations", description: "Professional registration certificates, patient care protocols, medical equipment, and regulatory compliance." },
                  { title: "Financial Sector Records", description: "Audit reports and compliance documents required by financial regulatory bodies." }
                ].map((record, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2">{record.title}</h4>
                    <p className="text-gray-600">{record.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Categories of Records Held */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-6 pb-2 border-b-2 border-gray-200">6. Categories of Records Held</h2>
              <div className="space-y-4">
                {[
                  { category: "Financial Records", items: "Invoices, receipts, bank statements, budget reports, financial statements, audit documentation." },
                  { category: "Personnel Records", items: "Employment contracts, performance evaluations, training records, leave requests, disciplinary records." },
                  { category: "Operational Policies", items: "Organizational policies, procedures, and guidelines covering HR, finance, operations, and patient care." },
                  { category: "Legal Agreements", items: "Client contracts, supplier agreements, partnership agreements, leases, professional indemnity documents." },
                  { category: "Patient Records", items: "Medical records, treatment histories, appointment schedules, patient communication records." },
                  { category: "Regulatory Compliance", items: "Professional registration documents, health and safety protocols, incident reports, regulatory correspondence." },
                  { category: "Intellectual Property", items: "Trademarks, copyrights, proprietary procedures." },
                  { category: "Marketing Materials", items: "Campaign records, promotional materials, website content, customer feedback." }
                ].map((record, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-[var(--primary-color)] mb-3">{record.category}</h4>
                    <p className="text-gray-600">{record.items}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Request Process */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-6 pb-2 border-b-2 border-gray-200">7. Request Process</h2>
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                <p className="text-gray-700 leading-relaxed">
                  All requests for access to information must be submitted in writing to the Information Officer at the 
                  contact details above. Requests must specify the information sought and the preferred format for access. Processing fees may apply as prescribed by PAIA regulations.
                </p>
              </div>
            </section>
          </div>

          {/* Footer Info */}
          <div className="bg-gray-100 px-8 py-6 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
              <div>
                <p className="font-medium">{practiceName} - PAIA Manual</p>
                <p>Compiled in accordance with the Promotion of Access to Information Act, No. 2 of 2000</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p>Document Version: 1.0</p>
                <p>Last Updated: {currentYear}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <FooterPage />
    </div>
  );
}
