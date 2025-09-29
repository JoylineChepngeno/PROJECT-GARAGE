import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  //Register form
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null; 
  //message = "";
  isLoading = false;


  constructor(
    private router: Router,
    private registerBuilder: FormBuilder,
    private authService: AuthService
  )

  //Initialize with validators  
  {this.registerForm = this.registerBuilder.group({
      firstname: ['', Validators.required],
      secondname: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['',Validators.required],
      confirmPassword:['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      role: ['', Validators.required]

    })

  }


  // Form Submission
  registerOnSubmit(){

    this.errorMessage = null;
    this.successMessage = null;


    if( this.registerForm.valid){
      const formData = this.registerForm.value;

      //client side check

      if(formData.password !== formData.confirmPassword){
        this.errorMessage = 'Passwords do not match';
        return;
      }

      this.errorMessage = null;
      this.successMessage= null;
      this.isLoading = true;//spinner

      //Disable while submitting
      this.registerForm.disable();

      this.authService.register(formData).subscribe({
        next: (res) => {
          this.successMessage = res.message || 'Registration successful! Redirecting';
          this.errorMessage = null;
          this.isLoading = false;

          //rseset form
          this.registerForm.reset();
          this.registerForm.enable();

          //after registration direct user to login after short delay
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Registration failed. Please try again.';
          this.isLoading = false;
          this.registerForm.enable();
        }
      });
    }
    else{
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
    
  }

  //Password mismatch help

  get passwordMismatch(): boolean {
  const password = this.registerForm.get('password')?.value;
  const confirmPassword = this.registerForm.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword;
}
}



