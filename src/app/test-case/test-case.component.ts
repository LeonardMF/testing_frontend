// tslint:disable-next-line:max-line-length
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ViewChildren, QueryList, Output, EventEmitter} from '@angular/core';

import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';
import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';
import { RasaNluService } from '../rasa-nlu/rasa-nlu.service';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';

import { RasaCoreQuery } from '../rasa-core/rasa-core-query';
import { ResponseComponent } from '../response/response.component';
import { Criteria } from '../criteria/criteria';
import { RasaNluIntentComponent } from '../rasa-nlu-intent/rasa-nlu-intent.component';
import { RasaNluEntityComponent } from '../rasa-nlu-entity/rasa-nlu-entity.component';
import { PromptComponent } from '../prompt/prompt.component';
import { CriteriaEntity } from '../criteria-entity/criteria-entity';
import { Result } from '../result/result';
import { ResultComponent } from '../result/result.component';
import { TestCase } from './test-case';
import { TestTurn } from '../test-turn/test-turn';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.css']
})
export class TestCaseComponent implements OnInit, OnDestroy {

  @ViewChild(PromptComponent)
  private promptComponent: PromptComponent;

  @ViewChild(ResponseComponent)
  private responseComponent: ResponseComponent;

  @ViewChild(ResultComponent)
  private resultComponent: ResultComponent;

  @Input() testCase: TestCase;
  @Input() criterias: Criteria[];

  @Output() nluAnalyseOn = new EventEmitter<TestCase>();

  title: string;
  description: string;

  errorFlag: boolean;
  errorText: string;
  messages = [];
  disabled = true;

  response: string;
  intent: RasaNluIntent;

  result: Result = new Result;
  resultFlag = false;

  constructor(
    private ref: ChangeDetectorRef,
    private rasaNluService: RasaNluService
  ) {}

  ngOnInit() {
    // this.clear();
  }

  ngOnDestroy(): void {
  }

  onSetWakeword(wakeword): void {
    this.testCase.wakeword = wakeword;
    // console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.clear();
  }

  onStopSpeak(): void {
    this.responseComponent.startListen();
    this.ref.detectChanges();
  }

  speak(): void {
    this.promptComponent.startSpeak();
  }

  setPrompt(): void {
    // console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.clear();
  }

  onListenResult(response): void {
    this.testCase.response = response;
    const rasaCoreQuery = new RasaCoreQuery();
    rasaCoreQuery.text = response;

    this.rasaNluService.post(rasaCoreQuery).subscribe((rasaNluResponse: RasaNluResponse) => {

      this.result.intent = rasaNluResponse.intent;
      this.result.entities = rasaNluResponse.entities;
      // rasaNluResponse.intent_ranking;

      if (this.result.intent.name) {
        this.resultFlag = true;
        this.ref.detectChanges();
        this.nluAnalyseOn.emit(this.testCase);
      }
    });
  }

  clear(): void {
    this.result = new Result();
    this.resultFlag = false;
    this.responseComponent.listenResult = '';
    this.ref.detectChanges();
  }

  validate(): string {
    for ( const c of this.criterias) {
      if ( this.result.intent.name === c.intent) {
        // console.log( 'Criteria: ');
        // console.log( c );
        this.testCase.criteria = c;
      }
    }
    // console.log(this.resultComponent);
    return this.resultComponent.validate();
  }
}
