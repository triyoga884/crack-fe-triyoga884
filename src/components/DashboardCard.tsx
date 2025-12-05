import React from 'react';
import { Card } from './ui/card';

function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="min-w-[180px] text-center">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="font-medium">{value}</p>
    </Card>
  );
}

export default DashboardCard;
