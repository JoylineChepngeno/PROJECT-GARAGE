import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  //Log in Form
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;
  successMessage=''


  constructor(
    private loginbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) {
    //initialize with validators
    this.loginForm = this.loginbuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });
  }

  //



  // --- Handle form submit ---
  onSubmit() {
    if (this.loginForm.valid) {
      //this.errorMessage = null;  // Clear old error messages
      this.isLoading = true;     //  Show spinner when request starts

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res) => {
          this.successMessage = `Welcome back, ${res.firstname || 'User'}!`

          //Delay 1.5s, then redirect

          setTimeout(() => {

            switch (res.role) {
              case 'CAR_OWNER':
                this.router.navigate(['']);
                break;

              case 'MECHANIC':
                this.router.navigate(['']);
                break;

              case 'GARAGE_ADMIN':
                this.router.navigate(['']);
                break;

              case 'SYSTEM_ADMIN':
                this.router.navigate([]);
                break;
            }
          }, 1500);

          this.isLoading = false;  //  Hide spinner
        },

        // error messages from backend

        error: (err) => {
          
          if (err.message.includes('password')){
            this.errorMessage = 'Incorrect password. Please try again';
          } else if (err.message.includes('email')){
            this.errorMessage = 'No account found with that email';
          } else {
            this.errorMessage = err.message;
          }
      
          this.isLoading = false;  // Hide spinner
        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields';
    }
  }
}






