import { apiClient } from '../utils/api';

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface CreateOrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  items: {
    product_id: number;
    quantity: number;
    price: number;
  }[];
}

export interface OrderStats {
  total_orders: number;
  pending_orders: number;
  total_revenue: number;
  recent_orders: Order[];
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
  total?: number;
}

export interface OrderResponse {
  success: boolean;
  data: Order;
}

export interface OrderStatsResponse {
  success: boolean;
  data: OrderStats;
}

export const orderService = {
  async getAllOrders(): Promise<OrdersResponse> {
    const response = await apiClient.get<any>('/orders');
    // Backend returns { orders: [...], pagination: {...} }
    return {
      success: true,
      data: response.orders || [],
      total: response.pagination?.totalItems
    };
  },

  async getOrderById(id: number): Promise<OrderResponse> {
    const response = await apiClient.get<any>(`/orders/${id}`);
    // Backend returns { order: {...} }
    return {
      success: true,
      data: response.order
    };
  },

  async createOrder(data: CreateOrderData): Promise<OrderResponse> {
    const response = await apiClient.post<any>('/orders', data);
    return {
      success: true,
      data: response.order
    };
  },

  async updateOrderStatus(
    id: number,
    status: Order['status']
  ): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.put<any>(`/orders/${id}/status`, { status });
    return {
      success: true,
      message: response.message || 'Order status updated successfully'
    };
  },

  async deleteOrder(id: number): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<any>(`/orders/${id}`);
    return {
      success: true,
      message: response.message || 'Order deleted successfully'
    };
  },

  async getOrderStats(): Promise<OrderStatsResponse> {
    const response = await apiClient.get<any>('/orders/stats/summary');
    return {
      success: true,
      data: response
    };
  },
};
