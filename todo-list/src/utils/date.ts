import dayjs from 'dayjs';

export const formatDate = (date: string): string => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const formatDateTime = (date: string): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};

export const getCurrentISODate = (): string => {
  return dayjs().toISOString();
};

export const isOverdue = (deadline: string): boolean => {
  return dayjs(deadline).isBefore(dayjs(), 'day');
};

export const isToday = (date: string): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};
