import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Booking, Payment } from '../../../lib/type';
import { postBooking, postPayment } from './api';

export function useBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Booking) => postBooking(data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['date', variables.workspaceId],
      });
    },
  });
}

export function usePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Payment) => postPayment(data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['booking', variables.bookingId],
      });
    },
  });
}
