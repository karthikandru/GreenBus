import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideBookingPage } from './ride-booking.page';

const routes: Routes = [
   {
      path: '',
      component: RideBookingPage
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class RideBookingPageRoutingModule { }