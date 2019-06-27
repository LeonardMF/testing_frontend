import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BotService, ActionService, ListenService } from 'speech-angular';

const TESTMOCK = `
# Testfall: 0.0.1
# Datum: 14.04.2019

DIALOG main

    STATE home
            SPEAK 2, Ok Google
            SPEAK 2, Wie wird das Wetter Morgen?
            ACTION startListen, Micro, start
            WAIT 8
            SPEAK 2, Alexa
            SPEAK 2, Wie wird das Wetter Morgen?
            ACTION startListen, Micro, start
            WAIT 8
`;

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {

  wakeword: string;
  wakeFlag =  false;
  prompt = 'Wie wird das Wetter Morgen?';
  listenResult: string;

  botButtonOn: boolean;
  errorFlag: boolean;
  errorText: string;
  messages = [];

  botParseEvent: any;
  botStartEvent: any;
  botStopEvent: any;
  botErrorEvent: any;
  botActionEvent: any;

  listenStartEvent: any;
  listenStopEvent: any;
  listenResultEvent: any;
  listenErrorEvent: any;

  constructor(private ref: ChangeDetectorRef,
              private botService: BotService,
              private actionService: ActionService,
              private listenService: ListenService) { }

  ngOnInit() {

    this.actionService.addFunction('startListen', () => this.startListen(), () => 0 );

    this.botParseEvent = this.botService.parseEvent.subscribe(() => {
      const message = 'Bot: parse';
      this.messages.push(message);
      this.ref.detectChanges();
    });

    this.botService.parse(TESTMOCK);

    this.botActionEvent = this.botService.actionEvent.subscribe((aAction) => {
      const message = 'Action: ' + aAction.action;
      this.messages.push(message);
      this.ref.detectChanges();
    });

    this.botStartEvent = this.botService.startEvent.subscribe(() => {
      const message = 'Bot: start';
      this.messages.push(message);
      this.botButtonOn = true;
      this.ref.detectChanges();
    });

    this.botStopEvent = this.botService.stopEvent.subscribe(() => {
      const message = 'Bot: stop';
      this.messages.push(message);
      this.botButtonOn = false;
      this.ref.detectChanges();
    });

    this.botErrorEvent = this.botService.errorEvent.subscribe( (error) => {
      this.errorFlag = true;
      this.errorText = 'Error on Bot: ' + error.message ;
      this.ref.detectChanges();
    });


    this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
      const message = 'Result: ' + aText;
      this.listenResult = aText;
      this.messages.push(message);
      this.ref.detectChanges();
    });

    this.listenStartEvent = this.listenService.startEvent.subscribe(() => {
      const message = 'Listen: start';
      this.messages.push(message);
      this.ref.detectChanges();
    });

    this.listenStopEvent = this.listenService.stopEvent.subscribe(() => {
      const message = 'Listen: stop';
      this.messages.push(message);
      this.ref.detectChanges();
    });

    this.listenErrorEvent = this.listenService.errorEvent.subscribe( (error) => {
      this.errorFlag = true;
      this.errorText = 'Error on Listen: ' + error.message ;
      this.ref.detectChanges();
    });

  }

  onSetWakeword(wakeword): void {
    this.wakeword = wakeword;
    console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.listenResult = '';
  }

  startBot(): void {
    this.botService.start();
  }

  stopBot(): void {
    this.botService.stop();
  }

  startListen(): number {
    console.log('startListen');
    return this.listenService.start();
  }



}
