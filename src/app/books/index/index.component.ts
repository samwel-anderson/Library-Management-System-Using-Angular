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

  totalBooks = 0;
  hasAddMenu = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    const permArray = this.tokenService.getPermissions();
    this.hasAddMenu = permArray.some( ai => ['add_books'].includes(ai));
  }

  setTotalBooks(total: number) {
    this.totalBooks = total;
  }

}
