import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Book} from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  apiURL = environment.apiUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL + 'books/');
    // return this.http.get<Book[]>(this.apiURL + 'books/')
    //   .pipe(
    //     catchError(this.errorHandler)
    //   );
  }


  create(bookObject: Book): Observable<Book> {
    return this.http.post<Book>(this.apiURL + 'books/', bookObject)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.toastr.error(`${error.message}`, `Error Code: ${error.status}`, {
      timeOut: 8000,
    });

    return throwError(error);
  }

}

