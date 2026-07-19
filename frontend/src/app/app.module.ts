import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderTrackComponent } from './order-track/order-track.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxPayPalModule } from 'ngx-paypal';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';
<<<<<<< HEAD
import { ScrollAnimateDirective } from './scroll-animate.directive';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MenuComponent } from './menu/menu.component';
=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ViewProductComponent,
    CartComponent,
    WishlistComponent,
    PagenotfoundComponent,
    CheckoutComponent,
    OrderTrackComponent,
    FilterPipe,
    ProfileComponent,
    PaymentComponent,
<<<<<<< HEAD
    ScrollAnimateDirective,
    OrderConfirmationComponent,
    MyOrdersComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
=======
  ],
  imports: [
    BrowserModule,
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPayPalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
