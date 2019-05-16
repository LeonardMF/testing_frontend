import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RasaNluService } from '../rasa-nlu.service';
import { RasaNluQuery } from '../rasa-nlu-query';

@Component({
  selector: 'app-nlu',
  templateUrl: './nlu.component.html',
  styleUrls: ['./nlu.component.css']
})
export class NluComponent implements OnInit {

  result = new RasaNluQuery();
  response: String;

  intentButtonOn: boolean;

  constructor(private ref: ChangeDetectorRef,
              private rasaNluService: RasaNluService) { }

  ngOnInit() {
    this.result.query = 'Es ist 20 Uhr 10.';
    this.result.project = 'current';
  }


  sendRequest(): void {
    console.log(this.result);

    this.rasaNluService.post(this.result).subscribe((data: any) => {
      console.log(data);
      this.response = JSON.stringify(data);
      this.ref.detectChanges();
    });
  }

  stopRequest(): void {
  }

  getStatus(): void {
    // this.rasaNluService.getStatus().subscribe(() => {
    //   },  error => console.log('Error: ' + error.error.text));
  }

}
