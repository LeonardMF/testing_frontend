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

  dialog: TestDialog;

  constructor( private backendService: BackendService ) { }

  ngOnInit() { }

  addTurn(): void {
    const turn = new TestTurn();
    turn.name = prompt('Please enter a turn name:');
    // turn.testCriteria = new Criteria();
    turn.criterias = [new Criteria()];
    this.dialog.turns.push(turn);
  }

  save(): void {
    // console.log('saving...');
    // console.log(this.dialog.turns);
    this.saveDialog();
  }

  onSelectDialog( dialog): void {
    this.dialog = dialog;
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

}
