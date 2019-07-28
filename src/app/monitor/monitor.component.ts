import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ViewChildren, QueryList, Renderer2} from '@angular/core';

import { TestDialog } from '../test-dialog';
import { Criteria } from '../criteria/criteria';
import { TestResult } from '../test-result';
import { TestTurn } from '../test-turn';

import { TestCaseComponent } from '../test-case/test-case.component';
import { BackendService } from '../backend.service';
import { TEST_TIME,
         TEST_TIME_CITY,
         TEST_TIME_DIALOG} from '../mock-test-dialog';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  @ViewChild(TestCaseComponent)
  private testCaseComponent: TestCaseComponent;

  testDialog: TestDialog;
  dialogName: string;
  testTurns: TestTurn[] = [];
  testTurnIndex = 0;

  wakeword: string;
  prompt: string;
  testCriteria: Criteria;

  constructor( private ref: ChangeDetectorRef,
               private backendService: BackendService ) {}

  ngOnInit() {

    this.testDialog = TEST_TIME_DIALOG;

    console.log(this.testDialog);
    // console.log(JSON.stringify(this.testDialog));
    // this.backendService.addDialog(this.testDialog).subscribe((data: any) => {
    //   console.log(data);
    // });
    this.dialogName = this.testDialog.name;
    this.testTurns = this.testDialog.turns;
    this.setTestTurn(this.testTurns[this.testTurnIndex]);
  }

  setTestTurn(testCase): void {
    this.wakeword = testCase.wakeword;
    this.prompt = testCase.prompt;
    this.testCriteria = testCase.testCriteria;
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

  clear(): void {
    this.testCaseComponent.clear();
  }

  save(): void {
    // write result to DB
    const testresult = new TestResult;

    testresult.wakeword = this.testCaseComponent.wakeword;
    testresult.prompt = this.testCaseComponent.prompt;
    testresult.response =  this.testCaseComponent.response;
    testresult.criteria = this.testCaseComponent.testCriteria;
    // testresult.result = this.testCaseComponent.testResult;
    this.backendService.addTestTurn(testresult).subscribe((data: any) => {
      console.log(data);
    });
  }

  validate(): void {
    this.testCaseComponent.validate();
  }

  next(): boolean {
    if (this.testCriteria.nextTurn === 'next') {
      this.clear();
      this.testTurnIndex += 1;
      // console.log((this.testTurns[this.testTurnIndex]));
      if (this.testTurns[this.testTurnIndex]) {
        this.setTestTurn(this.testTurns[this.testTurnIndex]);
        this.ref.detectChanges();
        return true;
      }
    }
    return false;
  }

  back(): void {
    this.clear();
    this.testTurnIndex = 0;
    if (this.testTurns[this.testTurnIndex]) {
      this.setTestTurn(this.testTurns[this.testTurnIndex]);
      this.ref.detectChanges();
    }
  }
}
