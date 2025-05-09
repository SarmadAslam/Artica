export interface CompetitionType {
    id: string;
    title: string;
    description: string;
    guidelines: string;
    deadline: string;
    status: "draft" | "published" | "closed";
    votes: number;
    createdAt?: string;
    updatedAt?: string;
  }
  