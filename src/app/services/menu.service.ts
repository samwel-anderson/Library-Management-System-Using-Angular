import { Injectable } from '@angular/core';
import {TokenService} from './token.service';
import {INavData} from '@coreui/angular';
import {INavAttributes, INavBadge, INavLabel, INavLinkProps, INavWrapper} from '@coreui/angular/lib/sidebar/app-sidebar-nav';
import {Login} from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private tokenService: TokenService) { }

  private dashboardMenu(): INavData {
    // name?: string;
    // url?: string | any[];
    // href?: string;
    // icon?: string;
    // badge?: INavBadge;
    // title?: boolean;
    // children?: INavData[];
    // variant?: string;
    // attributes?: INavAttributes;
    // divider?: boolean;
    // class?: string;
    // label?: INavLabel;
    // wrapper?: INavWrapper;
    // linkProps?: INavLinkProps;

    const menu: INavData = {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    };



    return menu;

  }


  private booksMenu(): INavData | null {
    const menu: INavData = {
      name: 'Books',
      url: '/books',
      icon: 'icon-book-open'
    };
    const permArray = this.tokenService.getPermissions();
    const booksPermissions = ['view_books', 'add_books', 'change_books', 'delete_books'];
    const hasBooksMenu = permArray.some( ai => booksPermissions.includes(ai));
    if (hasBooksMenu) { return menu; } else { return null; }
  }

  public getUserMenus(): INavData[] {
    const sidebarMenus: INavData[] = [];
    const moduleTitle: INavData = { title: true, name: 'Modules' };
    sidebarMenus.push(this.dashboardMenu());
    sidebarMenus.push(moduleTitle);
    if (this.booksMenu() != null) {  sidebarMenus.push(this.booksMenu()); }
    return sidebarMenus;
  }




}
