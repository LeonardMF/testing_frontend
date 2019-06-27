import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SpeakService } from 'speech-angular';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit, OnDestroy {

  @Input() wakeword: string;
  @Input() prompt: string;
  @Output() stopSpeakOn = new EventEmitter();

  wakeFlag =  false; // for Siri only

  speakButtonOn: boolean;

  speakStartEvent: any;
  speakStopEvent: any;
  speakErrorEvent: any;

  constructor(private speakService: SpeakService) { }

  ngOnInit() {
    this.speakService.format = 'wav';

    this.speakErrorEvent = this.speakService.errorEvent.subscribe( (error) => {
      console.log('Error on Speak: ' + error.message);
    });

    this.speakStartEvent = this.speakService.startEvent.subscribe( () => {
      console.log('Speak: start');
      this.speakButtonOn = true;
    });

    this.speakStopEvent = this.speakService.stopEvent.subscribe( () => {
      console.log('Speak: stop');
      if (this.wakeFlag) {
        this.speakService.setAudioOff();
        this.startSpeak();
      } else {
        this.speakButtonOn = false;
        this.stopSpeakOn.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.speakErrorEvent.unsubscribe();
    this.speakStartEvent.unsubscribe();
    this.speakStopEvent.unsubscribe();
  }

  startSpeak(): void {
    if (this.wakeword === 'Hey Siri') {
      if (this.wakeFlag === false) {
        console.log('Wakeword: ' + this.wakeword);
        this.wakeFlag = true;
        this.speakService.setAudioOn();
        this.speakService.file = 'HeySiri';
        this.speakService.start();
      } else {
        this.wakeFlag = false;
        console.log('Prompt: ' + this.prompt);
        this.speakService.text = this.prompt;
        this.speakService.start();
      }
    } else {
      const testprompt = this.wakeword + '. ' + this.prompt;
      this.speakService.text = testprompt;
      this.speakService.start();
      console.log('Wakeword + Prompt: ' + testprompt);
    }
  }

  stopSpeak(): void {
    this.speakService.stop();
  }

}
