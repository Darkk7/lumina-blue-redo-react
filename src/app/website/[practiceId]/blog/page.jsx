"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from 'next/navigation';
import Navbar from "../../../pages/Navbar";
import FooterPage from "../../../pages/FooterPage";
import { useSiteSettings } from "../../../context/SiteSettingsContext";
import { useState, useEffect } from 'react';

const BlogHomePage = () => {
  const params = useParams();
  const practiceId = params.practiceId;
  const { siteSettings } = useSiteSettings();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/website/${practiceId}/blog.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [practiceId]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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

  // Sort blogs by date
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featuredBlog = sortedBlogs[0];
  const otherBlogs = sortedBlogs.slice(1);

  // Filter blogs based on search term
  const filteredBlogs = otherBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar practiceId={practiceId} />
      <div>
        {/* Background Image Section */}
        <div className="w-full h-[500px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
          <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold text-white">{siteSettings?.short_name || 'Our'} News Feed</h1>
          </div>
        </div>

        {/* Featured Blog Section */}
        {featuredBlog && (
          <div className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-black text-center mb-8">Featured Blog</h2>
              <div className="grid grid-cols-1 gap-8">
                <Link 
                  href={`/website/${practiceId}/blog/${featuredBlog.id}`}
                  className="block"
                >
                  <div className="relative w-full h-96 rounded-lg overflow-hidden">
                    <Image
                      src={featuredBlog.header_image || featuredBlog.img || '/default-blog.jpg'}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white">{featuredBlog.title}</h3>
                      <p className="text-white opacity-90">{formatDate(featuredBlog.date)} • {featuredBlog.reading_time || '5 min read'}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Cards Section */}
        <div className="container mx-auto py-10 px-4">
          {/* Search Bar */}
          <div className="mb-6 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search blogs by title..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
            />
          </div>

          {currentBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8">
                {currentBlogs.map((blog) => (
                  <Link 
                    key={blog.id} 
                    href={`/website/${practiceId}/blog/${blog.id}`} 
                    className="block"
                  >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 h-full max-w-3xl mx-auto flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                        <Image
                          src={blog.thumbnail_image || blog.header_image || blog.img || '/default-blog.jpg'}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {formatDate(blog.date)} • {blog.reading_time || '5 min read'}
                        </p>
                        <p className="text-gray-700 line-clamp-3">
                          {blog.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border rounded-md disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 border rounded-md ${
                          currentPage === index + 1 
                            ? 'bg-primary text-white border-primary' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border rounded-md disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">No blog posts found{searchTerm ? ` matching "${searchTerm}"` : ''}.</p>
            </div>
          )}
        </div>
      </div>
      <FooterPage practiceId={practiceId} />
    </>
  );
};

export default BlogHomePage;