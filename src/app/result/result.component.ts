import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { Result } from '../result/result';
import { Criteria } from '../criteria/criteria';
import { TEST_TIME_CITY_CRITERIA } from '../mock-test-criteria';
import { FULL_RESULT } from '../mock-result';
import { RasaNluIntentComponent } from '../rasa-nlu-intent/rasa-nlu-intent.component';
import { RasaNluEntityComponent } from '../rasa-nlu-entity/rasa-nlu-entity.component';
import { CriteriaEntity } from '../criteria-entity/criteria-entity';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @ViewChild(RasaNluIntentComponent)
  private resultIntentComponent: RasaNluIntentComponent;

  @ViewChildren(RasaNluEntityComponent)
  private entityComponents: QueryList<RasaNluEntityComponent>;

  result: Result;
  criteria: Criteria;

  constructor() { }

  ngOnInit() {
    this.result = FULL_RESULT;
    this.criteria = TEST_TIME_CITY_CRITERIA;
  }

  validate(): void {
    this.checkConfidence();
    this.checkIntent();
    this.checkEntities();
  }

  checkTime(aTime, aHour = 0): boolean {

    const devicetime = new Date(aTime);
    const devicehours = devicetime.getHours();
    const deviceminutes = devicetime.getMinutes();

    const time = new Date();
    const hours = time.getHours() - aHour;
    const minutes = time.getMinutes();

    if (hours === devicehours && minutes === deviceminutes) {
      return true;
     } else {
      return false;
    }
  }

  checkEntities(): void {
    this.criteria.entities.forEach( (criteriaEntity: CriteriaEntity) => {
      this.entityComponents.forEach( (e) => {

        // Check entity
        if (e.entity.entity === criteriaEntity.name) {
            e.setEntity('passed');
            criteriaEntity.flag = true;
            // Check entity confidence
            if (e.entity.confidence >= criteriaEntity.minConfidence) {
              e.setConfidence('passed');
            } else {
              e.setConfidence('failed');
            }

            let valueFlag = false;
            // Check entity value
            if (criteriaEntity.value === 'checkTime' ) {
              valueFlag = this.checkTime(e.entity.value);
            }
            if (criteriaEntity.value === 'checkTime-1' ) {
              valueFlag = this.checkTime(e.entity.value, 1);
            }

            if (criteriaEntity.value === e.entity.value) {
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
    if (this.result.intent && this.result.intent.confidence >= this.criteria.minConfidence) {
      // console.log('Confidence ok!');
      this.resultIntentComponent.setConfidence('passed');
      return true;
    } else {
      this.resultIntentComponent.setConfidence('failed');
      return false;
    }
  }

  checkIntent(): boolean {
    if (this.result.intent.name) {
      if (this.result.intent.name === this.criteria.intent) {
        // console.log('Intent ok!');
        this.resultIntentComponent.setIntent('passed');
        return true;
      } else {
        this.resultIntentComponent.setIntent('failed');
      }
    }
    return false;
  }

}
