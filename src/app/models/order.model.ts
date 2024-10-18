export interface Order {
  shippingDetails: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentDetails: {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  cartItems: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
}
