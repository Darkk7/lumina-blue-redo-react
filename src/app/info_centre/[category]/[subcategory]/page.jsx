import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../pages/Navbar";
import FooterPage from "../../../pages/FooterPage";

const getConditionContent = (condition) => {
  const contentMap = {
    myopia: {
      title: "Myopia (Short-sightedness)",
      banner: "https://ocumail-content.s3.eu-west-2.amazonaws.com/info_thumb_refconditions_myopia.jpg",
      sections: [
        {
          title: "What is Myopia?",
          content: "Myopia, also known as short-sightedness or near-sightedness, is a common vision condition where you can see objects near to you clearly, but objects farther away are blurry. This condition typically develops during childhood and can progress until early adulthood."
        },
        {
          title: "Symptoms",
          content: "Common symptoms include squinting, eye strain, headaches, and difficulty seeing objects at a distance such as road signs or school boards. Children might sit closer to the TV or front of the classroom, and adults might have trouble driving at night."
        },
        {
          title: "Causes",
          content: "Myopia occurs when the eye grows too long from front to back, or the cornea has too much curvature. This causes light rays to focus in front of the retina instead of directly on it. The condition can be hereditary and is often discovered in children between the ages of 8 and 12 years old."
        },
        {
          title: "Treatment Options",
          content: "Treatment options include prescription eyeglasses, contact lenses, and in some cases, refractive surgery like LASIK. Early intervention is crucial, especially in children. Modern treatments also include special contact lenses and eye drops that may help slow the progression of myopia in children."
        }
      ]
    },
    astigmatism: {
      title: "Astigmatism",
      banner: "https://ocumail-content.s3.eu-west-2.amazonaws.com/info_thumb_refconditions_astig.jpg",
      sections: [
        {
          title: "What is Astigmatism?",
          content: "Astigmatism is a common vision condition that occurs when the cornea or lens has an irregular curve, causing blurred or distorted vision at all distances."
        },
        {
          title: "Symptoms",
          content: "Symptoms include blurred vision, eye strain, headaches, and difficulty seeing fine details, both close up and at a distance."
        },
        {
          title: "Diagnosis",
          content: "An eye care professional can diagnose astigmatism through a comprehensive eye examination, including visual acuity tests and corneal topography."
        },
        {
          title: "Treatment Options",
          content: "Treatment options include prescription eyeglasses, contact lenses (including special toric lenses), and laser surgery in some cases."
        }
      ]
    },
    presbyopia: {
      title: "Presbyopia",
      banner: "https://ocumail-content.s3.eu-west-2.amazonaws.com/info_thumb_refconditions_presbyopia.jpg",
      sections: [
        {
          title: "What is Presbyopia?",
          content: "Presbyopia is an age-related vision change that makes it difficult to focus on close objects. It typically becomes noticeable in your mid-40s and continues to progress."
        },
        {
          title: "Symptoms",
          content: "Common symptoms include difficulty reading small print, needing to hold reading material at arm's length, and eye strain when doing close work."
        },
        {
          title: "Causes",
          content: "Presbyopia occurs due to the natural aging process affecting the lens of the eye, making it less flexible and harder to focus on close objects."
        },
        {
          title: "Treatment Options",
          content: "Treatment options include reading glasses, bifocals, progressive lenses, and multifocal contact lenses. Some people may also consider monovision or other surgical options."
        }
      ]
    }
  };

  return contentMap[condition] || null;
};

export default function SubcategoryPage({ params }) {
  const category = params.category;
  const subcategory = params.subcategory;
  const conditionContent = getConditionContent(subcategory);

  if (!conditionContent) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-primary">Content Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Banner Section */}
      <div 
        className="w-full h-[400px] bg-cover bg-center text-center text-white relative"
        style={{ backgroundImage: `url(${conditionContent.banner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold">{conditionContent.title}</h1>
        </div>
      </div>

      {/* White Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto border-t border-2 border-primary">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="text-sm">
              <Link href="/pages/info_centre" className="text-primary hover:text-primary-dark underline">
                Info Centre
              </Link>
              <span className="text-primary mx-2">{'>'}</span>
              <Link href={`/pages/info_centre/${category}`} className="text-primary hover:text-primary-dark underline">
                {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
              <span className="text-primary mx-2">{'>'}</span>
              <span className="text-gray-600">{conditionContent.title}</span>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {conditionContent.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-3xl font-semibold text-primary">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}
