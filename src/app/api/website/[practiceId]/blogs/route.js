import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { practiceId } = params;
  
  try {
    
    const response = await fetch('https://www.eyecareportal.com/api/blogs', {
      headers: {
        'Content-Type': 'application/json',
      },
      // cache: 'no-store'
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[Blogs API] Error response from server:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blogs', details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('[Blogs API] Expected array of blogs but got:', typeof data, data);
      return NextResponse.json(
        { error: 'Invalid data format received from API', receivedType: typeof data },
        { status: 500 }
      );
    }

    if (data.length === 0) {
      console.warn('[Blogs API] Received empty blog list from API');
      return NextResponse.json([]);
    }

    const filteredBlogs = data.filter(blog => {
      const isGlobalBlog = blog.practice_id === null && blog.show === true;
      const isPracticeBlog = blog.practice_id === parseInt(practiceId) && blog.show === true;
      const include = isGlobalBlog || isPracticeBlog;
      
      return include;
    });
    
    if (filteredBlogs.length === 0) {
      console.warn(`[Blogs API] No blogs found for practice ${practiceId}. Practice IDs in data:`, 
        [...new Set(data.map(b => b.practice_id))].sort((a, b) => a - b)
      );
    }
    
    return NextResponse.json(filteredBlogs);
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