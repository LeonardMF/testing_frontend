import { Component, OnInit, Input } from '@angular/core';
import { Criteria } from './criteria';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {

  @Input() criteria: Criteria;

  constructor() { }

  ngOnInit() {
  }

}
