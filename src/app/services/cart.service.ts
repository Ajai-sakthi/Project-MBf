import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    this.loadCart(); // Load cart items from local storage on service initialization
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  addToCart(movie: any): void {
    this.cartItems.push(movie);
    this.saveCart();
  }

  removeFromCart(movie: any): void {
    this.cartItems = this.cartItems.filter(item => item.id !== movie.id);
    this.saveCart();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, movie) => total + movie.price, 0);
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
