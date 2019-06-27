import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TestCase } from './test-case';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  private assetsTestCaseUrl = '/assets/testcase/';  // URL to local core

  constructor(private http: HttpClient) { }

  getDialog(name): Promise<any> {
    const requestUrl = this.assetsTestCaseUrl + name + '.json';

    console.log(requestUrl);
    return this.http.get<any>( requestUrl, {responseType: 'json'} ).toPromise();
  }

  getTestCase(name): Promise<TestCase> {
    const requestUrl = this.assetsTestCaseUrl + name + '.json';

    console.log(requestUrl);
    return this.http.get<TestCase>( requestUrl, {responseType: 'json'} ).toPromise();
  }

}
