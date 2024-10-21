// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model'; // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = []; // Store cart items as CartItem[]

  constructor() {}

  // Retrieve cart items
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Update item quantity in the cart
  updateItemQuantity(item: CartItem): void {
    const cartItem = this.cartItems.find(i => i.name === item.name);
    if (cartItem) {
      cartItem.quantity = item.quantity; // Update quantity
    }
  }

  // Remove item from the cart
  removeItem(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1); // Remove item from cart
    }
  }
  // Method to clear the cart
  clearCart(): void {
    this.cartItems = []; // Reset the cart items
  }
  addToCart(item: CartItem): void {
    // Check if the item already exists in the cart
    const existingItem = this.cartItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Increase quantity if it exists
    } else {
      this.cartItems.push(item); // Add new item if it doesn't exist
    }
  }
}
