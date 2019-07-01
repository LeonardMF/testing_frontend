import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ViewChildren, QueryList, Renderer2} from '@angular/core';

import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';
import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';
import { RasaNluService } from '../rasa-nlu/rasa-nlu.service';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';



import { Testresult } from '../testresult';
import { RasaCoreQuery } from '../rasa-core/rasa-core-query';
import { ResponseComponent } from '../response/response.component';
import { TestCriteria } from '../test-criteria';
import { RasaNluIntentComponent } from '../rasa-nlu-intent/rasa-nlu-intent.component';
import { RasaNluEntityComponent } from '../rasa-nlu-entity/rasa-nlu-entity.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {

  @ViewChild(ResponseComponent)
  private responseComponent: ResponseComponent;

  @ViewChild(RasaNluIntentComponent)
  private intentComponent: RasaNluIntentComponent;

  @ViewChildren(RasaNluEntityComponent)
  private entityComponents: QueryList<RasaNluEntityComponent>;

  // Set default values
  @Input() wakeword = 'OK Google';
  @Input() prompt = 'Wie viel Uhr ist es?';
  // @Input() testCriteria: TestCriteria;

  testCriteria: TestCriteria = new TestCriteria();


  errorFlag: boolean;
  errorText: string;
  messages = [];


  intent: RasaNluIntent;
  entity: RasaNluEntity;
  entities = [];

  time: Date = new Date();
  hours: number;
  minutes: number;
  minutesString: string;

  devicetime: Date;
  devicehours: number;
  devicehoursString: string;
  deviceminutes: number;
  deviceminutesString: string;

  showResultFlag = false;
  testResult: Testresult;


  constructor(
    private ref: ChangeDetectorRef,
    private renderer: Renderer2,
    private rasaNluService: RasaNluService
  ) {
    setInterval(() => {
      this.time = new Date();
      this.hours = this.time.getHours();
      this.minutes = this.time.getMinutes();
      if (this.minutes < 10) {
        this.minutesString = '0' + this.minutes.toString();
      } else {
        this.minutesString = this.minutes.toString();
      }
    }, 1);
   }

  ngOnInit() {

    this.clear();
    this.testCriteria.intent = 'getTime';
    this.testCriteria.confidence = 0.75;
    this.testCriteria.entity = 'time';
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
      console.log(rasaNluResponse);
      this.intent = rasaNluResponse.intent;

      this.entities = rasaNluResponse.entities;

      // this.validate()
      this.ref.detectChanges();
    });
  }

  checkEntity(): void {
    console.log('Check Entity!');

    //TODO: Loop over all Entities in Tescriteria
    this.entityComponents.forEach( (e) => {
      console.log(e.entity.entity);

      // Check entity
      if (e.entity.entity === this.testCriteria.entity) {
          e.setEntity('passed');

          // Check entity confidence
          if (e.entity.confidence >= this.testCriteria.confidence){
            e.setConfidence('passed');
          } else {
            e.setConfidence('failed');
          }

          // Check entity value
          const value = this.calculateTimeValue(e.entity.value);
          if (this.checkTimeValue()){
            e.setValue('passed');
          } else {
            e.setValue('failed');
          }
          // this.testResult.message = 'Responded time: ' + this.calculateTimeValue();
          // this.testResult.valueflag = this.checkTimeValue()
      }
    });
    this.testResult.message = 'No entitiy responded!';
  }

  calculateTimeValue(time): string {
    this.devicetime = new Date(time);
    this.devicehours = this.devicetime.getHours();
    this.deviceminutes = this.devicetime.getMinutes();

    if (this.deviceminutes < 10) {
      this.deviceminutesString = '0' + this.deviceminutes.toString();
    } else {
      this.deviceminutesString = this.deviceminutes.toString();
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
    if (this.intent && this.intent.confidence >= this.testCriteria.confidence) {
      console.log('Confidence ok!');
      this.intentComponent.setConfidence('passed');
      return true;
    } else {
      this.intentComponent.setConfidence('failed');
      return false;
    }
  }

  checkIntent(): boolean {
    if (this.intent.name) {
      if (this.intent.name === this.testCriteria.intent) {
        console.log('Intent ok!');
        this.intentComponent.setIntent('passed');
        return true;
      } else {
        this.intentComponent.setIntent('failed');
      }
    }
    return false;
  }

  clear(): void {
    this.intent = new RasaNluIntent;
    console.log(this.intent);
    this.entities = [];
    this.responseComponent.listenResult = '';
    this.testResult = new Testresult;
    this.showResultFlag = false;
  }

  validate(): void {
    this.testResult.intentflag = this.checkIntent();
    this.testResult.confidenceflag = this.checkConfidence();
    // this.testResult.entityflag =
    this.checkEntity();
    // this.testResult.valueflag = this.checkTimeValue();
    // this.showResultFlag = true;
  }
}
