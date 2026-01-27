import { apiClient } from '../utils/api';

export interface Product {
  id: number;
  product_id: string;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  image_path: string;
  status: string;
  is_featured: boolean;
  benefits?: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateProductData {
  product_id: string;
  name: string;
  short_description: string;
  long_description?: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  status?: string;
  is_featured?: boolean;
  benefits?: string[];
}

export interface UpdateProductData extends Partial<CreateProductData> {}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  total?: number;
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export const productService = {
  async getAllProducts(): Promise<ProductsResponse> {
    const response = await apiClient.get<any>('/products');
    // Backend returns { products: [...], pagination: {...} }
    // Transform to expected format
    return {
      success: true,
      data: response.products || [],
      total: response.pagination?.totalItems
    };
  },

  async getProductById(id: number): Promise<ProductResponse> {
    const response = await apiClient.get<any>(`/products/${id}`);
    // Backend returns { product: {...} }
    // Transform to expected format
    return {
      success: true,
      data: response.product
    };
  },

  async createProduct(data: CreateProductData): Promise<ProductResponse> {
    const response = await apiClient.post<any>('/products', data);
    // Backend returns { message: '...', product: {...} }
    return {
      success: true,
      data: response.product
    };
  },

  async updateProduct(id: number, data: UpdateProductData): Promise<ProductResponse> {
    const response = await apiClient.put<any>(`/products/${id}`, data);
    // Backend returns { message: '...', product: {...} }
    return {
      success: true,
      data: response.product
    };
  },

  async deleteProduct(id: number): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<any>(`/products/${id}`);
    return {
      success: true,
      message: response.message || 'Product deleted successfully'
    };
  },

  async uploadProductImage(id: number, file: File): Promise<ProductResponse> {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiClient.uploadFile<any>(`/products/${id}/image`, formData);
    return {
      success: true,
      data: response.product
    };
  },
};
