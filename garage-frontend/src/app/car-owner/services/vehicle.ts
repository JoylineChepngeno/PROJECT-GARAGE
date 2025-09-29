import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Vehicle {

  private apiUrl = 'http://10.20.33.60:8083/automobiles';

  constructor( private http:HttpClient) {}

  getMakes(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/make`);
  }

  getYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/year`);
  }

  getEngineTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/engineType`)
  }

  getTransmissions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/transmission`);
  }
  
}
