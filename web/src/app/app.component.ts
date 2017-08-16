import { Component } from '@angular/core';
import {LoadingBarService} from 'ng2-loading-bar';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  height = 10;
  color = '#e34234';
  runInterval = 500;

  msgs: Message[] = [];

  constructor(
    private router: Router,
    private loadingBarService: LoadingBarService
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.emitStart();
    }
    if (event instanceof NavigationEnd) {
      this.emitComplete();
    }

    if (event instanceof NavigationCancel) {
      this.emitReset();
    }
    if (event instanceof NavigationError) {
      this.emitReset();
    }
  }

  emitStart() {
    this.loadingBarService.start();
  }

  emitReset() {
    this.loadingBarService.reset();
  }

  emitComplete() {
    this.loadingBarService.complete();
  }

  on() {
    document.getElementById('overlay').style.display = 'block';
  }

  off() {
    document.getElementById('overlay').style.display = 'none';
  }
}
