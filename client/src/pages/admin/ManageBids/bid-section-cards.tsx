import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function BidSectionCards() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
        <CardWithStats title="Total Bids" value="143" />
        <CardWithStats title="Avg. Price" value="Rs 8,500" />
        <CardWithStats title="Approved" value="78" />
        <CardWithStats title="Rejected" value="10" />
      </div>
    );
  }
  
  const CardWithStats = ({ title, value }: { title: string; value: string }) => (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
  