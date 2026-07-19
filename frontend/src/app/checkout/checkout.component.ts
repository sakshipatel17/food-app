import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  products: any[] = [];
  total: number = 0;
  errorMsg: string = '';
  successMsg: any = false;
  checkoutValid: any = false;
  name: string = '';
  email: string = '';
  userId: string = '';
  mobile: string = '';
  address: string = '';
  razorpayOrderId: string = '';
  razorpayKey: string = '';
  isLoading: boolean = false;
  isProcessingPayment: boolean = false;
  paymentMethod: string = 'cod';
  cardNumber: string = '';
  cardName: string = '';
  cardExpiry: string = '';
  cardCvv: string = '';

  //login group
  checkoutForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],
    ],
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    address: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Z0-9(),. ]*')],
    ],
    mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
  });
  
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.userId = this.email; // Using email as userId for now
    this.products = JSON.parse(localStorage.getItem('checkout') || '[]');
    
    if (this.products.length == 0) {
      this.router.navigateByUrl('/view-cart');
    }
    
    console.log(this.products);
    this.api.cartCount.next(this.products);
    this.products.map((product: any) => {
      this.total += product.price;
    });
    this.total = Number(this.total.toFixed(2));

    // Pre-fill email if logged in
    if (this.email) {
      this.checkoutForm.patchValue({ email: this.email });
    }
  }

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

  checkout() {
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      this.name = this.checkoutForm.value.name || '';
      this.email = this.checkoutForm.value.email || '';
      this.mobile = this.checkoutForm.value.mobile || '';
      this.address = this.checkoutForm.value.address || '';
      
      if (this.paymentMethod === 'cod') {
        // Cash on Delivery flow
        this.placeCashOrder();
      } else if (this.paymentMethod === 'card') {
        // Card payment flow (simulated)
        this.placeCardOrder();
      }
    } else {
      this.errorMsg = 'Please fill all required fields correctly.';
    }
  }

  placeCashOrder() {
    const shippingAddress = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      address: this.address
    };
    
    this.api.createCashOrder(this.total, shippingAddress).subscribe(
      (result: any) => {
        console.log(result);
        this.isLoading = false;
        
        if (result.statusCode === 200) {
          this.router.navigate(['/order-confirmation'], {
            queryParams: {
              orderId: result.order._id,
              total: result.order.totalAmount,
              paymentMethod: 'cod'
            }
          });
        } else {
          this.errorMsg = result.message || 'Could not place order. Please try again.';
        }
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.errorMsg = 'Could not place order. Please try again.';
      }
    );
  }

  placeCardOrder() {
    // Validate card details
    const cardNumberClean = this.cardNumber.replace(/\s/g, '');
    if (!cardNumberClean || cardNumberClean.length !== 16 || !/^\d+$/.test(cardNumberClean)) {
      this.isLoading = false;
      this.errorMsg = 'Please enter a valid 16-digit card number.';
      return;
    }

    if (!this.cardName || this.cardName.trim() === '') {
      this.isLoading = false;
      this.errorMsg = 'Please enter the name on card.';
      return;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!this.cardExpiry || !expiryRegex.test(this.cardExpiry)) {
      this.isLoading = false;
      this.errorMsg = 'Please enter a valid expiry date (MM/YY).';
      return;
    }

    if (!this.cardCvv || this.cardCvv.length < 3 || this.cardCvv.length > 4 || !/^\d+$/.test(this.cardCvv)) {
      this.isLoading = false;
      this.errorMsg = 'Please enter a valid CVV (3-4 digits).';
      return;
    }

    const shippingAddress = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      address: this.address
    };

    const cardLastFour = cardNumberClean.slice(-4);

    // Simulate processing delay
    setTimeout(() => {
      this.api.createCardOrder(this.total, shippingAddress, cardLastFour).subscribe(
        (result: any) => {
          console.log(result);
          this.isLoading = false;
          
          if (result.statusCode === 200) {
            this.router.navigate(['/order-confirmation'], {
              queryParams: {
                orderId: result.order._id,
                total: result.order.totalAmount,
                paymentMethod: 'card',
                cardLastFour: cardLastFour
              }
            });
          } else {
            this.errorMsg = result.message || 'Could not place order. Please try again.';
          }
        },
        (error: any) => {
          console.log(error);
          this.isLoading = false;
          this.errorMsg = 'Could not place order. Please try again.';
        }
      );
    }, 1500); // 1.5 second delay to simulate processing
  }
}
