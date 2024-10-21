// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model'; // Adjust path as needed
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = []; // Array to hold cart items
  public cartCountSubject = new BehaviorSubject<number>(0); // Observable to hold cart count

  constructor() {
    this.loadCartItems();
  }

  // Load cart items from local storage
   loadCartItems(): void {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = items;
    this.cartCountSubject.next(this.cartItems.length); // Update the cart count
  }

  // Retrieve cart items
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Update item quantity in the cart
  updateItemQuantity(item: CartItem): void {
    const cartItem = this.cartItems.find(i => i.name === item.name);
    if (cartItem) {
      cartItem.quantity = item.quantity; // Update quantity
      this.updateLocalStorage(); // Ensure local storage is updated
    }
  }

  // Remove item from the cart
  removeItem(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1); // Remove item from cart
      this.updateLocalStorage(); // Ensure local storage is updated
    }
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems = []; // Reset the cart items
    this.updateLocalStorage(); // Ensure local storage is cleared
  }

  // Add item to the cart
  addToCart(item: CartItem): void {
    // Check if the item already exists in the cart
    const existingItem = this.cartItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Increase quantity if it exists
    } else {
      this.cartItems.push(item); // Add new item if it doesn't exist
    }
    this.updateLocalStorage(); // Update local storage after adding
  }

  // Update local storage and emit new cart count
  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartCountSubject.next(this.cartItems.length); // Update the count
  }

  // Get the current cart count as an observable
  getCartCount(): BehaviorSubject<number> {
    return this.cartCountSubject;
  }
}
