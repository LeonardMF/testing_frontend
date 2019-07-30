import { Component, OnInit, Input } from '@angular/core';
import { Criteria } from './criteria';
import { CriteriaEntity } from '../criteria-entity/criteria-entity';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {

  @Input() criteria: Criteria;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  addEntity(): void {
    const entity = new CriteriaEntity();
    this.criteria.entities.push(entity);
  }

}
