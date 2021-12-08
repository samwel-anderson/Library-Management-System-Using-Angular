import { Component, OnInit } from '@angular/core';
import {Book} from '../interfaces/book';
import {BookService} from '../services/book.service';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  books: Book[] = [];

  hasAddMenu = false;
  hasViewMenu = false;
  hasEditMenu = false;
  hasDeleteMenu = false;

  constructor(public bookService: BookService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.bookService.getAll()
      .subscribe(
        (data: Book[])  => {
          this.books = data;
          console.log(this.books);

          const permArray = this.tokenService.getPermissions();

          this.hasAddMenu = permArray.some( ai => ['add_books'].includes(ai));
          this.hasViewMenu = permArray.some( ai => ['view_books'].includes(ai));
          this.hasEditMenu = permArray.some( ai => ['change_books'].includes(ai));
          this.hasDeleteMenu = permArray.some( ai => ['delete_books'].includes(ai));

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
