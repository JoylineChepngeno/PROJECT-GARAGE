import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [],
  template:`
  <h3>Vehicle Information</h3>
    <label>Make:</label>
    <input formControlName="make">

    <label>Model:</label>
    <input formControlName="model">

    <label>Year:</label>
    <input type="number" formControlName="year">

    <label>License Plate:</label>
    <input formControlName="licensePlate">

    <label>Engine Type:</label>
    <input formControlName="engineType">

    <label>Engine Capacity:</label>
    <input formControlName="engineCapacity">

    <label>Color:</label>
    <input formControlName="color">

    <label>Transmission:</label>
    <select formControlName="transmission">
      <option value="">Select...</option>
      <option>Automatic</option>
      <option>Manual</option>
    </select>`,
 
})
export class VehicleDetails {
    @Input() group!: FormGroup <any>

}
