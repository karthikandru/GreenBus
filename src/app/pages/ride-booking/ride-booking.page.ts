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

@Component({
  selector: 'app-ride-booking',
  templateUrl: 'ride-booking.page.html',
  styleUrls: ['ride-booking.page.scss']
})
export class RideBookingPage {
  selectedRideType: string = '';
  pickupLocation: string = '';
  dropLocation: string = '';
  
  // Sample locations with zones and coordinates
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

  constructor(private router: Router) {}

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
      this.selectedPickupLocation = location;
      this.showPickupResults = false;
    } else {
      this.dropLocation = location.name;
      this.selectedDropLocation = location;
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

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  toRad(value: number): number {
    return value * Math.PI / 180;
  }

  calculatePrices() {
    if (!this.selectedPickupLocation || !this.selectedDropLocation) return;

    const distance = this.calculateDistance(this.selectedPickupLocation, this.selectedDropLocation);
    
    // Apply zone-based multipliers
    let zoneMultiplier = 1;
    if (this.selectedPickupLocation.zone === 'Airport' || this.selectedDropLocation.zone === 'Airport') {
      zoneMultiplier = 1.5; // Airport zone has higher rates
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

  confirmBooking() {
    if (this.selectedRideType && this.pickupLocation && this.dropLocation) {
      const bookingDetails = {
        rideType: this.selectedRideType,
        pickup: this.pickupLocation,
        drop: this.dropLocation,
        price: this.getRidePrice(this.selectedRideType)
      };
      
      console.log('Booking confirmed:', bookingDetails);
      alert(`Your ride details!\nPickup: ${this.pickupLocation}\nDrop: ${this.dropLocation}\nPrice: ₹${bookingDetails.price}`);
      this.router.navigate(['/tabs/home']);
    }
  }
}