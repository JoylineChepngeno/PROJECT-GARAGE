import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

///re look above and below

export interface LoginResponse{

  token: string;
  role: string;
  firstname?: string;


}

export interface RegisterResponse{

  message: string;
  token?: string;
  role?: string;
  //why no firstname here


}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';
  private roleToken = 'role';
  private nameKey = 'firstname';
  private apiURL = 'http://10.20.33.92:8083';
  private welcome ='';

  constructor( private http: HttpClient){}

 
  // --- REAL LOGIN ---
  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };

    return this.http.post<LoginResponse>(`${this.apiURL}/users/login`, body).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem(this.roleToken, res.role);

        //put firsname as optional (experiment)
        if (res.firstname) {
          localStorage.setItem(this.nameKey, res.firstname);
          this.welcome = `Welcome back, ${res.firstname}`
        }
      }),
      catchError(err => {
        console.error('Login error:', err);
        // Customize error message
        return throwError(() => new Error(err.error?.message || 'Login failed. Please try again.'));
      })
    );
  }
  
  
  // --- REAL REGISTER ---
  register(userData: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiURL}/users`, userData).pipe(
      tap(res => {
        //optional: save token if backend returns one
        if (res.token) {
          localStorage.setItem(this.tokenKey, res.token);
          if (res.role) localStorage.setItem(this.roleToken, res.role);
        }
      }),
      catchError(err => {
        console.error(err);
        return throwError(() => new Error(err.error?.message || 'Registration failed. Try again later.'));
      })
    );
  }

  // --- LOGOUT ---
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleToken);
    localStorage.removeItem(this.nameKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleToken);
  }
  }

