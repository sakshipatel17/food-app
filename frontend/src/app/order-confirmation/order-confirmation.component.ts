import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent implements OnInit {
  orderId: string = '';
  total: number = 0;
  email: string = '';
  username: string = '';
  paymentMethod: string = '';
  cardLastFour: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.username = localStorage.getItem('username') || '';

    this.route.queryParams.subscribe((params) => {
      this.orderId = params['orderId'] || '';
      this.total = parseFloat(params['total'] || '0');
      this.paymentMethod = params['paymentMethod'] || 'cod';
      this.cardLastFour = params['cardLastFour'] || '';
    });

    if (!this.orderId) {
      this.router.navigate(['/']);
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToOrders() {
    this.router.navigate(['/my-orders']);
  }
}
