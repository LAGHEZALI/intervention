import {Injectable} from '@angular/core';

@Injectable()
export class ConnexionInfoService {

  private id: number = null;
  private mdp: string = null;
  private type: string = null;

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setmdp(mdp: string) {
    this.mdp = mdp;
  }

  getmdp() {
    return this.mdp;
  }

  getType() {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }

  clearUser() {
    this.id = null;
    this.mdp = null;
    this.type = null;
  }
}
