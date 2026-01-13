import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';

function page() {
    const { isLoading, isAuthenticated } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) redirect('/');
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <LoginForm />
    </div>  
  );
}

export default page;
