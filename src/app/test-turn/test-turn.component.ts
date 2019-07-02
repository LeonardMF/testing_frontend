import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ViewChildren, QueryList, Renderer2} from '@angular/core';

import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';
import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';
import { RasaNluService } from '../rasa-nlu/rasa-nlu.service';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';



import { RasaCoreQuery } from '../rasa-core/rasa-core-query';
import { ResponseComponent } from '../response/response.component';
import { TestCriteria } from '../test-criteria';
import { RasaNluIntentComponent } from '../rasa-nlu-intent/rasa-nlu-intent.component';
import { RasaNluEntityComponent } from '../rasa-nlu-entity/rasa-nlu-entity.component';
import { TestCriteriaEntity } from '../test-criteria-entity';


@Component({
  selector: 'app-test-turn',
  templateUrl: './test-turn.component.html',
  styleUrls: ['./test-turn.component.css']
})
export class TestTurnComponent implements OnInit, OnDestroy {

  @ViewChild(ResponseComponent)
  private responseComponent: ResponseComponent;

  @ViewChild(RasaNluIntentComponent)
  private intentComponent: RasaNluIntentComponent;

  @ViewChildren(RasaNluEntityComponent)
  private entityComponents: QueryList<RasaNluEntityComponent>;

  // Set default values
  @Input() wakeword = 'OK Google';
  @Input() prompt = 'Wie viel Uhr ist es?';
  @Input() testCriteria: TestCriteria;

  title: string;
  description: string;

  errorFlag: boolean;
  errorText: string;
  messages = [];

  intent: RasaNluIntent;
  entity: RasaNluEntity;
  entities = [];

  constructor(
    private ref: ChangeDetectorRef,
    private rasaNluService: RasaNluService
  ) {}

  ngOnInit() {
    this.clear();
  }

  ngOnDestroy(): void {

  }

  onSetWakeword(wakeword): void {
    this.wakeword = wakeword;
    // console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.clear();
  }

  onStopSpeak(): void {
    this.responseComponent.startListen();
    this.ref.detectChanges();
  }

  setPrompt(): void {
    // console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.clear();
  }

  onListenResult(result): void {
    this.intent = new RasaNluIntent;
    this.entities = [];

    const rasaCoreQuery = new RasaCoreQuery();
    rasaCoreQuery.text = result;
    // rasaNluQuery.project =  'current';
    this.rasaNluService.post(rasaCoreQuery).subscribe((rasaNluResponse: RasaNluResponse) => {
      // console.log(rasaNluResponse);
      this.intent = rasaNluResponse.intent;

      this.entities = rasaNluResponse.entities;

      // this.validate()
      this.ref.detectChanges();
    });
  }

  checkTime(aTime): boolean {

    const devicetime = new Date(aTime);
    const devicehours = devicetime.getHours();
    const deviceminutes = devicetime.getMinutes();

    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();

    if (hours === devicehours && minutes === deviceminutes) {
      return true;
     } else {
      return false;
    }
  }

  checkEntities(): void {
    this.testCriteria.entities.forEach( (testCriteriaEntity: TestCriteriaEntity) => {
      this.entityComponents.forEach( (e) => {

        // Check entity
        if (e.entity.entity === testCriteriaEntity.name) {
            e.setEntity('passed');
            testCriteriaEntity.flag = true;
            // Check entity confidence
            if (e.entity.confidence >= testCriteriaEntity.confidence) {
              e.setConfidence('passed');
            } else {
              e.setConfidence('failed');
            }

            let valueFlag = false;
            // Check entity value
            if (testCriteriaEntity.value === 'checkTime' ) {
              valueFlag = this.checkTime(e.entity.value);
            }

            if (testCriteriaEntity.value === e.entity.value) {
              valueFlag = true;
            }

            if (valueFlag) {
              e.setValue('passed');
            } else {
              e.setValue('failed');
            }
        }
      });
    });
  }


  checkConfidence(): boolean {
    if (this.intent && this.intent.confidence >= this.testCriteria.confidence) {
      // console.log('Confidence ok!');
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
        // console.log('Intent ok!');
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
    this.entities = [];
    this.responseComponent.listenResult = '';
  }

  validate(): void {
    this.checkIntent();
    this.checkConfidence();
    this.checkEntities();
  }
}
