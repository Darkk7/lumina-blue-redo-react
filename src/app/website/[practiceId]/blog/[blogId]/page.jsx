"use client";

import { useParams } from 'next/navigation';
import Navbar from "../../../../pages/Navbar";
import FooterPage from "../../../../pages/FooterPage";

const BlogDetail = () => {
  const params = useParams();
  const { practiceId, blogId } = params;

  return (
    <>
      <Navbar practiceId={practiceId} />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Blog Detail Page</h1>
        <p className="text-lg">Practice ID: {practiceId}</p>
        <p className="text-lg">Blog ID: {blogId}</p>
      </div>
      <FooterPage practiceId={practiceId} />
    </>
  );
};

export default BlogDetail;
