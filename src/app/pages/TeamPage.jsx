"use client";

import Image from "next/image";
import { useSiteSettings } from '../context/SiteSettingsContext';

const TeamPage = () => {
  const { siteSettings } = useSiteSettings();
  const { teamTitle, teamMembers } = siteSettings;

  console.log('TeamPage rendering with settings:', { teamTitle, teamMembers });

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          {teamTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src={member.image || "/images/default-avatar.jpg"}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
