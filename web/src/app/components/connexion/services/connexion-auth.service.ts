import {Injectable} from '@angular/core';

@Injectable()
export class ConnexionAuthService {
  etape2 = false;

  redirectUrl: string;

  setEtape2(flag: boolean) {
    this.etape2 = flag;
  }
}
