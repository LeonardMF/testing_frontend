import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestDialog } from './test-dialog';
import { catchError } from 'rxjs/internal/operators/catchError';
import { TestResult } from './test-result';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  getDialogs():  Observable<any> {
    const requestUrl = this.backendUrl + 'dialog';
    return this.http.get<any>( requestUrl );
  }

  // loadDialogs():  Promise<any> {
  //   const requestUrl = this.backendUrl + 'dialog';
  //   return this.http.get<any>( requestUrl ).toPromise();
  // }

  getDialog(name: string): Promise<any> {
    const requestUrl = this.backendUrl + 'dialog/' + name;
    return this.http.get<any>( requestUrl ).toPromise();
  }

  addDialog(testdialog: TestDialog): Promise<any> {
    // console.log('Add :' + JSON.stringify(testdialog));
    const requestUrl = this.backendUrl + 'dialog';
    // console.log('to :' + requestUrl);
    return this.http.post<any>( requestUrl, JSON.stringify(testdialog), httpOptions ).toPromise();
  }

  postResult(testresult: TestResult): Promise<any> {
    const requestUrl = this.backendUrl + 'result';
    return this.http.post<any>( requestUrl, JSON.stringify(testresult), httpOptions ).toPromise();
  }

  getResults():  Observable<any> {
    const requestUrl = this.backendUrl + 'result';
    return this.http.get<any>( requestUrl );
  }

  getResult(id: string): Promise<any> {
    const requestUrl = this.backendUrl + 'result/' + id;
    return this.http.get<any>( requestUrl ).toPromise();
  }

}
