export interface IAppointment {
  date: Date;
  startTime: string;
}

export interface IBookedAppointment {
  user?: string;
  service?: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: string;
  _id?: string;
}
