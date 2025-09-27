import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { NewTripComponent } from './new-trip-component/new-trip-component';
import { TripListComponent } from './trip-list-component/trip-list-component';
import { TripDetailsComponent } from './trip-details-component/trip-details-component';
import { TripEditComponent } from './trip-edit-component/trip-edit-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: NewTripComponent },
  { path: 'list', component: TripListComponent },
  { path: 'trips/:id', component: TripDetailsComponent },
  { path: 'trips/:id/edit', component: TripEditComponent },
  { path: '**', component: HomeComponent },
];
