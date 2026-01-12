// src/features/auth/queries.ts
import { useQuery } from '@tanstack/react-query';
import { getMe } from './api';
import { setAccessToken } from '../lib/fetcher';

export function useMe() {
  // const { isSuccess } = useAuthBootstrap();

  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false, // auth errors are real
    staleTime: Infinity, // user rarely changes
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // enabled: isSuccess,
  });
}

// export function useAuthBootstrap() {
//   return useQuery({
//     queryKey: ['auth', 'bootstrap'],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_LOCAL_API}/auth/refresh`,
//         {
//           method: 'POST',
//           credentials: 'include',
//         }
//       );

//       if (!res.ok) throw new Error('No session');

//       const data = await res.json();
//       setAccessToken(data.accessToken);
//       return true;
//     },
//     retry: false,
//     staleTime: Infinity,
//   });
// }
