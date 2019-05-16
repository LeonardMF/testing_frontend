import { Component, OnInit, Input } from '@angular/core';
import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';

@Component({
  selector: 'app-rasa-nlu-intent-rank',
  templateUrl: './rasa-nlu-intent-rank.component.html',
  styleUrls: ['./rasa-nlu-intent-rank.component.css']
})
export class RasaNluIntentRankComponent implements OnInit {

  @Input() intentRank: RasaNluIntent[];

  constructor() { }

  ngOnInit() {
  }

}
