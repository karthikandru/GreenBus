import { Component, OnInit } from '@angular/core';

interface Offer {
  id: number;
  title: string;
  code: string;
  description: string;
  validUntil: string;
  discount: string;
  minAmount?: number;
  maxDiscount?: number;
  image: string;
  category: 'all' | 'payment' | 'seasonal' | 'first-time';
}

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  segment: 'all' | 'payment' | 'seasonal' | 'first-time' = 'all';
  offers: Offer[] = [];
  filteredOffers: Offer[] = [];

  constructor() { }

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    // Mock data - in a real app, this would come from an API
    this.offers = [
      {
        id: 1,
        title: 'First Ride Discount',
        code: 'FIRST15',
        description: 'Get 15% off on your first booking with RedBus. No minimum booking amount required.',
        validUntil: '31 Dec 2025',
        discount: '15% off',
        maxDiscount: 20,
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        category: 'first-time'
      },
      {
        id: 2,
        title: 'Weekend Special',
        code: 'WEEKEND10',
        description: 'Enjoy 10% off on all weekend trips. Valid for bookings made for Friday, Saturday and Sunday travel.',
        validUntil: '30 Sep 2025',
        discount: '10% off',
        minAmount: 30,
        maxDiscount: 15,
        image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        category: 'seasonal'
      },
      {
        id: 3,
        title: 'Credit Card Offer',
        code: 'CARD20',
        description: 'Get 20% off when you pay using any credit card. Maximum discount of $25.',
        validUntil: '15 Aug 2025',
        discount: '20% off',
        maxDiscount: 25,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        category: 'payment'
      },
      {
        id: 4,
        title: 'Summer Vacation Offer',
        code: 'SUMMER25',
        description: 'Get 25% off on all bookings for summer vacation travel. Valid for travel dates between June 1 and August 31.',
        validUntil: '31 Aug 2025',
        discount: '25% off',
        minAmount: 50,
        maxDiscount: 40,
        image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        category: 'seasonal'
      },
      {
        id: 5,
        title: 'Digital Wallet Discount',
        code: 'WALLET15',
        description: 'Pay using any digital wallet and get 15% off on your booking.',
        validUntil: '31 Dec 2025',
        discount: '15% off',
        maxDiscount: 20,
        image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        category: 'payment'
      }
    ];
    
    this.filterOffers();
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
    this.filterOffers();
  }

  filterOffers() {
    if (this.segment === 'all') {
      this.filteredOffers = this.offers;
    } else {
      this.filteredOffers = this.offers.filter(offer => offer.category === this.segment);
    }
  }

  copyCode(code: string) {
    // In a real app, this would copy the code to clipboard
    console.log('Copied code:', code);
  }
}