export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  isAdmin?: boolean;
  workingHours?: IWorkingHours[];
}

export interface IWorkingHours {
  day: string;
  startTime: string;
  endTime: string;
  dayOff?: boolean;
} 