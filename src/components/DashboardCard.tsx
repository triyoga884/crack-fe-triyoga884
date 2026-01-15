import { rupiahFormat } from '../lib/rupiahFormatter';
import { Card } from './ui/card';

function DashboardCard({ title, value }: { title: string; value: number }) {
  const isPrice = title.includes('Income');
  return (
    <Card className="flex min-w-[180px] min-h-30 justify-center flex-col gap-2 rounded-xl border bg-card p-4 text-center shadow-sm transition hover:shadow-md">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <p className="text-2xl font-bold tracking-tight">
        {isPrice ? rupiahFormat(value) : value}
      </p>
    </Card>
  );
}

export default DashboardCard;
