"use client";

import Image from "next/image";
import Link from "next/link";

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
  ];

  return (
    <div>
      {/* Background Image Section */}
      <div className="w-full h-[600px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-6xl font-bold">Image Eye Care News Feed</h1>
        </div>
      </div>

      {/* Blog Cards Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/list/${blog.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 h-full">
                <div className="relative h-56">
                  <Image
                    src={blog.imgSrc}
                    alt={blog.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-primary mb-3">{blog.title}</h3>
                  <p className="text-gray-600">Read more</p>
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
