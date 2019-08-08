import { Component, OnInit, Input } from '@angular/core';
import { Criteria } from '../criteria/criteria';
import { TIME_NEXT_CRITERIA, TIME_END_CRITERIA } from '../mock-test-criteria';
import { TestTurn } from './test-turn';
import { CriteriaEntity } from '../criteria-entity/criteria-entity';

@Component({
  selector: 'app-test-turn',
  templateUrl: './test-turn.component.html',
  styleUrls: ['./test-turn.component.css']
})
export class TestTurnComponent implements OnInit {

  @Input() turn: TestTurn;

  prompt: string;
  name: string;
  criterias: Criteria[];
  disabled = false;

  constructor() { }

  ngOnInit() {
    this.prompt = this.turn.prompt;
    this.name = this.turn.name;
    this.criterias = this.turn.criterias;
    // this.criterias.push(this.turn.testCriteria);
    // this.criterias = this.turn.criterias;
  }

  addCriteria(): void {
    const criteria = new Criteria();
    const entity = new CriteriaEntity;
    criteria.entities.push(entity);
    this.criterias.push(criteria);
  }

}
