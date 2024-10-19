import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/sharedComponents/header/header.component';
import { SidebarComponent } from './components/customComponents/sidebar/sidebar.component';
import { FooterComponent } from './components/sharedComponents/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/404page/notPageFound.component';
import { CustomCarouselComponent } from './pages/home/component/custom-carousel/custom-carousel.component';
import { Custom2carouselComponent } from './pages/home/component/custom2carousel/custom2carousel.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component'; // Import your WishlistComponent
import { CommonModule } from '@angular/common'; // Import CommonModule
import { TopRatedMoviesComponent } from './pages/top-rated-movies/top-rated-movies.component';
import { FormatPricePipe } from './format-price.pipe'; // Adjust path accordingly
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    MovieListComponent,
    TopRatedMoviesComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CustomCarouselComponent,
    Custom2carouselComponent,
    WishlistComponent,
    FormatPricePipe // Declare your WishlistComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    CommonModule // Include CommonModule in the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
