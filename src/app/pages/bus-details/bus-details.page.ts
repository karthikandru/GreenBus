import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  reviews: {
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  seatLayout: {
    rows: number;
    columns: number;
    unavailableSeats: string[];
  };
}

@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.page.html',
  styleUrls: ['./bus-details.page.scss'],
})
export class BusDetailsPage implements OnInit {
  busId: number = 0;
  bus: Bus | null = null;
  segment: 'seats' | 'details' | 'reviews' = 'seats';
  selectedSeats: string[] = [];
  
   constructor(private route: ActivatedRoute,
      private router: Router   ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.busId = Number(params.get('id'));
      this.loadBusDetails();
    });
  }

  loadBusDetails() {
    // Mock data - in a real app, this would come from an API
    const buses: Bus[] = [
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
        amenities: ['WiFi', 'Charging Point', 'Water Bottle'],
        reviews: [
          {
            userName: 'John D.',
            rating: 4,
            comment: 'Clean bus, on time departure and arrival. Good service overall.',
            date: '15 May 2025'
          },
          {
            userName: 'Sarah M.',
            rating: 5,
            comment: 'Very comfortable journey. The staff was helpful and friendly.',
            date: '10 May 2025'
          }
        ],
        seatLayout: {
          rows: 10,
          columns: 4,
          unavailableSeats: ['A1', 'A2', 'B3', 'C4', 'D5', 'E1', 'F2', 'G3', 'H4']
        }
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
        amenities: ['Water Bottle'],
        reviews: [
          {
            userName: 'Mike P.',
            rating: 3,
            comment: 'Average experience. Bus was a bit old but clean.',
            date: '20 May 2025'
          },
          {
            userName: 'Lisa R.',
            rating: 4,
            comment: 'Good value for money. Reached on time.',
            date: '18 May 2025'
          }
        ],
        seatLayout: {
          rows: 12,
          columns: 3,
          unavailableSeats: ['A1', 'B2', 'C3', 'D1', 'E2', 'F3', 'G1', 'H2', 'I3', 'J1', 'K2']
        }
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
        amenities: ['WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
        reviews: [
          {
            userName: 'David K.',
            rating: 5,
            comment: 'Excellent service! Very comfortable seats and clean bus.',
            date: '12 May 2025'
          },
          {
            userName: 'Emma S.',
            rating: 4,
            comment: 'Good journey. WiFi was working well throughout the trip.',
            date: '8 May 2025'
          }
        ],
        seatLayout: {
          rows: 15,
          columns: 3,
          unavailableSeats: ['A1', 'B2', 'C3', 'D1', 'E2', 'F3', 'G1', 'H2', 'I3']
        }
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
        amenities: ['WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Snacks'],
        reviews: [
          {
            userName: 'Robert J.',
            rating: 5,
            comment: 'Best night bus I\'ve ever taken. Slept like a baby!',
            date: '25 May 2025'
          },
          {
            userName: 'Jennifer L.',
            rating: 4,
            comment: 'Very comfortable sleeper bus. Clean blankets provided.',
            date: '22 May 2025'
          }
        ],
        seatLayout: {
          rows: 8,
          columns: 4,
          unavailableSeats: ['A1', 'A2', 'B3', 'B4', 'C1', 'C2', 'D3', 'D4', 'E1', 'E2']
        }
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
        amenities: ['Water Bottle'],
        reviews: [
          {
            userName: 'Thomas B.',
            rating: 3,
            comment: 'Decent for the price. Don\'t expect luxury.',
            date: '30 May 2025'
          },
          {
            userName: 'Karen W.',
            rating: 4,
            comment: 'Good budget option. Bus was clean and on time.',
            date: '28 May 2025'
          }
        ],
        seatLayout: {
          rows: 10,
          columns: 3,
          unavailableSeats: ['A1', 'B2', 'C3', 'D1', 'E2', 'F3', 'G1']
        }
      }
    ];
    
    this.bus = buses.find(b => b.id === this.busId) || null;
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  toggleSeatSelection(seat: string) {
    if (this.bus && this.bus.seatLayout.unavailableSeats.includes(seat)) {
      return; // Seat is unavailable
    }
    
    const index = this.selectedSeats.indexOf(seat);
    if (index === -1) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.splice(index, 1);
    }
  }

  getSeatStatus(row: number, col: number): 'available' | 'unavailable' | 'selected' {
    const seatId = this.getSeatId(row, col);
    
    if (this.bus && this.bus.seatLayout.unavailableSeats.includes(seatId)) {
      return 'unavailable';
    }
    
    if (this.selectedSeats.includes(seatId)) {
      return 'selected';
    }
    
    return 'available';
  }

  getSeatId(row: number, col: number): string {
    const rowChar = String.fromCharCode(65 + row); // A, B, C, ...
    return `${rowChar}${col + 1}`;
  }

  getRows(): number[] {
    return this.bus ? Array(this.bus.seatLayout.rows).fill(0).map((_, i) => i) : [];
  }

  getColumns(): number[] {
    return this.bus ? Array(this.bus.seatLayout.columns).fill(0).map((_, i) => i) : [];
  }

  getTotalPrice(): number {
    return this.bus ? this.selectedSeats.length * this.bus.price : 0;
  }

  proceedToPayment() {
    // In a real app, this would navigate to the payment page
     console.log('Proceeding to payment with seats:', this.selectedSeats);
     if (this.selectedSeats.length > 0) {
        this.router.navigate(['/tabs/ride-booking']);
     }
  }
}