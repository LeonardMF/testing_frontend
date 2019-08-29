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
  dialogId: string;

  wakeword: string = '';

  testTurns: TestTurn[] = [];
  testTurnIndex = 0;

  testCases: TestCase[] = [];
  testCase: TestCase = new TestCase();
  criterias: Criteria[];

  nextTurn: string;
  nextTurns: string[];

  testResult: TestResult = new TestResult();

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

  onChangeWakeword( wakeword ): void {
    this.wakeword = wakeword;
  }

  setTestCase(testTurn): void {
    // console.log(this.wakeword);
    if (this.wakeword === '') {
      this.testCase.wakeword = testTurn.wakeword;
    } else {
      this.testCase.wakeword = this.wakeword;
    }
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

  onTestDialog(): void {
    // this.back();
    this.testCaseComponent.speak();
  }

  onNluAnalyse(): void {
    if ( this.validate()) {
      setTimeout(() => {
        if (this.next()) {
          this.testCaseComponent.speak();
        }
      }, 2000);
    }
  }

  onTestCase(testCase: TestCase): void {
    const tC = Object.assign(new TestCase(), testCase);
    this.testCases.push(tC);
  }

  clear(): void {
    this.testCaseComponent.clear();
  }

  validate(): boolean {
    this.nextTurn = this.testCaseComponent.validate();
    return true;
  }

  async save() {
    this.testResult.dialogName = this.testDialog.name;
    this.testResult.dialogDescription = this.testDialog.description;
    //
    this.testResult.assistant = this.testCases[0].wakeword;
    this.testResult.datetime = new Date().toString();
    this.testResult.testcases = this.testCases;
    // console.log(this.testCases);
    const dialogData = this.backendService.postResult(this.testResult);
    dialogData.then((data) => {
      this.dialogId = data._id;
      console.log('Dialog saved (id): ' + this.dialogId);
    });
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
