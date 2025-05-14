"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from 'next/navigation';
import Navbar from "../../../pages/Navbar";
import FooterPage from "../../../pages/FooterPage";
import { useSiteSettings } from "../../../context/SiteSettingsContext";
import { useState } from 'react';

const BlogHomePage = () => {
  const params = useParams();
  const practiceId = params.practiceId;
  const { siteSettings } = useSiteSettings();

  const primaryColor = siteSettings?.primary_color || "#000000";

  const blogs = [
    {
      id: 1,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/OcuMarketing-campaign-header-BLAKC-FRIDAY700.jpg",
      title: "BLACK FRIDAY DEALS",
      readingTime: "5 min read",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
      date: "2022-01-01"
    },
    {
      id: 2,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/glasses-v-contact-lenses-thumb.png",
      title: "Pros and Cons of Spectacle Lenses and Contact Lenses",
      readingTime: "5 min read",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
      date: "2022-01-15"
    },
    {
      id: 3,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/over-the-counter-readers-thumb.png",
      title: "Dangers of over-the-counter readers",
      readingTime: "5 min read",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
      date: "2022-02-01"
    },
    {
      id: 4,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/chronic-disease-affecting-vision-thumb.png",
      title: "How chronic conditions can affect your vision",
      readingTime: "5 min read",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
      date: "2022-03-01"
    },
    {
      id: 5,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/sunglasses-protecting-vision-thumb.png",
      title: "Does sunglasses actually protect your vision",
      readingTime: "5 min read",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
      date: "2022-04-01"
    },
  ];

  const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
  const featuredBlog = sortedBlogs[0];
  const otherBlogs = sortedBlogs.slice(1);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = otherBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <>
      <Navbar practiceId={practiceId} />
      <div>
        {/* Background Image Section */}
        <div className="w-full h-[500px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
          <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold text-white">{siteSettings.short_name} News Feed</h1>
          </div>
        </div>

        {/* Featured Blog Section */}
        <div className="bg-white py-16" style={{ backgroundImage: `url('/path/to/subtle-pattern.png')`, backgroundSize: 'cover' }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-black text-center mb-8">Featured Blog</h2>
            <div className="grid grid-cols-1 gap-8">
              {/* Featured Blog */}
              <Link 
                href={`/website/${practiceId}/blog/${featuredBlog.id}`}
                className="block"
              >
                <div className="relative w-full h-auto">
                  <Image
                    src={featuredBlog.imgSrc}
                    alt={featuredBlog.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center">
                    <h3 className="text-2xl font-bold text-white w-full">{featuredBlog.title}</h3>
                    <p className="text-white w-full">{featuredBlog.readingTime}</p>
                  </div>
                </div>
              </Link>
            </div>
            
          </div>
        </div>

        {/* Blog Cards Section */}
        <div className="container mx-auto py-10 px-4">
          {/* Search Bar */}
          <div className="mb-6 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search blogs by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
            />
          </div>
          <div className="grid grid-cols-1 gap-8">  
            {currentBlogs.map((blog) => (
              <Link 
                key={blog.id} 
                href={`/website/${practiceId}/blog/${blog.id}`} 
                className="block"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 h-full max-w-3xl mx-auto flex">  
                  <div className="w-1/3 overflow-hidden flex items-stretch">  
                    <Image
                      src={blog.imgSrc}
                      alt={blog.title}
                      width={150}  
                      height={150}  
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-center">  
                    <h3 className="text-xl font-semibold text-primary mb-2">{blog.title}</h3>
                    <p className="text-sm italic text-primary mb-2">{blog.readingTime}</p>
                    <p className="text-sm text-gray-700 line-clamp-3">{blog.content}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <FooterPage practiceId={practiceId} />
    </>
  );
};

export default BlogHomePage;
