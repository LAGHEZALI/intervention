import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Response, Headers} from '@angular/http';

@Injectable()
export class SystemeService {

  constructor(
    private http: Http
  ) {}

  getSystemes(): Observable<Systeme[]> {
    const url = `/api/systemes`;
    return this.http.get(url)
      .map(res => res.json()._embedded.systemes)
      .map(systeme => systeme.map(this.toSysteme))
      .catch(this.handleError);
  }

  addSysteme(nom: string): Observable<Systeme> {
    const body = {
      nom: nom
    };
    const url = '/api/systemes';
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateSysteme (systeme: Systeme): Observable<Systeme> {
    const body = {
      nom: systeme.nom
    };
    const url = `/api/systemes/${systeme.id}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.patch(url, body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteSysteme (id: number): Observable<any> {
    const url = `/api/systemes/${id}`;
    return this.http.delete(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Convert intervention info from the API to our standard/format
   */
  private toSysteme(systeme): Systeme {
    return {
      id: systeme.id,
      nom: systeme.nom
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
