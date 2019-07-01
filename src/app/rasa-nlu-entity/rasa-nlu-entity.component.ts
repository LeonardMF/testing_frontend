import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { RasaNluEntity } from './rasa-nlu-entity';

@Component({
  selector: 'app-rasa-nlu-entity',
  templateUrl: './rasa-nlu-entity.component.html',
  styleUrls: ['./rasa-nlu-entity.component.css']
})
export class RasaNluEntityComponent implements OnInit {

  @Input() entity: RasaNluEntity;
  @ViewChild('name') name: ElementRef;
  @ViewChild('confidence') confidence: ElementRef;
  @ViewChild('value') value: ElementRef;

  constructor(private renderer: Renderer2) {
   }

  ngOnInit() {
  }

  setEntity(status): void {
    this.renderer.addClass(this.name.nativeElement, status);
  }

  setConfidence(status): void {
    this.renderer.addClass(this.confidence.nativeElement, status);
  }

  setValue(status): void {
    this.renderer.addClass(this.value.nativeElement, status);
  }


}
