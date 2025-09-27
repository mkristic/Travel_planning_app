import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private apiKey = 'AIzaSyB0UO9O_LQ3nPS_j0Nx7m0EJuVigZ2D73I';

  constructor(private http: HttpClient) {}

  getPlaceCoordinates(accommodation: string): Observable<{ lat: number; lng: number } | null> {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      accommodation
    )}&inputtype=textquery&fields=geometry&key=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map((res) => {
        if (res.candidates && res.candidates.length > 0) {
          return res.candidates[0].geometry.location;
        } else {
          return null;
        }
      })
    );
  }
}
