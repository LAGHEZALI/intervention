import { Injectable } from '@angular/core';
import {CanActivate, CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {EtapesAuthService} from './etapes-auth.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class EtapesGuardService implements CanActivate, CanDeactivate<CanComponentDeactivate> {

  constructor(
    private etapesAuthService: EtapesAuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkPermission(url);
  }

  checkPermission(url: string): boolean {
    if (url === '/inscription/etape2') {
      if (this.etapesAuthService.etape2) { return true; }
    } else if (url === '/inscription/etape3' ) {
      if (this.etapesAuthService.etape3) { return true; }
    } else if (url === '/inscription/etape4' ) {
      if (this.etapesAuthService.etape4) { return true; }
    }

    // Store the attempted URL for redirecting
    this.etapesAuthService.redirectUrl = url;
    //  if the i dont have permission -> redirect to inscription
    this.router.navigate(['/inscription']);
    return false;
  }

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
