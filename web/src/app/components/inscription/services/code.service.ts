import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response , Headers} from '@angular/http';
import {CodeInscription} from '../etape1/etape1.component';

import {Observable } from 'rxjs/Observable';

@Injectable()
export class CodeService {

  constructor(
    private http: Http
  ) { }

  getAllCodeInscription(): Observable<CodeInscription[]> {
    const url = '/api/codeInscriptions';
    return this.http.get(url)
      .map(res => res.json()._embedded.codeInscriptions)
      .map(codeInscriptions => codeInscriptions.map(this.toCodeInscription))
      .catch(this.handleError);
  }

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

  generateCode(type: string): Observable<string> {
    const date = new Date();
    const body = {
      code: this.generateRandom(),
      type: type,
      dateCreation: date.toLocaleString('en-GB'),
      dateUtilisation: 'null'
    };
    const url = '/api/codeInscriptions';
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(res => res.json().code)
      .catch(this.handleError);
  }

  generateRandom(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 3; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += '-';
    for (let i = 0; i < 3; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += '-';
    for (let i = 0; i < 3; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
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

  /**
   * Convert codeInscription info from the API to our standard/format
   */
  private toCodeInscription(codeInscription): CodeInscription {
    let x = '';
    let y = codeInscription.dateUtilisation;

    if (codeInscription.dateUtilisation === 'null') {
      y = 'Pas encore Utilisé';
    }

    if (codeInscription.type === 'admin') {
      x = 'Administrateur';
    } else if (codeInscription.type === 'final') {
      x = 'Utilisateur Final';
    } else if (codeInscription.type === 'consultantEstime') {
      x = 'Consultant Estimé';
    } else if (codeInscription.type === 'consultantReel') {
      x = 'Consultant Réel';
    } else if (codeInscription.type === 'chefProjet') {
      x = 'Chef de Projet';
    }

    return {
      id: codeInscription.id,
      code: codeInscription.code,
      type: x,
      dateCreation: codeInscription.dateCreation,
      dateUtilisation: y
    };
  }

  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      const body   = err.json() || '';
      const error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }
}
