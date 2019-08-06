import { Component, OnInit, ViewChild } from '@angular/core';
import { TestTurn } from '../test-turn/test-turn';
import { TestResult } from '../test-result';
import { TIME_NEXT_CRITERIA, TIME_CITY_END_CRITERIA } from '../mock-test-criteria';
import { FULL_RESULT } from '../mock-result';
import { Result } from '../result/result';
import { TIME_NEXT_TURN } from '../mock-test-turn';
import { ResultComponent } from '../result/result.component';
import { Criteria } from '../criteria/criteria';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @ViewChild(ResultComponent)
  private resultComponent: ResultComponent;

  // turn: TestTurn = TIME_NEXT_TURN;
  criteria: Criteria;
  result: Result;

  constructor() { }

  ngOnInit() {
    this.result = FULL_RESULT;
    this.criteria = TIME_CITY_END_CRITERIA;
    console.log(this.result);
    console.log(this.criteria);
  }

  validate(): void {
    this.resultComponent.validate();
  }

}
