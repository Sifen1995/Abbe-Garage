export interface Employee {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role:string,
  status: 'active' | 'inactive' | string; 
  createdAt: string;
}