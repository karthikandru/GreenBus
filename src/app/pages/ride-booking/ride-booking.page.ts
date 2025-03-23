import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-ride-booking',
   templateUrl: 'ride-booking.page.html',
   styleUrls: ['ride-booking.page.scss']
})
export class RideBookingPage {
   selectedRideType: string = '';
   pickupLocation: string = '';
   dropLocation: string = '';

   // Sample locations array (in a real app, this would come from an API)
   locations: string[] = [
      'Airport Terminal 1',
      'Airport Terminal 2',
      'Central Station',
      'Bus Terminal',
      'City Center Mall',
      'Metro Station',
      'Shopping District',
      'Tech Park',
      'University Campus',
      'Hospital Complex'
   ];

   filteredPickupLocations: string[] = [];
   filteredDropLocations: string[] = [];
   showPickupResults: boolean = false;
   showDropResults: boolean = false;

   rideTypes = [
      { id: 'bike', name: 'Bike', icon: 'bicycle', price: 50 },
      { id: 'auto', name: 'Auto', icon: 'car-sport', price: 100 },
      { id: 'car', name: 'Car', icon: 'car', price: 200 }
   ];

   constructor(private router: Router) { }

   searchLocations(event: any, type: 'pickup' | 'drop') {
      const searchTerm = event.target.value.toLowerCase();
      if (searchTerm.length > 0) {
         const filtered = this.locations.filter(location =>
            location.toLowerCase().includes(searchTerm)
         );

         if (type === 'pickup') {
            this.filteredPickupLocations = filtered;
            this.showPickupResults = true;
         } else {
            this.filteredDropLocations = filtered;
            this.showDropResults = true;
         }
      } else {
         if (type === 'pickup') {
            this.filteredPickupLocations = [];
            this.showPickupResults = false;
         } else {
            this.filteredDropLocations = [];
            this.showDropResults = false;
         }
      }
   }

   selectLocation(location: string, type: 'pickup' | 'drop') {
      if (type === 'pickup') {
         this.pickupLocation = location;
         this.showPickupResults = false;
      } else {
         this.dropLocation = location;
         this.showDropResults = false;
      }
   }

   confirmBooking() {
      if (this.selectedRideType && this.pickupLocation && this.dropLocation) {
         const bookingDetails = {
            rideType: this.selectedRideType,
            pickup: this.pickupLocation,
            drop: this.dropLocation,
            price: this.rideTypes.find(ride => ride.id === this.selectedRideType)?.price
         };

         // In a real app, this would make an API call
         console.log('Booking confirmed:', bookingDetails);
         alert(`Booking confirmed!\nPickup: ${this.pickupLocation}\nDrop: ${this.dropLocation}`);
         this.router.navigate(['/home']);
      }
   }
}