import { Component, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { ListenService } from 'speech-angular';


@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit, OnDestroy {

  @Input() listenResult: string;

  @Output() listenResultOn = new EventEmitter<string>();

  listenButtonOn: boolean;

  // Listenservice Events
  listenStartEvent: any;
  listenStopEvent: any;
  listenResultEvent: any;
  listenErrorEvent: any;

  constructor(private ref: ChangeDetectorRef,
              private listenService: ListenService) { }

  ngOnInit() {

    this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
      // const message = 'Response: ' + aText;
      this.listenResult = aText;
      this.listenResultOn.emit(this.listenResult);
      this.ref.detectChanges();
    });

    this.listenStartEvent = this.listenService.startEvent.subscribe(() => {
      // const message = 'Listen: start';
      // this.messages.push(message);
      this.listenButtonOn = true;
      this.ref.detectChanges();
    });

    this.listenStopEvent = this.listenService.stopEvent.subscribe(() => {
      // const message = 'Listen: stop';
      // this.messages.push(message);
      this.listenButtonOn = false;
      this.ref.detectChanges();
    });

    this.listenErrorEvent = this.listenService.errorEvent.subscribe( (error) => {
      // this.errorFlag = true;
      // this.errorText = 'Error on Listen: ' + error.message ;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.listenStartEvent.unsubscribe();
    this.listenStopEvent.unsubscribe();
    this.listenResultEvent.unsubscribe();
    this.listenErrorEvent.unsubscribe();
  }

  changeListenResult(): void {
    this.listenResultOn.emit(this.listenResult);
  }

  startListen(): void {
    this.listenService.start();
  }

  stopListen(): void {
    this.listenService.stop();
  }

}
