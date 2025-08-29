export interface  IService {
  _id?:string;
  name: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
  category: string;
}