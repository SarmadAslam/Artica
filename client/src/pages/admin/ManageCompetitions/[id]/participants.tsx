// src/pages/admin/manage-competitions/[id]/participants.tsx

import { ParticipantManager } from "@/features/admin/components/participants/ParticipantManager";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function CompetitionParticipantsPage() {
  const { id } = useParams(); // competition ID
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Participants – Competition #{id}</h1>
        </div>
      </div>

      <ParticipantManager />
    </div>
  );
}
