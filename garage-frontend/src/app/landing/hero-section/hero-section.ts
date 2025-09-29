import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-hero-section',
  imports: [MatButton],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection {

  constructor (
    private router: Router
  ){}

    goToRegister(){
    this.router.navigate(['/register']);
    
  }

  //direct to log in

  goToLogIn(){
    this.router.navigate(['/login'])
  }

}
