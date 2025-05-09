
// import React from 'react'; 

// type DashboardCardProps = {
//   title: string;
//   description: string;
//   linkText: string;
//   badgeText?: string;
//   badgeColor?: string;
//   background: string;
//   icon?: React.ReactNode;
// };

// const DashboardCard: React.FC<DashboardCardProps> = ({
//   title,
//   description,
//   linkText,
//   badgeText,
//   badgeColor = '#FFD700', // Warm Gold
//   background,
//   icon,
// }) => {
//   return (
//     <div className="rounded-xl shadow-md overflow-hidden h-full flex flex-col">
//       {/* Colored top section */}
//       <div 
//         className="h-20 w-full"
//         style={{ background }}
//       >
//         {icon && (
//           <div className="flex justify-end p-4">
//             <span className="text-xl text-white opacity-90">{icon}</span>
//           </div>
//         )}
//       </div>
      
//       {/* White content section */}
//       <div className="p-6 bg-white flex-grow flex flex-col">
//         <div className="mb-4">
//           <h3 className="text-xl font-bold text-[#421983]">{title}</h3>
//           <p className="text-sm text-gray-600">{description}</p>
//         </div>
        
//         <div className="mt-auto flex items-center justify-between">
//           <span className="text-sm text-[#F35E21] underline hover:text-[#5A24B5] transition-colors">
//             {linkText}
//           </span>
//           {badgeText && (
//             <span
//               className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
//               style={{ backgroundColor: badgeColor, color: '#5F370E' }}
//             >
//               {badgeText}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCard;
import React from 'react';

type DashboardCardProps = {
  title: string;
  description: string;
  linkText: string;
  badgeText?: string;
  badgeColor?: string;
  background: string;
  icon?: React.ReactNode;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  linkText,
  badgeText,
  badgeColor = '#FFD700', // Warm Gold
  background,
  icon,
}) => {
  return (
    <div 
      className="rounded-xl shadow-md overflow-hidden h-full flex flex-col transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:outline hover:outline-[#F35E21]"
    >
      {/* Colored top section */}
      <div 
        className="h-20 w-full"
        style={{ background }}
      >
        {icon && (
          <div className="flex justify-end p-4">
            <span className="text-xl text-white opacity-90">{icon}</span>
          </div>
        )}
      </div>
      
      {/* White content section */}
      <div className="p-6 bg-white flex-grow flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#421983]">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm text-[#F35E21] underline hover:text-[#5A24B5] transition-colors">
            {linkText}
          </span>
          {badgeText && (
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: badgeColor, color: '#5F370E' }}
            >
              {badgeText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
