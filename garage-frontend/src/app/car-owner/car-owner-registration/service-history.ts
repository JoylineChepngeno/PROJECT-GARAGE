import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule],
  template:` 
    <h3>Severity of Past Repairs</h3>
    <p>Select all that apply:</p>
    <div *ngFor="let option of options; let i =index" class="severity-option">
    <label>
      <input type="radio" [value]="option" formControlName="severity"> {{ option }}
    </label>
    <p class="option-desc"> {{descriptions[i]}} </p>

    @if(group.get('severity')?.invalid && group.get('severity')?.touched){
        
    <div class="error">
      Please select one option.
    </div>
    }`,

    styles: [`
    .severity-option {
      margin-bottom: 1rem;
    }
    .option-desc {
      font-size: 0.85rem;
      color: #555;
      margin-left: 1.5rem;
    }
  `]

 
})
export class ServiceDetails {

    @Input() group!: FormGroup <any>;
      options = ['Minor Fix', 'Moderate Repair', 'Major Repair', 'Complete Overhaul'];

      descriptions = [

    'Small issues like oil change or replacing wipers.',
    'Repairs that take a few hours, e.g., brake pads.',
    'Serious repairs like engine or gearbox fixes.',
    'Full restoration, almost rebuilding the car.'

      ];


}
