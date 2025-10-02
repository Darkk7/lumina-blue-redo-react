import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  // Helper function to safely fetch and parse JSON
  const safeFetch = async (url) => {
    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        console.warn(`API request failed: ${url} - ${response.status}`);
        return [];
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Error in safeFetch for ${url}:`, error);
      return [];
    }
  };

  try {
    const { practiceId } = await Promise.resolve(params);
    
    // Fetch both global and practice blogs in parallel
    const [globalBlogs, practiceBlogs] = await Promise.all([
      safeFetch('https://www.eyecareportal.com/api/blogs'),
      practiceId ? safeFetch(`https://www.eyecareportal.com/api/blogs?practice_id=${practiceId}`) : []
    ]);

    // Combine both global and practice-specific blogs
    const allBlogs = [...globalBlogs, ...practiceBlogs];
    
    // Filter out any non-visible blogs
    const filteredBlogs = allBlogs.filter(blog => {
      if (!blog) return false;
      return blog.show === true;
    });
    
    // Add URLs to all blogs
    const blogsWithUrls = filteredBlogs.map(blog => ({
      ...blog,
      url: `/${practiceId}/blog/${blog.id}`
    }));

    // Sort by date (newest first)
    const sortedBlogs = [...blogsWithUrls].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return NextResponse.json(sortedBlogs);
  } catch (error) {
    console.error('[Blogs API] Error:', error);
    // Always return an empty array instead of an error object
    // This ensures the UI won't break if the API fails
    return NextResponse.json([], { status: 200 });
  }
}