import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { handleApiError } from '../utils/error-handler';
import { StorageService } from '../utils/storageservice';
import { Environment } from '../../../environment/environment';

///re look above and below

export interface LoginResponse{

  token: string;
  role: string;
  firstname?: string;
  detailsCompleted: boolean;
}

export interface LoginRequest{
  email: string;
  password: string;
}


export interface RegisterResponse{

  message: string;
  token?: string;
  role?: string;
}

export interface RegisterRequest{
  firstnmae: string;
  secondname: string;
  email:string;
  password: string;
  confirmPassword: string;
  phoneNumber: string,
  role:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private roleToken = 'role';
  private nameKey = 'firstname';
  private apiURL = Environment.url;
  private welcome ='';

  constructor( private http: HttpClient,
               private storageService: StorageService

  ){}

 
  // --- REAL LOGIN ---
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiURL}/users/login`, request).pipe(
      tap(res => {
        this.storageService.setItem(this.tokenKey, res.token);
        this.storageService.setItem(this.roleToken, res.role);
        this.storageService.setItem('detailsCompleted', res.detailsCompleted ? 'true' : 'false');

        //put firsname as optional (experiment)
        if (res.firstname) {
          this.storageService.setItem(this.nameKey, res.firstname);
          this.welcome = `Welcome back, ${res.firstname}`
        }
      }),
      catchError(handleApiError)
    );
  }
  
  
  // --- REAL REGISTER ---
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiURL}/users/register`, userData).pipe(
      tap(res => {
        //optional: save token if backend returns one
        if (res.token) {
          this.storageService.setItem(this.tokenKey, res.token);
          if (res.role) this.storageService.setItem(this.roleToken, res.role);
        }
      }),
      catchError(handleApiError)

    );
  }

  // --- LOGOUT ---
  logout(): void {
  const token = this.storageService.getItem(this.tokenKey);
  if (token) {
    const storageKey = `ownerSetup_${token}`;
    this.storageService.removeItem(storageKey); // ✅ remove saved form for this user
  }

  // Clear auth info
  this.storageService.removeItem(this.tokenKey);
  this.storageService.removeItem(this.roleToken);
 this.storageService.removeItem(this.nameKey);
 this.storageService.removeItem('profileData'); // optional
 this.storageService.removeItem('detailsCompleted'); // optional
}

  isLoggedIn(): boolean {
    return !! this.storageService.getItem(this.tokenKey);
  }


// check if token is not an empty string  isLoggedIn(): boolean {
//   const token = this.storageService.getItem(this.tokenKey);
//   return token !== null && token.trim() !== '';
// }


  getToken(): string | null {
    return this.storageService.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return this.storageService.getItem(this.roleToken);
  }

  hasCompletedDetails(): boolean {
    return this.storageService.getItem('detailsCompleted') === 'true';
;  }



  }

