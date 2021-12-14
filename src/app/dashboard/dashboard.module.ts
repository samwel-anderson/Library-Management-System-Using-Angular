import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { SummaryTileComponent } from './shared/summary-tile/summary-tile.component';
import { TestOutputComponent } from './shared/test-output/test-output.component';


@NgModule({
  declarations: [
    DefaultDashboardComponent,
    StudentDashboardComponent,
    SummaryTileComponent,
    TestOutputComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
