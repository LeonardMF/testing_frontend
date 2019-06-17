import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SpeakService, ListenService } from 'speech-angular';
import { RasaCoreService } from '../rasa-core/rasa-core.service';
import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';
import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';
import { Testresult } from '../testresult';
import { RasaCoreActionScore } from '../rasa-core/rasa-core-action-score';
import { RasaCoreQuery } from '../rasa-core/rasa-core-query';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';
import { RasaCoreMessage } from '../rasa-core/rasa-core-message';
import { RasaCoreAction } from '../rasa-core/rasa-core-action';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.css']
})
export class TestDialogComponent implements OnInit, OnDestroy {

  listenResult: string;

  listenButtonOn: boolean;
  speakButtonOn: boolean;
  errorFlag: boolean;
  errorText: string;
  messages = [];

  speakStartEvent: any;
  speakStopEvent: any;
  speakErrorEvent: any;

  listenStartEvent: any;
  listenStopEvent: any;
  listenResultEvent: any;
  listenErrorEvent: any;

  intent: RasaNluIntent;
  entity: RasaNluEntity;

  time: Date = new Date();
  hours: number;
  minutes: number;
  minutesString: string;

  devicetime: Date;
  devicehours: number;
  deviceminutes: number;
  deviceminutesString: string;

  showResultFlag = false;
  testResult: Testresult;

  text = 'Start Test';
  action: string;
  score: number;
  actionScore = new RasaCoreActionScore();
  rasaCoreQuery = new RasaCoreQuery();
  rasaNluResponse = new RasaNluResponse();
  rasaCoreMessage = new RasaCoreMessage();
  rasaCoreActionScores = [];
  rasaCoreAction = new RasaCoreAction();

  testflag = false;

  constructor(private ref: ChangeDetectorRef,
              private speakService: SpeakService,
              private rasaCoreService: RasaCoreService,
              private listenService: ListenService) { }

  ngOnInit() {

    this.speakStartEvent = this.speakService.startEvent.subscribe( () => {
      // const message = 'Speak: start';
      this.speakButtonOn = true;
      // this.messages.push(message);
      this.ref.detectChanges();
    });

    this.speakStopEvent = this.speakService.stopEvent.subscribe( () => {
      // const message = 'Speak: stop';
      this.speakButtonOn = false;
      // this.messages.push(message);
      this.startListen();
      this.ref.detectChanges();
    });

    this.speakErrorEvent = this.speakService.errorEvent.subscribe( (error) => {
      this.errorFlag = true;
      this.errorText = 'Error on Speak: ' + error.message ;
      this.ref.detectChanges();
    });

    this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
      const message = 'Assistant: ' + aText;
      this.listenResult = aText;
      this.messages.push(message);
      // this.sendRequest();
      console.log(this.rasaNluResponse.intent.name);
      this.parseModel(aText);
      // this.predictAction();
      // if (this.testflag) {
      //   this.executeAction('utter_lissabon');
      // }
      this.ref.detectChanges();
    });

    this.listenStartEvent = this.listenService.startEvent.subscribe(() => {
      // const message = 'Listen: start';
      // this.messages.push(message);
      this.listenButtonOn = true;
      this.ref.detectChanges();
    });

    this.listenStopEvent = this.listenService.stopEvent.subscribe(() => {
      // const message = 'Listen: stop';
      // this.messages.push(message);
      this.listenButtonOn = false;
      this.ref.detectChanges();
    });

    this.listenErrorEvent = this.listenService.errorEvent.subscribe( (error) => {
      this.errorFlag = true;
      this.errorText = 'Error on Listen: ' + error.message ;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.speakErrorEvent.unsubscribe();
    this.speakStartEvent.unsubscribe();
    this.speakStopEvent.unsubscribe();
    this.listenStartEvent.unsubscribe();
    this.listenStopEvent.unsubscribe();
    this.listenResultEvent.unsubscribe();
    this.listenErrorEvent.unsubscribe();
  }

  stopSpeak(): void {
    this.speakService.stop();
  }

  startListen(): void {
    this.executeAction('action_listen');
    this.listenService.start();
  }

  stopListen(): void {
    this.listenService.stop();
  }


  startSpeak(prompt: string): void {
    // this.clear();

    this.speakService.text = prompt;
    this.speakService.start();
    // const message = 'Wakeword + Prompt: ' + prompt;
    // this.messages.push(message);
    this.ref.detectChanges();

  }

  clear(): void {
    // this.intent = new RasaNluIntent;
    // this.entity = new RasaNluEntity;
    // this.listenResult = '';
    // this.testResult = new Testresult;
    // this.showResultFlag = false;
    this.executeAction('action_restart');
    this.messages = [];
    this.ref.detectChanges();
  }

  start(): void {
    this.parseModel('Start Test');
    this.predictAction();
    this.executeAction('utter_time');
  }

  parseModel(text): void {
    this.rasaCoreQuery.text = text;
    this.rasaCoreService.parseModel(this.rasaCoreQuery).subscribe((rasaNluResponse: RasaNluResponse) => {
      this.rasaNluResponse = rasaNluResponse;
      this.messages.push('NLU: ' + this.rasaNluResponse.intent.name);
      if (this.rasaNluResponse.intent.name === 'getTime'){
        this.testflag = true;
        this.executeAction('utter_lissabon');
      } else {
        this.testflag = false;
      }
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


  executeAction(action: string): void {
    this.rasaCoreAction.name = action;
    this.rasaCoreAction.policy = 'string';
    this.rasaCoreAction.confidence = this.actionScore.score;
    console.log(this.rasaCoreAction);
    this.rasaCoreService.executeAction(this.rasaCoreAction).subscribe((any) => {
      if (any.messages[0]) {
        this.startSpeak(any.messages[0].text);
        this.messages.push('Bot: ' + any.messages[0].text);
      }
    });
  }

}
