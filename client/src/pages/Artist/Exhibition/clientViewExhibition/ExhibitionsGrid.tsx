import React from "react";
import { CalendarDays } from "lucide-react";
import { useFetchExhibitionsQuery } from "@/api/exhibitions";
import { ExhibitionType } from "@/types/exhibition";
import { useNavigate } from "react-router-dom";

type ExhibitionWithId = ExhibitionType & { _id: string };

const statusStyles: Record<string, string> = {
  open: "bg-green-100 text-green-600",
  upcoming: "bg-yellow-100 text-[#F35E21]",
  closed: "bg-red-100 text-red-600",
};

export default function ExhibitionsGrid() {
  const { data: exhibitions, isLoading, error } = useFetchExhibitionsQuery();
  const navigate = useNavigate();

  if (isLoading) return <p className="p-6 text-[#421983]">Loading exhibitions...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load exhibitions.</p>;

  const handleViewArtworksClick = (exhibitionTitle: string) => {
    navigate(`/exhibition-artworks/${encodeURIComponent(exhibitionTitle)}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#F35E21] mb-6">Available Exhibitions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(exhibitions as ExhibitionWithId[])?.map((exhibition) => {
          const isClosed = exhibition.status === "closed";
          const statusLabel = exhibition.status.charAt(0).toUpperCase() + exhibition.status.slice(1);
          const dateRange = `${new Date(exhibition.startDate).toLocaleDateString()} – ${new Date(exhibition.endDate).toLocaleDateString()}`;

          return (
            <div key={exhibition._id} className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-[#421983]">
                  {exhibition.title}
                </h3>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusStyles[exhibition.status]}`}>
                  {statusLabel}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{exhibition.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <CalendarDays className="w-4 h-4 mr-2" />
                {dateRange}
              </div>
              <button
                className={`w-full py-2 rounded-md text-white font-semibold transition-all duration-200 bg-[#421983] hover:bg-[#361466]`}
                onClick={() => handleViewArtworksClick(exhibition.title)}
              >
                View Artworks
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
