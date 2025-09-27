import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgIf, NgFor } from '@angular/common';
import { Trip, TripService } from '../services/trip-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip-list-component',
  imports: [CommonModule, DatePipe, NgIf, NgFor, RouterLink],
  templateUrl: './trip-list-component.html',
  styleUrl: './trip-list-component.css',
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failer to load trips', err);
      },
    });
  }

  onDelete(id: string | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(id).subscribe({
        next: () => {
          console.log('Trip deleted');
          this.router.navigate(['/list']);
        },
        error: (err) => console.error('Error deleting trip: ', err),
      });
    }
  }
}
