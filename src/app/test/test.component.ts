import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ViewChildren, QueryList, Renderer2} from '@angular/core';

import { TestCriteria } from '../test-criteria';
import { TestCriteriaEntity } from '../test-criteria-entity';
import { TestTurnComponent } from '../test-turn/test-turn.component';
import { TESTTIMECITYCRITERIA } from '../mock-test-criteria';

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
    this.testCriteria = TESTTIMECITYCRITERIA;

    // this.testCriteria.intent = 'getTime';
    // this.testCriteria.confidence = 0.75;

    // const timeEntity = new TestCriteriaEntity();
    // timeEntity.name = 'time';
    // timeEntity.confidence = 0.75;
    // timeEntity.value = 'checkTime';
    // timeEntity.flag = false;

    // const cityEntity = new TestCriteriaEntity();
    // cityEntity.name = 'city';
    // cityEntity.confidence = 0.75;
    // cityEntity.value = 'lissabon';
    // cityEntity.flag = false;

    // this.testCriteria.entities.push(timeEntity);
    // this.testCriteria.entities.push(cityEntity);
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
