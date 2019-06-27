import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-wakeword',
  templateUrl: './wakeword.component.html',
  styleUrls: ['./wakeword.component.css']
})
export class WakewordComponent implements OnInit {

  @Input() wakeword: string;
  @Output() setWakewordOn = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  setWakeword(): void {
    this.setWakewordOn.emit(this.wakeword);
  }

}
