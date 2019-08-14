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
import { TEST_TIME_DIALOG_GOOGLE, TEST_TIME_DIALOG_ALEXA } from '../mock-test-result';

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

  testResults: TestResult[] = [TEST_TIME_DIALOG_GOOGLE, TEST_TIME_DIALOG_ALEXA];
  testResult: TestResult = this.testResults[0];

  constructor(private ref: ChangeDetectorRef,
              private backendService: BackendService) { }

  ngOnInit() {
    // this.loadResults();
    // this.getResult('5d52a499142f04fb86095db5');

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.showResult();
  }

  changeTestResult(): void {
    this.ref.detectChanges();
    this.showResult();
  }

  showResult(): void {
    this.resultComponents.forEach( (r) => {
      r.showResult();
    });
  }

  loadResults(): void {
    this.backendService.getResults().subscribe((testResults: TestResult[]) => {
      this.testResults = testResults;
      console.log(this.testResults);
    });
  }

  async getResult(id) {
    try {
      this.testResult = await this.backendService.getResult(id);
      console.log(this.testResult);
    } catch (error) {
      console.log('Error: ' + error);
    }
  }


  // save dialog
  async saveResult() {
    try {
      console.log(JSON.stringify(this.testResult));
      const resultData = await this.backendService.postResult(this.testResult);
      console.log(resultData);
      // this.ref.detectChanges();
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

}
