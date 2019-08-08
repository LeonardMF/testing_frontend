import { Component, OnInit } from '@angular/core';
import { TestDialog } from '../test-dialog';
import { TEST_TIME, TEST_TIME_CITY, TEST_TIME_DIALOG, TEST_BVG } from '../mock-test-dialog';
import { TestTurn } from '../test-turn/test-turn';
import { Criteria } from '../criteria/criteria';

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
    this.dialogs.push(TEST_BVG);
    this.dialogs.push(TEST_TIME);
    this.dialogs.push(TEST_TIME_CITY);
    this.dialogs.push(TEST_TIME_DIALOG);
    this.dialog = this.dialogs[0];
    console.log(this.dialog.name);
  }

  setDialog(): void {
    console.log(this.dialog);
  }

  addDialog(): void {
    this.dialog = new TestDialog();
    this.dialog.name = prompt('Please enter a dialog name:');
    this.dialogs.push(this.dialog);
  }

  addTurn(): void {
    const turn = new TestTurn();
    turn.name = prompt('Please enter a turn name:');
    turn.testCriteria = new Criteria;
    this.dialog.turns.push(turn);
  }
}
