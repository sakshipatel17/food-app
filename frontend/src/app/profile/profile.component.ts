import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  email: string = '';
  mobile: string = '';
  address: string = '';

  ngOnInit(): void {
    // These keys must be set when user logs in or registers
    this.username = localStorage.getItem('username') || 'Guest';
    this.email    = localStorage.getItem('email')    || 'Not set';
    this.mobile   = localStorage.getItem('mobile')   || 'Not set';
    this.address  = localStorage.getItem('address')  || 'Not set';
  }
}
