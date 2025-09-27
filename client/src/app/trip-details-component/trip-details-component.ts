import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Trip, TripService } from '../services/trip-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-details-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './trip-details-component.html',
  styleUrl: './trip-details-component.css',
})
export class TripDetailsComponent implements OnInit {
  trip: Trip | null = null;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.tripService.getTrip(id).subscribe({
        next: (trip) => {
          console.log('Fetched trip: ', trip);
          this.trip = trip;
        },
        error: (err) => console.error('Error fetching trip: ', err),
      });
    }
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
