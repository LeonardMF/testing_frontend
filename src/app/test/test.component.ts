import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { SpeakService, ListenService } from 'speech-angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {

  wakeword: string;
  wakeFlag =  false;
  prompt = 'Wie wird das Wetter Morgen?';

  listenResult: string;

  listenButtonOn: boolean;
  speakButtonOn: boolean;
  errorFlag: boolean;
  errorText: string;
  messages = [];

  speakStartEvent: any;
  speakStopEvent: any;
  speakErrorEvent: any;

  listenStartEvent: any;
  listenStopEvent: any;
  listenResultEvent: any;
  listenErrorEvent: any;

  constructor(
    private ref: ChangeDetectorRef,
    private speakService: SpeakService,
    private listenService: ListenService
  ) { }

  ngOnInit() {

    this.speakService.format = 'wav';

    this.speakStopEvent = this.speakService.stopEvent.subscribe( () => {
      const message = 'Speak: stop';
      this.speakButtonOn = false;
      this.messages.push(message);
      if (this.wakeFlag) {
        this.speakService.setAudioOff();
        this.startSpeak();
      } else {
        this.startListen();
      }
      this.ref.detectChanges();
    });

    this.speakErrorEvent = this.speakService.errorEvent.subscribe( (error) => {
      this.errorFlag = true;
      this.errorText = 'Error on Speak: ' + error.message ;
      this.ref.detectChanges();
    });

    this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
      const message = 'Result: ' + aText;
      this.listenResult = aText;
      this.messages.push(message);
      this.ref.detectChanges();
    });

    this.listenStartEvent = this.listenService.startEvent.subscribe(() => {
      const message = 'Listen: start';
      this.messages.push(message);
      this.listenButtonOn = true;
      this.ref.detectChanges();
    });

    this.listenStopEvent = this.listenService.stopEvent.subscribe(() => {
      const message = 'Listen: stop';
      this.messages.push(message);
      this.listenButtonOn = false;
      this.ref.detectChanges();
    });

    this.listenErrorEvent = this.listenService.errorEvent.subscribe( (error) => {
      this.errorFlag = true;
      this.errorText = 'Error on Listen: ' + error.message ;
      this.ref.detectChanges();
    });

  }

  ngOnDestroy(): void {
    this.speakErrorEvent.unsubscribe();
    this.speakStopEvent.unsubscribe();
    this.listenStartEvent.unsubscribe();
    this.listenStopEvent.unsubscribe();
    this.listenResultEvent.unsubscribe();
    this.listenErrorEvent.unsubscribe();
  }

  setWakeword(): void {
    console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.listenResult = '';
  }

  setPrompt(): void {
    console.log(this.wakeword + '. ' + this.prompt);
    this.messages = [];
    this.listenResult = '';
  }

  startSpeak(): void {

    console.log('wakeFlag: ' + this.wakeFlag);

    if (this.wakeword === 'Hey Siri') {
      if (this.wakeFlag === false) {
        const message = 'Wakeword: ' + this.wakeword;
        this.messages.push(message);
        this.wakeFlag = true;
        this.speakService.setAudioOn();
        this.speakService.file = 'HeySiri';
        this.speakService.start();
      } else {
        this.wakeFlag = false;
        const message = 'Prompt: ' + this.prompt;
        this.messages.push(message);
        this.speakService.text = this.prompt;
        this.speakService.start();
      }
    } else {
      const testprompt = this.wakeword + '. ' + this.prompt;
      this.speakService.text = testprompt;
      this.speakService.start();
      const message = 'Wakeword + Prompt: ' + this.prompt;
      this.messages.push(message);
      this.ref.detectChanges();
    }
  }

  startListen(): void {
    this.listenService.start();
  }

  stopListen(): void {
    this.listenService.stop();
  }

}
