import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { NewTripComponent } from './new-trip-component/new-trip-component';
import { TripListComponent } from './trip-list-component/trip-list-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: NewTripComponent },
  { path: 'list', component: TripListComponent },
  { path: '**', component: HomeComponent },
];
