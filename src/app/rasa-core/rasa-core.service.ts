import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { RasaNluQuery } from '../rasa-nlu/rasa-nlu-query';
import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';
import { RasaCoreQuery } from './rasa-core-query';
import { RasaCoreMessage } from './rasa-core-message';
import { RasaCoreAction } from './rasa-core-action';

// https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RasaCoreService {

  private rasaCoreUrl = 'http://localhost:5005/';  // URL to local core

  constructor(private http: HttpClient) { }

  getStatus(): Observable<any> {
    const requestUrl = this.rasaCoreUrl;
    console.log('Check NLU Status ...');
    return this.http.get<any>( requestUrl );
  }

  parseModel(query: RasaCoreQuery): Observable< RasaNluResponse> {
    console.log('send');
    const requestUrl = this.rasaCoreUrl + 'model/parse';
    return this.http.post<RasaNluResponse>( requestUrl, query, httpOptions );
  }

  addMessage(message: RasaCoreMessage): Observable<any> {

    const sender_id = 'default';
    const requestUrl = this.rasaCoreUrl + 'conversations/' + sender_id + '/messages';

    return this.http.post<any>( requestUrl, message, httpOptions );
  }

  predictAction(): Observable<any> {

    const sender_id = 'default';
    const requestUrl = this.rasaCoreUrl + 'conversations/' + sender_id + '/predict';

    return this.http.post<any>( requestUrl, httpOptions );
  }

  executeAction(action: RasaCoreAction): Observable<any> {

    const sender_id = 'default';
    const requestUrl = this.rasaCoreUrl + 'conversations/' + sender_id + '/execute';

    return this.http.post<any>( requestUrl, action, httpOptions );
  }

}
