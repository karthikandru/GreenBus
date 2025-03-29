import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Location {
   name: string;
   zone: string;
   coordinates: {
      lat: number;
      lng: number;
   };
}

interface RideType {
   id: string;
   name: string;
   icon: string;
   basePrice: number;
   pricePerKm: number;
}

interface BusBookingDetails {
   selectedSeats: string[];
   totalAmount: number;
   boardingPoint: Location;
   busDetails: any;
}

@Component({
   selector: 'app-ride-booking',
   templateUrl: 'ride-booking.page.html',
   styleUrls: ['ride-booking.page.scss']
})
export class RideBookingPage {
   includeRide: boolean = true;
   selectedRideType: string = '';
   pickupLocation: string = '';
   dropLocation: string = '';
   bookingDetails: BusBookingDetails = {
      selectedSeats: [],
      totalAmount: 0,
      boardingPoint: {
         name: '',
         zone: '',
         coordinates: { lat: 0, lng: 0 }
      },
      busDetails: null
   };

   locations: Location[] = [
      {
         name: 'Airport Terminal 1',
         zone: 'Airport',
         coordinates: { lat: 13.1986, lng: 77.7066 }
      },
      {
         name: 'Airport Terminal 2',
         zone: 'Airport',
         coordinates: { lat: 13.2000, lng: 77.7085 }
      },
      {
         name: 'Central Station',
         zone: 'City',
         coordinates: { lat: 12.9789, lng: 77.5917 }
      },
      {
         name: 'Bus Terminal',
         zone: 'City',
         coordinates: { lat: 12.9766, lng: 77.5993 }
      },
      {
         name: 'City Center Mall',
         zone: 'City',
         coordinates: { lat: 12.9698, lng: 77.6100 }
      },
      {
         name: 'Metro Station',
         zone: 'Suburbs',
         coordinates: { lat: 12.9852, lng: 77.5997 }
      },
      {
         name: 'Shopping District',
         zone: 'City',
         coordinates: { lat: 12.9716, lng: 77.5946 }
      },
      {
         name: 'Tech Park',
         zone: 'Tech Hub',
         coordinates: { lat: 12.9285, lng: 77.6880 }
      },
      {
         name: 'University Campus',
         zone: 'Education',
         coordinates: { lat: 13.0273, lng: 77.5662 }
      },
      {
         name: 'Hospital Complex',
         zone: 'Healthcare',
         coordinates: { lat: 12.9832, lng: 77.5732 }
      }
   ];

   rideTypes: RideType[] = [
      { id: 'bike', name: 'Bike', icon: 'bicycle', basePrice: 30, pricePerKm: 8 },
      { id: 'auto', name: 'Auto', icon: 'car-sport', basePrice: 50, pricePerKm: 12 },
      { id: 'car', name: 'Car', icon: 'car', basePrice: 80, pricePerKm: 15 }
   ];

   filteredPickupLocations: Location[] = [];
   filteredDropLocations: Location[] = [];
   showPickupResults: boolean = false;
   showDropResults: boolean = false;

   selectedPickupLocation: Location | null = null;
   selectedDropLocation: Location | null = null;
   currentPrices: { [key: string]: number } = {};

   constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
         const state = navigation.extras.state as BusBookingDetails;
         this.bookingDetails = { ...state };
         this.dropLocation = state.boardingPoint.name;
         this.selectedDropLocation = { ...state.boardingPoint };
      }
   }

   toggleRideBooking() {
      if (!this.includeRide) {
         this.resetRideDetails();
      }
   }

   resetRideDetails() {
      this.selectedRideType = '';
      this.pickupLocation = '';
      this.selectedPickupLocation = null;
      this.currentPrices = {};
   }

   resetAllDetails() {
      this.resetRideDetails();
      this.dropLocation = '';
      this.selectedDropLocation = null;
      this.bookingDetails = {
         selectedSeats: [],
         totalAmount: 0,
         boardingPoint: {
            name: '',
            zone: '',
            coordinates: { lat: 0, lng: 0 }
         },
         busDetails: null
      };
   }

   isFormValid(): boolean {
      if (!this.includeRide) {
         return true;
      }
      return !!(this.selectedRideType && this.selectedPickupLocation && this.selectedDropLocation);
   }

   searchLocations(event: any, type: 'pickup' | 'drop') {
      const searchTerm = event.target.value.toLowerCase();
      if (searchTerm.length > 0) {
         const filtered = this.locations.filter(location =>
            location.name.toLowerCase().includes(searchTerm)
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

   selectLocation(location: Location, type: 'pickup' | 'drop') {
      if (type === 'pickup') {
         this.pickupLocation = location.name;
         this.selectedPickupLocation = { ...location };
         this.showPickupResults = false;
      } else {
         this.dropLocation = location.name;
         this.selectedDropLocation = { ...location };
         this.showDropResults = false;
      }

      if (this.selectedPickupLocation && this.selectedDropLocation) {
         this.calculatePrices();
      }
   }

   calculateDistance(loc1: Location, loc2: Location): number {
      const R = 6371; // Earth's radius in kilometers
      const dLat = this.toRad(loc2.coordinates.lat - loc1.coordinates.lat);
      const dLon = this.toRad(loc2.coordinates.lng - loc1.coordinates.lng);
      const lat1 = this.toRad(loc1.coordinates.lat);
      const lat2 = this.toRad(loc2.coordinates.lat);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
   }

   toRad(value: number): number {
      return value * Math.PI / 180;
   }

   calculatePrices() {
      if (!this.selectedPickupLocation || !this.selectedDropLocation) return;

      const distance = this.calculateDistance(this.selectedPickupLocation, this.selectedDropLocation);

      let zoneMultiplier = 1;
      if (this.selectedPickupLocation.zone === 'Airport' || this.selectedDropLocation.zone === 'Airport') {
         zoneMultiplier = 1.5;
      }

      this.rideTypes.forEach(ride => {
         const basePrice = ride.basePrice;
         const distancePrice = distance * ride.pricePerKm;
         this.currentPrices[ride.id] = Math.round((basePrice + distancePrice) * zoneMultiplier);
      });
   }

   getRidePrice(rideId: string): number {
      return this.currentPrices[rideId] || 0;
   }

   getTotalAmount(): number {
      const rideAmount = this.selectedRideType ? this.getRidePrice(this.selectedRideType) : 0;
      return this.bookingDetails.totalAmount + (this.includeRide ? rideAmount : 0);
   }

   confirmBooking() {
      const bookingDetails = {
         busBooking: { ...this.bookingDetails },
         ride: this.includeRide ? {
            rideType: this.selectedRideType,
            pickup: this.pickupLocation,
            drop: this.dropLocation,
            price: this.getRidePrice(this.selectedRideType)
         } : null,
         totalAmount: this.getTotalAmount()
      };

      console.log('Booking confirmed:', bookingDetails);
      alert(`Booking confirmed!\nTotal Amount: ₹${this.getTotalAmount()}`);
      this.resetAllDetails();
      this.router.navigate(['/tabs/home']);
   }
}