import { useQuery } from '@tanstack/react-query';
import {
  getAllVerifiedWorkspaces,
  getAvailableDates,
  getBookingById,
  getWorkspaceById,
} from './api';

export function useAllVerifiedWorkspaces() {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: getAllVerifiedWorkspaces,
  });
}

export function useWorkspaceById(id: string) {
  return useQuery({
    queryKey: ['workspace', id],
    queryFn: () => getWorkspaceById(id),
    enabled: !!id,
  });
}

export function useDateAvailable(id: string) {
  return useQuery({
    queryKey: ['date', id],
    queryFn: () => getAvailableDates(id),
    enabled: !!id,
    // refetchOnMount: 'always',
  });
}

export function useBookingById(id: string) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingById(id),
    enabled: !!id,
  });
}
