import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RasaNluService } from './rasa-nlu.service';
import { RasaNluQuery } from './rasa-nlu-query';
import { RasaNluResponse } from './rasa-nlu-response';
import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';
import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';
import { RasaCoreQuery } from '../rasa-core/rasa-core-query';

@Component({
  selector: 'app-nlu',
  templateUrl: './rasa-nlu.component.html',
  styleUrls: ['./rasa-nlu.component.css']
})
export class RasaNluComponent implements OnInit {

  result = new RasaCoreQuery();
  response: String;
  intentButtonOn: boolean;

  intent: RasaNluIntent;
  intentRank: RasaNluIntent[];
  entities: RasaNluEntity[];

  constructor(private ref: ChangeDetectorRef,
              private rasaNluService: RasaNluService) { }

  ngOnInit() {
    this.result.text = 'Es ist 20 Uhr 10.';
    // this.result.project = 'current';
  }


  sendRequest(): void {
    console.log(this.result);

    this.rasaNluService.post(this.result).subscribe((rasaNluResponse: RasaNluResponse) => {
      console.log(rasaNluResponse);
      this.response = JSON.stringify(rasaNluResponse);
      this.intent = rasaNluResponse.intent;
      this.intentRank = rasaNluResponse.intent_ranking;
      this.entities = rasaNluResponse.entities;
      this.ref.detectChanges();
    });
  }

  stopRequest(): void {
  }

  getStatus(): void {
    // this.rasaNluService.getStatus().subscribe(() => {
    //   },  error => console.log('Error: ' + error.error.text));
  }

}
