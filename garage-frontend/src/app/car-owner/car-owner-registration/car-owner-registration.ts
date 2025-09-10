import { Component, OnInit } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import { VehicleDetails } from "./vehicle-details";
import { ServiceDetails } from "./service-history";
import { PersonalDetails } from "./personal-details";

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

constructor(private ownerform: FormBuilder){

  //Parent form with 3 nested groups
  this.form = this.ownerform.group({
    personal: this.ownerform.group({
      profilePic: [null],
      altPhone: ['',[Validators.pattern(/^[0-9]{10}$/)]],
      
    }),

    vehicle: this.ownerform.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      licensePlate: ['',Validators.required],
      engineType:[''],
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



ngOnInit(){

  if(typeof localStorage !== 'undefined'){
  //load saved progess
   const saved = localStorage.getItem('ownerSetup');
   if (saved){
    this.form.patchValue(JSON.parse(saved))
   }

   // Save progress as user types
  this.form.valueChanges.subscribe(value => {
    localStorage.setItem('ownerSetup', JSON.stringify(value));
  });
  
}}
  
  //Progress percentange
  get progress(){

    if (this.currentStep < 0) return 0;
    return((this.currentStep+1)/this.maxSteps)*100;

  }

  nextStep(){
    if(this.currentStep < this.maxSteps - 1) this.currentStep++;
  }
// not sure if the above line starts from intro

  prevStep(){
    if(this.currentStep>-1) {this.currentStep--;}
  }

  goToStep(step: number){ 
    this.currentStep=step;

  }

  saveProgress(){
    localStorage.setItem('ownerSetup', JSON.stringify(this.form.value));
  }

  submit(){
    if (this.form.valid){
      console.log('Final Submission', this.form.value)
      localStorage.removeItem('ownerSetup'); //clear after submission
    //todo: send to backend
    } else{
      alert('Please complete all required fields')
    }
  }

}
