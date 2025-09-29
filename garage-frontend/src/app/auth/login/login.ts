import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../core/utils/storageservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  //Log in Form
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;
  successMessage = ''
  dialogRef: any;


  constructor(
    private loginbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService

  ) {
    //initialize with validators
    this.loginForm = this.loginbuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });
  }

  // --- Handle form submit ---
  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = null;  // Clear old error messages
      this.successMessage = '';
      this.isLoading = true;     //  Show spinner when request starts
      this.loginForm.disable();

      const { email, password } = this.loginForm.value;

      this.authService.login({email,password}).subscribe({
        next: (res) => {

          // Save token, role, and detailsCompleted
          this.storageService.setItem('token', res.token);
          this.storageService.setItem('role', res.role);
          this.storageService.setItem('detailsCompleted', res.detailsCompleted ? 'true' : 'false');


          this.isLoading = false;
          this.loginForm.enable();
          this.successMessage = `Welcome back, ${res.firstname || 'User'}!`

          //Delay 1.5s, then redirect

          setTimeout(() => {
            this.router.navigate(['/redirect'])
          }, 1500);

            // close dialog and pass result back
        this.dialogRef.close(true);  

        },
        // error messages from backend

        error: (err) => {

          console.error('Login error:', err)
          this.errorMessage = err.message || 'Login failed.Please try again';
          this.isLoading = false;  // Hide spinner
          this.loginForm.enable();

        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields';
    }
  }
}






