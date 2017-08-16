import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

@Injectable()
export class InscriptionService {

  constructor(
    private http: Http
  ) { }

  ajouterUtilisateur(body: User): Observable<User> {
    const url = '/api/users';
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  verifPseudo(pseudo: string): Observable<User> {
    const url = `/api/users/search/findByPseudo?pseudo=${pseudo}`;
    return this.http .get(url)
      .map(res => res.json()._embedded.users[0])
      .catch(this.handleError);
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
