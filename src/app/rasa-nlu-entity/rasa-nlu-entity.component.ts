import { Component, OnInit, Input } from '@angular/core';
import { RasaNluEntity } from './rasa-nlu-entity';

@Component({
  selector: 'app-rasa-nlu-entity',
  templateUrl: './rasa-nlu-entity.component.html',
  styleUrls: ['./rasa-nlu-entity.component.css']
})
export class RasaNluEntityComponent implements OnInit {

  @Input() entity: RasaNluEntity;
  // datetime: Date;

  constructor() {
    // if (this.entity && this.entity.entity === 'time') {
    //   this.datetime = new Date(this.entity.value);
    //   console.log(this.datetime);
    // }
   }

  ngOnInit() {
  }

}
