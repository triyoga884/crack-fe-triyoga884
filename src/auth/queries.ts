// src/features/auth/queries.ts
import { useQuery } from '@tanstack/react-query';
import { getMe } from './api';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });
}
