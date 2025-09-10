import { Component } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-guide',
  imports: [],
  templateUrl: './guide.html',
  styleUrl: './guide.css'
})
export class Guide {

    //direct to register
  constructor(private router: Router){}

  goToRegister(){
    this.router.navigate(['/register']);
    
  }

  //direct to log in

  goToLogIn(){
    this.router.navigate(['/login'])
  }

}
