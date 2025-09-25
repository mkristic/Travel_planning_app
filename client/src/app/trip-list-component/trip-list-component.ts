import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgIf, NgFor } from '@angular/common';
import { Trip, TripService } from '../services/trip-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trip-list-component',
  imports: [CommonModule, DatePipe, NgIf, NgFor],
  templateUrl: './trip-list-component.html',
  styleUrl: './trip-list-component.css',
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

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
}
