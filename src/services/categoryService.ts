import { apiClient } from '../utils/api';

export interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryData {
  name: string;
  description: string;
  is_active?: boolean;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface CategoryResponse {
  success: boolean;
  data: Category;
}

export const categoryService = {
  async getAllCategories(): Promise<CategoriesResponse> {
    const response = await apiClient.get<any>('/categories');
    // Backend returns { categories: [...] }
    return {
      success: true,
      data: response.categories || []
    };
  },

  async getCategoryById(id: number): Promise<CategoryResponse> {
    const response = await apiClient.get<any>(`/categories/${id}`);
    // Backend returns { category: {...} }
    return {
      success: true,
      data: response.category
    };
  },

  async getProductsByCategory(id: number): Promise<any> {
    return apiClient.get(`/categories/${id}/products`);
  },

  async createCategory(data: CreateCategoryData): Promise<CategoryResponse> {
    const response = await apiClient.post<any>('/categories', data);
    return {
      success: true,
      data: response.category
    };
  },

  async updateCategory(id: number, data: UpdateCategoryData): Promise<CategoryResponse> {
    const response = await apiClient.put<any>(`/categories/${id}`, data);
    return {
      success: true,
      data: response.category
    };
  },

  async deleteCategory(id: number): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/categories/${id}`);
  },
};
