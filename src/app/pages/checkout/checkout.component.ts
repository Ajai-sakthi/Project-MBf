import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service'; // Make sure this path is correct

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  totalPrice: number;

  constructor(private cartService: CartService) {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  checkout(): void {
    alert('Checkout successful!');
  }
}
