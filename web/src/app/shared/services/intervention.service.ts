import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {UserInfoService} from './user-info.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class InterventionService {

  constructor(
    private http: Http,
    private userInfoService: UserInfoService
  ) {}

  getInterventions(): Observable<Intervention[]> {
    const url = `/api/interventions`;
    return this.http.get(url)
      .map(res => res.json()._embedded.interventions)
      .map(intervention => intervention.map(this.toIntervention))
      .catch(this.handleError);
  }

  getInterventionsByUserId(userId: number): Observable<Intervention[]> {
    const url = `/api/interventions/search/findByUserId?id=${userId}`;
    return this.http.get(url)
      .map(res => res.json()._embedded.interventions)
      .map(intervention => intervention.map(this.toIntervention))
      .catch(this.handleError);
  }

  addIntervention(versionDoc: string, moduleId: number): Observable<Intervention> {
    const date = new Date();
    const body = {
      versionDoc: versionDoc,
      dateDerniereMaj: date.toLocaleString('en-GB')
    };

    const bindHeaders = new Headers({'Content-Type': 'text/uri-list'});
    const bindOptions = new RequestOptions({headers: bindHeaders});

    const url = '/api/interventions';
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(res => res.json())
      .flatMap((inter: Intervention) => {
        const bindBodyUser = `/api/users/${this.userInfoService.getId()}`;
        const bindUrlUser = `/api/interventions/${inter.id}/user`;

        return this.http.put(bindUrlUser, bindBodyUser, bindOptions)
          .map((res: any) => {
            return inter;
          })
          .flatMap((data: any) => {
            const bindBodyEtape = `/api/etapes/1`;
            const bindUrlEtape = `/api/interventions/${inter.id}/etape`;
            return this.http.put(bindUrlEtape, bindBodyEtape, bindOptions)
              .map((res: any) => {
                return inter;
              })
              .flatMap( (data2: any) => {
                const bindBodyModule = `/api/modules/${moduleId}`;
                const bindUrlModule = `/api/interventions/${inter.id}/module`;
                return this.http.put(bindUrlModule, bindBodyModule, bindOptions)
                  .map((res: any) => {
                    return inter;
                  })
                  .flatMap( (data3: any) => {
                    const interUrl = `api/interventions/search/findById?id=${inter.id}`;
                    return this.http.get(interUrl)
                      .map(res => res.json()._embedded.interventions)
                      .map(intervention => intervention.map(this.toIntervention))
                      .catch(this.handleError);
                  })
                  .catch(this.handleError);
              })
              .catch(this.handleError);
          })
          .catch(this.handleError);
      })
      .catch(this.handleError);
  }

  deleteIntervention(id: number): Observable<Intervention> {
    const url = `/api/interventions/${id}`;
    return this.http.delete(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateIntervention(id: number, versionDoc: string, moduleId: number): Observable<Intervention> {
    const body = {
      versionDoc: versionDoc,
    };

    const url = '/api/interventions/' + id;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.patch(url, body, options)
      .map(res => res.json())
      .flatMap( (inter: any) => {
        const bindBodyModule = `/api/modules/${moduleId}`;
        const bindUrlModule = `/api/interventions/${inter.id}/module`;
        const bindHeadersModule = new Headers({'Content-Type': 'text/uri-list'});
        const bindOptionsModule = new RequestOptions({headers: bindHeadersModule});
        return this.http.put(bindUrlModule, bindBodyModule, bindOptionsModule)
          .map((res: any) => {
            return inter;
          })
          .flatMap( (data3: any) => {
            const interUrl = `api/interventions/search/findById?id=${inter.id}`;
            return this.http.get(interUrl)
              .map(res => res.json()._embedded.interventions)
              .map(intervention => intervention.map(this.toIntervention))
              .catch(this.handleError);
          })
          .catch(this.handleError);
      })
      .catch(this.handleError);
  }

  /**
   * Convert intervention info from the API to our standard/format
   */
  private toIntervention(intervention): Intervention {
    return {
      id: intervention.id,
      versionDoc: intervention.versionDoc,
      dateDerniereMaj: intervention.dateDerniereMaj,
      moduleNom: intervention.module.nom,
      moduleId: intervention.module.id,
      etapeNom: intervention.etape.nom,
      etapeId: intervention.etape.id,
      userNom: intervention.user.nom + intervention.user.prenom,
      userId: intervention.user.id
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
