import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
   selector: 'app-home',
   templateUrl: './home.page.html',
   styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   searchForm: FormGroup;
   popularRoutes = [
      { from: 'Hyderabad', to: 'Vijayawada' },
      { from: 'Vijayawada', to: 'Tirupati' },
      { from: 'Hyderabad', to: 'Vizag' },
      { from: 'Vijayawada', to: 'Vizag' }
   ];

   offers = [
      {
         title: 'Save 15% on your first booking',
         code: 'FIRST15',
         image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
      },
      {
         title: 'Weekend Special: 10% Off',
         code: 'WEEKEND10',
         image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
      }
   ];

   constructor(
      private formBuilder: FormBuilder,
      private router: Router
   ) {
      this.searchForm = this.formBuilder.group({
         from: ['', Validators.required],
         to: ['', Validators.required],
         date: [new Date().toISOString(), Validators.required]
      });
   }

   ngOnInit() {
   }

   searchBuses() {
      if (this.searchForm.valid) {
         // Navigate to bus list with search params
         this.router.navigate(['/tabs/home/bus-list'], {
            queryParams: {
               from: this.searchForm.value.from,
               to: this.searchForm.value.to,
               date: this.searchForm.value.date
            }
         });
      }
   }

   swapLocations() {
      const from = this.searchForm.get('from')?.value;
      const to = this.searchForm.get('to')?.value;

      this.searchForm.patchValue({
         from: to,
         to: from
      });
   }

   selectRoute(route: any) {
      this.searchForm.patchValue({
         from: route.from,
         to: route.to
      });
   }
}