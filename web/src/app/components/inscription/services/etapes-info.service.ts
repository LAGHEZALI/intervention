import {Injectable} from '@angular/core';

@Injectable()
export class EtapesInfoService {

  type: string;
  pseudo: string;
  mdp: string;
  nom: string;
  prenom: string;
  societe: string;

  constructor() {
    this.type = '';
    this.pseudo = '';
    this.mdp = '';
    this.nom = '';
    this.prenom = '';
    this.societe = '';
  }

}
