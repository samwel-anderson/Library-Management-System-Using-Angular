import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BookService} from '../services/book.service';
import {Book} from '../interfaces/book';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createBookForm = new FormGroup({
    book_id: new FormControl('',  [Validators.required, Validators.maxLength(10)] ),
    bookname: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    subject: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    category: new FormControl('', [Validators.required, Validators.maxLength(10)])

  });

  constructor(
    public bookService: BookService,
    private router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(): void {

    if (this.createBookForm.valid) {
      const bookId = this.createBookForm.get('book_id').value;
      const bookName = this.createBookForm.get('bookname').value;
      const subject = this.createBookForm.get('subject').value;
      const category = this.createBookForm.get('category').value;


      function displayErrorMessage(message: string): void {
        this.toastr.error(`${message}`, 'Error!', {
          timeOut: 8000,
        });
      }

      const bookObj: Book = {
        book_id: bookId,
        bookname: bookName,
        subject: subject,
        category: category
      };

      this.bookService.create(bookObj)
        .subscribe(
          res => {
            this.toastr.clear();
            this.toastr.success(`Book has Been Created, with id ${res['id']} and BookIdentifier  ${res['book_id']}` , 'Success!', {
              timeOut: 2000,
            });
            // if (res) { this.router.navigate(['/books/']); }
          },
          err => {

            console.log('HTTP Error', err);
            console.log('CREATE BOOK Componet Error');
            console.log(err);

            this.toastr.clear();

            if (err.error['book_id'] != null) {
              this.toastr.error(`${err.error['book_id']}`, 'Book ID!', {
                timeOut: 8000,
              });
            }
            if (err.error['bookname'] != null) {
              this.toastr.error(`${err.error['bookname']}`, 'Book Name!', {
                timeOut: 8000,
              });
            }
            if (err.error['subject'] != null) {
              this.toastr.error(`${err.error['subject']}`, 'Subject!', {
                timeOut: 8000,
              });
            }
            if (err.error['category'] != null) {
              this.toastr.error(`${err.error['category']}`, 'Category!', {
                timeOut: 8000,
              });
            }
          },
          () => console.log('HTTP request completed.')
        );

    } else {
      this.toastr.error(`Please Check your Form and Submit Again`, 'Invalid Form!', {
        timeOut: 8000,
      });
    }



  }


}
