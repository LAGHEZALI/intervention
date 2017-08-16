import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Response, Headers} from '@angular/http';

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) {}

  getUsers(): Observable<User[]> {
    const url = `/api/users`;
    return this.http.get(url)
      .map(res => res.json()._embedded.users)
      .map(user => user.map(this.toUser))
      .catch(this.handleError);
  }

  addUser(userBody: User): Observable<User> {
    const body = userBody;
    const url = '/api/users';
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(res => res.json())
      .map(user => this.toUser(user))
      .catch(this.handleError);
  }

  updateUser (userBody: User): Observable<User> {
    const body = userBody;
    const url = `/api/users/${userBody.id}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.patch(url, body, options)
      .map(res => res.json())
      .map(user => this.toUser(user))
      .catch(this.handleError);
  }

  deleteUser (id: number): Observable<any> {
    const url = `/api/users/${id}`;
    return this.http.delete(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private toUser(user): User {
    let x = '';
    let y = user.societe;

    if (user.type !== 'consultantEstime' && user.type !== 'consultantReel') {
      y = 'SNRT';
    }

    if (user.type === 'admin') {
      x = 'Administrateur';
    } else if (user.type === 'final') {
      x = 'Utilisateur Final';
    } else if (user.type === 'consultantEstime') {
      x = 'Consultant Estimé';
    } else if (user.type === 'consultantReel') {
      x = 'Consultant Réel';
    } else if (user.type === 'chefProjet') {
      x = 'Chef de Projet';
    }

    return {
      id: user.id,
      type: user.type,
      prettyType: x,
      nom: user.nom,
      prenom: user.prenom,
      pseudo: user.pseudo,
      mdp: user.mdp,
      societe: y
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
