import {Injectable} from '@angular/core';
import {LoadingBarService} from 'ng2-loading-bar';
import {AppComponent} from '../../app.component';

@Injectable()
export class LoadingService {

  constructor(
    private loadingBarService: LoadingBarService,
    private appComponent: AppComponent
  ) {}

  start() {
    this.loadingBarService.start();
    this.appComponent.on();
  }

  reset() {
    this.loadingBarService.reset();
    this.appComponent.off();
  }

  complete() {
    this.loadingBarService.complete();
    this.appComponent.off();
  }
}
