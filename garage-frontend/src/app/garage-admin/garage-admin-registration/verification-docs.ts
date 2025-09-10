import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-verification-docs',
  imports: [],
  template: `

  <label>Business License </label>
  <input type="file">
  <label>Facility Photos</label>
  <input>
  <label></label>
  <input>
  
  `,
 
})
export class VerificationDocs {
  @Input() group!: FormGroup<any>

}
