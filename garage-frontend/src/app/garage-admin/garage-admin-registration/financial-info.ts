import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { FormGroup,  } from "@angular/forms";


@Component({
  selector: 'app-financial-info',
  imports: [CommonModule],
  template: `
  <div class="form-field">
  <label>MPESA PayBill</label>
  <input type="text" formControlName="mpesaPayBill">
  </div>

  <div class="form-field">
  <label>MPESA Till</label>
  <input type="text" formControlName="mpesaTill">
  <div>
  
  `,

  styles: [`

      .form-field{
        display:flex;
        flex-direction: column;
        margin-bottom: 10px;

      }

      .form-field label{
        margin-bottom: 5px;
        font-weight: 400;
      }

    `]

 
})
export class FinancialInfo {

  @Input() group!: FormGroup<any>;



}
