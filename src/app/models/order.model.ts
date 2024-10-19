// src/app/models/order.model.ts
import { CartItem } from './cart-item.model';

export interface Order {
  shippingDetails: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentDetails: {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  cartItems: CartItem[];
  totalPrice: number;
}
