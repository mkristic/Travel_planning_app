import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  tripName: string;
  tripType: 'solo' | 'family' | 'friends' | 'business' | '';
  destination: string;
  arrivalDate: Date;
  departureDate: Date;
  accommodation: { name: string; url: string; parking: boolean };
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  // CRUD
  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  getTrips() {}

  getTrip(id: string) {}

  deleteTrip(id: string) {}

  updateTrip(id: string) {}
}
