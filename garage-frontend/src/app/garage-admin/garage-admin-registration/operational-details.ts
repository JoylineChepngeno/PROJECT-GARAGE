import { Component, Input } from '@angular/core';
import { FormGroup, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-operational-details',
  imports: [ɵInternalFormsSharedModule],
  template: `

  <label>Years in Operation</label>
  <input type="text" formControlName="yearsInOperation" >

  <label>Operating Hours</label>
  <input type="text" formControlName="operatingHours">

  <label>24/7</label>
  <input type="text" formControlName="twentyFourHours">

  `,
 
})
export class OperationalDetails {
  @Input() group!: FormGroup<any>

}
