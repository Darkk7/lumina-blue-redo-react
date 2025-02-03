"use client";

import Link from "next/link";
import Image from "next/image";
import RecentBlogs from './RecentBlogs'; // Import the RecentBlogs component

const BlogHomePage = () => {
  const blogs = [
    {
      id: 1,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/OcuMarketing-campaign-header-BLAKC-FRIDAY700.jpg",
      title: "BLACK FRIDAY DEALS",
    },
    {
      id: 2,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/glasses-v-contact-lenses-thumb.png",
      title: "Pros and Cons of Spectacle Lenses and Contact Lenses",
    },
    {
      id: 3,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/over-the-counter-readers-thumb.png",
      title: "Dangers of over-the-counter readers",
    },
    {
      id: 4,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/summer-eye-care.jpg",
      title: "Summer Eye Care Tips",
    },
    {
      id: 5,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/healthy-eyes-campaign.jpg",
      title: "Maintaining Healthy Eyes",
    },
  ];

  return (
    <div>
      {/* Background Image Section */}
      <div className="w-full h-[500px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-bold">Image Eye Care News Feed</h1>
        </div>
      </div>

      {/* Blog Cards Section (Show all blogs) */}
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/list/${blog.id}`} className="block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 h-full max-w-[360px] mx-auto">
                <div className="relative w-full aspect-[1/1]">
                  <Image
                    src={blog.imgSrc}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm">Read more {'>'} {'>'} </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHomePage;
