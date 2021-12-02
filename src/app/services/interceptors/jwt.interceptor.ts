import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from '../token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    if (this.tokenService.getToken() != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenService.getToken()}`
        }
      });
    }

    return next.handle(request);
  }
}
