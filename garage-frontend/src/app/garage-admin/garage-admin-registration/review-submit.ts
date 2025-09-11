import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review-submit',
  imports: [CommonModule],
  template: `
  <div class="form-label">
  <label>Review</label>
  <input type="text" formControlName="review">
</div>
  `,

  styles:[`

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
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
      }
    `

  ]
 
})
export class ReviewSubmit {
  @Input() group!: FormGroup<any>

}
