import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmationService, SelectItem} from 'primeng/primeng';
import {Message} from 'primeng/primeng';

import {CodeService} from '../services/code.service';
import {EtapesAuthService} from '../services/etapes-auth.service';
import {EtapesInfoService} from '../services/etapes-info.service';

import {InscriptionComponent} from '../inscription.component';

@Component({
  templateUrl: './etape1.component.html',
  styleUrls: ['./etape1.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Etape1Component implements OnInit {

  msgs: Message[] = [];
  types: SelectItem[];
  code: String;
  selectedType: string;
  codeOk: Boolean;
  suivantClick = false;

  constructor(
    private codeService: CodeService,
    private router: Router,
    private etapesAuthService: EtapesAuthService,
    private inscriptionComponent: InscriptionComponent,
    private etapesInfoService: EtapesInfoService,
    private confirmationService: ConfirmationService
  ) {
    this.types = [];
    this.types.push({label: 'Administrateur', value: 'admin'});
    this.types.push({label: 'Utilisateur Final', value: 'final'});
    this.types.push({label: 'Consultant', value: 'consultantEstime'});
    this.types.push({label: 'Chef de Projet', value: 'chefProjet'});
    this.code = '';
    this.codeOk = false;
  }

  ngOnInit(): void {
  }

  verifierBtn() {
    this.on();
    this.codeService.searchCode(this.code, this.selectedType)
      .subscribe(
        rep => this.evalReponseVerif(rep),
        error => console.log(error)
      );
  }

  evalReponseVerif(rep: CodeInscription): void {
    if (rep) {
      this.codeOk = true;
      this.showPopUpsCodeOk();
    } else {
      this.showPopUpsCodeNonOk();
    }
    this.off();
  }

  showPopUpsCodeOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Code Accepté !', detail: 'Le code saisi été validé et ne plus être réutilisé'});
    this.msgs.push({severity: 'info', summary: 'Accès Autorisé !', detail: 'Vous pouvez passer maintenant à l\'étape suivante'});
  }

  showPopUpsCodeNonOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Code Refusé !', detail: 'Le code saisi est erroné.'});
  }

  suivant() {
    this.suivantClick = true;
    this.etapesInfoService.type = this.selectedType;
    this.etapesAuthService.setEtape2(true);
    this.inscriptionComponent.setActiveStep(1);
    this.router.navigate(['/inscription/etape2']);
  }

  on() {
    document.getElementById('overlay').style.display = 'block';
  }

  off() {
    document.getElementById('overlay').style.display = 'none';
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

export interface CodeInscription {
  id: number;
  code: string;
  type: string;
  dateCreation: string;
  dateUtilisation: string;
}

