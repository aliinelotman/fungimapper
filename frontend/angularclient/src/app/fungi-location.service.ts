import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FungiLocation } from './fungi-location.model';

@Injectable({
  providedIn: 'root',
})
export class FungiLocationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<FungiLocation[]> {
    return this.http.get<FungiLocation[]>(`${this.baseUrl}/all-fungi`);
  }

  getOneLocation(id: number): Observable<FungiLocation> {
    return this.http.get<FungiLocation>(`${this.baseUrl}/fungi/${id}`);
  }

  addLocation(fungiLocation: FungiLocation): Observable<FungiLocation[]> {
    return this.http.post<FungiLocation[]>(`${this.baseUrl}/fungi`, fungiLocation);
  }

  editLocation(fungiLocation: FungiLocation): Observable<FungiLocation[]> {
    return this.http.put<FungiLocation[]>(`${this.baseUrl}/fungi`, fungiLocation);
  }

  deleteOneLocation(id: number): Observable<FungiLocation[]> {
    return this.http.delete<FungiLocation[]>(`${this.baseUrl}/fungi/${id}`);
  }
}
