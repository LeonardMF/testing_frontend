import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { CriteriaEntity } from './criteria-entity';

@Component({
  selector: 'app-criteria-entity',
  templateUrl: './criteria-entity.component.html',
  styleUrls: ['./criteria-entity.component.css']
})
export class CriteriaEntityComponent implements OnInit {

  @Input() entity: CriteriaEntity;
  @Input() disabled: boolean;
  @ViewChild('name') name: ElementRef;
  @ViewChild('confidence') confidence: ElementRef;
  @ViewChild('value') value: ElementRef;

  constructor(private renderer: Renderer2) { }

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
