export interface IAppointment {
  date: Date;
  startTime: string;
}

export interface IUserAppointment {
  _id: string;
  user: string;
  service: {
    _id: string;
    name: string;
    duration: number;
    price: number;
  };
  date: Date;
  startTime: string;
  endTime: string;
  status: string;
}

export interface IAdminAppointment {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  service: {
    _id: string;
    name: string;
    duration?: number;
    price?: number;
  };
  date: Date;
  startTime: string;
  endTime: string;
  status: string;
}

export interface ITab {
  label: string;
  count: number;
  status: string;
}

interface IStatistics {
  label: string;
  value: number;
  color: string;
}

export interface IAdminDashboard {
  success: boolean;
  todayAppointments: number;
  users: number;
  revenue: number;
  totalServices: number;
  recentAppointments: IAdminAppointment[];
}

export interface IAppointmentEvent {
  title: string;
  start: Date;
  end: Date;
  status: string;
}
