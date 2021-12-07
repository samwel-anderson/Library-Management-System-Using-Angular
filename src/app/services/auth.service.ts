import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';


import {Observable, of, throwError} from 'rxjs';
import {tap, delay, catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isUserLoggedIn: boolean = false;
  apiURL = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }


  login(userName: string, password: string): Observable<any> {
    console.log(userName);
    console.log(password);
    const loginForm: Login = {
      email: userName,
      password: password
    };

    return this.http.post(this.apiURL + 'auth/login', loginForm)
      .pipe(
        catchError(this.errorHandler)
      );

  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('email');
    window.sessionStorage.removeItem('permissions');
  }


  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log('Service Error Found', errorMessage);
    return throwError(errorMessage);
  }

}
