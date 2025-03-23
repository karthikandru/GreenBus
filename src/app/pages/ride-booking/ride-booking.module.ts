import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RideBookingPage } from './ride-booking.page';
import { RideBookingPageRoutingModule } from './ride-booking-routing.module';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RideBookingPageRoutingModule
   ],
   declarations: [RideBookingPage]
})
export class RideBookingPageModule { }