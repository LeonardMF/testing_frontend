import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import { SpeakService, ListenService } from 'speech-angular';
import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';
import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';
import { RasaNluService } from '../rasa-nlu/rasa-nlu.service';
import { RasaNluQuery } from '../rasa-nlu/rasa-nlu-query';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';
import { Testresult } from '../testresult';
import { RasaCoreQuery } from '../rasa-core/rasa-core-query';
import { ResponseComponent } from '../response/response.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {

  @ViewChild(ResponseComponent)
  private responseComponent: ResponseComponent;

  wakeword = 'OK Google';
  prompt = 'Wie viel Uhr ist es?';

  speakButtonOn: boolean;
  errorFlag: boolean;
  errorText: string;
  messages = [];


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
    private rasaNluService: RasaNluService
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

  }

  ngOnDestroy(): void {

  }

  onSetWakeword(wakeword): void {
    this.wakeword = wakeword;
    console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.clear();
  }

  onStopSpeak(): void {
    this.responseComponent.startListen();
    this.ref.detectChanges();
  }

  setPrompt(): void {
    console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.clear();
  }

  onListenResult(result): void {
    const rasaCoreQuery = new RasaCoreQuery();
    rasaCoreQuery.text = result;
    // rasaNluQuery.project =  'current';
    this.rasaNluService.post(rasaCoreQuery).subscribe((rasaNluResponse: RasaNluResponse) => {
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
    this.responseComponent.listenResult = '';
    this.testResult = new Testresult;
    this.showResultFlag = false;
  }

}
