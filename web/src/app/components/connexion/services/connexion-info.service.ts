import {Injectable} from '@angular/core';

@Injectable()
export class ConnexionInfoService {

  user: User = null;

  constructor() {
    this.user = null;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  clearUser() {
    this.user = null;
  }
}

interface User {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  mdp: string;
}
