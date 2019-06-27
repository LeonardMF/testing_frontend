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

  dialogs = [];
  dialog: string;
  dialogData: any;
  testCases = [];
  testCase = new TestCase();


  constructor(private http: HttpClient,
              private ref: ChangeDetectorRef,
              private testCaseService: TestCaseService) { }

  ngOnInit() {
    this.loadDialogs();
    this.setDialog();
  }



  // Load Dialogs
  loadDialogs(): void {
    this.dialogs = ['UhrzeitansageDialog', 'DesignExample', 'BVGFahrplanAuskunpft' ];
    this.dialog = this.dialogs[0];
  }

  // Set Dialog and TestCases
  async setDialog() {
    try {
      this.dialogData = await this.testCaseService.getDialog(this.dialog);
      this.testCases = this.dialogData.story;
      this.testCase = this.testCases[0];
      this.ref.detectChanges();
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  // Load TestCases
  async loadTestCase() {
    try {
      this.testCase = await this.testCaseService.getTestCase('Uhrzeitansage');
      console.log(this.testCase);
      this.ref.detectChanges();
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

    // Set the selected testCase
    setTestCase(): void {
      console.log(this.testCase);
      this.ref.detectChanges();
    }


}
