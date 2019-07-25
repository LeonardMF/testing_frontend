import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-criteria-intent',
  templateUrl: './criteria-intent.component.html',
  styleUrls: ['./criteria-intent.component.css']
})
export class CriteriaIntentComponent implements OnInit {

  @Input() intent: string;
  @Input() minConfidence: number;

  @ViewChild('name') name: ElementRef;
  @ViewChild('confidence') confidence: ElementRef;

  intentFlag: boolean;
  confidenceFlag: boolean;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  setIntent(status): void {
    this.renderer.addClass(this.name.nativeElement, status);
  }

  setConfidence(status): void {
    this.renderer.addClass(this.confidence.nativeElement, status);
  }

}
