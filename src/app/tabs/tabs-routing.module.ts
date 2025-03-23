import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'my-bookings',
        loadChildren: () => import('../pages/my-bookings/my-bookings.module').then(m => m.MyBookingsPageModule)
      },
      {
        path: 'offers',
        loadChildren: () => import('../pages/offers/offers.module').then(m => m.OffersPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../pages/account/account.module').then(m => m.AccountPageModule)
       },
       {
          path: 'ride-booking',
          loadChildren: () => import('../pages/ride-booking/ride-booking.module').then(m => m.RideBookingPageModule)
       },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}