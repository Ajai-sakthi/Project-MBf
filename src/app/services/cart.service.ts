// src/app/services/cart.service.ts
import { Injectable, signal } from '@angular/core';
// import { CartItem } from '../models/cart-item.model'; // Adjust path as needed
import { count, Observable, tap } from 'rxjs';
import { Movie } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
Cart:number[]=[];
Count=signal<number>(0);
private apiUrl ='http://localhost:3000/Cart'
constructor(private http: HttpClient) {}
getCart():Observable<any>{
  return this.http.get<any>(this.apiUrl).pipe(tap((res:any)=>{this.updateCartCount(res.length)}));
}
updateCart(movie:Movie,update:boolean): Observable<Movie>{
const url=`${this.apiUrl}`;
if(update===true)
  return this.http.post<any>(url,movie).pipe(tap(()=>{this.updateCartCount(this.Count()+1)}));
else{
  const apiurl=`${this.apiUrl}/${movie.id}`;
  return this.http.delete<any>(apiurl).pipe(tap(()=>{this.updateCartCount(this.Count()-1)}));
}
}
updateCartCount(item:number){
  this.Count.set(item);}
  UpdateQuantity(data:Movie):Observable<any>{
    const url=`${this.apiUrl}/${data.id}`
return this.http.put<any>(url,data)
  }
}

