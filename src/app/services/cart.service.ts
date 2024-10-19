// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  addToCart(item: CartItem): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Increment quantity if item exists
    } else {
      this.cart.push(item); // Add new item to the cart
    }
  }

  getCartItems(): CartItem[] {
    return this.cart; // Return the current cart items
  }

  removeFromCart(item: CartItem): void {
    // Filter out the item to remove it from the cart
    this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
  }

  clearCart(): void {
    this.cart = []; // Clear the cart
  }
}
