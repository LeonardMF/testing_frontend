import { Component, OnInit, Input } from '@angular/core';
import { RasaNluEntity } from './rasa-nlu-entity';

@Component({
  selector: 'app-rasa-nlu-entity',
  templateUrl: './rasa-nlu-entity.component.html',
  styleUrls: ['./rasa-nlu-entity.component.css']
})
export class RasaNluEntityComponent implements OnInit {

  @Input() entity: RasaNluEntity;

  constructor() { }

  ngOnInit() {
  }

}
