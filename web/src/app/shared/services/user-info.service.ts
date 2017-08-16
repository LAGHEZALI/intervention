import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class UserInfoService {

  private id: number =  null;
  private type: string = null;

  constructor(
    private http: Http,
    private router: Router
  ) {}

  connect(id: number, type: string) {
    this.id = id;
    this.type = type;
    this.router.navigate([`/${this.type}-dashboard/accueil`]);
  }

  disconnect() {
    this.id = null;
    this.type = null;
    this.router.navigate([`/accueil`]);
  }

  isConnected() { return (this.id !== null && this.type !== null); }

  getType() { return this.type; }

  getId() { return this.id; }

  getUserInfo(): Observable<User> {
    const url = `/api/users/${this.getId()}`;
    return this.http .get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateUser(body: User): Observable<User>  {

    const url = `/api/users/${this.getId()}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.patch(url, body, options)
      .map(res => res.json())
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
