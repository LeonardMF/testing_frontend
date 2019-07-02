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
import { TestTurnComponent } from '../test-turn/test-turn.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {
  @ViewChild(TestTurnComponent)
  private testTurnComponent: TestTurnComponent;

  // Set default values
  @Input() wakeword = 'OK Google';
  @Input() prompt = 'Wie viel Uhr ist es?';

  testCriteria: TestCriteria = new TestCriteria();

  constructor(
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.clear();

    this.testCriteria.intent = 'getTime';
    this.testCriteria.confidence = 0.75;

    const timeEntity = new TestCriteriaEntity();
    timeEntity.name = 'time';
    timeEntity.confidence = 0.75;
    timeEntity.value = 'checkTime';
    timeEntity.flag = false;

    const cityEntity = new TestCriteriaEntity();
    cityEntity.name = 'city';
    cityEntity.confidence = 0.75;
    cityEntity.value = 'lissabon';
    cityEntity.flag = false;

    this.testCriteria.entities.push(timeEntity);
    this.testCriteria.entities.push(cityEntity);
  }

  ngOnDestroy(): void {

  }

  clear(): void {
    this.testTurnComponent.clear();
  }

  validate(): void {
    this.testTurnComponent.checkIntent();
    this.testTurnComponent.checkConfidence();
    this.testTurnComponent.checkEntities();
  }
}
