export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: 'active' | 'inactive' | string; 
  createdAt: string;
}