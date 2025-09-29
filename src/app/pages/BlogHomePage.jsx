"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProxiedImageUrl } from "@/utils/imageProxy";

const BlogHomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Get the practice_id from the URL or use a default
        const practiceId = new URLSearchParams(window.location.search).get('practice_id') || '1';
        const response = await fetch(`/api/blogs?practice_id=${practiceId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading blogs: {error}</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No blog posts found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Background Image Section */}
      <div className="w-full h-[500px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-bold">Image Eye Care News Feed</h1>
        </div>
      </div>

      {/* Blog Cards Section */}
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/list/${blog.id}`} className="block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 h-full max-w-[360px] mx-auto">
                <div className="relative w-full aspect-[1/1]">
                  <Image
                    src={getProxiedImageUrl(blog.header_image || blog.thumbnail_image) || '/default-blog-image.jpg'}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      // Fallback to default image if the proxied image fails to load
                      e.target.src = '/default-blog-image.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">Read more »</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHomePage;