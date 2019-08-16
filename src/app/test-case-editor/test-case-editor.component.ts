import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TestCase } from '../test-case/test-case';
import { TestCaseService } from '../test-case-editor/test-case.service';
import { BackendService } from '../backend.service';
import { TIME_CITY_END_CRITERIA } from '../mock-test-criteria';
import { TestDialog } from '../test-dialog';
import { TEST_TIME_DIALOG } from '../mock-test-dialog';

@Component({
  selector: 'app-test-case-editor',
  templateUrl: './test-case-editor.component.html',
  styleUrls: ['./test-case-editor.component.css']
})
export class TestCaseEditorComponent implements OnInit {

  dialogs = [];
  testDialog: TestDialog;


  constructor() { }

  ngOnInit() {
    this.testDialog = TEST_TIME_DIALOG;
  }

  // Load Dialogs
  // loadDialogs(): void {
  //   this.backendService.getDialogs().subscribe((data: any) => {
  //     this.dialogs = Array.from(new Set(data));
  //   });
  //   this.dialog = this.dialogs[-1];
  // }

  // // Set Dialog and TestCases
  // async setDialog() {
  //   try {
  //     this.dialogData = await this.backendService.getDialog(this.dialog);
  //     console.log(this.dialogData);
  //     this.testCases = this.dialogData.testcases;
  //     this.testCase = this.testCases[0];
  //     this.ref.detectChanges();
  //   } catch (error) {
  //     console.log('Error: ' + error);
  //   }
  // }

  // // Load TestCases
  // async loadTestCase() {
  //   try {
  //     this.testCase = await this.testCaseService.getTestCase('Uhrzeitansage');
  //     console.log(this.testCase);
  //     this.ref.detectChanges();
  //   } catch (error) {
  //     console.log('Error: ' + error);
  //   }
  // }

  //   // Set the selected testCase
  //   setTestCase(): void {
  //     console.log(this.testCase);
  //     this.ref.detectChanges();
  //   }


}
