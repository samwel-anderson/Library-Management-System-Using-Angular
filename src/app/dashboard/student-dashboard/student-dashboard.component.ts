import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  musicians = ['Ed Sheeran', 'Prince Indah', 'Emma Jalamo'];
  name: string | undefined;

  addArtists(newMusician: any) {
    this.name = newMusician;
    this.musicians.push(newMusician);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
