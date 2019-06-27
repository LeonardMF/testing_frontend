import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wakeword',
  templateUrl: './wakeword.component.html',
  styleUrls: ['./wakeword.component.css']
})
export class WakewordComponent implements OnInit {

  wakeword: string;
  @Output() setWakewordOn = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.wakeword = 'Hey Google';
  }

  setWakeword(): void {
    this.setWakewordOn.emit(this.wakeword);
  }

}
