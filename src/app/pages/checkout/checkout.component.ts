import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  checkoutData = {
    name: '',
    address: '',
    paymentMethod: 'creditCard'
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  onSubmit(): void {
    if (this.checkoutData.name && this.checkoutData.address) {
      // Process the order (e.g., send data to a server)
      console.log('Order placed:', this.checkoutData);
      this.cartService.clearCart();
      this.router.navigate(['/order-confirmation']);
    }
  }
}
