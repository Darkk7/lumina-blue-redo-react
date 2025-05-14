"use client";

import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function PracticeSelector() {
  const { updatePracticeId, siteSettings } = useSiteSettings();
  const [practiceId, setPracticeId] = useState(siteSettings.practiceId);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePracticeId(practiceId);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={practiceId}
          onChange={(e) => setPracticeId(e.target.value)}
          placeholder="Enter Practice ID"
          className="px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Load Practice
        </button>
      </form>
    </div>
  );
}
