'use client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { useUsers } from '../../_api/queries';

function Page() {
  const { data, isLoading, error } = useUsers();

  console.log(data);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading data.</div>}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}

export default Page;
