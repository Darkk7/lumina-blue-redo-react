import { useEffect, useState } from 'react';

export default function TeamPage() {
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const [teamTitle, setTeamTitle] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  useEffect(() => {
    setTeamTitle('Meet Our Vibrant Team');
  });

  useEffect(() => {
    setTeamDescription('We like to think we have have something pretty special here at Image Eyecare Optometry - an energetic team, committed to patient care, customer experience and doing good work.');
  });

  const teamMembers = [
    { img: "/images/DrYonelaDube.png", name: "Dr Yonela Dube", role: "Paediatric Optometrist" },
    { img: "/images/JillWalker.png", name: "Jill Walker", role: "Practice Manager" },
    { img: "/images/MorneDuPlessis.png", name: "Morne Du Plessis", role: "Optical Dispenser" },
  ];

  const nextMember = () => {
    setCurrentTeamMember((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentTeamMember(
      (prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length
    );
  };

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {teamTitle}
        </h1>
        <p className="text-1xl text-center text-gray-800 mb-8"> {teamDescription} </p>
        <div className="flex justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white shadow-lg p-6 rounded-lg text-center w-64">
              <img
                src={member.img}
                alt={member.name}
                className="w-41 h-41 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold text-primary mb-2">
                {member.name}
              </h2>
              <h3 className="text-lg font-medium text-gray-600 mb-4">
                {member.role}
              </h3>
            </div>
          ))}
        </div>        
      </div>
    </div>
  );
}
