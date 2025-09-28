import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface BucketItem {
  _id?: string;
  section: 'landmarks' | 'cities' | 'countries';
  name: string;
  visited: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BucketListService {
  private apiUrl = 'http://localhost:3000/api/bucket';

  constructor(private http: HttpClient) {}

  // get (all items in section)
  getItems(section: string): Observable<BucketItem[]> {
    return this.http.get<BucketItem[]>(`${this.apiUrl}/${section}`);
  }

  // add
  addItem(section: string, name: string): Observable<BucketItem> {
    return this.http.post<BucketItem>(this.apiUrl, { section, name, visited: false });
  }

  // delete
  deleteItem(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // edit
  editItem(id: string, newName: string): Observable<BucketItem> {
    return this.http.put<BucketItem>(`${this.apiUrl}/${id}`, { name: newName });
  }

  // toggle visited
  toggleVisited(id: string, visited: boolean): Observable<BucketItem> {
    return this.http.put<BucketItem>(`${this.apiUrl}/${id}`, { visited });
  }
}
