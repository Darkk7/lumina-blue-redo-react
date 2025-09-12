"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "../../../../pages/Navbar";
import FooterPage from "../../../../pages/FooterPage";
import { useSiteSettings } from "../../../../context/SiteSettingsContext";

const BlogDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { practiceId, blogId } = params;
  const { siteSettings } = useSiteSettings();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const primaryColor = siteSettings?.primary_color || "#000000";

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/website/${practiceId}/blogs/${blogId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch blog post');
        }
        
        const blogData = await response.json();
        
        if (!blogData || Object.keys(blogData).length === 0) {
          throw new Error('Blog post not found');
        }
        
        setBlog(blogData);
      } catch (err) {
        console.error('[Blog Detail] Error:', err);
        setError(err.message || 'An error occurred while loading the blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, practiceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
            style={{ borderColor: primaryColor }}
          ></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-2xl">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Blog Post</h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => router.push(`/website/${practiceId}/blog`)}
            className="px-6 py-2 rounded text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryColor }}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="mb-6">The requested blog post could not be found.</p>
          <Link 
            href={`/website/${practiceId}/blog`}
            className="px-6 py-2 rounded text-white hover:opacity-90 transition-opacity inline-block"
            style={{ backgroundColor: primaryColor }}
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar practiceId={practiceId} />
      
      {/* Background Image Section */}
      <div className="w-full h-[500px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
          <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold text-white">{blog.title}</h1>
          </div>
      </div>

      <main className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 pb-12 max-w-5xl">
          <div className="mb-8">
            <Link 
              href={`/website/${practiceId}/blog`}
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
              style={{ '--tw-text-opacity': 1, color: `${primaryColor} !important` }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>
          
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Blog Header Image */}
            {blog.header_image?.url && (
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src={blog.header_image.url}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 75vw"
                />
              </div>
            )}
            
            {/* Blog Content */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <span className="text-sm text-gray-500">{formatDate(blog.date || blog.created_at)}</span>
              </div>
              
              {/* Blog Content (HTML) */}
              {blog.content && (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              )}
            </div>
          </article>
        </div>
      </main>
      
      <FooterPage practiceId={practiceId} />
    </>
  );
};

export default BlogDetail;