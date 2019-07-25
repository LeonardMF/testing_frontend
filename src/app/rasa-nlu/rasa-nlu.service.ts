import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { RasaNluQuery } from './rasa-nlu-query';
import { RasaNluResponse } from './rasa-nlu-response';
import { RasaCoreQuery } from '../rasa-core-query';

// https://stackoverflow.com/questions/34790051/how-to-create-cross-domain-request
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'text/plain'})
};

@Injectable({
  providedIn: 'root'
})
export class RasaNluService {

  private rasaNluUrl = 'http://localhost:5005/model/';  // URL to local nlu

  constructor(private http: HttpClient) { }

  getStatus(): Observable<any> {
    const requestUrl = this.rasaNluUrl;
    console.log('Check NLU Status ...');
    return this.http.get<any>( requestUrl );
  }


  post(query: RasaCoreQuery): Observable< RasaNluResponse> {
    const requestUrl = this.rasaNluUrl + 'parse';
    // console.log(query);
    return this.http.post<RasaNluResponse>( requestUrl, query, httpOptions )
    // .pipe(tap((data: any) => console.log(data)))
    ;
  }

}
