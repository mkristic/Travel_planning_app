import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { NewTripComponent } from './new-trip-component/new-trip-component';
import { TripListComponent } from './trip-list-component/trip-list-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, NewTripComponent, TripListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('travel-planner-app');
}
