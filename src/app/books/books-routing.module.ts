import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultDashboardComponent} from '../dashboard/default-dashboard/default-dashboard.component';
import {IndexComponent} from './index/index.component';
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';
import {ViewComponent} from './view/view.component';

const routes: Routes = [
  { path: '',  redirectTo: 'index',  pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'create', component: CreateComponent },
  { path: ':bookId/view', component: ViewComponent },
  { path: ':bookId/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
