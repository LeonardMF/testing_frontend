import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BackendService } from '../backend.service';
import { TestDialog } from '../test-dialog';
import { TEST_TIME_DIALOG, TEST_VUI, TEST_TIME, TEST_BVG, TEST_TIME_CITY } from '../mock-test-dialog';
import { TestTurn } from '../test-turn/test-turn';

@Component({
  selector: 'app-dialog-selector',
  templateUrl: './dialog-selector.component.html',
  styleUrls: ['./dialog-selector.component.css']
})
export class DialogSelectorComponent implements OnInit {

  @Input() editorMode: boolean;
  @Output() selectDialogOn = new EventEmitter<TestDialog>();
  @Output() testDialogOn = new EventEmitter();

  dialogs: TestDialog[] = [];
  dialog: TestDialog;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.loadMockDialogs();
    // this.loadDialogs();
  }

  addDialog(): void {
    this.dialog = new TestDialog();
    this.dialog.name = prompt('Please enter a dialog name:');
    this.dialog.description  = prompt('Please enter a dialog description:');
    const firstTurn = new TestTurn();
    firstTurn.criterias = [];
    this.dialog.turns.push(firstTurn);
    this.dialogs.push(this.dialog);
    this.selectDialogOn.emit(this.dialog);
  }

  testDialog(): void {
    this.testDialogOn.emit();
  }

  changeDialog(): void {
    this.selectDialogOn.emit(this.dialog);
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
      this.selectDialogOn.emit(this.dialog);
    });
  }

  loadMockDialogs(): void {
    this.dialogs.push(TEST_TIME_DIALOG);
    this.dialogs.push(TEST_VUI);
    this.dialogs.push(TEST_BVG);
    this.dialogs.push(TEST_TIME);
    this.dialogs.push(TEST_TIME_CITY);
    this.dialog = this.dialogs[0];
    this.selectDialogOn.emit(this.dialog);
  }

}
