import { Component,Input } from '@angular/core';
import { FormGroup, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-review-submit',
  imports: [ɵInternalFormsSharedModule],
  template: `

  <label>Service Categories</label>
  <input formControlName="serviceCategories">

  <label> Specialised Services</label>
  <input formControlName="specialised Services">
  
  `,
 
})
export class ReviewSubmit{
  @Input() group! : FormGroup<any>

  



}
