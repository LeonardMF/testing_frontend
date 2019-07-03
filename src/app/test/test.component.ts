import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ViewChildren, QueryList, Renderer2} from '@angular/core';

import { TestCaseComponent } from '../test-case/test-case.component';
import { TESTTIMECASE } from '../mock-test-case';
import { TestCriteria } from '../test-criteria';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {
  @ViewChild(TestCaseComponent)
  private testCaseComponent: TestCaseComponent;

  // Set default values
  wakeword: string;
  prompt: string;
  testCriteria: TestCriteria;

  constructor(
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.wakeword = TESTTIMECASE.wakeword;
    this.prompt = TESTTIMECASE.prompt;
    this.testCriteria = TESTTIMECASE.testCriteria;

  }

  ngOnDestroy(): void {

  }

  clear(): void {
    this.testCaseComponent.clear();
  }

  validate(): void {
    this.testCaseComponent.checkIntent();
    this.testCaseComponent.checkConfidence();
    this.testCaseComponent.checkEntities();
  }
}
