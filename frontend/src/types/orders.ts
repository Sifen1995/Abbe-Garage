// Define the structure for the CommonServiceOrder nested within OrderServiceDetail
export interface CommonServiceOrder {
    service_name: string;
}

// Define the structure for OrderServiceDetail
export interface OrderServiceDetail {
    service_completed: boolean;
    CommonServiceOrder: CommonServiceOrder;
}

// Define the structure for OrderStatusDetail
export interface OrderStatusDetail {
    order_status: "Completed" | "Pending" | string; // Use a union type for known statuses, or string for flexibility
}

// Define the structure for OrderInfoDetail
export interface OrderInfoDetail {
    order_total_price: string; // Keeping as string to match the JSON's quoted number ("3909.00")
    order_estimated_completion_date: string; // ISO 8601 date string
}

// Define the structure for a single Order item (from backend API)
export interface Order {
    id: number;
    owiningCustomer: number; // Note: typo in backend "owining" instead of "owning"
    assignedEmployee: number;
    vehicle: number;
    date: string; // ISO 8601 date string
    hash: string;
    status: string; // "Pending", "Completed", "In progress", etc.
    totalPrice: string;
    estimatedCompletionDate: string; // ISO 8601 date string
    completionDate: string | null;
    additonalRequests: string | null; // Note: typo in backend "additonal" instead of "additional"
    additonalRequestsCompletionDate: boolean;
}

// Legacy Order structure (for backward compatibility if needed)
export interface LegacyOrder {
    order_id: number;
    order_date: string;
    vehicle_id: number;
    employee_id: number;
    OrderInfoDetail: OrderInfoDetail;
    OrderStatusDetail: OrderStatusDetail;
    OrderServiceDetail: OrderServiceDetail | null; 
}

// Define the top-level structure (the array of orders)
export interface OrdersData {
    orders: Order[];
}

// Define the structure for creating a new order
export interface CreateOrderRequest {
  customer_id: number;
  employee_id: number;
  order_date: string; // Format: "YYYY-MM-DD HH:mm:ss"
  order_hash: string;
  vehicle_id: number;
  order_total_price: number;
  order_estimated_completion_date: string; // Format: "YYYY-MM-DD HH:mm:ss"
  service_id: number;
  service_completed: string; // "true" or "false"
  order_additional_requests?: string | null; // Optional additional requests/notes
}

// Example usage:
// const data: OrdersData = JSON.parse(jsonString);