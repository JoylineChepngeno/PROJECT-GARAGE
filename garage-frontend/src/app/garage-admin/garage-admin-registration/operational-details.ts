import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, } from "@angular/forms";

@Component({
  selector: 'app-operational-details',
  imports: [CommonModule],
  template: `

  <div class="form-field">
    <label>Years in Operation</label>
    <input type="text" formControlName="yearsInOperation" >
  </div>

  <div class="form-field">
    <label>Operating Hours</label>
    <input type="text" formControlName="operatingHours">
  </div>

  <div class="form-field">
    <label>24/7</label>
    <input type="text" formControlName="twentyFourHours">
  </div>

  `,

  styles: [`

    .form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    margin-top:15px;

    }

    .form-field label{
      margin-bottom: 5px;
      font-weight: 400;
    }

    .form-field input{
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      
    }

    `]
 
})

export class OperationalDetails {
  @Input() group!: FormGroup<any>

}
