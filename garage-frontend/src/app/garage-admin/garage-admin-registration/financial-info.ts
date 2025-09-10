import { Component, Input} from '@angular/core';
import { FormGroup, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-financial-info',
  imports: [ɵInternalFormsSharedModule],
  template: `

  <label>MPESA PayBill</label>
  <input type="text" formControlName="mpesaPayBill">

  <label>MPESA Till</label>
  <input type="text" formControlName="mpesaTill">
  
  `,
 
})
export class FinancialInfo {

  @Input() group!: FormGroup<any>



}
