import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
// interface User {
//   fullName: string;
//   email: string;
//   username: string;
//   profilePicture: string;
//   orderHistory: Array<any>;
//   wishlist: Array<any>;
//   paymentMethods: Array<any>;
//   reviews: Array<any>;
//   favoriteGenres: Array<string>;
//   twoFactorAuthEnabled: boolean;
//   lastLoggedIn: string | null; // Updated to string | null
// }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null; // User data
  isGuest: boolean = true; // Flag to check if user is a guest

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user) {
      this.isGuest = false; // User is logged in
      this.user = {
        fullName: user.fullName || 'John Doe',
        email: user.email || 'user@example.com',
        username: user.username || 'username123',
        profilePicture: user.profilePicture || 'assets/default-avatar.png',
        orderHistory: user.orderHistory || [],
        wishlist: user.wishlist || [],
        paymentMethods: user.paymentMethods || [],
        reviews: user.reviews || [],
        favoriteGenres: user.favoriteGenres || [],
        twoFactorAuthEnabled: user.twoFactorAuthEnabled || false,
        lastLoggedIn: user.lastLoggedIn || null // Allow null value
      };
    }
  }

  updateProfile() {
    if (this.user) {
      this.user.lastLoggedIn = new Date().toISOString(); // Update last logged in time
      localStorage.setItem('user', JSON.stringify(this.user)); // Save updated user data
      alert('Profile updated successfully!');
    }
  }

  viewOrderDetails(order: any): void {
    console.log('Order Details:', order);
    alert(`Viewing details for ${order.movieTitle}`);
  }

  toggleTwoFactor() {
    if (this.user) {
      this.user.twoFactorAuthEnabled = !this.user.twoFactorAuthEnabled;
      this.updateProfile(); // Save the change
    }
  }
  addPaymentMethod() {
    // Logic to add a payment method (e.g., open a modal or navigate to another page)
    alert('Add Payment Method functionality not implemented yet.');
  }

}
