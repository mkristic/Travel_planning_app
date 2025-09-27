import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Trip, TripService } from '../services/trip-service';
import { CommonModule } from '@angular/common';
import { AccommodationService } from '../services/accommodation-service';

declare const google: any;

@Component({
  selector: 'app-trip-details-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './trip-details-component.html',
  styleUrl: './trip-details-component.css',
})
export class TripDetailsComponent implements OnInit {
  trip: Trip | null = null;
  coords: { lat: number; lng: number } | null = null; // for google maps API

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.tripService.getTrip(id).subscribe({
        next: (trip) => {
          console.log('Fetched trip: ', trip);
          this.trip = trip;

          // google maps using Geocoder
          if (this.trip.accommodation?.name) {
            const query = `${this.trip.accommodation.name}, ${this.trip.destination}`;
            this.getCoordinatesAndInitMap(query);
          }
        },
        error: (err) => console.error('Error fetching trip: ', err),
      });
    }
  }

  getCoordinatesAndInitMap(address: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results: any, status: string) => {
      if (status === 'OK' && results[0]) {
        const coords = results[0].geometry.location;
        this.coords = { lat: coords.lat(), lng: coords.lng() };
        this.initMap(this.coords);
      } else {
        console.error('Geocode failed:', status);
      }
    });
  }

  ngAfterViewInit(): void {
    // ensures map div exists
  }

  initMap(coords: { lat: number; lng: number }) {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 14,
      center: coords,
    });

    new google.maps.Marker({
      map,
      position: coords,
      title: this.trip?.accommodation?.name || '',
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
