// src/app/pages/PaiaManualPage.jsx
import React from "react";
import PropTypes from "prop-types";
import FooterPage from "../pages/FooterPage";

/**
 * PAIAManual
 *
 * A clean, professional React component that renders a Promotion of Access to Information Act (PAIA)
 * manual. Designed to be print-friendly and suitable for legal / compliance pages.
 *
 * Props
 * - practiceName: string - the organisation or practice name
 * - address: string - physical/postal address
 * - telephone: string
 * - email: string
 *
 * Notes
 * - Styling uses Tailwind utility classes. If your project does not use Tailwind, replace classes
 *   or add a small stylesheet to match your brand.
 */
export default function PaiaManualPage({
  practiceName,
  address,
  telephone,
  email,
  className = "",
}) {
  return (
    <div>
    <article className={`prose-lg mx-auto my-8 p-6 bg-white rounded-md shadow ${className}`}>
      <header>
        <h1 className="text-2xl font-semibold">{practiceName} — PAIA Manual</h1>
        <hr className="my-4" />
      </header>

      <section>
        <h2 className="text-xl font-medium">1. Introduction</h2>
        <p>
          The Promotion of Access to Information Act, No. 2 of 2000 (PAIA) gives effect to the constitutional
          right of access to information held by public and private bodies. {practiceName} acknowledges the
          importance of transparency and accountability and is committed to fulfilling its obligations under
          PAIA.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-medium">2. Contact Details</h2>
        <dl className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            <dt className="font-semibold">Organization's Name</dt>
            <dd>{practiceName}</dd>
          </div>
          <div>
            <dt className="font-semibold">Physical Address</dt>
            <dd>{address}</dd>
          </div>
          <div>
            <dt className="font-semibold">Postal Address</dt>
            <dd>{address}</dd>
          </div>
          <div>
            <dt className="font-semibold">Telephone Number</dt>
            <dd>{telephone}</dd>
          </div>
          <div>
            <dt className="font-semibold">Email</dt>
            <dd>{email}</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-xl font-medium">3. Guide to Using the Manual</h2>
        <p>
          This manual provides information about the types of records held by {practiceName} and how members of the
          public can access them. It also outlines the procedures for requesting access to records and the fees
          associated with such requests.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-medium">4. The Structure of the Organization</h2>

        <h3 className="font-semibold">Departments</h3>
        <ul className="list-disc list-inside">
          <li><strong>Administration:</strong> Responsible for overall management and coordination of organizational activities, including human resources, finance, and facilities management.</li>
          <li><strong>Operations:</strong> Handles day-to-day operational tasks, ensuring efficient workflow and resource allocation.</li>
          <li><strong>Sales and Marketing:</strong> Focuses on promoting products and services, managing customer relationships, and driving growth.</li>
          <li><strong>Research and Development:</strong> Conducts research, innovation, and product development initiatives.</li>
          <li><strong>Customer Service:</strong> Provides support and assistance to customers, addressing inquiries and resolving issues.</li>
        </ul>

        <h3 className="font-semibold mt-4">Divisions</h3>
        <ul className="list-disc list-inside">
          <li><strong>Product Division:</strong> Manages development, production, and distribution of product lines.</li>
          <li><strong>Geographic Division:</strong> Organizes operations by region to cater to diverse market needs.</li>
          <li><strong>Strategic Business Units (SBUs):</strong> Specialized units based on specific market segments or product categories.</li>
        </ul>

        <h3 className="font-semibold mt-4">Key Personnel</h3>
        <ul className="list-disc list-inside">
          <li><strong>CEO (Chief Executive Officer):</strong> Provides overall strategic direction and leadership.</li>
          <li><strong>CFO (Chief Financial Officer):</strong> Manages financial planning, budgeting and reporting.</li>
          <li><strong>COO (Chief Operating Officer):</strong> Oversees day-to-day operations and process optimisation.</li>
          <li><strong>CMO (Chief Marketing Officer):</strong> Leads marketing strategies and initiatives.</li>
          <li><strong>CTO (Chief Technology Officer):</strong> Guides technology decisions and innovation efforts.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-medium">5. Records Available in Terms of Other Legislation</h2>
        <ul className="list-disc list-inside">
          <li><strong>Companies Act:</strong> Records related to company incorporation, shareholder information, director appointments, financial statements, and annual returns.</li>
          <li><strong>Income Tax Act:</strong> Records pertaining to tax obligations, financial statements, payroll records, and correspondence with tax authorities.</li>
          <li><strong>Labour Legislation:</strong> Employment contracts, remuneration records, leave records, disciplinary proceedings, and health and safety compliance documentation.</li>
          <li><strong>Consumer Protection Legislation:</strong> Records concerning consumer transactions, warranties, refunds and complaints.</li>
          <li><strong>Financial Regulations:</strong> Additional records to comply with regulatory bodies such as the Financial Sector Conduct Authority or the Reserve Bank.</li>
          <li><strong>Environmental Regulations:</strong> Records related to environmental assessments, permits and sustainability initiatives.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-medium">6. Access to the Records Held</h2>
        <ul className="list-disc list-inside">
          <li><strong>Financial Records:</strong> Invoices, receipts, bank statements, budget reports and financial statements.</li>
          <li><strong>Personnel Records:</strong> Employment contracts, performance evaluations, training records, leave requests and disciplinary records.</li>
          <li><strong>Policies and Procedures:</strong> Official organisational policies and guidelines on matters such as HR, finance and operations.</li>
          <li><strong>Contracts and Agreements:</strong> Client contracts, supplier agreements, partnership agreements and leases.</li>
          <li><strong>Marketing and Sales Records:</strong> Campaign records, sales reports and customer feedback.</li>
          <li><strong>Health and Safety Records:</strong> Protocols, incident reports and compliance documentation.</li>
          <li><strong>Intellectual Property Records:</strong> Trademarks, copyrights, patents and related documentation.</li>
          <li><strong>Compliance Records:</strong> Documentation demonstrating compliance with relevant laws and standards.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-medium">7. Procedures to Access Records</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Submit a Written Request:</strong> Submit a written request for access to records to the designated Information Officer. Include details of the records and contact info.</li>
          <li><strong>Use Prescribed Form:</strong> Requesters may need to use a prescribed form provided by the organisation.</li>
          <li><strong>Provide Identification:</strong> Proof of ID may be required (ID, driver's license, passport).</li>
          <li><strong>Pay Applicable Fees:</strong> Fees may be payable in accordance with relevant legislation.</li>
          <li><strong>Processing Time:</strong> Requests processed within PAIA stipulated timeframe.</li>
          <li><strong>Receive Response:</strong> Written response indicating approval or denial; if approved, arrangements for inspection or copies.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-medium">8. Availability of the Manual</h2>
        <p>This manual is available for inspection at {practiceName} during normal office hours.</p>
      </section>

      <footer className="mt-8 pt-4 border-t">
        <p className="text-sm">Last updated: {new Date().getFullYear()}</p>
      </footer>
    </article>
    <FooterPage/>
    </div>
  );
}



