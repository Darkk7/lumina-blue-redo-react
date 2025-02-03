import { useRouter } from 'next/router';

const categories = {
  29: {
    title: "Refractive Conditions",
    sections: [
      { id: 1, title: "Myopia", content: "Details about Myopia..." },
      { id: 2, title: "Hyperopia", content: "Details about Hyperopia..." },
      { id: 3, title: "Astigmatism", content: "Details about Astigmatism..." },
      { id: 4, title: "Presbyopia", content: "Details about Presbyopia..." },
      { id: 5, title: "Emmetropia", content: "Details about Emmetropia..." }
    ]
  },
  30: {
    title: "Rx Lens Options",
    sections: [
      { id: 1, title: "Single Vision", content: "Details about Single Vision Lenses..." },
      { id: 2, title: "Progressives", content: "Details about Progressive Lenses..." }
    ]
  },
  // Add more categories here...
};

const InfoCentreList = () => {
  const router = useRouter();
  const { id } = router.query;

  // Parse ID and fetch category details
  const categoryId = parseInt(id, 10);
  const category = categories[categoryId];

  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <div className="info-centre-category">
      <h1>{category.title}</h1>
      {category.sections.map((section) => (
        <section key={section.id} id={section.title.toLowerCase()}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </section>
      ))}
    </div>
  );
};

export default InfoCentreList;
