import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ModuleService {

  constructor(
    private http: Http
  ) {}

  getModules(): Observable<Module[]> {
    const url = `/api/modules`;
    return this.http.get(url)
      .map(res => res.json()._embedded.modules)
      .map(module => module.map(this.toModule))
      .catch(this.handleError);
  }

  getModulesBySystemeId(id: number): Observable<Module[]> {
    const url = `/api/modules/search/findBySystemeId?id=${id}`;
    return this.http.get(url)
      .map(res => res.json()._embedded.modules)
      .map(module => module.map(this.toModule))
      .catch(this.handleError);
  }

  addModule(module: Module): Observable<Module> {
    const body = {
      nom: module.nom
    };
    const url = '/api/modules';
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(res => res.json())
      .flatMap((mod: Module) => {
        const bindBody = `/api/systemes/${module.systemeId}`;
        const bindUrl = `/api/modules/${mod.id}/systeme`;
        const bindHeaders = new Headers({'Content-Type': 'text/uri-list'});
        const bindOptions = new RequestOptions({headers: bindHeaders});

        return this.http.put(bindUrl, bindBody, bindOptions)
          .map((res: any) => {
            return mod;
          })
          .catch(this.handleError);
      })
      .catch(this.handleError);
  }

  deleteModule(id: number): Observable<Module> {
    const url = `/api/modules/${id}`;
    return this.http.delete(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateModule(module: Module): Observable<Module> {
    const body = {
      nom: module.nom
    };
    const url = '/api/modules/' + module.id;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.patch(url, body, options)
      .map(res => res.json())
      .flatMap((mod: Module) => {
        const bindBody = `/api/systemes/${module.systemeId}`;
        const bindUrl = `/api/modules/${mod.id}/systeme`;
        const bindHeaders = new Headers({'Content-Type': 'text/uri-list'});
        const bindOptions = new RequestOptions({headers: bindHeaders});

        return this.http.put(bindUrl, bindBody, bindOptions)
          .map((res: any) => {
            return mod;
          })
          .catch(this.handleError);
      })
      .catch(this.handleError);
  }

  /**
   * Convert Module info from the API to our standard/format
   */
  private toModule(module): Module {
    return {
      id: module.id,
      nom: module.nom,
      systemeId: module.systeme.id,
      systemeNom: module.systeme.nom
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
