import { Injectable } from '@angular/core';
import {CanActivate, CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ConnexionAuthService} from './connexion-auth.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class ConnexionGuardService implements CanActivate, CanDeactivate<CanComponentDeactivate> {

  constructor(
    private connexionAuthService: ConnexionAuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkPermission(url);
  }

  checkPermission(url: string): boolean {
    if (url === '/connexion/etape2') {
      if (this.connexionAuthService.etape2) { return true; }
    }

    // Store the attempted URL for redirecting
    this.connexionAuthService.redirectUrl = url;
    //  if the i dont have permission -> redirect to inscription
    this.router.navigate(['/connexion']);
    return false;
  }

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
