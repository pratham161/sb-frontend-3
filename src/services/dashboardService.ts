import { apiClient } from '../utils/api';

export interface DashboardStats {
  total_products: number;
  total_orders: number;
  pending_orders: number;
  total_revenue: number;
  total_articles: number;
}

export interface SalesData {
  date: string;
  total_sales: number;
  order_count: number;
}

export interface TopProduct {
  product_id: number;
  product_name: string;
  total_quantity: number;
  total_revenue: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStats;
}

export interface SalesDataResponse {
  success: boolean;
  data: SalesData[];
}

export interface TopProductsResponse {
  success: boolean;
  data: TopProduct[];
}

export const dashboardService = {
  async getStats(): Promise<DashboardStatsResponse> {
    return apiClient.get<DashboardStatsResponse>('/dashboard/stats');
  },

  async getSalesData(days: number = 30): Promise<SalesDataResponse> {
    return apiClient.get<SalesDataResponse>(`/dashboard/sales?days=${days}`);
  },

  async getTopProducts(limit: number = 5): Promise<TopProductsResponse> {
    return apiClient.get<TopProductsResponse>(`/dashboard/top-products?limit=${limit}`);
  },
};
