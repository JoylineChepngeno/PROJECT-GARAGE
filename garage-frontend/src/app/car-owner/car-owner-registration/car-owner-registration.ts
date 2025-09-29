import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { VehicleDetails } from "./vehicle-details";
import { ServiceDetails } from "./service-history";
import { PersonalDetails } from "./personal-details";
import { Router } from '@angular/router';
//import { CarOwnerdetails } from '../services/car-ownerdetails';
import { GenericForm } from '../../core/utils/generic-form';
import { StorageService } from '../../core/utils/storageservice';

@Component({
  selector: 'app-car-owner-registration',
  imports: [CommonModule, VehicleDetails, ServiceDetails, PersonalDetails],
  templateUrl: './car-owner-registration.html',
  styleUrl: './car-owner-registration.css'

})
export class CarOwnerRegistration implements OnInit {
  form: FormGroup;
  currentStep = -1;
  maxSteps = 3;
  steps = ['Personal Information', 'Vehicle Information', 'Service History'];

  constructor(private ownerform: FormBuilder,
    private router: Router,
    private genericForm: GenericForm,
    private storageService: StorageService

  ) {

    //Parent form with 3 nested groups
    this.form = this.ownerform.group({
      personal: this.ownerform.group({
        profilePic: [null],
        altPhone: ['', [Validators.pattern(/^[0-9]{10}$/)]],

      }),

      vehicle: this.ownerform.group({
        make: ['', Validators.required],
        model: ['', Validators.required],
        year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
        licensePlate: ['', Validators.required],
        engineType: [''],
        engineCapacity: [''],
        color: [''],
        transmission: ['']
      }),

      history: this.ownerform.group({
        severity: ['', Validators.required]
      })

    });
  }

  get personalForm(): FormGroup {
    return this.form.get('personal') as FormGroup;
  }

  get vehicleForm(): FormGroup {
    return this.form.get('vehicle') as FormGroup;
  }

  get historyForm(): FormGroup {
    return this.form.get('history') as FormGroup;
  }



  ngOnInit() {

    const token =this.storageService .getItem('token');

  // Only persist if user is logged in
  if (token) {
    const storageKey = `ownerSetup_${token}`;

    // Load saved progress
    const saved = this.storageService.getItem(storageKey);
    if (saved) {
      this.form.patchValue(JSON.parse(saved));
    }

    // Save progress as user types
    this.form.valueChanges.subscribe(value => {
     this.storageService.setItem(storageKey, JSON.stringify(value));
    });
  } else {
    // If guest, just start with a clean form (no persistence)
    this.form.reset();
  }
    
  }

  //Progress percentange
  get progress() {

    if (this.currentStep < 0) return 0;
    return ((this.currentStep + 1) / this.maxSteps) * 100;

  }

  nextStep() {

    // Only move if current step form is valid
    if (this.currentStep === 0 && this.personalForm.invalid){
      this.personalForm.markAllAsTouched();
      alert("Details incomplete")
    };

    if (this.currentStep === 1 && this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      alert("Details incomplete")
    };
    if (this.currentStep === 2 && this.historyForm.invalid) {
      this.historyForm.markAllAsTouched()
      alert("Details incomplete")
    };

    if (this.currentStep < this.maxSteps - 1) this.currentStep++;
  }
  // not sure if the above line starts from intro

  prevStep() {
    if (this.currentStep > -1) { this.currentStep--; }
  }

  goToStep(step: number) {
    this.currentStep = step;

  }

  saveProgress() {
    this.storageService.setItem('ownerSetup', JSON.stringify(this.form.value));
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.personalForm.patchValue({ profilePic: file });
      this.personalForm.get('profilePic')?.updateValueAndValidity();
    }
  }

  submit() {
    if (this.form.valid) {
      this.genericForm.submitForm('http://10.20.33.60:8083/carOwners', this.form.value).subscribe({
        next: (res) => {
          console.log('Details saved:', res);

          // Optionally save some info in localStorage for profile page
          this.storageService.setItem('profileData', JSON.stringify(this.form.value));
          //mark as complete for guard
          this.storageService.setItem('detailsCompleted', 'true');

          // Redirect to dashboard
          this.router.navigate(['/car-owner']);
        }
        //removed internal error handling
      
      });
    } else {
      //if severity is not chosen
      this.historyForm.get('severity')?.markAsTouched();
      alert('Please complete all required details.');

    }
  }

}
