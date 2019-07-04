import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ViewChildren, QueryList, Renderer2} from '@angular/core';

import { TestDialog } from '../test-dialog';
import { TestCase } from '../test-case';
import { TestCriteria } from '../test-criteria';

import { TestCaseComponent } from '../test-case/test-case.component';

import { TEST_TIME,
         TEST_TIME_DIALOG,
         TEST_BVG } from '../mock-test-dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @ViewChild(TestCaseComponent)
  private testCaseComponent: TestCaseComponent;

  testDialog: TestDialog;
  dialogName: string;
  testCases: TestCase[] = [];
  testCaseIndex = 0;

  wakeword: string;
  prompt: string;
  testCriteria: TestCriteria;

  constructor( private ref: ChangeDetectorRef ) {}

  ngOnInit() {

  this.testDialog = TEST_BVG;

    this.dialogName = this.testDialog.name;
    this.testCases = this.testDialog.cases;
    this.setTestCase(this.testCases[this.testCaseIndex]);
  }

  setTestCase(testCase): void {
    this.wakeword = testCase.wakeword;
    this.prompt = testCase.prompt;
    this.testCriteria = testCase.testCriteria;
  }

  clear(): void {
    this.testCaseComponent.clear();
  }

  start(): void {
    this.testCaseComponent.speak();
  }

  onNluAnalyse(): void {
    this.validate();
    setTimeout(() => {
      if (this.next()) {
        this.start();
      }
    }, 2000);
  }

  validate(): void {
    this.testCaseComponent.checkIntent();
    this.testCaseComponent.checkConfidence();
    this.testCaseComponent.checkEntities();
  }

  next(): boolean {
    this.clear();
    this.testCaseIndex += 1;
    // console.log((this.testCases[this.testCaseIndex]));
    if (this.testCases[this.testCaseIndex]) {
      this.setTestCase(this.testCases[this.testCaseIndex]);
      this.ref.detectChanges();
      return true;
    }
    return false;
  }

  back(): void {
    this.clear();
    this.testCaseIndex = 0;
    if (this.testCases[this.testCaseIndex]) {
      this.setTestCase(this.testCases[this.testCaseIndex]);
      this.ref.detectChanges();
    }
  }
}
