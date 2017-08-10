import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Headers} from '@angular/http';
import 'rxjs/add/observable/empty';

@Injectable()
export class CodeService {

  constructor(
    private http: Http
  ) { }

  searchCode(code: String, type: string): Observable<CodeInscription> {
    return this.http
      .get(`/api/codeInscriptions/search/findByCodeAndTypeAndDateUtilisation?code=${code}&type=${type}&date=null`)
      .map((response: Response) => <CodeInscription> response.json()._embedded.codeInscriptions[0])
      .do(data => this.updateCode(data).subscribe(
        rep => rep,
        error => console.log(error)
      ) )
      .catch( error => {
        console.log(error);
        return Observable.throw(error.json);
      } );
  }

  updateCode(codeObj: CodeInscription): Observable<CodeInscription> {

    if (!codeObj) {
      return Observable.empty<CodeInscription>();
    } else {
      const date = new Date();
      codeObj.dateUtilisation = date.toLocaleString('en-GB');

      const body = {
        id: codeObj.id,
        code: codeObj.code,
        type: codeObj.type,
        dateCreation: codeObj.dateCreation,
        dateUtilisation: codeObj.dateUtilisation
      };

      const url = '/api/codeInscriptions';
      const headers = new Headers({'Content-Type': 'application/json'});
      const options = new RequestOptions({headers: headers});

      return this.http
        .post(url, body, options)
        .map((response: Response) => <CodeInscription> response.json())
        .catch(error => {
          console.log(error);
          return Observable.throw(error.json);
        });
    }
  }
}

export interface CodeInscription {
  id: number;
  code: string;
  type: string;
  dateCreation: string;
  dateUtilisation: string;
}
