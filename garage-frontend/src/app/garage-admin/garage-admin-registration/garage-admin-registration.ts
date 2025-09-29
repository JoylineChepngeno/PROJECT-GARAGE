import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OperationalDetails } from "./operational-details";
import { BusinessInformation } from "./business-information";
import { FinancialInfo } from "./financial-info";
import {Services} from "./services"
import { VerificationDocs } from "./verification-docs";
import { ReviewSubmit } from "./review-submit";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//import { GarageAdminDetails } from '../services/garage-admin-details';
import { GenericForm } from '../../core/utils/generic-form';
import { StorageService } from '../../core/utils/storageservice';

@Component({
  selector: 'app-garage-admin-registration',
  imports: [ CommonModule,ReactiveFormsModule, OperationalDetails, BusinessInformation, FinancialInfo, Services, VerificationDocs, ReviewSubmit],
  templateUrl: './garage-admin-registration.html',
  styleUrl: './garage-admin-registration.css'
})
export class GarageAdminRegistration implements OnInit {

  form: FormGroup;
  currentStep = 0;
  maxSteps = 7;
  steps=['Business Information', 'Operational Details', 'Services','Verification Documents', 'Financial Information' ,'Review and submit' ]

  constructor(private garageform: FormBuilder,
              private router: Router,
              private genericForm: GenericForm,
              private storageService: StorageService
            ){

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
        review: ['', Validators.required]


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

    if(typeof this.storageService !== 'undefined'){
    
    //load saved progess
   const saved = this.storageService.getItem('garageSetup');
   if (saved){
    this.form.patchValue(JSON.parse(saved))
   }

   // Save progress as user types
  this.form.valueChanges.subscribe(value => {
    this.storageService.setItem('garageSetup', JSON.stringify(value));
  });
    
  }}



 nextStep(){
    if(this.currentStep < this.maxSteps - 1) {this.currentStep++};
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
       this.genericForm.submitForm('http://10.20.33.60:8083/garages', this.form.value).subscribe({
        next: (res) => {
        console.log('Garage Admin details saved:', res);

        // clear local storage
        this.storageService.removeItem('garageSetup');

        // mark details as completed for auth guard
        this.storageService.setItem('detailsCompleted', 'true');

        // redirect to dashboard
        this.router.navigate(['/garage-admin-dashboard']);
      },
       });
    } else{
      alert('Please complete all required fields')
    }
  }



}
