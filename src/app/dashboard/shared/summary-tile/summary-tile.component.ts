import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-summary-tile',
  templateUrl: './summary-tile.component.html',
  styleUrls: ['./summary-tile.component.scss']
})
export class SummaryTileComponent implements OnInit {

  @Input () summaryFigure: string;
  @Input () summaryTitle: string;
  @Input () summaryDescription: string;

  constructor() { }

  ngOnInit(): void {
  }

}
