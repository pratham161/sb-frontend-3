import { API_URL } from '../utils/api';

export interface RazorpayOrderResponse {
  success: boolean;
  order: {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
  };
}

export interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  order_id: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  payment_id?: string;
}

export const paymentService = {
  // Create Razorpay order (public endpoint - no auth required)
  async createRazorpayOrder(
    amount: number,
    receipt?: string,
    notes?: any
  ): Promise<RazorpayOrderResponse> {
    const response = await fetch(`${API_URL}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        receipt,
        notes
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // Verify payment signature (public endpoint - no auth required)
  async verifyPayment(
    data: PaymentVerificationData
  ): Promise<PaymentVerificationResponse> {
    const response = await fetch(`${API_URL}/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // Get payment details (admin only - requires auth)
  async getPaymentDetails(paymentId: string): Promise<any> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // Initiate refund (admin only - requires auth)
  async initiateRefund(
    payment_id: string,
    amount?: number,
    notes?: any
  ): Promise<any> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/payments/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        payment_id,
        amount,
        notes
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
};
