import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  email: string = '';
  userId: string = '';
  cartItemCount: number = 0;
  total: number = 0;
  cart: number[] = [];
  products: any[] = [];
  updatedProducts: any[] = [];
  allProducts: any[] = [];
  price: number = 0;
  productsIds: number[] = [];
  select: number[] = [1, 2, 3, 4];
  removingProductId: number | null = null;
  grandTotalHighlight: boolean = false;
  
  // Loading and error states
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.userId = this.email; // Using email as userId for now

    if (this.email) {
      this.getMyItems();
    }
    this.allProducts = JSON.parse(localStorage.getItem('products') || '');

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
      }
    );
  }
  onChange(value: any, productId: any) {
    this.cartItemCount = value.target.value;
    console.log(this.cartItemCount);

    this.addToCart(productId, this.cartItemCount);
  }

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
      }
    );
  }
  removeFromCart(productId: any) {
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
      }
    );
  }
  emptyCart(email: any) {
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
      }
    );
  }
}
