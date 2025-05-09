// types/job.ts

export interface JobType {
    id: string; // 🔑 required for react-table rows
    _id?: string; // optional, in case backend still sends _id
    title: string;
    description: string;
    category: string[]; // from schema
    jobType: "Freelance" | "Full-time" | "Part-time" | "Contract";
    workplaceType: "Remote" | "On-Site" | "Hybrid";
    experienceLevel?: string;
    startDate?: string;
    endDate?: string;
    budget: "Rs 1 to 5k" | "Rs 6 to 15k" | "Rs 16 to 25k" | "Other";
    customBudget?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  