import { useQuery } from '@tanstack/react-query';
import {
  getBookings,
  getBookingsMyWorkspace,
  getUsers,
  getWorkspaceByUserId,
} from './api';

export function useWorkspaceByUserId(id: string) {
  return useQuery({
    queryKey: ['workspaces', 'userId', id],
    queryFn: () => getWorkspaceByUserId(id),
    enabled: !!id,
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
}

export function useBookings(role: string) {
  return useQuery({
    queryKey: ['bookings', role],
    queryFn: getBookings,
  });
}

export function useBookingMyWorkspace(userId: string) {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: getBookingsMyWorkspace,
  });
}
