import { Component, OnInit } from '@angular/core';

interface Booking {
  id: string;
  busName: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  seatNumbers: string[];
  totalAmount: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {
  segment: 'upcoming' | 'completed' | 'cancelled' = 'upcoming';
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];

  constructor() { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    // Mock data - in a real app, this would come from an API
    this.bookings = [
      {
        id: 'BK12345',
        busName: 'Express Travels',
        from: 'New York',
        to: 'Boston',
        date: '15 Jun 2025',
        departureTime: '21:00',
        arrivalTime: '06:00',
        seatNumbers: ['A1', 'A2'],
        totalAmount: 90,
        status: 'upcoming'
      },
      {
        id: 'BK12346',
        busName: 'Royal Cruiser',
        from: 'Chicago',
        to: 'Detroit',
        date: '10 Jun 2025',
        departureTime: '08:30',
        arrivalTime: '14:30',
        seatNumbers: ['B5'],
        totalAmount: 25,
        status: 'upcoming'
      },
      {
        id: 'BK12347',
        busName: 'City Express',
        from: 'Los Angeles',
        to: 'San Francisco',
        date: '05 May 2025',
        departureTime: '10:15',
        arrivalTime: '18:45',
        seatNumbers: ['C3', 'C4', 'C5'],
        totalAmount: 105,
        status: 'completed'
      },
      {
        id: 'BK12348',
        busName: 'Night Rider',
        from: 'Miami',
        to: 'Orlando',
        date: '20 Apr 2025',
        departureTime: '22:30',
        arrivalTime: '05:30',
        seatNumbers: ['D7'],
        totalAmount: 50,
        status: 'cancelled'
      }
    ];
    
    this.filterBookings();
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
    this.filterBookings();
  }

  filterBookings() {
    this.filteredBookings = this.bookings.filter(booking => booking.status === this.segment);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'medium';
    }
  }

  downloadTicket(booking: Booking) {
    // In a real app, this would download the ticket
    console.log('Downloading ticket for booking:', booking.id);
  }

  cancelBooking(booking: Booking) {
    // In a real app, this would call an API to cancel the booking
    console.log('Cancelling booking:', booking.id);
    
    // For demo purposes, update the booking status
    const index = this.bookings.findIndex(b => b.id === booking.id);
    if (index !== -1) {
      this.bookings[index].status = 'cancelled';
      this.filterBookings();
    }
  }
}