import type { ITab } from '../interface/appointment.interface';

export const canCancelAppointment = (date: Date): boolean => {
  const today = new Date();
  const appointmentDate = new Date(date);
  const cancellationDate = new Date(
    appointmentDate.getTime() - 48 * 60 * 60 * 1000
  );

  return today.getTime() <= cancellationDate.getTime();
};

export const statusArray = (statusSummary: any): ITab[] => {
  return [
    { label: 'All', count: statusSummary.all || 0, status: 'all' },
    {
      label: 'Upcoming',
      count: statusSummary.confirmed || 0,
      status: 'confirmed',
    },
    {
      label: 'Cancelled',
      count: statusSummary.canceled || 0,
      status: 'cancelled',
    },
    {
      label: 'History',
      count: statusSummary.completed || 0,
      status: 'completed',
    },
  ];
};

export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-amber-500/20 text-amber-500 border border-amber-500/30';
    case 'cancelled':
      return 'bg-rose-600/20 text-rose-600 border border-rose-600/30';
    case 'completed':
      return 'bg-emerald-600/20 text-emerald-600 border border-emerald-600/30';
    default:
      return 'bg-slate-200 text-slate-700 border border-slate-300 dark: bg-slate-800 dark:text-slate-400 dark:border-slate-900';
  }
};
