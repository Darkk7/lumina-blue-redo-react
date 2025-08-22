"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import crypto from 'crypto';

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
  address_1: "",
  working_hours: [],
  featured_services: [],
});

function getDailyKey() {
  const today = new Date().toISOString().split('T')[0];
  const dailyKey = crypto.createHash('md5').update(today).digest('hex');
  return dailyKey;
}

export function SiteSettingsProvider({ children, initialPracticeId }) {
  const [siteSettings, setSiteSettings] = useState(getDefaultSettings(initialPracticeId));
  const [practiceId, setPracticeId] = useState(initialPracticeId);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPracticeData() {
      const apiKey = getDailyKey();
      const headers = {
        'Authorization': `Bearer ${apiKey}`
      };

      if (!practiceId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const practiceResponse = await fetch(`https://passport.nevadacloud.com/api/v1/public/practices/${practiceId}`);
        const response = await fetch(`https://www.eyecareportal.com/api/website/${practiceId}/0`, { headers });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch practice data: ${response.status}`);
        }

        const response2 = await fetch(`https://www.ocumail.com/api/settings?setting_object_id=${practiceId}&setting_object_type=Practice`, { headers });

        if (!response2.ok) {
          const errorData2 = await response2.json();
          throw new Error(errorData2.error || `Failed to fetch practice data: ${response2.status}`);
        }

        const data = await response.json();
        const data2 = await response2.json();
        const data3 = await practiceResponse.json();

        const primaryColorSetting = data2.find(setting => setting.setting_name === "PrimaryColor");
        const primaryColor = primaryColorSetting ? primaryColorSetting.setting_value : 'orange';

        const addressObject = data2.find(obj => obj.setting_name === "Address1");        

        document.documentElement.style.setProperty('--primary-color', primaryColor);

        function parseWorkingHours(hoursString) {
          const daysMap = {
            '0': '0',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7'
          };

          return hoursString.split(';').map(entry => {
            const [days, start, end] = entry.split('-');
            const dayNames = days.split('|').map(day => daysMap[day] || day).join(', ');
            return {
              days: dayNames,
              start: start || '',
              end: end || '',
              open: start !== 'Closed'
            };
          });
        }

        const workingHours = parseWorkingHours(data3.hours);

        const settings = {
          practiceId,
          primaryColor,
          working_hours: workingHours,
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
          team: data.team || [],
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
            iconDescription: service.icon_desc,
            image_name: service.image_name
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
          name: data3.name || [],
          short_name: data3.short_name || [],
          address_1: data3.address_1 || [],
          tel: data3.tel || [],
          email: data3.email || [],
          facebook_url: data3.facebook_url || [],
          instagram_url: data3.instagram_url || [],
          linkedin_url: data3.linkedin_url || [],
          pinterest_url: data3.pinterest_url || [],
          whatsapp_tel: data3.whatsapp_tel || [],
          tiktok_url: data3.tiktok_url || [],
          google_business_profile_url: data3.google_business_profile_url || [],
          featured_services: data.featured_services || [],
        };

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