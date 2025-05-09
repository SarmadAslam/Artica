export interface BidType {
    id: string
    jobTitle: string
    artist: string
    price: number
    status: "pending" | "approved" | "rejected"
    submittedAt: string
  }
  