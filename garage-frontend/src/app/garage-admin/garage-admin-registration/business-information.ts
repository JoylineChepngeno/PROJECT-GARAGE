import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-business-information',
  imports: [ɵInternalFormsSharedModule, CommonModule],
  template: `

  <label>Business Name</label>
  <input type="text" formControlName="businessName">

   <label>Business registration number</label>
  <input type="text" formControlName="businessRegNumber">

  <label>Business License Number</label>
  <input type="text" formControlName="businessLicenseNumber">

   <label>Physical Business Address </label>
  <input type="text" formControlName="physicalBusinessAddress">

   <label>Business Email Address</label>
  <input type="email" formControlName="businessEmailAddress">

  `,
 
})
export class BusinessInformation{

  @Input() group!: FormGroup <any>
    
}
