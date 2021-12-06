import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  isUserLoggedIn = false;

  hasBooksMenu = false;

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    const storeData = localStorage.getItem('isUserLoggedIn');
    const permArray = this.tokenService.getPermissions();
    const booksPermissions = ['view_books', 'add_books', 'change_books', 'delete_books'];
    this.hasBooksMenu = permArray.some( ai => booksPermissions.includes(ai));




    if ( storeData != null && storeData === 'true') {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
