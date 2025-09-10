import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule],
  template:`
  <div class="personal-details-form">
  <h3>Personal Information</h3>
    <label>Profile Picture (optional):</label>
    <input type="file" (change)="onFileSelected($event)">
    
    <label>Alternative Conctact:</label>
    <input formControlName="altPhone" placeholder="e.g. 0712345678">

    @if (group.get('altPhone')?.invalid && group.get('altPhone')?.touched) {
    <div class="error">
      Must be a 10-digit number.
    </div>}
  </div>
  `
})
export class PersonalDetails {
    @Input() group!: FormGroup <any>;

    onFileSelected(event: any) {
    const file = event.target.files[0];
    this.group.patchValue({ profilePic: file });
  }

}
