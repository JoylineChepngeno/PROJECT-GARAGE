import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Vehicle } from '../services/vehicle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template:`
  <h3>Vehicle Information</h3>
  <div class="vehicle-details-form" [formGroup]="group">

    <label>Make:</label>
    <select formControlName="make">
      <option value="">Select make...</option>
      <option *ngFor="let make of make">{{ make }}</option>
    </select>

    <label>Model:</label>
    <input formControlName="model" placeholder="Enter vehicle model">


    <label>Year:</label>
     <select formControlName="year">
      <option value="">Select year...</option>
      <option *ngFor="let y of year">{{ y }}</option>
    </select>

    <label>License Plate:</label>
    <input formControlName="licensePlate" placeholder="e.g. KAA-123A">


    <label>Engine Type:</label>
     <select formControlName="engineType">
      <option value="">Select engine type...</option>
      <option *ngFor="let type of engineType">{{ type }}</option>
    </select>

    <label>Engine Capacity (cc):</label>
    <input formControlName="engineCapacity" placeholder="e.g. 1500">

    <label>Color:</label>
    <input type="color" formControlName="color">

    <label>Transmission:</label>
     <label>Transmission:</label>
    <select formControlName="transmission">
      <option value="">Select transmission...</option>
      <option *ngFor="let t of transmission">{{ t }}</option>
    </select>
</div>`,

styles: [`
  .vehicle-details-form {
    background-color: #f9f9f9;      /* light background */
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .vehicle-details-form h3 {
    margin-bottom: 10px;
    font-size: 1.4rem;
    color: #333;
  }

  .vehicle-details-form label {
    font-weight: 600;
    margin-bottom: 5px;
  }

 /* all text-like inputs */
.vehicle-details-form input:not([type="color"]),
.vehicle-details-form select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* color input specifically */
.vehicle-details-form input[type="color"] {
  padding: 0;
  border: none;
  width: 60px;   /* adjust size */
  height: 40px;
  cursor: pointer;
}


  .vehicle-details-form input:focus,
  .vehicle-details-form select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
  `]
 
})
export class VehicleDetails implements OnInit{
    @Input() group!: FormGroup <any>

  make: string[] = [];
  year: number[] = [];
  engineType: string[] = [];
  transmission: string[] = [];

  constructor(private vehicleService: Vehicle,
            

  ) {}

  ngOnInit() {
    // Fetch each list from backend
    this.vehicleService.getMakes().subscribe(data => {
      this.make = data.sort();
      this.restoreValue('make');
  });

    this.vehicleService.getYears().subscribe(data => {
      this.year = data.sort((a,b)=>b-a)
      this.restoreValue('year');
  }); 

    this.vehicleService.getEngineTypes().subscribe(data => {
      this.engineType = data;
      this.restoreValue('engineType');
  });
    this.vehicleService.getTransmissions().subscribe(data => {
       this.transmission = data;
       this.restoreValue('transmission');

  });
  }

  private restoreValue(controlName: string) {
  const control = this.group.get(controlName);
  if (control?.value) {
    control.setValue(control.value, { emitEvent: false });
  }
}

}
