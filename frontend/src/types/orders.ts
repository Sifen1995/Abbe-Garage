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

// Define the structure for a single Order item
export interface Order {
    order_id: number;
    order_date: string; // ISO 8601 date string
    vehicle_id: number;
    employee_id: number;
    OrderInfoDetail: OrderInfoDetail;
    OrderStatusDetail: OrderStatusDetail;
    
    // OrderServiceDetail can be null or the defined object structure
    OrderServiceDetail: OrderServiceDetail | null; 
}

// Define the top-level structure (the array of orders)
export interface OrdersData {
    orders: Order[];
}

// Example usage:
// const data: OrdersData = JSON.parse(jsonString);