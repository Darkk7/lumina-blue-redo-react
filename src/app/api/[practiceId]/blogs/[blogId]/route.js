import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { practiceId, blogId } = params;
  
  try {
    // First, try to fetch the specific blog directly by ID
    const response = await fetch(`https://www.eyecareportal.com/api/blogs/${blogId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // If direct fetch fails, fall back to fetching all blogs
      console.warn(`[Blog Detail API] Direct fetch failed for blog ${blogId}, falling back to full list`);
      return fetchFromAllBlogs(practiceId, blogId);
    }

    const blog = await response.json();
    
    // Verify the blog is visible and belongs to this practice (or is global)
    if (!blog || blog.show !== true || 
        (blog.practice_id && blog.practice_id.toString() !== practiceId)) {
      console.warn(`[Blog Detail API] Blog ${blogId} not found or not available for practice ${practiceId}`);
      return NextResponse.json(
        { error: 'Blog post not found or not available for this practice' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('[Blog Detail API] Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

async function fetchFromAllBlogs(practiceId, blogId) {
  try {
    // Fallback: Fetch all blogs and filter
    const response = await fetch('https://www.eyecareportal.com/api/blogs', {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[Blog Detail API] Error fetching all blogs:', error);
      throw new Error('Failed to fetch blogs');
    }

    const blogs = await response.json();
    
    if (!Array.isArray(blogs)) {
      console.error('[Blog Detail API] Expected array of blogs but got:', typeof blogs);
      throw new Error('Invalid data format received from API');
    }

    // Find the specific blog by ID and practice ID
    const blog = blogs.find(b => 
      b && 
      b.id && 
      b.id.toString() === blogId && 
      (b.practice_id === null || b.practice_id.toString() === practiceId) &&
      b.show === true
    );

    if (!blog) {
      console.warn(`[Blog Detail API] Blog not found with ID: ${blogId} for practice: ${practiceId}`);
      return NextResponse.json(
        { error: 'Blog post not found or not available for this practice' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('[Blog Detail API] Error in fallback:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch blog post',
        details: error.details 
      },
      { status: error.status || 500 }
    );
  }
}
