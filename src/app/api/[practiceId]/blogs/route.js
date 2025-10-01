import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  // Await the params object before destructuring
  const { practiceId } = await Promise.resolve(params);
  
  try {
    // First, fetch global blogs (where practice_id is null)
    const globalBlogsResponse = await fetch('https://www.eyecareportal.com/api/blogs', {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!globalBlogsResponse.ok) {
      throw new Error(`Failed to fetch global blogs: ${globalBlogsResponse.statusText}`);
    }
    
    let globalBlogs = await globalBlogsResponse.json();
    globalBlogs = Array.isArray(globalBlogs) ? globalBlogs : [];

    // Then fetch practice-specific blogs
    const practiceBlogsResponse = await fetch(`https://www.eyecareportal.com/api/blogs?practice_id=${practiceId}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    let practiceBlogs = [];
    if (practiceBlogsResponse.ok) {
      const data = await practiceBlogsResponse.json();
      practiceBlogs = Array.isArray(data) ? data : [];
    } else if (practiceBlogsResponse.status !== 404) {
      // Only throw error if it's not a 404 (which might mean no blogs for this practice)
      throw new Error(`Failed to fetch practice blogs: ${practiceBlogsResponse.statusText}`);
    }

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
    console.error('[Blogs API] Unhandled error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}