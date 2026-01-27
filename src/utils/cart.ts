// Cart management utility for localStorage
export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image_path?: string;
  stock_quantity?: number;
}

const CART_KEY = 'symbicroft_cart';

export const cart = {
  // Get all items from cart
  getItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const cartData = localStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  },

  // Add item to cart
  addItem(item: CartItem): void {
    const items = this.getItems();
    const existingItemIndex = items.findIndex(
      (i) => i.product_id === item.product_id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      items.push(item);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(items));
    this.dispatchCartUpdate();
  },

  // Update item quantity
  updateQuantity(product_id: number, quantity: number): void {
    const items = this.getItems();
    const itemIndex = items.findIndex((i) => i.product_id === product_id);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        items.splice(itemIndex, 1);
      } else {
        items[itemIndex].quantity = quantity;
      }
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      this.dispatchCartUpdate();
    }
  },

  // Remove item from cart
  removeItem(product_id: number): void {
    const items = this.getItems().filter((i) => i.product_id !== product_id);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    this.dispatchCartUpdate();
  },

  // Clear entire cart
  clearCart(): void {
    localStorage.removeItem(CART_KEY);
    this.dispatchCartUpdate();
  },

  // Get cart total
  getTotal(): number {
    return this.getItems().reduce(
      (total, item) => total + item.product_price * item.quantity,
      0
    );
  },

  // Get cart item count
  getItemCount(): number {
    return this.getItems().reduce((count, item) => count + item.quantity, 0);
  },

  // Check if item is in cart
  isInCart(product_id: number): boolean {
    return this.getItems().some((i) => i.product_id === product_id);
  },

  // Get specific item from cart
  getItem(product_id: number): CartItem | undefined {
    return this.getItems().find((i) => i.product_id === product_id);
  },

  // Dispatch custom event for cart updates
  dispatchCartUpdate(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { items: this.getItems(), total: this.getTotal() }
      }));
    }
  }
};
