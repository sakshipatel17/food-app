import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
<<<<<<< HEAD
=======
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
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
<<<<<<< HEAD
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
=======
  emailID: string = '';
  mobile: string = '';
  address: string = '';
  transactionID: string = '';
  orderID: string = '';
  status: string = '';
  detailes: any = {};
  dateAndTime: string = '';
  btnprintHide: boolean = false;
  checkoutIds: any = [];

  public payPalConfig?: IPayPalConfig;

  //login group
  checkoutForm = this.fb.group({
    //array
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],
    ],
<<<<<<< HEAD
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
=======
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
    address: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Z0-9(),. ]*')],
    ],
<<<<<<< HEAD
    mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
  });
  
=======
    mobile: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  });
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}
<<<<<<< HEAD
  
  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.userId = this.email; // Using email as userId for now
    this.products = JSON.parse(localStorage.getItem('checkout') || '[]');
    
    if (this.products.length == 0) {
      this.router.navigateByUrl('/view-cart');
    }
    
=======
  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.products = JSON.parse(localStorage.getItem('checkout') || '');
    if (this.products.length == 0) {
      this.router.navigateByUrl('/view-cart');
    }
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
    console.log(this.products);
    this.api.cartCount.next(this.products);
    this.products.map((product: any) => {
      this.total += product.price;
    });
<<<<<<< HEAD
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
=======

    // paypal
    this.initConfig();
  }
  checkout() {
    if (this.checkoutForm.valid) {
      this.checkoutValid = true;
      this.name = this.checkoutForm.value.name || '';
      this.emailID = this.checkoutForm.value.email || '';
      this.mobile = this.checkoutForm.value.mobile || '';
      this.address = this.checkoutForm.value.address || '';
      localStorage.setItem('grandTotal', this.total.toString());

    } else {
      alert('inavlid inputs');
    }
  }

  printBill() {
    this.btnprintHide = true;
    setTimeout(() => {
      window.print();
      this.btnprintHide = false;
    }, 1000);
  }

  // paypal integration
  private initConfig(): void {
    const amount = JSON.stringify(this.total);
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'secretid',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          application_context: {
            shipping_preference: 'NO_SHIPPING',
          },
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: amount,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: amount,
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        // console.log(
        //   'onApprove - transaction was approved, but not authorized',
        //   data,
        //   actions
        // );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
          this.transactionID = details.id;
          this.orderID = Math.random().toString(36).substring(2, 12);
          let date = details.create_time;
          this.dateAndTime = new Date(date).toString();
          this.status = 'Paid';
          this.detailes = {
            name: this.name,
            mobile: this.mobile,
            email: this.emailID,
            address: this.address,
          };
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );

        this.api
          .addToCheckout(
            this.email,
            this.orderID,
            this.transactionID,
            this.dateAndTime,
            this.total,
            this.status,
            this.products,
            this.detailes
          )
          .subscribe(
            // success case
            (result: any) => {
              console.log(result);
              this.successMsg = true;
              this.api.emptyCart(this.email).subscribe(
                // success case
                (result: any) => {
                  console.log(result);
                  this.api.wishlistMsg = result.message;

                  this.api.cartCount.next([]);
                },
                // error msg
                (result: any) => {
                  console.log(result);
                }
              );
            },
            // error msg
            (result: any) => {
              console.log('error: ', result);
              this.errorMsg = 'Payment Failed';
            }
          );
      },
      onCancel: (data) => {
        console.log('OnCancel', data.orderID);
        this.checkoutValid = false;
        this.errorMsg = 'Payment Cancelled';
      },
      onError: (err) => {
        console.log('OnError', err);
        this.errorMsg = 'Payment Failed';
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
  }
}
