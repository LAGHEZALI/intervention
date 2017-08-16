import { Injectable } from '@angular/core';
import {CanActivate, CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserInfoService} from '../../../shared/services/user-info.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class AdminDashboardGuardService implements CanActivate, CanDeactivate<CanComponentDeactivate> {

  constructor(
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkPermission(url);
  }

  checkPermission(url: string): boolean {

    if (this.userInfoService.isConnected()) { return true; }

    //  if the i dont have permission -> redirect to connexion
    this.router.navigate(['/connexion']);
    return false;
  }

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
