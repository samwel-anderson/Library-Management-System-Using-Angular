import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {AuthService} from '../auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toastr: ToastrService, public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let message = '';
          if (error.error instanceof ErrorEvent) {
            // handle client-side error
            message = `${error.error.message}`;
          } else {
            // handle server-side error
            if (error.status === 401) {
              // auto logout if 401 response returned from api
              message = `Login Required`;
              this.authService.logout();
              this.router.navigateByUrl('/auth/login').then(r => {});
            }
            if (error.status === 403) {
              // Forbidden, Permission Required
              // message = error.message;
              message = error.error.detail;
              console.log('Permission Error & Error.Message');
              console.log(error);
              console.log(error.message);
            }

            if (error.status === 400) {
              // Forbidden, Permission Required
              message = error.message;
              console.log('BadRequest Error & Error.Message');
              console.log(error);
              console.log(error.message);

              this.toastr.error('Bad Request', 'Error!', {
                timeOut: 8000,
              });
            }

            // message = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }

          // this.toastr.error(message, 'Error!', {
          //   timeOut: 8000,
          // });
          console.log(message);

          console.log('Interceptor Error Found', message);
          console.log('Interceptor Error');
          console.log(error);

          return throwError(error);
        })
      );

    // return next.handle(request);
  }
}
