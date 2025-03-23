import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusListPage } from './bus-list.page';

const routes: Routes = [
  {
    path: '',
    component: BusListPage
  },
  {
    path: 'bus-details/:id',
    loadChildren: () => import('../bus-details/bus-details.module').then( m => m.BusDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusListPageRoutingModule {}