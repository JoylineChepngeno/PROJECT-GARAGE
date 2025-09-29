import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../../environment/environment';

export interface MechanicPersonalInfo {
  profilePic?: File | null; // optional since not everyone uploads
  nationalIdNumber: string;
  alternativePhone?: string;
  physicalAddress: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
}

export interface MechanicProfessionalInfo {
  yearsOfExperience: number;
  areasOfSpecialization: string;
  bio: string;
}

export interface MechanicSkills {
  vehicleBrands: string;
  garageLinked: string;
  availability: string;
}

export interface MechanicDocuments {
  nationalIDPic: File;
  professionalCertificate: File;
  anyRelevantCertificate?: File;
  policeClearanceCertificate: File;
}

export interface MechanicRegistrationData {
  personal: MechanicPersonalInfo;
  professional: MechanicProfessionalInfo;
  skills: MechanicSkills;
  documents: MechanicDocuments;
}


@Injectable({
  providedIn: 'root'
})
export class Mechanicdetails {

  private apiURL = Environment.url

  constructor( private http: HttpClient) {}

  savemechanicDetails(formValue: MechanicRegistrationData): Observable<any>{
    const formData = new FormData()

    if (formValue.personal.profilePic){
      formData.append('profillePic', formValue.personal.profilePic);
    }

      formData.append('personal', JSON.stringify(formValue.personal));
      formData.append('professional', JSON.stringify(formValue.professional));
      formData.append('skills', JSON.stringify(formValue.skills));
      formData.append('documents', JSON.stringify(formValue.documents));

  return this.http.post(`${this.apiURL}/mechanics/details`, formData);

  }

  
  
}
