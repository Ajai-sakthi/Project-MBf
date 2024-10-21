import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // Import HomeComponent
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/404page/notPageFound.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component'; // Make sure ProfileComponent is imported
const routes: Routes = [
  { path: '', component: HomeComponent }, // Set home route to HomeComponent
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**',component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


