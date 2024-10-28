import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Observable, of, reduce } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  cart$: Observable<Movie[]> = this.cartService.getCart();
  CartCount = computed(()=> this.cartService.Count());
  subTotal=signal<number>(0);
  cart:[]=[];
constructor(private router: Router,private utilityService :UtilityService) {}
  ngOnInit(): void {
   this.loadcart();
   this.calculateSubtotal();
  }
  loadcart(){
    this.cartService.getCart().subscribe((data:any) => {
      this.cart$= of(data);
});
  }
getStars(rating:number):number[]{
    return this.utilityService.getStars(rating);
    }
    floorval(rating:number){
    return this.utilityService.floorval(rating);
    }
  removeFromCart(item:Movie):void{
this.cartService.updateCart(item,false).subscribe(
  ()=>{
 this.loadcart();
  }
);
  }
  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);// Adjust the route as needed
    }
    updateQuantity(item:Movie,condition:boolean):void{
if(condition){
  item.quantity++;
  this.calculateSubtotal();
}  
else{
  item.quantity--;
  this.calculateSubtotal();
}
  let payload = {
    ...item,
    quantity: item.quantity,
  };
  this.cartService.UpdateQuantity(payload).subscribe();
  
 }
 calculateSubtotal(): void {
  this.cartService.getCart().subscribe((data:any) => {
    this.cart=data;
    this.subTotal.set(this.cart.reduce((total: number, data: Movie) => total + (data.price * data.quantity), 0));

});

}
  }


