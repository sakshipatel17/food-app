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
<<<<<<< HEAD
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MenuComponent } from './menu/menu.component';
=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c

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
<<<<<<< HEAD
    path: 'menu',
    component: MenuComponent,
  },
  {
=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
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
<<<<<<< HEAD
    path: 'order-confirmation',
    component: OrderConfirmationComponent,
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
  },
  {
=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
