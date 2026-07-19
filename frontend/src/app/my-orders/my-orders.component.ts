import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  email: string = '';
  userId: string = '';
  orders: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.userId = this.email; // Using email as userId for now

    if (this.email) {
      this.loadOrders();
    }
  }

  loadOrders() {
    this.isLoading = true;
    this.errorMessage = '';

    this.api.getUserOrders(this.userId).subscribe(
      (result: any) => {
        console.log(result);
        this.isLoading = false;

        if (result.statusCode === 200 && result.orders) {
          this.orders = result.orders;
        } else {
          this.orders = [];
          this.errorMessage = result.message || 'Could not load orders';
        }
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.errorMessage = 'Could not load orders. Please try again.';
        this.orders = [];
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'paid':
        return 'var(--color-success)';
      case 'pending':
        return 'var(--color-gold)';
      case 'failed':
        return '#C97B7B';
      default:
        return 'var(--color-muted)';
    }
  }
}
