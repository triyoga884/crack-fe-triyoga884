'use client';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { apiToWorkspaceFormSchema } from '@/lib/schema';

function Page() {
  const query = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await fetch('/dummy/room.json');
      const data = await response.json();
      return data.map((room: any) => apiToWorkspaceFormSchema.parse(room));
    },
  });
  return (
    <div>
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>Error loading data.</div>}
      {query.data && <DataTable columns={columns} data={query.data} />}
    </div>
  );
}

export default Page;
