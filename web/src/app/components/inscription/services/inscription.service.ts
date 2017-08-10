import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

@Injectable()
export class InscriptionService {

  constructor(
    private http: Http
  ) { }

  ajouterUtilisateur(body: User, type: string, societe: string): Observable<any> {

     return this.creationNormalUser(body, type, societe);
  }

  creationNormalUser(body: User, type: string, societe: string): Observable<any> {
    const url = '/api/users';
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http
      .post(url, body, options)
      .map((response: Response) => <any> response.json())
      .do(data => this.creationTypedUser(data, type, societe).subscribe(
        rep => rep,
        error => console.log(error)
      ) )
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json);
      });
  }

  creationTypedUser(normalUser: any, type: string, paramSociete: string): Observable<any> {
    const url = '/api/' + type + 's' ;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    let body = {};
    if (paramSociete !== '') {
      body = {societe: paramSociete};
    }

    return this.http
      .post(url, body, options)
      .map((response: Response) => <any> response.json())
      .do(typedUser => this.bindUserNormalToTyped(typedUser, type, normalUser).subscribe(
        rep => rep,
        error => console.log(error)
      ) )
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json);
      });
  }

  bindUserNormalToTyped(typedUser: any, type: string, normalUser: any): Observable<any> {

    const url = '/api/' + type + 's/' + typedUser.id + '/user' ;
    const headers = new Headers({'Content-Type': 'text/uri-list'});
    const options = new RequestOptions({headers: headers});

    const body = 'http://localhost:8080/users/' +  normalUser.id;

    return this.http
      .put(url, body, options)
      .map((response: Response) => <any> response.json())
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json);
      });
  }

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
