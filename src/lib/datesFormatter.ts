import { format } from 'date-fns';

export const dateOnly = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};
