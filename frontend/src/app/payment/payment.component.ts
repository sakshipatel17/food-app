import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  grandTotal: number = 0;
  paymentDone: boolean = false;
  selectedMethod: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.grandTotal = parseFloat(localStorage.getItem('grandTotal') || '0');
  }

  proceed(method: string) {
    this.selectedMethod = method;
    this.paymentDone = true;

    // Remove items from storage after payment simulation
    localStorage.removeItem('checkout');
    localStorage.removeItem('grandTotal');

    // Optional: redirect after a delay
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }
}
