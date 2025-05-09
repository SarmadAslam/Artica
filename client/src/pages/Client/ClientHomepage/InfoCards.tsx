// 'use client';
// import React from 'react';
// import { Briefcase, LayoutDashboard, Edit3 } from 'lucide-react';

// const cards = [
//   {
//     icon: <Briefcase className="text-indigo-900" size={32} />,
//     title: 'Complete Profile',
//     description: 'Set up your client profile to start collaborating with artists.',
//     link: 'Get Started →',
//   },
//   {
//     icon: <LayoutDashboard className="text-indigo-900" size={32} />,
//     title: 'Your Dashboard',
//     description: 'Track your active projects and manage collaborations.',
//     link: 'View Dashboard →',
//   },
//   {
//     icon: <Edit3 className="text-indigo-900" size={32} />,
//     title: 'Post a Job',
//     description: 'Create a new job posting to find the perfect artist.',
//     link: 'Create Post →',
//   },
// ];

// const InfoCards = () => {
//   return (
//     <div className="flex justify-center space-x-6 py-12 px-10 bg-gray-50">
//       {cards.map((card, index) => (
//         <div key={index} className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
//           {card.icon}
//           <h3 className="text-lg font-semibold">{card.title}</h3>
//           <p className="text-gray-600">{card.description}</p>
//           <a href="#" className="text-[#F35E21] font-semibold">{card.link}</a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InfoCards;


'use client';
import React from 'react';
import { Briefcase, LayoutDashboard, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <-- Import navigate

const InfoCards = () => {
  const navigate = useNavigate(); // <-- Initialize navigate

  const cards = [
    {
      icon: <Briefcase className="text-indigo-900" size={32} />,
      title: 'Complete Profile',
      description: 'Set up your client profile to start collaborating with artists.',
      linkText: 'Get Started →',
      path: '/client-profile', // <-- Target path
    },
    {
      icon: <LayoutDashboard className="text-indigo-900" size={32} />,
      title: 'Your Dashboard',
      description: 'Track your active projects and manage collaborations.',
      linkText: 'View Dashboard →',
      path: '/client-dashboard', // <-- Target path
    },
    {
      icon: <Edit3 className="text-indigo-900" size={32} />,
      title: 'Post a Job',
      description: 'Create a new job posting to find the perfect artist.',
      linkText: 'Create Post →',
      path: '/postjob', // <-- Target path
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex justify-center space-x-6 py-12 px-10 bg-gray-50">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
          {card.icon}
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-gray-600">{card.description}</p>
          <button
            onClick={() => handleNavigate(card.path)}
            className="text-[#F35E21] font-semibold focus:outline-none"
          >
            {card.linkText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
