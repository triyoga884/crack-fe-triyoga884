import DashboardCard from '@/components/DashboardCard';
import { Card } from '@/components/ui/card';
import React from 'react';

function Page() {
  const data = [
    {
      title: 'Total Users',
      value: 250,
    },
    {
      title: 'Total Workspaces',
      value: 540,
    },
    {
      title: 'Total Booking',
      value: 120,
    },
    {
      title: 'Total Providers',
      value: 15,
    },
  ];
  return (
    <div>
      {/* dashboard content */}
      <div>
        <div className="card-section grid grid-cols-2 gap-4 lg:grid-cols-4 p-4">
          {data.map((item) => (
            <DashboardCard key={item.title} {...item} />
          ))}
        </div>
        <div className="flex p-4 gap-4">
          <Card>
            <h2>Awaiting Workspaces Approval List</h2>
            <p>12 left</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
