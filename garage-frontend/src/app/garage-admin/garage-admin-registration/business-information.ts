import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule,  } from "@angular/forms";

@Component({
  selector: 'app-business-information',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div [formGroup]="group">
  <div class="form-label">
  <label>Business Name</label>
  <input type="text" formControlName="businessName">
  </div>

  <div class="form-label">
    <label>Business registration number</label>
  <input type="text" formControlName="businessRegNumber">
</div>

  <div class="form-label">
    <label>Business License Number</label>
  <input type="text" formControlName="businessLicenseNumber">
</div>
<div class="form-label">
   <label>Physical Business Address </label>
  <input type="text" formControlName="physicalBusinessAddress">
</div>

   <div class="form-label">
    <label>Business Email Address</label>
  <input type="email" formControlName="businessEmailAddress">
  </div>
  </div>
  `,
  styles:[`
    
    .form-label{
      display:flex;
      flex-direction: column;
      margin-bottom: 10px;
    }

    .form-label label{
      font-weight: 400;
      margin-bottom: 5px;
    }

    .form-label input{
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    `]
 
})
export class BusinessInformation{

  @Input() group!: FormGroup <any>
    
}
