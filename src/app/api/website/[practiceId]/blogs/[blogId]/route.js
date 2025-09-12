import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { practiceId, blogId } = params;
  
  try {
    // First, fetch all blogs
    const response = await fetch('https://www.eyecareportal.com/api/blogs', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[Blog Detail API] Error response from server:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blogs', details: error },
        { status: response.status }
      );
    }

    const blogs = await response.json();
    
    if (!Array.isArray(blogs)) {
      console.error('[Blog Detail API] Expected array of blogs but got:', typeof blogs);
      return NextResponse.json(
        { error: 'Invalid data format received from API', receivedType: typeof blogs },
        { status: 500 }
      );
    }

    // Find the specific blog by ID
    const blog = blogs.find(b => 
      b.id.toString() === blogId && 
      (b.practice_id === parseInt(practiceId) || b.practice_id === null) &&
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
