import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Booking } from '../../../lib/type';
import { postBooking } from './api';

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
