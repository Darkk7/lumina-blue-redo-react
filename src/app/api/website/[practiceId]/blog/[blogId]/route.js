import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { practiceId, blogId } = params;
  
  try {
    // Fetch the specific blog post
    const blogResponse = await fetch(`https://www.eyecareportal.com/api/blogs/${blogId}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!blogResponse.ok) {
      if (blogResponse.status === 404) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      throw new Error(`Failed to fetch blog: ${blogResponse.statusText}`);
    }

    const blog = await blogResponse.json();
    
    // Check if the blog should be visible based on practice ID
    if (blog.show !== true || (blog.practice_id !== null && blog.practice_id !== parseInt(practiceId))) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Add the URL to the blog post
    const blogWithUrl = {
      ...blog,
      url: `/website/${practiceId}/blog/${blog.id}`
    };

    return NextResponse.json(blogWithUrl);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
