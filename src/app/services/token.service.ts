import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.setItem('accessToken', token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem('accessToken');
  }


  public saveEmail(email: string): void {
    window.sessionStorage.removeItem('email');
    window.sessionStorage.setItem('email', email);
  }

  public getEmail(): string | null {
    return window.sessionStorage.getItem('email');
  }


  public savePermissions(permissions: string): void {
    window.sessionStorage.removeItem('permissions');
    window.sessionStorage.setItem('permissions', permissions);
  }

  public getPermissions(): string[] {
    const permissionAsString = window.sessionStorage.getItem('permissions');
    if (permissionAsString == null) { return []; } else { return JSON.parse(permissionAsString) ; }
  }

}
