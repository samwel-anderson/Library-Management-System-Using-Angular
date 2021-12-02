import { Component, OnInit } from '@angular/core';
import {Book} from '../interfaces/book';
import {BookService} from '../services/book.service';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  books: Book[] = [];

  constructor(public bookService: BookService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.bookService.getAll()
      .subscribe(
        (data: Book[])  => {
          this.books = data;
          console.log(this.books);
        },
        (err: HttpErrorResponse) => {
          console.log('Custom HTTP Error', err);
          console.log(err);

          this.toastr.error(`Handle Custom Actions`, `Component Error Handling`, {
            timeOut: 8000,
          });
        },
        () => console.log('HTTP request completed.')
      );


  }

}
