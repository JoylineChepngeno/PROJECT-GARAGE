import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <div class="card-body" [formGroup]="form">
        
        <!-- Profile Picture -->
        <input type="file" formControlName="profilePic" class="input" />

        <!-- National ID -->
        <input 
          type="text" 
          formControlName="nationalIdNumber" 
          placeholder="Enter National ID Number *"
          class="input" 
        />
        <small class="error" *ngIf="form.get('nationalIdNumber')?.invalid && form.get('nationalIdNumber')?.touched">
          National ID is required
        </small>

        <!-- Alternative Phone -->
        <input 
          type="text" 
          formControlName="alternativePhone" 
          placeholder="Alternative Phone (10 digits)" 
          class="input"
        />
        <small class="error" *ngIf="form.get('alternativePhone')?.errors?.['pattern'] && form.get('alternativePhone')?.touched">
          Must be a valid 10-digit phone number
        </small>

        <!-- Physical Address -->
        <input 
          type="text" 
          formControlName="physicalAddress" 
          placeholder="Physical Address *" 
          class="input"
        />
        <small class="error" *ngIf="form.get('physicalAddress')?.invalid && form.get('physicalAddress')?.touched">
          Address is required
        </small>

        <!-- Emergency Contact Name -->
        <input 
          type="text" 
          formControlName="emergencyContactName" 
          placeholder="Emergency Contact Name *" 
          class="input"
        />
        <small class="error" *ngIf="form.get('emergencyContactName')?.invalid && form.get('emergencyContactName')?.touched">
          Emergency contact name is required
        </small>

        <!-- Emergency Contact Number -->
        <input 
          type="text" 
          formControlName="emergencyContactNumber" 
          placeholder="Emergency Contact Number *" 
          class="input"
        />
        <small class="error" *ngIf="form.get('emergencyContactNumber')?.invalid && form.get('emergencyContactNumber')?.touched">
          Emergency contact number is required
        </small>

      </div>
    </div>
  `,
  styles: [`
    .card {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      background: #fff;
    }
    .card-body {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .input {
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #ddd;
      width: 100%;
      font-size: 14px;
    }
    .input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
    }
    .error {
      color: #dc2626; /* red-600 */
      font-size: 12px;
    }
  `]
})

export class PersonalInformation {
  @Input() form!: FormGroup; 
}
