"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from 'next/navigation';
import { useSiteSettings } from "../../context/SiteSettingsContext";
import Navbar from "../../pages/Navbar";
import FooterPage from "../../pages/FooterPage";

const BlogHomePage = () => {
  const params = useParams();
  const pathname = usePathname();
  const { siteSettings } = useSiteSettings();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract customer code from URL if present
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];
  const isCustomerCodeRoute = pathSegments[0] && !/^\d+$/.test(pathSegments[0]);
  const customerCode = isCustomerCodeRoute ? pathSegments[0] : null;
  const practiceId = isCustomerCodeRoute ? siteSettings?.practiceId : params.practiceId;

  // Use site settings to get practice-specific data
  const practiceName = siteSettings?.name || siteSettings?.practice_name || "";
  const primaryColor = siteSettings?.primaryColor || "#000000";

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!practiceId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Use the correct API endpoint for blogs
        const response = await fetch(`/api/${customerCode || practiceId}/blogs`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Check if the response has the expected format
        if (!data || !Array.isArray(data)) {
          console.error('Unexpected API response format:', data);
          throw new Error('Unexpected response format from server');
        }
        
        setBlogs(data);
      } catch (err) {
        console.error('[Blog Page] Error in fetchBlogs:', err);
        setError(err.message || 'An error occurred while fetching blogs');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [practiceId]);

  // Sort blogs by date (newest first)
  const sortedBlogs = useMemo(() => {
    if (!Array.isArray(blogs) || blogs.length === 0) return [];
    
    // Make a copy of the blogs array to avoid mutating the original
    const blogsToSort = [...blogs];
    
    // Sort by date (newest first)
    return blogsToSort.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [blogs]);
  
  // Log the blogs for debugging
  useEffect(() => {
    console.log('Blogs loaded:', {
      count: sortedBlogs.length,
      practiceId,
      blogs: sortedBlogs.map(b => ({
        id: b.id,
        title: b.title,
        practice_id: b.practice_id,
        date: b.date,
        show: b.show
      }))
    });
  }, [sortedBlogs, practiceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" style={{ borderColor: primaryColor }}></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 p-4 max-w-2xl">
          <h2 className="text-xl font-bold mb-2">Error Loading Blogs</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 rounded text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Try Again
          </button>
          <div className="mt-6 p-4 bg-gray-100 rounded text-left">
            <p className="text-sm font-mono text-gray-700">
              <strong>Practice ID:</strong> {practiceId}<br />
              <strong>Error:</strong> {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sortedBlogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No blog posts found for {practiceName}.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar practiceId={practiceId} />
      <div>
        {/* Background Image Section */}
        <div className="w-full h-[500px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
          <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold text-white">{practiceName} News Feeds</h1>
          </div>
        </div>

        {/* Blog Cards Section */}
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {sortedBlogs.map((blog) => (
              <div key={blog.id} className="h-full">
                <Link href={`/${isCustomerCodeRoute ? customerCode : practiceId}/blog/${blog.id}`}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <div className="relative w-full aspect-[4/3] bg-gray-100">
                      <Image
                        src={blog.thumbnail_image?.url || '/placeholder-image.jpg'}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">
                          {new Date(blog.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                          {blog.title}
                        </h3>
                      </div>
                      <div className="mt-4">
                        <span className="text-primary font-medium inline-flex items-center">
                          Read more
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogHomePage;
