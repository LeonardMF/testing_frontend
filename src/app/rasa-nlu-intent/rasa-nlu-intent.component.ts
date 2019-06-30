import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RasaNluIntent } from './rasa-nlu-intent';

@Component({
  selector: 'app-rasa-nlu-intent',
  templateUrl: './rasa-nlu-intent.component.html',
  styleUrls: ['./rasa-nlu-intent.component.css']
})
export class RasaNluIntentComponent implements OnInit {

  @Input() intent: RasaNluIntent;
  @ViewChild('name') name: ElementRef;
  @ViewChild('confidence') confidence: ElementRef;

  intentFlag: boolean;
  confidenceFlag: boolean;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) { }

  ngOnInit() {
    // setTimeout(function() {
    //   // console.log(this.elementRef.nativeElement.querySelector('input'));
    //   this.renderer.addClass(this.name, 'passed');
    //   console.log(this.name);
    // }, 3000);


    // console.log(this.renderer);
    // console.log(this.elementRef.nativeElement.ch);

    // this.renderer.addClass(this.name, 'passed');
    // this.renderer.addClass(this.elementRef.nativeElement.querySelector('input'), 'passed');

  }

  setIntent(status): void {
    this.renderer.addClass(this.name.nativeElement, status);
    // this.renderer.addClass(this.elementRef.nativeElement.querySelector('input'), status);
  }

  setConfidence(status): void {
    this.renderer.addClass(this.confidence.nativeElement, status);
  }

}
