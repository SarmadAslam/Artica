export interface ExhibitionType {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    guidelines: string;
    status: "upcoming" | "open" | "closed";
    artistSubmissions?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  