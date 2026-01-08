'use client';
import { useRouter } from 'next/navigation';
import { useLogout } from '../../../auth/mutations';
import { Button } from '../../../components/ui/button';

export default function Profile() {
  const { mutate: logout, isPending, error } = useLogout();
  const router = useRouter();
  const handleLogout = async () => {
    logout(undefined, { onSuccess: () => router.push('/login') });
  };
  return (
    <div>
      <h1>Profile</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
