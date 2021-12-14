import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Book} from '../../interfaces/book';
import {BookService} from '../../services/book.service';
import {ToastrService} from 'ngx-toastr';
import {TokenService} from '../../../services/token.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  @Output() totalBooksEvent = new EventEmitter<number>();

  books: Book[] = [];

  hasAddMenu = false;
  hasViewMenu = false;
  hasEditMenu = false;
  hasDeleteMenu = false;

  constructor(public bookService: BookService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getAll()
      .subscribe(
        (data: Book[])  => {
          this.books = data;

          this.totalBooksEvent.emit(this.books.length);

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

  deleteBook(id: number) {
    this.bookService.delete(id).subscribe(res => {
      this.fetchBooks();
      this.toastr.success(`Book deleted successfully!`, `Success`, {
        timeOut: 8000,
      });
      console.log('Book deleted successfully!');
    });
  }

}
