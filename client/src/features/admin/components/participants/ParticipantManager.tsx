import { useState } from "react";
import { ParticipantColumns } from "./participant-columns";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Participant = {
  id: string;
  artistName: string;
  artworkTitle: string;
  artworkUrl: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
};

const dummyParticipants: Participant[] = [
  {
    id: "p1",
    artistName: "Alice Winters",
    artworkTitle: "Midnight Bloom",
    artworkUrl: "https://via.placeholder.com/100",
    status: "pending",
    submittedAt: "2025-05-01T12:00:00Z",
  },
  {
    id: "p2",
    artistName: "Liam Blake",
    artworkTitle: "Shattered Sky",
    artworkUrl: "https://via.placeholder.com/100",
    status: "approved",
    submittedAt: "2025-04-30T15:20:00Z",
  },
];

export function ParticipantManager() {
  const [data, setData] = useState<Participant[]>(dummyParticipants);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Participant["status"] | "all">("all");

  const filtered = data.filter((p) => {
    const matchesSearch =
      p.artistName.toLowerCase().includes(search.toLowerCase()) ||
      p.artworkTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: Participant["status"]) => {
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleRemove = (id: string) => {
    setData((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Manage Participants</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Input
          placeholder="Search by artist or artwork..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Tabs defaultValue="all" value={statusFilter} onValueChange={(val) => setStatusFilter(val as any)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <DataTable
        data={filtered}
        columns={ParticipantColumns({ onStatusChange: handleStatusChange, onRemove: handleRemove })}
        tabLabel="participants"
        initialVisibility={{
          status: true,
          submittedAt: true,
        }}
      />
    </div>
  );
}
