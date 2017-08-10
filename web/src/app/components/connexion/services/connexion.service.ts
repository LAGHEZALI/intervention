import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

@Injectable()
export class ConnexionService {

  constructor(
    private http: Http
  ) { }

  verifPseudo(pseudo: string): Observable<User> {

    return this.http
      .get(`/api/users/search/findByPseudo?pseudo=${pseudo}`)
      .map((response: Response) => <User> response.json()._embedded.users[0])
      .catch( error => {
        console.log(error);
        return Observable.throw(error.json);
      } );
  }
}

interface User {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  mdp: string;
}
