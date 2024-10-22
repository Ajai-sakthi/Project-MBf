import { Component, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model'; // Adjust path as needed

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartItemsSignal = signal<CartItem[]>([]);
  totalItems: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.loadCartItems();
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartItemsSignal.set(this.cartItems);
    this.updateTotals();
  }

  updateTotals(): void {
    this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);

    this.totalPrice = this.cartItems.reduce((sum, item) => {
      const cleanPrice = parseFloat(item.price.replace(/,/g, ''));
      return sum + (cleanPrice * item.quantity);
    }, 0);
  }

  updateQuantity(item: CartItem, increase: boolean): void {
    if (increase) {
      item.quantity++;
    } else {
      item.quantity--;
      if (item.quantity === 0) {
        this.removeFromCart(item);
        return;
      }
    }
  
    this.cartService.updateItemQuantity(item);
    this.updateTotals();
    this.cartItemsSignal.set(this.cartItems);
  }
  

  removeFromCart(item: CartItem): void {
    this.cartService.removeItem(item);
    this.loadCart();
  }

  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill(1),
      ...Array(halfStar).fill(0.5),
      ...Array(emptyStars).fill(0)
    ];
  }

  // Proceed to checkout method
  proceedToCheckout(): void {
    // Navigate to the checkout page or perform checkout logic here
    this.router.navigate(['/checkout']); // Adjust the route as needed
  }
}
