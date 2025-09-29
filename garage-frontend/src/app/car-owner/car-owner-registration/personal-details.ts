import { Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template:`
  <div class="personal-details-form" [formGroup]="group">
  <h3>Personal Information</h3>
    <label>Profile Picture (optional):</label>
    <input type="file" (change)="onFileSelected($event)" accept="image/*">
    
    <label>Alternative Conctact:</label>
    <input formControlName="altPhone" placeholder="e.g. 0712345678">

    @if (group.get('altPhone')?.invalid && group.get('altPhone')?.touched) {
    <div class="error">
      Must be a 10-digit number.
    </div>}
  </div>
  `,

  styles: [`.personal-details-form {
  background-color: #f9f9f9;   /* light gray background */
  padding: 20px;               /* inner spacing */
  border-radius: 15px;         /* round corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* subtle shadow */
  max-width: 500px;            /* optional: limit width */
  margin: 20px auto;           /* center horizontally with margin */
  display: flex;
  flex-direction: column;
  gap: 15px;                   /* spacing between form fields */
}

.personal-details-form label {
  font-weight: 600;
  margin-bottom: 5px;
}

.personal-details-form input[type="text"],
.personal-details-form input[type="file"],
.personal-details-form input[type="color"] {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.personal-details-form .error {
  color: #e74c3c; /* red for errors */
  font-size: 0.85rem;
}

.personal-details-form input:focus {
  outline: none;
  border-color: #3498db; /* blue border on focus */
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

`]


})
export class PersonalDetails {
    @Input() group!: FormGroup <any>;

    onFileSelected(event: any) {
    const file = event.target.files[0];
    this.group.patchValue({ profilePic: file });
  }

}
