import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RasaNluService } from '../rasa-nlu/rasa-nlu.service';
import { RasaCoreService } from './rasa-core.service';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';
import { RasaCoreQuery } from './rasa-core-query';

@Component({
  selector: 'app-rasa-core',
  templateUrl: './rasa-core.component.html',
  styleUrls: ['./rasa-core.component.css']
})
export class RasaCoreComponent implements OnInit {

  text = 'Here comes what the Voice assistent said ...';
  rasaCoreQuery = new RasaCoreQuery();

  constructor(private ref: ChangeDetectorRef,
              private rasaCoreService: RasaCoreService) { }

  ngOnInit() {
  }

  send(): void {
    // console.log(this.text);

    this.rasaCoreQuery.text = this.text;


    this.rasaCoreService.post(this.rasaCoreQuery).subscribe((rasaNluResponse: RasaNluResponse) => {
      console.log(rasaNluResponse);
      this.ref.detectChanges();
    });
  }

}
