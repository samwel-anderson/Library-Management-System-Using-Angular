import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): any {
    console.log('Url: ' + url);
    // @ts-ignore
    const val: string = localStorage.getItem('isUserLoggedIn');

    if (val != null && val === 'true') {
      if (url === '/login') {
        this.router.parseUrl('/dashboard');
      } else {
        return true;
      }
    } else {
      return this.router.parseUrl('/auth/login');

    }
  }

}
