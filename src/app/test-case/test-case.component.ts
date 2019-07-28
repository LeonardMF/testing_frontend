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

  // Set default values
  @Input() wakeword;
  @Input() prompt;
  @Input() testCriteria: Criteria;

  @Output() nluAnalyseOn = new EventEmitter();

  title: string;
  description: string;

  errorFlag: boolean;
  errorText: string;
  messages = [];

  response: string;
  intent: RasaNluIntent;

  testResult: Result;
  testResultFlag = false;

  constructor(
    private ref: ChangeDetectorRef,
    private rasaNluService: RasaNluService
  ) {}

  ngOnInit() {
    this.clear();
  }

  ngOnDestroy(): void {
  }

  onSetWakeword(wakeword): void {
    this.wakeword = wakeword;
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

  onListenResult(result): void {
    this.response = result;
    const rasaCoreQuery = new RasaCoreQuery();
    rasaCoreQuery.text = result;
    // console.log(rasaCoreQuery.text);
    // rasaNluQuery.project =  'current';
    this.rasaNluService.post(rasaCoreQuery).subscribe((rasaNluResponse: RasaNluResponse) => {

      this.testResult.intent = rasaNluResponse.intent;
      this.testResult.entities = rasaNluResponse.entities;
      this.testResultFlag = true;
      this.ref.detectChanges();
      this.nluAnalyseOn.emit();
    });
  }

  clear(): void {
    this.testResult = new Result();
    this.testResultFlag = false;
    this.response = '';
    this.responseComponent.listenResult = this.response;
    this.ref.detectChanges();
  }

  validate(): boolean {
    return this.resultComponent.validate();
  }
}
