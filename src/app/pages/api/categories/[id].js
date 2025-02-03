export default function handler(req, res) {
  const { id } = req.query;

  const categories = {
    29: {
      title: "Refractive Conditions",
      sections: [
        { id: 1, title: "Myopia", content: "Details about Myopia..." },
        { id: 2, title: "Hyperopia", content: "Details about Hyperopia..." },
      ],
    },
    30: {
      title: "Rx Lens Options",
      sections: [
        { id: 1, title: "Single Vision", content: "Details about Single Vision Lenses..." },
        { id: 2, title: "Progressives", content: "Details about Progressive Lenses..." },
      ],
    },
  };

  if (categories[id]) {
    res.status(200).json(categories[id]);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
}
