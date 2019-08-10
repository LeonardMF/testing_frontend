import { Component, OnInit } from '@angular/core';
import { TestDialog } from '../test-dialog';
import { TEST_TIME, TEST_TIME_CITY, TEST_TIME_DIALOG, TEST_BVG, TEST_VUI } from '../mock-test-dialog';
import { TestTurn } from '../test-turn/test-turn';
import { Criteria } from '../criteria/criteria';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  dialogs: TestDialog[] = [];
  dialog: TestDialog;

  constructor( private backendService: BackendService ) { }

  ngOnInit() {
    //this.loadMockDialogs();
    this.loadDialogs();
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

  // save dialog
  async saveDialog() {
    try {
      const dialogData = await this.backendService.addDialog(this.dialog);
      console.log(dialogData);
      // this.ref.detectChanges();
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  // load dialog
  // async loadDialog( ) {
  //   try {
  //     this.dialog = await this.backendService.getDialog(this.dialog.name);
  //   } catch (error) {
  //     console.log('Error: ' + error);
  //   }
  // }

  // load dialogs
  loadDialogs(): void {
    this.backendService.getDialogs().subscribe((dialogs: TestDialog[]) => {
      this.dialogs = dialogs;
      this.dialog = this.dialogs[2];
    });
  }

  loadMockDialogs(): void {
    this.dialogs.push(TEST_TIME_DIALOG);
    this.dialogs.push(TEST_VUI);
    this.dialogs.push(TEST_BVG);
    this.dialogs.push(TEST_TIME);
    this.dialogs.push(TEST_TIME_CITY);
    this.dialog = this.dialogs[0];
}
}
