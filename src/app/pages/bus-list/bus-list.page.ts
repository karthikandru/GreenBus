import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Bus {
  id: number;
  name: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  rating: number;
  amenities: string[];
}

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.page.html',
  styleUrls: ['./bus-list.page.scss'],
})
export class BusListPage implements OnInit {
  from: string = '';
  to: string = '';
  date: string = '';
  buses: Bus[] = [];
  filteredBuses: Bus[] = [];
  
  // Filter options
  filters = {
    departureTime: 'all',
    busType: 'all',
    priceRange: 'all'
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'];
      this.to = params['to'];
      this.date = new Date(params['date']).toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      
      this.loadBuses();
    });
  }

  loadBuses() {
    // Mock data - in a real app, this would come from an API
    this.buses = [
      {
        id: 1,
        name: 'Express Travels',
        type: 'AC Sleeper',
        departureTime: '21:00',
        arrivalTime: '06:00',
        duration: '9h 0m',
        price: 850,
        availableSeats: 12,
        rating: 4.5,
        amenities: ['WiFi', 'Charging Point', 'Water Bottle']
      },
      {
        id: 2,
        name: 'Royal Cruiser',
        type: 'Non-AC Seater',
        departureTime: '08:30',
        arrivalTime: '14:30',
        duration: '6h 0m',
        price: 750,
        availableSeats: 8,
        rating: 3.8,
        amenities: ['Water Bottle']
      },
      {
        id: 3,
        name: 'City Express',
        type: 'AC Seater',
        departureTime: '10:15',
        arrivalTime: '18:45',
        duration: '8h 30m',
        price: 900,
        availableSeats: 20,
        rating: 4.2,
        amenities: ['WiFi', 'Charging Point', 'Blanket', 'Water Bottle']
      },
      {
        id: 4,
        name: 'Night Rider',
        type: 'AC Sleeper',
        departureTime: '22:30',
        arrivalTime: '05:30',
        duration: '7h 0m',
        price: 650,
        availableSeats: 5,
        rating: 4.7,
        amenities: ['WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Snacks']
      },
      {
        id: 5,
        name: 'Budget Travels',
        type: 'Non-AC Sleeper',
        departureTime: '19:45',
        arrivalTime: '04:15',
        duration: '8h 30m',
        price: 700,
        availableSeats: 15,
        rating: 3.5,
        amenities: ['Water Bottle']
      }
    ];
    
    this.applyFilters();
  }

  applyFilters() {
    this.filteredBuses = this.buses.filter(bus => {
      // Filter by departure time
      if (this.filters.departureTime !== 'all') {
        const hour = parseInt(bus.departureTime.split(':')[0]);
        
        if (this.filters.departureTime === 'morning' && (hour < 6 || hour >= 12)) {
          return false;
        }
        if (this.filters.departureTime === 'afternoon' && (hour < 12 || hour >= 18)) {
          return false;
        }
        if (this.filters.departureTime === 'evening' && (hour < 18 || hour >= 21)) {
          return false;
        }
        if (this.filters.departureTime === 'night' && (hour < 21 && hour >= 6)) {
          return false;
        }
      }
      
      // Filter by bus type
      if (this.filters.busType !== 'all') {
        if (this.filters.busType === 'ac' && !bus.type.includes('AC')) {
          return false;
        }
        if (this.filters.busType === 'nonac' && bus.type.includes('AC')) {
          return false;
        }
        if (this.filters.busType === 'sleeper' && !bus.type.includes('Sleeper')) {
          return false;
        }
        if (this.filters.busType === 'seater' && !bus.type.includes('Seater')) {
          return false;
        }
      }
      
      // Filter by price range
      if (this.filters.priceRange !== 'all') {
        if (this.filters.priceRange === 'low' && bus.price > 30) {
          return false;
        }
        if (this.filters.priceRange === 'medium' && (bus.price <= 30 || bus.price > 40)) {
          return false;
        }
        if (this.filters.priceRange === 'high' && bus.price <= 40) {
          return false;
        }
      }
      
      return true;
    });
  }

  resetFilters() {
    this.filters = {
      departureTime: 'all',
      busType: 'all',
      priceRange: 'all'
    };
    this.applyFilters();
  }

  sortBuses(criteria: string) {
    switch (criteria) {
      case 'price':
        this.filteredBuses.sort((a, b) => a.price - b.price);
        break;
      case 'departure':
        this.filteredBuses.sort((a, b) => {
          const timeA = parseInt(a.departureTime.replace(':', ''));
          const timeB = parseInt(b.departureTime.replace(':', ''));
          return timeA - timeB;
        });
        break;
      case 'duration':
        this.filteredBuses.sort((a, b) => {
          const durationA = parseInt(a.duration.split('h')[0]);
          const durationB = parseInt(b.duration.split('h')[0]);
          return durationA - durationB;
        });
        break;
      case 'rating':
        this.filteredBuses.sort((a, b) => b.rating - a.rating);
        break;
      case 'seats':
        this.filteredBuses.sort((a, b) => b.availableSeats - a.availableSeats);
        break;
    }
  }
}