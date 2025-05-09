import { ParticipantManager } from "@/features/admin/components/participants/ParticipantManager";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function ExhibitionParticipantsPage() {
  const { id } = useParams(); // exhibition ID from route
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Participants – Exhibition #{id}</h1>
        </div>
      </div>

      <ParticipantManager />
    </div>
  );
}
