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
  message = "";
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

    console.log('Handler called')

    if( this.registerForm.valid){
      const formData = this.registerForm.value;

      //check what I am sending 
      console.log('Submitting data:',formData)

      //client side check

      if(formData.password !== formData.confirmPassword){
        this.message = 'Passwords do not match';
        return;
      }

      this.message= "Registerrrrr";
      this.isLoading = true;//spinner

      this.authService.register(formData).subscribe({
        next: (res) => {
          this.message = res.message || 'Registration successful!';
          console.log("registered successfully")
          this.isLoading = false;

          //after registration direct user to login
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.message = err.message;
          this.isLoading = false;}
      });
    }
    else{
      this.message = 'Please fll in all required fields correctly.';
    }
    
  }

  //Password mismatch help

  get passwordMismatch(): boolean {
  const password = this.registerForm.get('password')?.value;
  const confirmPassword = this.registerForm.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword;
}
}


  

//  goToRegister(role: string){
  //  this.router.navigate([`/auth/register/${role.toLowerCase()}`])}
  //


