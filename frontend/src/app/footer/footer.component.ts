import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  newsletterEmail: string = '';
  newsletterMessage: string = '';
  newsletterMessageType: 'success' | 'error' = 'success';
  isSubscribing: boolean = false;

  constructor(private http: HttpClient) {}

  subscribeNewsletter() {
    // Basic frontend validation
    if (!this.newsletterEmail || this.newsletterEmail.trim() === '') {
      this.showNewsletterMessage('Please enter an email address', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.newsletterEmail)) {
      this.showNewsletterMessage('Please enter a valid email address', 'error');
      return;
    }

    this.isSubscribing = true;
    this.newsletterMessage = '';

    this.http.post('http://localhost:3000/api/newsletter/subscribe', { email: this.newsletterEmail }).subscribe(
      (result: any) => {
        this.isSubscribing = false;
        if (result.statusCode === 200) {
          this.showNewsletterMessage('Thanks — you\'re on the list.', 'success');
          this.newsletterEmail = '';
        } else if (result.statusCode === 409) {
          this.showNewsletterMessage('Email already subscribed', 'error');
        } else {
          this.showNewsletterMessage(result.message || 'Failed to subscribe', 'error');
        }
      },
      (error: any) => {
        this.isSubscribing = false;
        this.showNewsletterMessage('Failed to subscribe. Please try again.', 'error');
      }
    );
  }

  showNewsletterMessage(message: string, type: 'success' | 'error') {
    this.newsletterMessage = message;
    this.newsletterMessageType = type;
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      this.newsletterMessage = '';
    }, 5000);
  }
}
