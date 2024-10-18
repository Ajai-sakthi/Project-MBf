import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/sharedComponents/header/header.component';
import { FooterComponent } from './components/sharedComponents/footer/footer.component';
import { SidebarComponent } from './components/customComponents/sidebar/sidebar.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    MovieListComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CustomCarouselComponent,
    Custom2carouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
