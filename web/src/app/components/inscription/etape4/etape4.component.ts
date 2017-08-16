import { Component, OnInit } from '@angular/core';
import {ConfirmationService, Message} from 'primeng/primeng';

import {EtapesInfoService} from '../services/etapes-info.service';
import {InscriptionService} from '../services/inscription.service';

import {LoadingService} from '../../../shared/services/loading.service';


@Component({
  selector: 'app-etape4',
  templateUrl: './etape4.component.html',
  styleUrls: ['./etape4.component.css']
})
export class Etape4Component implements OnInit {

  msgs: Message[] = [];
  type: string;
  pseudo: string;
  mdp: string;
  nom: string;
  prenom: string;
  societe: string;

  etapeOk: boolean;
  prettyType: string;
  suivantClick = false;

  constructor(
    private etapesInfoService: EtapesInfoService,
    private inscriptionService: InscriptionService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.type = this.etapesInfoService.type;
    this.pseudo = this.etapesInfoService.pseudo;
    this.mdp = this.etapesInfoService.mdp;
    this.nom = this.etapesInfoService.nom;
    this.prenom = this.etapesInfoService.prenom;
    this.societe = this.etapesInfoService.societe;
    this.prettyTypes();
  }

  isConsultant() {
    return ( this.type === 'consultantReel' || this.type === 'consultantEstime');
  }

  getCurrentUser(): User {
    return (
      {
        id: null,
        type: this.type,
        nom: this.nom,
        prenom: this.prenom,
        pseudo: this.pseudo,
        mdp: this.mdp,
        societe: this.societe
      }
    );
  }

  terminer() {
    this.loadingService.start();
    this.inscriptionService.ajouterUtilisateur(this.getCurrentUser()).subscribe(
      rep => {
        this.etapeOk = true;
        this.suivantClick = true;
        this.loadingService.complete();
        this.showPopUpsInscriptionOk();
      },
      error => {
        console.log(error);
        this.loadingService.reset();
        this.showPopUpsInscriptionNonOk(error);
      }
    );
  }

  showPopUpsInscriptionOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Bravo !', detail: 'Votre Inscription a été terminer avec succes'});
    this.msgs.push({severity: 'info', summary: 'Passez à l\'action !', detail: 'Vous pouvez vous connecter désormais'});
  }

  showPopUpsInscriptionNonOk(error: string): void {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Oups !', detail: 'L\'inscription a échoué'});
    this.msgs.push({severity: 'error', summary: 'Erreur !', detail: error});
  }

  prettyTypes() {
    if (this.type === 'admin') {
      this.prettyType = 'Administrateur';
    } else if (this.type === 'final') {
      this.prettyType = 'Utilisateur Final';
    } else if (this.type === 'consultantEstime') {
      this.prettyType = 'Consultant';
    } else if (this.type === 'chefProjet') {
      this.prettyType = 'Chef de Projet';
    }
  }

  canDeactivate(): Promise<boolean> {

    return new Promise<boolean>((resolve) => {
      if (this.suivantClick) {
        resolve(true);
      }
      this.confirmationService.confirm({
        message: 'Cette action annulera votre Inscription, En êtes-vous sûr ?',
        header: 'Pas si vite !',
        icon: 'fa fa-question-circle',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          this.msgs = [{severity: 'info', summary: 'Bonne decision !', detail: 'Vous pouvez continuer...'}];
          resolve(false);
        }
      });
    });
  }
}
