"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const SiteSettingsContext = createContext();

const getDefaultSettings = (practiceId) => ({
  practiceId,
  primaryColor: practiceId === '8' ? 'green' : 'orange',
  counterSettings: {
    brands: 0,
    frames: 0,
    customers: 0,
    experience: 0
  },
  show_counters_panel: true,
  show_custom_panel: true,
  show_socials_panel: true,
  show_teams_panel: true,
  show_youtube_panel: true,
  aboutText: "",
  about: {},
  member: {
    member: []
  },
  services: [],
  service_description: {},
  brands: [],
  banners: [],
  reviews: {
    review: []
  },
  statitems: [],
  name: "",
  address_1: ""
});

export function SiteSettingsProvider({ children, initialPracticeId }) {
  const [siteSettings, setSiteSettings] = useState(getDefaultSettings(initialPracticeId));
  const [practiceId, setPracticeId] = useState(initialPracticeId);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Site Settings:', siteSettings); 
    let isMounted = true;

    async function fetchPracticeData() {
      if (!practiceId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`https://www.eyecareportal.com/api/website/${practiceId}/0`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch practice data: ${response.status}`);
        }

        const response2 = await fetch(`https://www.ocumail.com/api/settings?setting_object_id=${practiceId}&setting_object_type=Practice`);

        console.log('Response2 Status:', response2.status);
        console.log('Response2 Headers:', response2.headers);

        if (!response2.ok) {
          const errorData2 = await response2.json();
          throw new Error(errorData2.error || `Failed to fetch practice data: ${response2.status}`);
        }

        const data = await response.json();
        const data2 = await response2.json();

        console.log('Data from new API:', data2);

        const primaryColorSetting = data2.find(setting => setting.setting_name === "PrimaryColor");
        const primaryColor = primaryColorSetting ? primaryColorSetting.setting_value : 'orange';

        document.documentElement.style.setProperty('--primary-color', primaryColor);

        const settings = {
          practiceId,
          primaryColor,
          counterSettings: {
            brands: Number(data.statstems?.find(s => s.label === "Number of Brands")?.value) || 0,
            frames: (data.featured_services?.length || 0) * 500,
            customers: (data.reviews?.length || 0) * 500,
            experience: Math.floor(Math.random() * 20) + 5
          },
          show_counters_panel: data.practice_website?.show_counters_panel,
          show_custom_panel: data.practice_website?.show_custom_panel,
          show_socials_panel: data.practice_website?.show_socials_panel,
          show_teams_panel: data.practice_website?.show_teams_panel,
          show_youtube_panel: data.practice_website?.show_youtube_panel,
          aboutText: data.about?.body || "",
          about: data.about,
          teamTitle: Array.isArray(data.team) && data.team.length > 0 ? "Meet Our Expert Team" : "Our Team",
          teamMembers: Array.isArray(data.team) ? data.team.map(member => ({
            id: member.id,
            name: member.name || "Team Member",
            qualification: member.qualification || "Eye Care Professional",
            img: member.img || "/images/default-avatar.jpg"
          })) : [],
          services: data.services?.map(service => ({
            id: service.id,
            title: service.service_title,
            description: service.long_description,
            iconDescription: service.icon_description
          })) || [],
          banners: data.banners?.map(banner => ({
            id: banner.id,
            title: banner.banner_title,
            titleFontSize: banner.banner_title_font_size,
            text: banner.banner_text,
            textFontSize: banner.banner_text_font_size,
            titleGoogleFont: banner.banner_title_google_font,
            textGoogleFont: banner.banner_text_google_font,
            bannerImg: banner.img,
            buttonText: banner.button_text,
            buttonLink: banner.button_link
          })) || [],
          service_description: data.service_description || {},
          brands: data.brands?.map(brand => ({
            id: brand.id,
            name: brand.name,
            img: brand.img,
            brand_url: brand.brand_url,
            order_number: brand.order_number,
            show: brand.show
          })) || [],
          reviews: {
            review: data.reviews || []
          },
          member: {
            member: data.member || []
          },
          statitems: data.statitems || [],
          name: data.name || [],
          address_1: data2.address_1 || []
        };

        console.log('Transformed settings:', settings);
        setSiteSettings(settings);
        setError(null);
      } catch (error) {
        console.error('Error fetching practice data:', error);
        if (isMounted) {
          setError(error.message);
          setSiteSettings(prev => ({
            ...prev,
            practiceId,
            primaryColor: practiceId === '8' ? 'green' : 'orange'
          }));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPracticeData();

    return () => {
      isMounted = false;
    };
  }, [practiceId]);

  useEffect(() => {
    console.log('Site Settings:', siteSettings); 
  }, [siteSettings]);

  const value = {
    siteSettings,
    error,
    isLoading,
    updateSettings: (newSettings) => setSiteSettings(newSettings),
    setPracticeId
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}