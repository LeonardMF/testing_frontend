import { Component, OnInit } from '@angular/core';
import { TestDialog } from '../test-dialog';
import { TEST_TIME,TEST_TIME_CITY,TEST_TIME_DIALOG } from '../mock-test-dialog';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  dialogs = [];
  dialog: TestDialog;

  constructor() { }

  ngOnInit() {
    this.dialogs.push(TEST_TIME);
    this.dialogs.push(TEST_TIME_CITY);
    this.dialogs.push(TEST_TIME_DIALOG);
    this.dialog = this.dialogs[0];
    console.log(this.dialog.name);
  }

  setDialog(): void {
    console.log(this.dialog);
  }

}
