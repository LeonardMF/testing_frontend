import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { SpeakService, ListenService } from 'speech-angular';
import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';
import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';
import { RasaNluService } from '../rasa-nlu/rasa-nlu.service';
import { RasaNluQuery } from '../rasa-nlu/rasa-nlu-query';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';
import { Testresult } from '../testresult';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {

  wakeword: string;
  wakeFlag =  false;
  prompt = 'Wie viel Uhr ist es?';

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


  constructor(
    private ref: ChangeDetectorRef,
    private speakService: SpeakService,
    private rasaNluService: RasaNluService,
    private listenService: ListenService
  ) {
    setInterval(() => {
      this.time = new Date();
      this.hours = this.time.getHours();
      this.minutes = this.time.getMinutes();
      if (this.minutes <= 10) {
        this.minutesString = '0' + this.minutes.toString();
      } else {
        this.minutesString = this.minutes.toString();
      }
    }, 1);
   }

  ngOnInit() {

    this.clear();

    this.speakService.format = 'wav';

    this.speakStartEvent = this.speakService.startEvent.subscribe( () => {
      const message = 'Speak: start';
      this.speakButtonOn = true;
      this.messages.push(message);
      this.ref.detectChanges();
    });

    this.speakStopEvent = this.speakService.stopEvent.subscribe( () => {
      const message = 'Speak: stop';
      this.speakButtonOn = false;
      this.messages.push(message);
      if (this.wakeFlag) {
        this.speakService.setAudioOff();
        this.startSpeak();
      } else {
        this.startListen();
      }
      this.ref.detectChanges();
    });

    this.speakErrorEvent = this.speakService.errorEvent.subscribe( (error) => {
      this.errorFlag = true;
      this.errorText = 'Error on Speak: ' + error.message ;
      this.ref.detectChanges();
    });

    this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
      const message = 'Response: ' + aText;
      this.listenResult = aText;
      this.messages.push(message);
      this.sendRequest();
      this.ref.detectChanges();
    });

    this.listenStartEvent = this.listenService.startEvent.subscribe(() => {
      const message = 'Listen: start';
      this.messages.push(message);
      this.listenButtonOn = true;
      this.ref.detectChanges();
    });

    this.listenStopEvent = this.listenService.stopEvent.subscribe(() => {
      const message = 'Listen: stop';
      this.messages.push(message);
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

  setWakeword(): void {
    console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.clear();
  }

  setPrompt(): void {
    console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.clear();
  }

  startSpeak(): void {
    this.clear();
    if (this.wakeword === 'Hey Siri') {
      if (this.wakeFlag === false) {
        const message = 'Wakeword: ' + this.wakeword;
        this.messages.push(message);
        this.wakeFlag = true;
        this.speakService.setAudioOn();
        this.speakService.file = 'HeySiri';
        this.speakService.start();
      } else {
        this.wakeFlag = false;
        const message = 'Prompt: ' + this.prompt;
        this.messages.push(message);
        this.speakService.text = this.prompt;
        this.speakService.start();
      }
    } else {
      const testprompt = this.wakeword + '. ' + this.prompt;
      this.speakService.text = testprompt;
      this.speakService.start();
      const message = 'Wakeword + Prompt: ' + testprompt;
      this.messages.push(message);
      this.ref.detectChanges();
    }
  }

  stopSpeak(): void {
    this.speakService.stop();
  }

  startListen(): void {
    this.listenService.start();
  }

  stopListen(): void {
    this.listenService.stop();
  }

  sendRequest(): void {
    let rasaNluQuery = new RasaNluQuery();
    rasaNluQuery.query = this.listenResult;
    rasaNluQuery.project =  'current';
    this.rasaNluService.post(rasaNluQuery).subscribe((rasaNluResponse: RasaNluResponse) => {
      this.intent = rasaNluResponse.intent;
      this.entity = rasaNluResponse.entities[0];
      this.testResult.intentflag = this.checkIntent();
      this.testResult.confidenceflag = this.checkConfidence();
      this.testResult.entityflag = this.checkEntity();
      this.testResult.valueflag = this.checkTimeValue();
      this.showResultFlag = true;
      this.ref.detectChanges();
    });
  }

  checkEntity(): boolean {
    if (this.entity) {
      console.log('Found entity: ' + this.entity.entity);

      if (this.entity.entity === 'time') {
        console.log('Entity OK!');
        this.testResult.message = 'Responded time: ' + this.calculateTimeValue();
        this.testResult.valueflag = this.checkTimeValue();
        return true;
      } else {
        this.testResult.message = 'No time responded!';
        return false;
      }
    } else {
      this.testResult.message = 'No Entity responded!';
      return false;
    }
  }

  calculateTimeValue(): string {
    this.devicetime = new Date(this.entity.value);
    this.devicehours = this.devicetime.getHours();
    this.deviceminutes = this.devicetime.getMinutes();
    if (this.deviceminutes <= 10) {
      this.deviceminutesString = '0' + this.minutes.toString();
    } else {
      this.deviceminutesString = this.minutes.toString();
    }
    return this.devicehours + ':' + this.deviceminutesString;
  }

  checkTimeValue(): boolean {
    if (this.hours === this.devicehours && this.minutes === this.deviceminutes) {
      return true;
     } else {
      return false;
    }
  }

  checkConfidence(): boolean {
    if (this.intent && this.intent.confidence >= 0.75) {
      return true;
    }
    return false;
  }

  checkIntent(): boolean {
    if (this.intent && this.intent.name === 'getTime') {
      return true;
    }
    return false;
  }

  clear(): void {
    this.intent = new RasaNluIntent;
    this.entity = new RasaNluEntity;
    this.listenResult = '';
    this.testResult = new Testresult;
    this.showResultFlag = false;
  }

}
