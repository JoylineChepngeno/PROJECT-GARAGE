import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-verification-docs',
  imports: [CommonModule],
  template: `

  <div class="form-label">
    <label>Business License </label>
  <input type="file">
  </div>

 <div class="form-label">
   <label>Facility Photos</label>
  <input>
 </div>
  

  
  `,

  styles: [`

      .form-label{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
      }

      .form-label label{
        font-weight: 400;
        margin-bottom: 5px;
      }

      .form-label input{
        padding: 5px;
        border: 1px solid #353333ff;
        border-radius: 4px;
      }
    `]
 
})
export class VerificationDocs {
  @Input() group!: FormGroup<any>

}
