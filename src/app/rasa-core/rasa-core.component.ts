import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RasaNluService } from '../rasa-nlu/rasa-nlu.service';
import { RasaCoreService } from './rasa-core.service';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';
import { RasaCoreQuery } from './rasa-core-query';
import { RasaCoreMessage } from './rasa-core-message';
import { RasaCoreAction } from './rasa-core-action';
import { RasaCoreActionScore } from './rasa-core-action-score';

@Component({
  selector: 'app-rasa-core',
  templateUrl: './rasa-core.component.html',
  styleUrls: ['./rasa-core.component.css']
})
export class RasaCoreComponent implements OnInit {

  text = 'Alexa testen';
  messages = [];
  action: string;
  score: number;
  actionScore = new RasaCoreActionScore();
  rasaCoreQuery = new RasaCoreQuery();
  rasaNluResponse = new RasaNluResponse();
  rasaCoreMessage = new RasaCoreMessage();
  rasaCoreActionScores = [];
  rasaCoreAction = new RasaCoreAction();

  constructor(private ref: ChangeDetectorRef,
              private rasaCoreService: RasaCoreService) { }

  ngOnInit() {
  }

  parseModel(text): void {
    this.rasaCoreQuery.text = text;
    this.rasaCoreService.parseModel(this.rasaCoreQuery).subscribe((rasaNluResponse: RasaNluResponse) => {
      this.rasaNluResponse = rasaNluResponse;
      this.messages.push('NLU: ' + this.rasaNluResponse.intent.name);
      this.addMessage(text, 'user', rasaNluResponse);
    });
  }

  addMessage(text: string, sender: string, parse_data: RasaNluResponse): void {
    this.rasaCoreMessage.text = text;
    this.rasaCoreMessage.sender = sender;
    this.rasaCoreMessage.parse_data = parse_data;

    this.rasaCoreService.addMessage(this.rasaCoreMessage).subscribe((any) => {
      this.predictAction();
      this.ref.detectChanges();
    });
  }

  predictAction(): void {
    this.rasaCoreActionScores = [];

    this.rasaCoreService.predictAction().subscribe((any) => {
      this.rasaCoreActionScores = any.scores;
      this.actionScore = this.rasaCoreActionScores[0];
      this.action = this.actionScore.action;
    });
  }

  setAction(): void {
    this.actionScore = this.rasaCoreActionScores.find(actionScore => actionScore.action === this.action);
  }

  executeAction(): void {
    this.rasaCoreAction.name = this.action;
    this.rasaCoreAction.policy = 'string';
    this.rasaCoreAction.confidence = this.actionScore.score;
    console.log(this.rasaCoreAction);
    this.rasaCoreService.executeAction(this.rasaCoreAction).subscribe((any) => {
      if (any.messages[0]) {
        this.messages.push('Bot: ' + any.messages[0].text);
      }
    });
  }

  send(): void {
    this.messages.push('User: ' + this.text);
    this.parseModel(this.text);
  }

  // chat(): void {
  //   // console.log(this.text);
  //   this.messages.push('User: ' + this.text);

  //   this.rasaCoreQuery.text = this.text;


  //   this.rasaCoreService.parseModel(this.rasaCoreQuery).subscribe((rasaNluResponse: RasaNluResponse) => {

  //     this.rasaNluResponse = rasaNluResponse;

  //     this.rasaCoreMessage.text = this.text;
  //     this.rasaCoreMessage.sender = 'user';
  //     this.rasaCoreMessage.parse_data = this.rasaNluResponse;

  //     this.rasaCoreService.addMessage(this.rasaCoreMessage).subscribe((any) => {

  //       this.rasaCoreService.predictAction().subscribe((any) => {
  //         this.predictAction();
  //         this.rasaCoreAction.name = any.scores[0].action;
  //         if (this.rasaCoreAction.name === 'action_listen'){
  //           this.rasaCoreAction.name = any.scores[1].action;
  //         }
  //         this.rasaCoreAction.policy = 'string';
  //         this.rasaCoreAction.confidence = any.confidence;
  //         console.log(this.rasaCoreAction);
  //         this.rasaCoreService.executeAction(this.rasaCoreAction).subscribe((any) => {

  //           if (any.messages[0].text) {
  //             this.messages.push('Bot: ' + any.messages[0].text);
  //           }
  //         });
  //       });
  //     });
  //   });
  // }

  clear(): void {
    this.rasaCoreAction = new RasaCoreAction();
    this.rasaCoreAction.name = 'action_restart';
    this.rasaCoreService.executeAction(this.rasaCoreAction).subscribe((any) => {
      console.log(any);
    });

    this.messages = [];

  }

}
