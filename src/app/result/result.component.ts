import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, Input } from '@angular/core';

import { Result } from '../result/result';
import { Criteria } from '../criteria/criteria';
import { RasaNluIntentComponent } from '../rasa-nlu-intent/rasa-nlu-intent.component';
import { RasaNluEntityComponent } from '../rasa-nlu-entity/rasa-nlu-entity.component';
import { CriteriaEntity } from '../criteria-entity/criteria-entity';
import { CriteriaEntityComponent } from '../criteria-entity/criteria-entity.component';


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

  @ViewChildren(CriteriaEntityComponent)
  private missingEntityComponents: QueryList<CriteriaEntityComponent>;

  @Input() result: Result;
  @Input() criteria: Criteria;

  missingEntities: CriteriaEntity[] = [];
  next: string;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    // this.result = FULL_RESULT;
    // this.criteria = TIME_CITY_END_CRITERIA;
    // this.result.intent.nextTurn = this.criteria.nextTurn;
  }

  validate(): boolean {
    this.result.intent.nextTurn = this.criteria.nextTurn;
    const intentFlag = this.checkIntent();
    const confidenceFlag = this.checkConfidence();

    const checkedEntities = this.checkEntities();
    this.missingEntities = checkedEntities[0];
    const confidenceEntitiesFlag = checkedEntities[1];
    const valueEntitiesFlag = checkedEntities[2];


    this.ref.detectChanges();
    this.missingEntityComponents.forEach((mEC: CriteriaEntityComponent) => {
      mEC.setEntity('failed');
    });

    this.result.missingEntities = this.missingEntities;

    if ( intentFlag && confidenceFlag && this.missingEntities.length === 0 && confidenceEntitiesFlag && valueEntitiesFlag) {
      this.result.nextTurnFlag = true;
      this.showResult();
      return true;
    } else {
      this.result.nextTurnFlag = false;
      this.showResult();
      return false;
    }
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

  checkEntities(): [CriteriaEntity[], boolean, boolean] {
    let confidenceEntitiesFlag = true;
    let valueEntitiesFlag = true;

    const missingEntities: CriteriaEntity[] = [];

    this.criteria.entities.forEach( (criteriaEntity: CriteriaEntity) => {
      this.entityComponents.forEach( (e) => {

        // Check entity
        if (e.entity.entity === criteriaEntity.name) {
            e.entity.entityFlag = true;
            // Check entity confidence
            criteriaEntity.flag = true;
            if (e.entity.confidence >= criteriaEntity.minConfidence) {
              e.entity.confidenceFlag = true;
            } else {
              e.entity.confidenceFlag = false;
              confidenceEntitiesFlag = false;
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
              e.entity.valueFlag = true;
            } else {
              e.entity.valueFlag = false;
              valueEntitiesFlag = false;
            }
        }
      });
    });
    this.criteria.entities.forEach((criteriaEntity: CriteriaEntity) => {
      if (criteriaEntity.flag !== true) {
        missingEntities.push(criteriaEntity);
      }
    });
    return [missingEntities, confidenceEntitiesFlag, valueEntitiesFlag];
  }


  checkConfidence(): boolean {
    if (this.result.intent && this.result.intent.confidence >= this.criteria.minConfidence) {
      // console.log('Confidence ok!');
      this.result.intent.confidenceFlag = true;
      return true;
    } else {
      this.result.intent.confidenceFlag = false;
      return false;
    }
  }

  checkIntent(): boolean {
    if (this.result.intent.name) {
      if (this.result.intent.name === this.criteria.intent) {
        // console.log('Intent ok!');
        this.result.intent.nameFlag = true;
        return true;
      } else {
        this.result.intent.nameFlag = false;
      }
    }
    return false;
  }

  showResult(): void {

    if (this.result.intent.nameFlag) {
      this.resultIntentComponent.setIntent('passed');
    } else {
      this.resultIntentComponent.setIntent('failed');
    }

    if (this.result.intent.confidenceFlag) {
      this.resultIntentComponent.setConfidence('passed');
    } else {
      this.resultIntentComponent.setConfidence('failed');
    }

    if (this.result.nextTurnFlag) {
      this.resultIntentComponent.setNextTurn('passed');
    } else {
      this.resultIntentComponent.setNextTurn('failed');
    }

    this.entityComponents.forEach( (e) => {
      if (e.entity.entityFlag) {
          e.setEntity('passed');
          if (e.entity.confidenceFlag) {
            e.setConfidence('passed');
          } else {
            e.setConfidence('failed');
          }
          if (e.entity.valueFlag) {
            e.setValue('passed');
          } else {
            e.setValue('failed');
          }
      } else {
        e.setEntity('failed');
      }
    });
    this.ref.detectChanges();
  }
}
