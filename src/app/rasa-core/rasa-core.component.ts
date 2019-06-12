import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RasaNluService } from '../rasa-nlu/rasa-nlu.service';
import { RasaCoreService } from './rasa-core.service';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';
import { RasaCoreQuery } from './rasa-core-query';
import { RasaCoreMessage } from './rasa-core-message';
import { RasaCoreAction } from './rasa-core-action';

@Component({
  selector: 'app-rasa-core',
  templateUrl: './rasa-core.component.html',
  styleUrls: ['./rasa-core.component.css']
})
export class RasaCoreComponent implements OnInit {

  text = 'Hello';
  messages = [];
  rasaCoreQuery = new RasaCoreQuery();
  rasaNluResponse = new RasaNluResponse();
  rasaCoreMessage = new RasaCoreMessage();
  rasaCoreAction = new RasaCoreAction();

  constructor(private ref: ChangeDetectorRef,
              private rasaCoreService: RasaCoreService) { }

  ngOnInit() {
  }

  send(): void {
    // console.log(this.text);
    this.messages.push('User: ' + this.text);

    this.rasaCoreQuery.text = this.text;


    this.rasaCoreService.parseModel(this.rasaCoreQuery).subscribe((rasaNluResponse: RasaNluResponse) => {

      this.rasaNluResponse = rasaNluResponse;

      this.rasaCoreMessage.text = this.text;
      this.rasaCoreMessage.sender = 'user';
      this.rasaCoreMessage.parse_data = this.rasaNluResponse;

      this.rasaCoreService.addMessage(this.rasaCoreMessage).subscribe((any) => {

        this.rasaCoreService.predictAction().subscribe((any) => {
          this.rasaCoreAction.name = any.scores[0].action;
          if (this.rasaCoreAction.name === 'action_listen'){
            this.rasaCoreAction.name = any.scores[1].action;
          }
          this.rasaCoreAction.policy = 'string';
          this.rasaCoreAction.confidence = any.confidence;
          console.log(this.rasaCoreAction);
          this.rasaCoreService.executeAction(this.rasaCoreAction).subscribe((any) => {

            console.log(any);
            this.messages.push('Bot: ' + any.messages[0].text);
          });
        });
      });
    });
  }

  restart(): void {
    this.rasaCoreAction = new RasaCoreAction();
    this.rasaCoreAction.name = 'action_restart';
    this.rasaCoreService.executeAction(this.rasaCoreAction).subscribe((any) => {

      console.log(any);

    });

    this.messages = [];

  }

}
