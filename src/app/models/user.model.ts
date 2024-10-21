export interface User {
  fullName: string;
  email: string;
  username: string;
  profilePicture: string;
  orderHistory: Array<any>;
  wishlist: Array<any>;
  paymentMethods: Array<any>;
  reviews: Array<any>;
  favoriteGenres: Array<string>;
  twoFactorAuthEnabled: boolean;
  lastLoggedIn: string | null; // Change type to string | null
}

