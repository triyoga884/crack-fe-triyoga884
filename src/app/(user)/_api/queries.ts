import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  getAllWorkspaces,
  getAvailableDates,
  getChekoutData,
  getProfile,
  getUserBookings,
  getWorkspaceById,
  searchWorkspace,
} from './api';

export function useAllWorkspaces(isVerified: boolean) {
  return useQuery({
    queryKey: ['workspaces', isVerified],
    queryFn: () => getAllWorkspaces(isVerified),
  });
}

export function useWorkspaceById(id: string) {
  return useQuery({
    queryKey: ['workspace', id],
    queryFn: () => getWorkspaceById(id),
    enabled: !!id,
  });
}

export function useSearchWorkspace(search: string, type: string) {
  return useQuery({
    queryKey: ['workspaces', search, type],
    queryFn: () => searchWorkspace(search, type),
    placeholderData: keepPreviousData,
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

export function useCheckout(id: string) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => getChekoutData(id),
    enabled: !!id,
  });
}

export function useUserBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: getUserBookings,
    refetchOnMount: 'always',
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    refetchOnMount: 'always',
  });
}
