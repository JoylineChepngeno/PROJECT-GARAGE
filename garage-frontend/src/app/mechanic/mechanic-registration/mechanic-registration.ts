import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PersonalInformation } from "./personal-information";
//import { fromReadableStreamLike } from 'rxjs/internal/observable/innerFrom';
import { ProfessionalQualifications } from './professional-qualifications';
import { ReviewSubmit } from './review-submit';
import { SkillsAvailability } from './skills-availability';
import { VerificationDocuments } from './verification-documents';
//import { Mechanicdetails } from '../services/mechanicdetails';
import { GenericForm } from '../../core/utils/generic-form';
import { StorageService } from '../../core/utils/storageservice';

@Component({
  selector: 'app-mechanic-registration',
  imports: [CommonModule, PersonalInformation, ProfessionalQualifications,
    ReviewSubmit,SkillsAvailability, VerificationDocuments ],
  
  templateUrl: './mechanic-registration.html',
  styleUrl: './mechanic-registration.css'
})
export class MechanicRegistration implements OnInit {

  form: FormGroup;
  currentStep = -1;
  maxSteps= 5;
  //objects so that I can add icons
  steps = ['Personal Information', 'Professional Qualification', 'Skills and Availability', 'Verification Documents', 'Review and Submit']

  constructor(private mechanicRegister:FormBuilder,
              private router: Router,
              private genericForm: GenericForm,
              private storageService: StorageService
             ){

    this.form=this.mechanicRegister.group({
      personal:this.mechanicRegister.group({
        profilePic: [null],
        nationalIdNumber:[0,Validators.required],
        alternativePhone:[0, [Validators.pattern(/^[0-9]{10}$/)]],
        physicalAddress:['', Validators.required],
        emergencyContactName: ['', Validators.required],
        emergencyContactNumber:['',Validators.required]


      }),

      professional: this.mechanicRegister.group({
        yearsofExperience:['',Validators.required],
        areasofSpecialization:['',Validators.required],
        bio:['',Validators.required]

      }),

      skills:this.mechanicRegister.group({
        vehicleBrands:['',Validators.required],
        garageLinnked:['',Validators.required],
        availability:['', Validators.required],
       }),

       documents:this.mechanicRegister.group({
        nationalIDPic:['', Validators.required],
        professionalCertfificate:['',Validators.required],
        anyRelevantCertificate: [''],
        policeClearanceCertficate:['', Validators.required]

       }),

       review: this.mechanicRegister.group({ })
        //fromReadableStreamLike
      

    });

  }


get personalForm(): FormGroup {
  return this.form.get('personal') as FormGroup;
}

get professionalForm(): FormGroup{
  return this.form.get('professional') as FormGroup;
}

get skillslForm(): FormGroup {
  return this.form.get('skills') as FormGroup;
}

get documentsForm(): FormGroup {
  return this.form.get('documents') as FormGroup;
}

ngOnInit(){
  //load saved progess
   const saved = this.storageService.getItem('mechanicSetup');
   if (saved){
    this.form.patchValue(JSON.parse(saved))
   }
  

   // Save progress as user types
  this.form.valueChanges.subscribe(value => {
    this.storageService.setItem('mechanicSetup', JSON.stringify(value));
  });

  
}

  get progress(){

    if (this.currentStep < 0) return 0;
    return((this.currentStep+1)/this.maxSteps)*100;

  }

  //Onclick functions

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
//below is already on ngOnInit
  //saveProgress(){
   // localStorage.setItem('ownerSetup', JSON.stringify(this.form.value));
  //}

  submit(){
    if (this.form.valid){
       this.genericForm.submitForm('http://10.20.33.60:8083/mechanics', this.form.value).subscribe({
      next: (res) => {
        console.log('Mechanic details saved:', res);
        this.storageService.removeItem('mechanicSetup');
        this.storageService.setItem('detailsCompleted', 'true');
        this.router.navigate(['/mechanic-dashboard']);
      }
      
    });
    } else{
      alert('Please complete all required fields')
    }
  }




}
