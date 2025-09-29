import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-verification-docs',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div [formGroup]="group">
  <div class="form-label">
    <label>Business License </label>
  <input type="file" (change)="onFileSelected($event, 'businessLicense')">
  </div>

    <div class="form-label">
    <label>Professional Certificate </label>
  <input type="file" (change)="onFileSelected($event, 'professionalCertificate')">
  </div>

 <div class="form-label">
   <label>Facility Photos</label>
  <input type="file" (change)="onFileSelected($event, 'facilityPhotos')">
 </div>
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

 onFileSelected(event: any, controlName: string) {
    const file: File = event.target.files[0] ?? null;
    this.group.get(controlName)?.setValue(file);
  }

}
