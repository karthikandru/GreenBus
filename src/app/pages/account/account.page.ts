import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user = {
    name: 'Rajendra',
     email: 'rajendra@example.com',
    phone: '+91 96185 96185',
    walletBalance: 250
  };
  
  menuItems = [
    {
      title: 'My Profile',
      icon: 'person-outline',
      route: '/profile'
    },
    {
      title: 'Saved Cards',
      icon: 'card-outline',
      route: '/cards'
    },
    {
      title: 'Wallet',
      icon: 'wallet-outline',
      route: '/wallet'
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      route: '/notifications'
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      route: '/support'
    },
    {
      title: 'About Us',
      icon: 'information-circle-outline',
      route: '/about'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  logout() {
    // In a real app, this would handle logout logic
    console.log('Logging out...');
  }
}