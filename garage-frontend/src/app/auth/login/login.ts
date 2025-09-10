import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup,FormBuilder,Validators } from '@angular/forms';
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
   

  constructor(
    private loginbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
   
  ){
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
      this.errorMessage = null;  // Clear old error messages
      this.isLoading = true;     // ✅ Show spinner when request starts

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          this.router.navigate(['/mechanic'])
          // TODO: redirect user to dashboard
          this.isLoading = false;  // ✅ Hide spinner
        },
        error: (err) => {
          console.error('Login failed:', err.message);
          this.errorMessage = err.message;
          this.isLoading = false;  // ✅ Hide spinner
        }
      });
    }
  }
  }
          //Redirect based on role

         /* switch (res.role){
            case 'CAR_OWNER':
              this.router.navigate(['/car-owner/dashoard']);
              break;
            case 'MECHANIC':
                this.router.navigate(['/mechanic/dashboard']);
                break;
            case 'SYSTEM-ADMIN':
              this.router.navigate(['/system-admin/dashboard']);
              break;
            case 'GARAGE-ADMIN':
              this.router.navigate(['/garage-admin/dashboard']);
              break;   

          }*/

        



