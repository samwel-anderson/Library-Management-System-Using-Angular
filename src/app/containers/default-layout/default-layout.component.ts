import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  isUserLoggedIn = false;

  ngOnInit() {
    const storeData = localStorage.getItem('isUserLoggedIn');

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
