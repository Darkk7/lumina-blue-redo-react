"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const RecentBlogs = ({ blogs }) => {
  const [recentBlogsTitle, setRecentBlogsTitle] = useState('');
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    setRecentBlogsTitle('News Feed');
    // Ensure blogs are available and slice only if blogs exist
    if (blogs && blogs.length > 0) {
      setRecentBlogs(blogs.slice(0, 4)); // Get the 4 most recent blogs
    }
  }, [blogs]);

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          {recentBlogsTitle}
        </h2>
        <p style={{ textAlign: 'center', color: 'black' }}>
          Dive into our news feed for a deeper look into eye health and better vision.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
              <div className="relative w-full aspect-[1/1]">
                <Image
                  src={blog.imgSrc}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm">Read more {'>'} {'>'} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
