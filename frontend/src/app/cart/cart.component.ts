import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  email: string = '';
<<<<<<< HEAD
  userId: string = '';
=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
  cartItemCount: number = 0;
  total: number = 0;
  cart: number[] = [];
  products: any[] = [];
  updatedProducts: any[] = [];
  allProducts: any[] = [];
  price: number = 0;
  productsIds: number[] = [];
  select: number[] = [1, 2, 3, 4];
<<<<<<< HEAD
  removingProductId: number | null = null;
  grandTotalHighlight: boolean = false;
  
  // Loading and error states
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
<<<<<<< HEAD
    this.userId = this.email; // Using email as userId for now
=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c

    if (this.email) {
      this.getMyItems();
    }
    this.allProducts = JSON.parse(localStorage.getItem('products') || '');

<<<<<<< HEAD
    console.log(this.products);
  }

  getMyItems() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.api.getCart(this.userId).subscribe(
      (result: any) => {
        console.log(result);
        this.isLoading = false;

        if (result.statusCode === 200 && result.cart) {
          const cartData = result.cart;
          
          this.products = [];
          this.allProducts.map((item: any) => {
            if (item.normalPrice == undefined) {
              item.normalPrice = item.price;
            }
          });
          
          cartData.items.forEach((cartItem: any) => {
            this.allProducts.forEach((product: any) => {
              if (product['id'] == cartItem.productId) {
                product.count = cartItem.quantity;
                product.price = product.normalPrice * cartItem.quantity;
                this.products.push(product);
              }
            });
          });

          this.products = this.products;
          this.total = 0;
          this.products.map((product: any) => {
            this.total += product.price;
          });
          this.total = Number(this.total.toFixed(2));

          localStorage.setItem('checkout', JSON.stringify(this.products));
          
          const cartIds = cartData.items.map((item: any) => item.productId);
          this.api.apiCart = cartIds;
          this.api.cartCount.next(cartIds);
          
          console.log(this.products);
        } else {
          this.products = [];
          this.total = 0;
        }
      },
      (result: any) => {
        console.log(result);
        this.isLoading = false;
        this.errorMessage = 'Could not load cart. Please try again.';
        this.products = [];
        this.total = 0;
=======
    // if (localStorage.getItem('products')) {
    // }

    // this.products = this.api.products;

    console.log(this.products);

    // localStorage.setItem('myCart', JSON.stringify(this.products));
    // console.log(this.products);
  }

  getMyItems() {
    this.api.getWishlist(this.email).subscribe(
      (result: any) => {
        console.log(result);

        let cartproductIds: any[] = [];
        let cartNew: number[] = [];
        cartproductIds = result.cart;
        cartproductIds.forEach((item) => cartNew.push(item.productId));
        this.cart = cartproductIds;

        this.products = [];
        this.allProducts.map((item: any) => {
          if (item.normalPrice == undefined) {
            item.normalPrice = item.price;
          }
        });
        this.cart.map((i: any) => {
          this.allProducts.forEach((product: any) => {
            if (product['id'] == i.productId) {
              product.count = i.count;
              product.price = product.normalPrice * i.count;

              this.products.push(product);
            }
          });
        });
        // console.log(this.cart);
        this.cart = this.cart;
        this.products = this.products;
        this.total = 0;
        this.products.map((product: any) => {
          this.total += product.price;
        });
        this.total = Number(this.total.toFixed(2));

        localStorage.setItem('checkout', JSON.stringify(this.products));

        this.api.apiCart = cartNew;
        this.api.cartCount.next(cartNew);

        localStorage.setItem('username', result.username);
        localStorage.setItem('email', result.email);
        localStorage.setItem('wishlist', JSON.stringify(result.wishlist));
        localStorage.setItem('cart', JSON.stringify(result.cart));
        localStorage.setItem('token', result.token);
        console.log(this.products);
      },
      (result: any) => {
        console.log(result.error.message);
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
      }
    );
  }
  onChange(value: any, productId: any) {
    this.cartItemCount = value.target.value;
    console.log(this.cartItemCount);

    this.addToCart(productId, this.cartItemCount);
  }

<<<<<<< HEAD
  incrementQuantity(productId: any) {
    const product = this.products.find((p: any) => p.id === productId);
    if (product && product.count < 4) {
      this.addToCart(productId, product.count + 1);
    }
  }

  decrementQuantity(productId: any) {
    const product = this.products.find((p: any) => p.id === productId);
    if (product && product.count > 1) {
      this.addToCart(productId, product.count - 1);
    }
  }

  addToCart(productId: any, count: any) {
    this.errorMessage = '';
    this.successMessage = '';
    
    const product = this.products.find((p: any) => p.id === productId);
    if (!product) return;

    this.api.updateCartItemQuantityNew(this.userId, productId, count).subscribe(
      (result: any) => {
        console.log(result);
        if (result.statusCode === 200) {
          this.grandTotalHighlight = true;
          this.getMyItems();
          setTimeout(() => {
            this.grandTotalHighlight = false;
          }, 300);
        } else {
          this.errorMessage = result.message || 'Could not update cart. Please try again.';
        }
      },
      (result: any) => {
        console.log(result);
        this.errorMessage = 'Could not update cart. Please try again.';
=======
  addToCart(productId: any, count: any) {
    this.api.updateCartItemCount(this.email, productId, count).subscribe(
      // success case
      (result: any) => {
        console.log(result);
        this.getMyItems();

        // // this.wishlistMsg = result.message;
        // this.api.wishlistMsg = result.message;
        // this.getMyItems();
        // setTimeout(() => {
        //   // this.wishlistMsg = '';
        // }, 5000);
      },
      // error msg
      (result: any) => {
        // this.wishlistMsg = result.error.message;
        console.log(result);
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
      }
    );
  }
  removeFromCart(productId: any) {
<<<<<<< HEAD
    this.removingProductId = productId;
    this.errorMessage = '';
    this.successMessage = '';
    
    this.api.removeCartItem(this.userId, productId).subscribe(
      (result: any) => {
        console.log(result);
        this.removingProductId = null;
        
        if (result.statusCode === 200) {
          this.successMessage = 'Item removed from cart';
          setTimeout(() => {
            this.getMyItems();
            this.successMessage = '';
          }, 250);
        } else {
          this.errorMessage = result.message || 'Could not remove item. Please try again.';
        }
      },
      (result: any) => {
        console.log(result.error.message);
        this.removingProductId = null;
        this.errorMessage = 'Could not remove item. Please try again.';
=======
    this.api.removeFromCart(this.email, productId).subscribe(
      // success case
      (result: any) => {
        console.log(result);
        this.api.wishlistMsg = result.message;

        const index = this.cart.indexOf(productId);
        this.cart.splice(index, 1);
        this.getMyItems();
      },
      // error msg
      (result: any) => {
        console.log(result.error.message);
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
      }
    );
  }
  emptyCart(email: any) {
<<<<<<< HEAD
    this.errorMessage = '';
    this.successMessage = '';
    
    this.api.clearCart(this.userId).subscribe(
      (result: any) => {
        console.log(result);
        if (result.statusCode === 200) {
          this.successMessage = 'Cart cleared successfully';
          this.cart = [];
          this.getMyItems();
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        } else {
          this.errorMessage = result.message || 'Could not clear cart. Please try again.';
        }
      },
      (result: any) => {
        console.log(result);
        this.errorMessage = 'Could not clear cart. Please try again.';
=======
    this.api.emptyCart(email).subscribe(
      // success case
      (result: any) => {
        console.log(result);
        this.api.wishlistMsg = result.message;
        this.cart = [];

        this.getMyItems();
      },
      // error msg
      (result: any) => {
        console.log(result);
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
      }
    );
  }
}
