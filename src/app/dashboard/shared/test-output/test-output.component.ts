import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-test-output',
  templateUrl: './test-output.component.html',
  styleUrls: ['./test-output.component.scss']
})
export class TestOutputComponent implements OnInit {

  @Input () musicianName: string | undefined;
  @Output() newMusicianEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addNewArtist(val: string) {
    this.newMusicianEvent.emit(val);
  }
}
