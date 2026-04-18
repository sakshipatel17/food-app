import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { OrderTrackComponent } from './order-track/order-track.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'view-product/:id',
    component: ViewProductComponent,
  },
  {
    path: 'view-cart',
    component: CartComponent,
  },
  {
    path: 'wish-list',
    component: WishlistComponent,
  },
  {
    path: 'check-out',
    component: CheckoutComponent,
  },
  {
    path: 'track-order',
    component: OrderTrackComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent, // ✅ New profile route
  },
  {
    path: 'payment',
    component: PaymentComponent, // ✅ Payment route added here
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
