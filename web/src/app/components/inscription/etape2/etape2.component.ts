import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {ConfirmationService, Message} from 'primeng/primeng';

import {EtapesInfoService} from '../services/etapes-info.service';
import {EtapesAuthService} from '../services/etapes-auth.service';
import {InscriptionService} from '../services/inscription.service';

import {InscriptionComponent} from '../inscription.component';

@Component({
  selector: 'app-etape2',
  templateUrl: './etape2.component.html',
  styleUrls: ['./etape2.component.css']
})
export class Etape2Component implements OnInit {

  type: string;

  msgs: Message[] = [];

  compteForm: FormGroup;

  etapeOk: boolean;

  suivantClick = false;

  constructor(
    private router: Router,
    private etapesInfoService: EtapesInfoService,
    private etapesAuthService: EtapesAuthService,
    private inscriptionComponent: InscriptionComponent,
    private fb: FormBuilder,
    private inscriptionService: InscriptionService,
    private confirmationService: ConfirmationService
  ) {
    this.type = this.etapesInfoService.type;
  }

  ngOnInit() {
    if (this.estConsultant()) {
      this.compteForm = this.fb.group({
        'pseudo': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
        'mdp': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
        'societe': new FormControl('', Validators.compose([Validators.required]))
      });
    } else {
      this.compteForm = this.fb.group({
        'pseudo': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
        'mdp': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
      });
    }
  }

  verifPseudo() {
    this.on();
    this.inscriptionService.verifPseudo(this.compteForm.get('pseudo').value)
      .subscribe(
        rep => this.evalReponseVerif(rep),
        error => console.log(error)
      );
  }

  evalReponseVerif(rep) {
    if (!rep) {
      this.etapeOk = true;
      this.showPopUpsCodeOk();
    } else {
      this.showPopUpsCodeNonOk();
    }
    this.off();
  }

  suivant() {
    this.suivantClick = true;
    this.etapesInfoService.pseudo = this.compteForm.get('pseudo').value;
    this.etapesInfoService.mdp = this.compteForm.get('mdp').value;
    if (this.estConsultant()) {
      this.etapesInfoService.societe = this.compteForm.get('societe').value;
    }

    this.etapesAuthService.setEtape3(true);
    this.inscriptionComponent.setActiveStep(2);
    this.router.navigate(['/inscription/etape3']);
  }

  estConsultant() {
    return (this.type === 'consultantEstime');
  }

  showPopUpsCodeOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Pseudo valable !', detail: 'Vous êtes le premier à utiliser ce pseudo'});
    this.msgs.push({severity: 'info', summary: 'Accès Autorisé !', detail: 'Vous pouvez passer maintenant à l\'étape suivante'});
  }

  showPopUpsCodeNonOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Pseudo Refusé !', detail: 'Ce pseudo n\'est pas tolérable, c\'est déjà pris.'});
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
