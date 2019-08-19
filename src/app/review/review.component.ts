import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { TestResult } from '../test-result';
import { ResultComponent } from '../result/result.component';

import { BackendService } from '../backend.service';
import { TEST_TIME_DIALOG_GOOGLE, TEST_TIME_DIALOG_ALEXA } from '../mock-test-result';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @ViewChildren(ResultComponent)
  private resultComponents: QueryList<ResultComponent>;

  testResults: TestResult[] = [];
  testResult: TestResult;

  constructor(private ref: ChangeDetectorRef,
              private backendService: BackendService) { }

  ngOnInit() {
    this.loadResults();
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
      this.testResult = this.testResults[0];
      this.ref.detectChanges();
      this.showResult();
    });
  }

  loadMockResults(): void {
    this.testResults = [TEST_TIME_DIALOG_GOOGLE, TEST_TIME_DIALOG_ALEXA];
    this.testResult = this.testResults[0];
    this.ref.detectChanges();
    this.showResult();
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
