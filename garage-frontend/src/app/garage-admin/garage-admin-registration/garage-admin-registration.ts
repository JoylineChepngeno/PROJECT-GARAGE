import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OperationalDetails } from "./operational-details";
import { BusinessInformation } from "./business-information";
import { FinancialInfo } from "./financial-info";
import { ServiceDetails } from "../../car-owner/car-owner-registration/service-history";
import { VerificationDocs } from "./verification-docs";
import { ReviewSubmit } from "./review-submit";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-garage-admin-registration',
  imports: [ CommonModule,ReactiveFormsModule, OperationalDetails, BusinessInformation, FinancialInfo, ServiceDetails, VerificationDocs, ReviewSubmit],
  templateUrl: './garage-admin-registration.html',
  styleUrl: './garage-admin-registration.css'
})
export class GarageAdminRegistration implements OnInit {

  form: FormGroup;
  currentStep = -1;
  maxSteps = 6;
  steps=['Business Information', 'Operational Details', 'Services','Verification Documents', 'Financial Information' ,'Review and submit' ]

  constructor(private garageform: FormBuilder){

    this.form = this.garageform.group({
      business : this.garageform.group({
        businessName: ['', Validators.required],
        businessRegNumber: ['', Validators.required],
        businessLicenseNumber: ['', Validators.required],
        physicalBusinessAddress: ['', Validators.required],
        businessEmailAddress: ['', Validators.required]


      }),

      operational: this.garageform.group({
        yearsInOperation: ['', Validators.required],
        operatingHours: ['', Validators.required],
        twentyFourHours: ['', Validators.required]

      }),

      services: this.garageform.group({
        serviceCategories:['', Validators.required],
        specialisedServices: ['']

      }),

      financial: this.garageform.group({
        mpesaPayBill: [''],
        mpesaTill:['']


      }),

      documents: this.garageform.group({

        businessLicense:['', Validators.required],
        professionalCertificate: [''],
        facilityPhotos:['']

      }),

      review: this.garageform.group({

      })

    });

  }

  //Get forms

  get businessForm(): FormGroup{
   return  this.form.get('business') as FormGroup
  }

  get operationalForm(): FormGroup{
    return this.form.get('operational') as FormGroup
  }

  get servicesForm(): FormGroup{
    return this.form.get('services') as FormGroup
  }

  get finacialForm(): FormGroup{
    return this.form.get('financial') as FormGroup
  }

  get documentsForm(): FormGroup{
    return this.form.get('documents') as FormGroup
  }

  get reviewForm(): FormGroup{
    return this.form.get('review') as FormGroup
  }


  ngOnInit(): void {

    if(typeof localStorage !== 'undefined'){
    
    //load saved progess
   const saved = localStorage.getItem('garageSetup');
   if (saved){
    this.form.patchValue(JSON.parse(saved))
   }

   // Save progress as user types
  this.form.valueChanges.subscribe(value => {
    localStorage.setItem('garageSetup', JSON.stringify(value));
  });
    
  }}



 nextStep(){
    if(this.currentStep < this.maxSteps - 1) this.currentStep++;
  }


  prevStep(){
    if(this.currentStep>-1) {this.currentStep--;}
  }

  //what what
  goToStep(step: number){ 
    this.currentStep=step;

  }

   //Progress percentange
  get progress(){

    if (this.currentStep < 0) return 0;
    return((this.currentStep+1)/this.maxSteps)*100;

  }

 // saveProgress(){
   // localStorage.setItem('ownerSetup', JSON.stringify(this.form.value));
  //}

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
