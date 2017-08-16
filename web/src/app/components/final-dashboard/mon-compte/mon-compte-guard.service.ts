import { Injectable } from '@angular/core';
import {CanActivate, CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserInfoService} from '../../../shared/services/user-info.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class MonCompteGuardService implements CanDeactivate<CanComponentDeactivate> {

  constructor(
  ) {}

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
