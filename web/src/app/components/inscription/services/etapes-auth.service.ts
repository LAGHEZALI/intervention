import {Injectable} from '@angular/core';

@Injectable()
export class EtapesAuthService {
  etape2 = false;
  etape3 = false;
  etape4 = false;

  redirectUrl: string;

  setEtape2(flag: boolean) {
    this.etape2 = flag;
  }

  setEtape3(flag: boolean) {
    this.etape3 = flag;
  }

  setEtape4(flag: boolean) {
    this.etape4 = flag;
  }
}
