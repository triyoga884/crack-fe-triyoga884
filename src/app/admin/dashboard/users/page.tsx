'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

function Page() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/dummy/users.json');
      return response.json();
    },
  });

  console.log(query.data);
  return (
    <div>
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>Error loading data.</div>}
      {query.data && <DataTable columns={columns} data={query.data} />}
    </div>
  );
}

export default Page;
