import { Component, OnInit, Input } from '@angular/core';
import { Criteria } from '../criteria/criteria';
import { TestTurn } from './test-turn';

@Component({
  selector: 'app-test-turn',
  templateUrl: './test-turn.component.html',
  styleUrls: ['./test-turn.component.css']
})
export class TestTurnComponent implements OnInit {

  @Input() turn: TestTurn;

  prompt: string;
  wakeword: string;
  name: string;
  criterias: Criteria[];
  disabled = false;

  constructor() { }

  ngOnInit() {
    this.prompt = this.turn.prompt;
    this.name = this.turn.name;
    this.criterias = this.turn.criterias;
    this.wakeword = this.turn.wakeword;
  }

  changeName(): void {
    this.turn.name = this.name;
  }

  changePrompt(): void {
    this.turn.prompt = this.prompt;
  }

  changeWakeword(): void {
    this.turn.wakeword = this.wakeword;
  }

  addCriteria(): void {
    const criteria = new Criteria();
    criteria.entities = [];
    this.criterias.push(criteria);
  }

}
