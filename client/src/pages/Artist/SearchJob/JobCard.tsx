

// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
// import { Badge } from "../../../components/ui/badge";
// import { Briefcase, DollarSign, MapPin, Paintbrush, PencilRuler, PenTool } from "lucide-react";
// import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "../../../components/ui/drawer";
// import { Button } from "../../../components/ui/button";

// interface Job {
//   title: string;
//   description: string;
//   category: string[];
//   workplaceType: string;
//   jobType: string;
//   budget: string;
//   customBudget?: number;
//   experienceLevel?: string;
//   startDate?: string;
//   endDate?: string;
// }

// interface JobCardProps {
//   job: Job;
// }

// const JobCard: React.FC<JobCardProps> = ({ job }) => {
//   const [isOpen, setIsOpen] = useState(false);
  

//   return (
//     <>
//       <Card className="w-full border border-gray-200 shadow-md rounded-xl p-5 transition-transform duration-300 hover:shadow-lg bg-white hover:bg-gray-100 hover:-translate-y-2 hover:border-[#F35E21] flex flex-col h-full">
//         <CardHeader className="pb-3">
//           <CardTitle className="text-xl font-bold text-[#421983]">{job.title}</CardTitle>
//         </CardHeader>
//         <CardContent className="h-full flex flex-col justify-between">
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-sm text-gray-700">
//               <Briefcase className="w-5 h-5 text-[#F35E21]" />
//               <span className="font-medium">{job.category}</span>
//             </div>

//             <div className="flex items-center gap-2 text-sm text-gray-700">
//               <MapPin className="w-5 h-5 text-[#421983]" />
//               <span className="font-medium">{job.workplaceType}</span>
//             </div>

//             <div className="flex items-center gap-2 text-sm text-gray-700">
//               <DollarSign className="w-5 h-5 text-[#FFD700]" />
//               <span className="font-medium">{job.budget}</span>
//             </div>

//             <div className="inline-block bg-[#FFD700] text-[#421983] px-2 py-1 rounded-full font-semibold uppercase">
//   <Badge variant="outline">{job.jobType}</Badge>
// </div>
          

//             <div className="flex items-center gap-4 mt-4">
//               <Paintbrush className="w-6 h-6 text-[#1D4ED8]" />
//               <PencilRuler className="w-6 h-6 text-[#16A34A]" />
//               <PenTool className="w-6 h-6 text-[#D97706]" />
//             </div>
//           </div>

//           {/* Links positioned at the bottom right */}
//           <div className="flex gap-2 justify-end mt-auto">
//             <a
//               href="/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-[#F35E21] font-semibold underline hover:text-[#D14E1A] transition duration-300"
//             >
//               Apply Now
//             </a>
//             <button
//               onClick={() => setIsOpen(true)}
//               className="text-[#F35E21] font-semibold underline hover:text-[#D14E1A] transition duration-300"
//             >
//               View details
//             </button>
//           </div>
//         </CardContent>
//       </Card>

     
//       <Drawer open={isOpen} onOpenChange={setIsOpen}>
//   <DrawerContent className="w-[400px] bg-white fixed right-0 top-0 h-full shadow-lg border-l-2 border-[#421983]">
//     <div className="bg-[#421983] text-white p-4">
//       <div className="text-xl font-bold">{job.title}</div>
//       <div className="absolute top-3 right-3">
//         <DrawerClose asChild>
//           <Button 
//             variant="ghost" 
//             className="text-white hover:bg-[#F35E21] hover:text-white rounded-full p-2"
//           >
//             ✖
//           </Button>
//         </DrawerClose>
//       </div>
//     </div>
//     <div className="p-6 space-y-6">
//       <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-[#FFD700]">
//         {job.description}
//       </p>
      
//       <div className="space-y-4">
//         <div className="flex items-center">
//           <span className="w-24 font-medium text-[#421983]">Category:</span>
//           <span className="bg-[#F35E21]/10 text-[#F35E21] px-3 py-1 rounded-full">
//             {job.category}
//           </span>
//         </div>
        
//         <div className="flex items-center">
//           <span className="w-24 font-medium text-[#421983]">Workplace:</span>
//           <span className="text-gray-700">{job.workplaceType}</span>
//         </div>
        
//         <div className="flex items-center">
//           <span className="w-24 font-medium text-[#421983]">Job Type:</span>
//           <span className="text-gray-700">{job.jobType}</span>
//         </div>
        
//         <div className="flex items-center">
//           <span className="w-24 font-medium text-[#421983]">Budget:</span>
//           <span className="font-bold text-[#FFD700]">
//             {job.customBudget ? `Rs ${job.customBudget.toLocaleString()}` : job.budget}
//           </span>
//         </div>
        
//         {job.experienceLevel && (
//           <div className="flex items-center">
//             <span className="w-24 font-medium text-[#421983]">Experience:</span>
//             <span className="text-gray-700">{job.experienceLevel}</span>
//           </div>
//         )}
        
//         {job.startDate && (
//           <div className="flex items-center">
//             <span className="w-24 font-medium text-[#421983]">Start Date:</span>
//             <span className="text-gray-700">{job.startDate}</span>
//           </div>
//         )}
        
//         {job.endDate && (
//           <div className="flex items-center">
//             <span className="w-24 font-medium text-[#421983]">End Date:</span>
//             <span className="text-gray-700">{job.endDate}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   </DrawerContent>
// </Drawer>
//     </>
//   );
// };

// export default JobCard;

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Briefcase, DollarSign, MapPin, Paintbrush, PencilRuler, PenTool } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "../../../components/ui/drawer";
import { Button } from "../../../components/ui/button";
import JobApplication from "../ApplyJob/JobApplication"; // Import JobApplication

interface Job {
  title: string;
  description: string;
  category: string[];
  workplaceType: string;
  jobType: string;
  budget: string;
  customBudget?: number;
  experienceLevel?: string;
  startDate?: string;
  endDate?: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  return (
    <>
      <Card className="w-full border border-gray-200 shadow-md rounded-xl p-5 transition-transform duration-300 hover:shadow-lg bg-white hover:bg-gray-100 hover:-translate-y-2 hover:border-[#F35E21] flex flex-col h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-[#421983]">{job.title}</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Briefcase className="w-5 h-5 text-[#F35E21]" />
              <span className="font-medium">{job.category.join(", ")}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-5 h-5 text-[#421983]" />
              <span className="font-medium">{job.workplaceType}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <DollarSign className="w-5 h-5 text-[#FFD700]" />
              <span className="font-medium">
                {job.customBudget ? `Rs ${job.customBudget.toLocaleString()}` : job.budget}
              </span>
            </div>

            <div className="inline-block bg-[#FFD700] text-[#421983] px-2 py-1 rounded-full font-semibold uppercase">
              <Badge variant="outline">{job.jobType}</Badge>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Paintbrush className="w-6 h-6 text-[#1D4ED8]" />
              <PencilRuler className="w-6 h-6 text-[#16A34A]" />
              <PenTool className="w-6 h-6 text-[#D97706]" />
            </div>
          </div>

          <div className="flex gap-2 justify-end mt-auto">
            <button
              onClick={() => setIsApplicationOpen(true)}
              className="text-[#F35E21] font-semibold underline hover:text-[#D14E1A] transition duration-300"
            >
              Apply Now
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-[#F35E21] font-semibold underline hover:text-[#D14E1A] transition duration-300"
            >
              View details
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Job Application Modal */}
      <JobApplication isOpen={isApplicationOpen} onClose={() => setIsApplicationOpen(false)} jobTitle={job.title} />

      {/* Job Details Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        {/* <DrawerContent className="w-[400px] bg-white fixed right-0 top-0 h-full shadow-lg border-l-2 border-[#421983]">
          <DrawerHeader>
            <div className="bg-[#421983] text-white p-4 flex justify-between items-center">
              <DrawerTitle>{job.title}</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" className="text-white hover:bg-[#F35E21] hover:text-white rounded-full p-2">
                  ✖
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="p-6 space-y-6">
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-[#FFD700]">{job.description}</p>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-24 font-medium text-[#421983]">Category:</span>
                <span className="bg-[#F35E21]/10 text-[#F35E21] px-3 py-1 rounded-full">{job.category.join(", ")}</span>
              </div>

              <div className="flex items-center">
                <span className="w-24 font-medium text-[#421983]">Workplace:</span>
                <span className="text-gray-700">{job.workplaceType}</span>
              </div>

              <div className="flex items-center">
                <span className="w-24 font-medium text-[#421983]">Job Type:</span>
                <span className="text-gray-700">{job.jobType}</span>
              </div>

              <div className="flex items-center">
                <span className="w-24 font-medium text-[#421983]">Budget:</span>
                <span className="font-bold text-[#FFD700]">
                  {job.customBudget ? `Rs ${job.customBudget.toLocaleString()}` : job.budget}
                </span>
              </div>

              {job.experienceLevel && (
                <div className="flex items-center">
                  <span className="w-24 font-medium text-[#421983]">Experience:</span>
                  <span className="text-gray-700">{job.experienceLevel}</span>
                </div>
              )}

              {job.startDate && (
                <div className="flex items-center">
                  <span className="w-24 font-medium text-[#421983]">Start Date:</span>
                  <span className="text-gray-700">{job.startDate}</span>
                </div>
              )}

              {job.endDate && (
                <div className="flex items-center">
                  <span className="w-24 font-medium text-[#421983]">End Date:</span>
                  <span className="text-gray-700">{job.endDate}</span>
                </div>
              )}
            </div>
          </div>
        </DrawerContent> */}

<DrawerContent className="w-[400px] bg-white fixed right-0 top-0 h-full shadow-lg border-l-2 border-[#421983]">
  <DrawerHeader>
    <div className="bg-[#421983] text-white p-4 flex justify-between items-center">
      <DrawerTitle>{job.title}</DrawerTitle>
      <DrawerClose asChild>
        <Button variant="ghost" className="text-white hover:bg-[#F35E21] hover:text-white rounded-full p-2">
          ✖
        </Button>
      </DrawerClose>
    </div>
  </DrawerHeader>

  {/* Make this section scrollable */}
  <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]"> 
    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-[#FFD700]">{job.description}</p>

    <div className="space-y-4">
      <div className="flex items-center">
        <span className="w-24 font-medium text-[#421983]">Category:</span>
        <span className="bg-[#F35E21]/10 text-[#F35E21] px-3 py-1 rounded-full">{job.category.join(", ")}</span>
      </div>

      <div className="flex items-center">
        <span className="w-24 font-medium text-[#421983]">Workplace:</span>
        <span className="text-gray-700">{job.workplaceType}</span>
      </div>

      <div className="flex items-center">
        <span className="w-24 font-medium text-[#421983]">Job Type:</span>
        <span className="text-gray-700">{job.jobType}</span>
      </div>

      <div className="flex items-center">
        <span className="w-24 font-medium text-[#421983]">Budget:</span>
        <span className="font-bold text-[#FFD700]">
          {job.customBudget ? `Rs ${job.customBudget.toLocaleString()}` : job.budget}
        </span>
      </div>

      {job.experienceLevel && (
        <div className="flex items-center">
          <span className="w-24 font-medium text-[#421983]">Experience:</span>
          <span className="text-gray-700">{job.experienceLevel}</span>
        </div>
      )}

      {job.startDate && (
        <div className="flex items-center">
          <span className="w-24 font-medium text-[#421983]">Start Date:</span>
          <span className="text-gray-700">{job.startDate}</span>
        </div>
      )}

      {job.endDate && (
        <div className="flex items-center">
          <span className="w-24 font-medium text-[#421983]">End Date:</span>
          <span className="text-gray-700">{job.endDate}</span>
        </div>
      )}
    </div>
  </div>
</DrawerContent>

      </Drawer>
    </>
  );
};

export default JobCard;
