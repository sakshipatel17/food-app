import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // to hold search key from header component
  searchKey = new BehaviorSubject('');
  wishlistMsg: string = '';
  apiWishlist: number[] = [];
  apiCart: number[] = [];
  products: any[] = [];
  cartCount = new BehaviorSubject<any[]>([]);
  
  // API base URL - uses environment variable
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //register
  register(username: any, email: any, password: any) {
    const body = {
      username,
      email,
      password,
    };
    // server call to register an account and return response to register component
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  //login
  login(email: any, password: any) {
    const body = {
      email,
      password,
    };
    // server call to register an account and return response to login component
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  //all products api
  getAllProducts() {
    return this.http.get(`${this.apiUrl}/all-products`);
  }

  //view products api
  viewProduct(productId: any) {
    return this.http.get(`${this.apiUrl}/view-product/${productId}`);
  }

  // appending token to http headee
  appendToken() {
    // fetch token from local Storage
    const token = localStorage.getItem('token') || '';
    // create http header
    let headers = new HttpHeaders();
    if (token) {
      //append token inside http headers
      headers = headers.append('access-token', token);
      options.headers = headers;
    }
    return options;
  }

  //addTowishlist
  addToWishlist(email: any, productId: any) {
    const body = {
      email,
      productId,
    };
    return this.http.post(
      `${this.apiUrl}/addToWishlist/`,
      body,
      this.appendToken()
    );
  }

  //remove from wishlist
  removeFromWishlist(email: any, productId: any) {
    const body = {
      email,
      productId,
    };
    return this.http.put(
      `${this.apiUrl}/removeFromWishlist/`,
      body,
      this.appendToken()
    );
  }

  //addToCart
  addToCart(email: any, productId: any, count: any) {
    const body = {
      email,
      productId,
      count,
    };
    return this.http.post(
      `${this.apiUrl}/addToCart/`,
      body,
      this.appendToken()
    );
  }

  //addToCart
  updateCartItemCount(email: any, productId: any, count: any) {
    const body = {
      email,
      productId,
      count,
    };
    return this.http.put(
      `${this.apiUrl}/updateCartItemCount/`,
      body,
      this.appendToken()
    );
  }

  //remove from cart
  removeFromCart(email: any, productId: any) {
    const body = {
      email,
      productId,
    };
    return this.http.put(
      `${this.apiUrl}/removeFromCart/`,
      body,
      this.appendToken()
    );
  }

  //remove from cart
  emptyCart(email: any) {
    const body = {
      email,
    };
    return this.http.put(
      `${this.apiUrl}/emptyCart/`,
      body,
      this.appendToken()
    );
  }
  // create_time: '2023-02-20T05:19:08Z';
  // id: '2NF61948LD649100D';

  //addToCheckout
  addToCheckout(
    email: any,
    orderID: any,
    transactionID: any,
    dateAndTime: any,
    amount: any,
    status: any,
    products: any,
    detailes: any
  ) {
    const body = {
      email,
      orderID,
      transactionID,
      dateAndTime,
      amount,
      status,
      products,
      detailes,
    };
    return this.http.post(
      `${this.apiUrl}/addToCheckout/`,
      body,
      this.appendToken()
    );
  }

  getWishlist(email: any) {
    return this.http.get(
      `${this.apiUrl}/getWishlist/${email}`,
      this.appendToken()
    );
  }
  getMyOrders(email: any) {
    return this.http.get(
      `${this.apiUrl}/getMyOrders/${email}`,
      this.appendToken()
    );
  }

  // NEW CART API METHODS

  // Get cart by userId
  getCart(userId: any) {
    return this.http.get(
      `${this.apiUrl}/api/cart/${userId}`,
      this.appendToken()
    );
  }

  // Add item to cart (new implementation)
  addToCartNew(userId: any, productId: any, name: any, price: any, quantity: any, image: any) {
    const body = {
      productId,
      name,
      price,
      quantity,
      image
    };
    return this.http.post(
      `${this.apiUrl}/api/cart/${userId}/add`,
      body,
      this.appendToken()
    );
  }

  // Update cart item quantity
  updateCartItemQuantityNew(userId: any, productId: any, quantity: any) {
    const body = {
      productId,
      quantity
    };
    return this.http.put(
      `${this.apiUrl}/api/cart/${userId}/update-quantity`,
      body,
      this.appendToken()
    );
  }

  // Remove item from cart
  removeCartItem(userId: any, productId: any) {
    return this.http.delete(
      `${this.apiUrl}/api/cart/${userId}/remove/${productId}`,
      this.appendToken()
    );
  }

  // Clear cart
  clearCart(userId: any) {
    return this.http.delete(
      `${this.apiUrl}/api/cart/${userId}/clear`,
      this.appendToken()
    );
  }

  // Merge guest cart on login
  mergeGuestCart(userId: any, guestItems: any) {
    const body = {
      guestItems
    };
    return this.http.post(
      `${this.apiUrl}/api/cart/${userId}/merge`,
      body,
      this.appendToken()
    );
  }

  // PAYMENT API METHODS

  // Create Razorpay order
  createRazorpayOrder(amount: any, shippingAddress: any) {
    const body = {
      amount,
      shippingAddress
    };
    return this.http.post(
      `${this.apiUrl}/api/payment/create-order`,
      body,
      this.appendToken()
    );
  }

  // Verify Razorpay payment
  verifyRazorpayPayment(razorpayOrderId: any, razorpayPaymentId: any, razorpaySignature: any) {
    const body = {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    };
    return this.http.post(
      `${this.apiUrl}/api/payment/verify`,
      body,
      this.appendToken()
    );
  }

  // Get user orders
  getUserOrders(userId: any) {
    return this.http.get(
      `${this.apiUrl}/api/orders/${userId}`,
      this.appendToken()
    );
  }

  // Create cash on delivery order
  createCashOrder(amount: any, shippingAddress: any) {
    const body = {
      amount,
      shippingAddress
    };
    return this.http.post(
      `${this.apiUrl}/api/orders/create-cash-order`,
      body,
      this.appendToken()
    );
  }

  // Create simulated card payment order
  createCardOrder(amount: any, shippingAddress: any, cardLastFour: string) {
    const body = {
      amount,
      shippingAddress,
      cardLastFour
    };
    return this.http.post(
      `${this.apiUrl}/api/orders/create-card-order`,
      body,
      this.appendToken()
    );
  }
}
