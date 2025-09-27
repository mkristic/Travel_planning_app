import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  _id?: string;
  tripName: string;
  destination: string;
  arrivalDate: Date;
  departureDate: Date;
  tripType: 'solo' | 'family' | 'friends' | 'business' | '';
  accommodation: { name: string; link: string; parking: boolean };
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

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`);
  }

  deleteTrip(id: string) {
    return this.http.delete<Trip>(`${this.apiUrl}/${id}`);
  }

  updateTrip(id: string, trip: Trip) {
    return this.http.put<Trip>(`${this.apiUrl}/${id}`, trip);
  }
}
