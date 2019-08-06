import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TestTurn } from '../test-turn/test-turn';
import { TestResult } from '../test-result';
import { TIME_NEXT_CRITERIA, TIME_CITY_END_CRITERIA } from '../mock-test-criteria';
import { TIME_RESULT, RIGHT_RESULT, WRONG_RESULT } from '../mock-result';
import { Result } from '../result/result';
import { TIME_NEXT_TURN } from '../mock-test-turn';
import { ResultComponent } from '../result/result.component';
import { Criteria } from '../criteria/criteria';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, AfterViewInit {

  @ViewChild(ResultComponent)
  private resultComponent: ResultComponent;

  @ViewChildren(ResultComponent)
  private resultComponents: QueryList<ResultComponent>;


  // turn: TestTurn = TIME_NEXT_TURN;
  criteria: Criteria;
  time_result: Result;
  right_result: Result;
  wrong_result: Result;


  tests = ['TIME_DIALOG_GOOGLE', 'TIME_DIALOG_ALEXA'];
  test = 'TIME_DIALOG_GOOGLE';
  constructor() { }

  ngOnInit() {
    this.time_result = TIME_RESULT;
    this.right_result = RIGHT_RESULT;
    this.wrong_result = WRONG_RESULT;
    this.criteria = TIME_CITY_END_CRITERIA;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.showResult();
  }

  showResult(): void {
    this.resultComponents.forEach( (r) => {
      r.showResult();
    });
  }

}
