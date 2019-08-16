import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ViewChildren, QueryList, Renderer2} from '@angular/core';

import { TestDialog } from '../test-dialog';
import { Criteria } from '../criteria/criteria';
import { TestResult } from '../test-result';
import { TestTurn } from '../test-turn/test-turn';

import { TestCaseComponent } from '../test-case/test-case.component';
import { BackendService } from '../backend.service';
import { TestCase } from '../test-case/test-case';

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

  testCases: TestCase[] = [];
  testCase: TestCase = new TestCase;
  criterias: Criteria[];

  nextTurn: string;
  nextTurns: string[];

  testResult: TestResult = new TestResult;

  constructor( private ref: ChangeDetectorRef,
               private backendService: BackendService ) {}

  ngOnInit() {
    this.testResult.testcases = [];

  }

  onSelectDialog( dialog): void {
    this.testDialog = dialog;
    this.dialogName = this.testDialog.name;
    this.testTurns = this.testDialog.turns;
    for (const turn of this.testTurns) {
      if (turn.name === 'start') {
        this.setTestCase(turn);
      }
    }
    this.clear();
  }

  setTestCase(testTurn): void {
    console.log('setTestCase');
    this.testCase.wakeword = testTurn.wakeword;
    this.testCase.prompt = testTurn.prompt;
    this.testCase.criteria = testTurn.testCriteria;
    this.criterias = testTurn.criterias;
    this.nextTurns = [];
    for (const c of this.criterias) {
      this.nextTurns.push(c.nextTurn);
      this.nextTurn = this.nextTurns[0];
    }
    this.ref.detectChanges();
  }

  onTestDialog( dialog ): void {
    this.back();
    this.testCaseComponent.speak();
  }

  onNluAnalyse(testCase): void {
    console.log('onNluAnalyse');
    console.log('TESTCASE: ');
    console.log(testCase);
    if ( this.validate()) {
      setTimeout(() => {
        if (this.next()) {
          this.testCaseComponent.speak();
        }
      }, 2000);
    }
  }

  clear(): void {
    this.testCaseComponent.clear();
  }

  validate(): boolean {
    this.nextTurn = this.testCaseComponent.validate();
    return true;
  }

  save(): void {
    // this.testResult.dialogName =
    // this.testResult.dialogDescription =
    // this.testResult.assistant =
    // this.testResult.datetime =
    // this.testResult.testcases =
    this.testResult.testcases.push(this.testCase);
    console.log(this.testResult.testcases);
    // this.backendService.addTestTurn(testresult).subscribe((data: any) => {
    //   console.log(data);
    // });
  }

  next(): boolean {
    for ( const turn of this.testTurns) {
      if (turn.name === this.nextTurn) {
        this.clear();
        this.setTestCase(turn);
        return true;
      }
    }
    return false;
  }

  back(): void {
    this.clear();
    for (const turn of this.testTurns) {
      if (turn.name === 'start') {
        this.setTestCase(turn);
      }
    }
    this.ref.detectChanges();
  }
}
