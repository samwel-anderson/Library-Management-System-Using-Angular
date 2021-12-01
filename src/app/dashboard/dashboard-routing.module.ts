import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultDashboardComponent} from './default-dashboard/default-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'default',  pathMatch: 'full', },
  { path: 'default', component: DefaultDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
