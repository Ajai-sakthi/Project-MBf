import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model'; // Make sure this path is correct

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = []; // Use CartItem type for better type safety

  constructor() {
    this.loadCart(); // Load cart items from local storage on service initialization
  }

  // Load cart items from local storage
  private loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  // Save cart items to local storage
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Add an item to the cart
  addToCart(item: CartItem): void {
    const foundItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (foundItem) {
      foundItem.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 }); // Initialize quantity to 1
    }
    this.saveCart(); // Save the cart to local storage after adding an item
    this.notifyCartUpdate(item.title); // Notify user that item is added to cart
  }

  // Notify the user that an item was added to the cart
  notifyCartUpdate(movieTitle: string): void {
    console.log(`${movieTitle} was added to your cart.`);
    // You can integrate a notification system here (e.g., a UI toast)
  }

  // Remove an item from the cart
  removeFromCart(movie: CartItem): void {
    this.cartItems = this.cartItems.filter(item => item.id !== movie.id);
    this.saveCart(); // Save the updated cart to local storage
  }

  // Get all items in the cart
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Get the total price of items in the cart
  getTotalPrice(): number {
    return this.cartItems.reduce((total, movie) => total + (movie.price * movie.quantity), 0);
  }

  // Clear the entire cart
  clearCart(): void {
    this.cartItems = [];
    this.saveCart(); // Save the empty cart to local storage
  }

  // Update the quantity of a specific item in the cart
  updateCartItemQuantity(item: CartItem): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity = item.quantity;
      this.saveCart(); // Save after updating quantity
    }
  }
}
