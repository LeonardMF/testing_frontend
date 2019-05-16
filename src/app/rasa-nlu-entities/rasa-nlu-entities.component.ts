import { Component, OnInit, Input } from '@angular/core';
import { RasaNluEntity } from './rasa-nlu-entity';

@Component({
  selector: 'app-rasa-nlu-entities',
  templateUrl: './rasa-nlu-entities.component.html',
  styleUrls: ['./rasa-nlu-entities.component.css']
})
export class RasaNluEntitiesComponent implements OnInit {

  @Input() entities: RasaNluEntity;

  constructor() { }

  ngOnInit() {
  }

}
