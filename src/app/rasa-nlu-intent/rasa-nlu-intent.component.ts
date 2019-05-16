import { Component, OnInit, Input } from '@angular/core';
import { RasaNluIntent } from './rasa-nlu-intent';

@Component({
  selector: 'app-rasa-nlu-intent',
  templateUrl: './rasa-nlu-intent.component.html',
  styleUrls: ['./rasa-nlu-intent.component.css']
})
export class RasaNluIntentComponent implements OnInit {

  @Input() intent: RasaNluIntent;

  constructor() { }

  ngOnInit() {
  }

}
