import { apiClient, setAuthToken, removeAuthToken } from '../utils/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface VerifyOTPData {
  userId: number;
  otp: string;
}

export interface AuthResponse {
  success?: boolean;
  message: string;
  userId?: number;
  otp?: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    fullName: string;
    role: string;
  };
}

export interface UserResponse {
  success: boolean;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response;
  },

  async verifyOTP(data: VerifyOTPData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/verify-otp', data);
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  async resendOTP(userId: number): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/resend-otp', { userId });
  },

  async getCurrentUser(): Promise<UserResponse> {
    return apiClient.get<UserResponse>('/auth/me');
  },

  async changePassword(data: ChangePasswordData): Promise<{ success: boolean; message: string }> {
    return apiClient.put('/auth/change-password', data);
  },

  logout() {
    removeAuthToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  },
};
