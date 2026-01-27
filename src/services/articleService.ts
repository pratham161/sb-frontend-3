import { apiClient } from '../utils/api';

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author_id: number;
  author_name?: string;
  image_url: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface CreateArticleData {
  title: string;
  content: string;
  excerpt: string;
  is_published?: boolean;
}

export interface UpdateArticleData extends Partial<CreateArticleData> {}

export interface ArticlesResponse {
  success: boolean;
  data: Article[];
  total?: number;
}

export interface ArticleResponse {
  success: boolean;
  data: Article;
}

export const articleService = {
  async getAllArticles(): Promise<ArticlesResponse> {
    const response = await apiClient.get<any>('/articles');
    // Backend returns { articles: [...], pagination: {...} }
    return {
      success: true,
      data: response.articles || [],
      total: response.pagination?.totalItems
    };
  },

  async getArticleById(id: number): Promise<ArticleResponse> {
    const response = await apiClient.get<any>(`/articles/${id}`);
    // Backend returns { article: {...} }
    return {
      success: true,
      data: response.article
    };
  },

  async createArticle(data: CreateArticleData): Promise<ArticleResponse> {
    const response = await apiClient.post<any>('/articles', data);
    return {
      success: true,
      data: response.article
    };
  },

  async updateArticle(id: number, data: UpdateArticleData): Promise<ArticleResponse> {
    const response = await apiClient.put<any>(`/articles/${id}`, data);
    return {
      success: true,
      data: response.article
    };
  },

  async deleteArticle(id: number): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<any>(`/articles/${id}`);
    return {
      success: true,
      message: response.message || 'Article deleted successfully'
    };
  },

  async uploadArticleImage(id: number, file: File): Promise<ArticleResponse> {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiClient.uploadFile<any>(`/articles/${id}/image`, formData);
    return {
      success: true,
      data: response.article
    };
  },
};
