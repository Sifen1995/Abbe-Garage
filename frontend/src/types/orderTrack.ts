export interface ServiceDetail {
  serviceName: string;
  serviceCompleted: boolean;
}


export interface OrderTrack {
  message: string;
  orderId: number;
  status: string;
  servicesList: ServiceDetail[]; // This is the array of service details
}