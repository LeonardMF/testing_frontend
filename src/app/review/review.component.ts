import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TestTurn } from '../test-turn/test-turn';
import { TestResult } from '../test-result';
import { TIME_NEXT_CRITERIA, TIME_CITY_END_CRITERIA } from '../mock-test-criteria';
import { TIME_RESULT, RIGHT_RESULT, WRONG_RESULT } from '../mock-result';
import { Result } from '../result/result';
import { TIME_NEXT_TURN } from '../mock-test-turn';
import { ResultComponent } from '../result/result.component';
import { Criteria } from '../criteria/criteria';
import { TIME_LISSABON_GOOLGE, TIME_GOOLGE, TIME_LISSABON_ALEXA, TIME_ALEXA } from '../mock-test-case';
import { TestCase } from '../test-case';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, AfterViewInit {

  @ViewChild(ResultComponent)
  private resultComponent: ResultComponent;

  @ViewChildren(ResultComponent)
  private resultComponents: QueryList<ResultComponent>;


  // turn: TestTurn = TIME_NEXT_TURN;
  criteria: Criteria;
  time_result: Result;
  right_result: Result;
  wrong_result: Result;

  testcases_google: TestCase[] = [TIME_GOOLGE, TIME_LISSABON_GOOLGE];
  testcases_alexa: TestCase[] = [TIME_ALEXA, TIME_LISSABON_ALEXA];

  testcases: TestCase[] = this.testcases_google;

  results: TestResult[];
  result: TestResult;

  tests = ['TIME_DIALOG_GOOGLE', 'TIME_DIALOG_ALEXA'];
  test = 'TIME_DIALOG_GOOGLE';
  assistant = 'GOOGLE';

  constructor(private ref: ChangeDetectorRef,
              private backendService: BackendService) { }

  ngOnInit() {
    this.loadResults();
    this.getResult('5d52a499142f04fb86095db5');

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.showResult();
  }

  showTest(): void {
    if (this.test === 'TIME_DIALOG_GOOGLE') {
      this.assistant = 'GOOGLE';
      this.testcases = this.testcases_google;
      this.ref.detectChanges();
      this.showResult();
    }
    if (this.test === 'TIME_DIALOG_ALEXA') {
      this.assistant = 'ALEXA';
      this.testcases = this.testcases_alexa;
      this.ref.detectChanges();
      this.showResult();
    }
  }

  showResult(): void {
    this.resultComponents.forEach( (r) => {
      r.showResult();
    });
  }

  // load dialogs
  loadResults(): void {
    this.backendService.getResults().subscribe((results: TestResult[]) => {
      this.results = results;
      console.log(this.results);
    });
  }

  // load dialogs
  async getResult(id) {
    try {
      this.result = await this.backendService.getResult(id);
      console.log(this.result);
    } catch (error) {
      console.log('Error: ' + error);
    }
  }


  // save dialog
  async saveResult() {
    try {
      const testresult = new TestResult;
      testresult.dialogName = 'TIME_DIALOG';
      testresult.dialogDescription = 'Uhrzeitansage im Kontext';
      testresult.assistant = this.assistant;
      testresult.datetime = Date.now().toString();
      testresult.testcases = this.testcases;
      console.log(JSON.stringify(testresult));
      const resultData = await this.backendService.postResult(testresult);
      console.log(resultData);
      // this.ref.detectChanges();
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

}
