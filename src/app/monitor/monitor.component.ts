import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ViewChildren, QueryList, Renderer2} from '@angular/core';

import { TestDialog } from '../test-dialog';
import { Criteria } from '../criteria/criteria';
import { TestResult } from '../test-result';
import { TestTurn } from '../test-turn/test-turn';

import { TestCaseComponent } from '../test-case/test-case.component';
import { BackendService } from '../backend.service';

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
  criterias: Criteria[];

  nextTurn: string;
  nextTurns: string[];

  constructor( private ref: ChangeDetectorRef,
               private backendService: BackendService ) {}

  ngOnInit() {

  }

  onSelectDialog( dialog): void {
    this.testDialog = dialog;
    this.dialogName = this.testDialog.name;
    this.testTurns = this.testDialog.turns;
    this.setTestTurn(this.testTurns[this.testTurnIndex]);
    this.clear();
  }

  setTestTurn(testCase): void {
    this.wakeword = testCase.wakeword;
    this.prompt = testCase.prompt;
    this.testCriteria = testCase.testCriteria;
    this.criterias = testCase.criterias;
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

  onNluAnalyse(): void {
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

  next(): boolean {
    for ( const turn of this.testTurns) {
      if (turn.name === this.nextTurn) {
        this.clear();
        this.setTestTurn(turn);
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
