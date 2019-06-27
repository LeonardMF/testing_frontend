import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TestCase } from './test-case';
import { TestCaseService } from './test-case.service';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.css']
})
export class TestCaseComponent implements OnInit {

  testCases = [];
  testCase = new TestCase();


  constructor(private http: HttpClient,
              private ref: ChangeDetectorRef,
              private testCaseService: TestCaseService) { }

  ngOnInit() {
  }

  // Set the selected testCase
  async setTestCase() {
    try {
      this.testCase = await this.testCaseService.getTestCase(this.testCase.function);
      console.log(this.testCase);
      this.ref.detectChanges();
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  // Load TestCases
  async loadTestCases() {
    try {
      this.testCase = await this.testCaseService.getTestCase('Uhrzeitansage');
      console.log(this.testCase);
      this.ref.detectChanges();
    } catch (error) {
      console.log('Error: ' + error);
    }
  }


}
