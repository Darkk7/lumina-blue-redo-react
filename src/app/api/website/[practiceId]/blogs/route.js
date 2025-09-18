import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { practiceId } = await params;
  const practiceIdNum = parseInt(practiceId);
  
  try {
    // Fetch all blogs
    const blogsResponse = await fetch('https://www.eyecareportal.com/api/blogs', {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!blogsResponse.ok) {
      throw new Error(`Failed to fetch blogs: ${blogsResponse.statusText}`);
    }

    let blogs = await blogsResponse.json();
    
    if (!Array.isArray(blogs)) {
      throw new Error('Invalid blog data format received');
    }

    const filteredBlogs = blogs.filter(blog => {
      if (blog.show !== true) return false;
      
      if (blog.practice_id === null) return true;
      
      return blog.practice_id === practiceIdNum;
    });

    const blogsWithUrls = filteredBlogs.map(blog => ({
      ...blog,
      url: `/website/${practiceId}/blog/${blog.id}`
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