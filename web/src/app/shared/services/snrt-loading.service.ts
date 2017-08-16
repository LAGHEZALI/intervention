import {Injectable} from '@angular/core';

@Injectable()
export class SnrtLoadingService {

  on() {
    document.getElementById('overlay').style.display = 'block';
  }

  off() {
    document.getElementById('overlay').style.display = 'none';
  }
}

