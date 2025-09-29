import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CarOwnerSetupRequest {
  profilePic?: File | string;
  altPhone?: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  engineType?: string;
  engineCapacity?: string;
  color?: string;
  transmission?: string;
  severity: string;
}



@Injectable({
  providedIn: 'root'
})
export class CarOwnerdetails {

  private apiURL = 'http://10.20.33.92:8083/carOwner/create';

   constructor( private http: HttpClient) {}


   saveCarOwnerDetails(formValue: any): Observable<any>{

    const formData = new FormData();

     // Flatten personal group
    formData.append('profilePic', formValue.personal.profilePic);
    formData.append('altPhone', formValue.personal.altPhone || '');

     // Flatten vehicle group
    const vehicle = formValue.vehicle;
    Object.keys(vehicle).forEach(key => {
      if (vehicle[key] !== null && vehicle[key] !== undefined) {
        formData.append(key, vehicle[key]);
      }});

    // Flatten history group
    formData.append('severity', formValue.history.severity);



    return this.http.post(`${this.apiURL}`, formData);
  }

   }
  

