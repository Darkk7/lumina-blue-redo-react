"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useParams } from 'next/navigation';

const RecentBlogs = () => {
  const { siteSettings } = useSiteSettings();
  const params = useParams();
  const practiceId = params?.practiceId || siteSettings?.practiceId;

  // Get blogs from site settings and ensure they have all required fields
  const blogs = siteSettings?.blogs?.map(blog => ({
    id: blog.id,
    imgSrc: blog.image_url || blog.imgSrc || '/images/placeholder-blog.jpg',
    title: blog.title,
    date: blog.created_at || blog.date || new Date().toISOString(),
  })) || [];

  // Sort blogs by date and take the most recent 4
  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          News Feed
        </h2>
        <p className="text-center text-black mb-8">
          Dive into our news feed for a deeper look into eye health and better vision.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentBlogs.map((blog, idx) => (
            <Link 
              key={blog.id} 
              href={`/website/${practiceId}/blog/${idx + 1}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <div className="relative w-full aspect-[1/1]">
                <Image
                  src={blog.imgSrc}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary mb-2">{blog.title}</h3>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-primary">Read more {'>'} {'>'}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(blog.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
