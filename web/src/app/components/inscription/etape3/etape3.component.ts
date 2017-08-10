import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import {ConfirmationService, Message} from 'primeng/primeng';

import {EtapesInfoService} from '../services/etapes-info.service';
import {EtapesAuthService} from '../services/etapes-auth.service';

import {InscriptionComponent} from '../inscription.component';

@Component({
  selector: 'app-etape3',
  templateUrl: './etape3.component.html',
  styleUrls: ['./etape3.component.css']
})
export class Etape3Component implements OnInit {

  persoForm: FormGroup;
  msgs: Message[] = [];
  suivantClick = false;

  constructor(
    private router: Router,
    private etapesInfoService: EtapesInfoService,
    private etapesAuthService: EtapesAuthService,
    private inscriptionComponent: InscriptionComponent,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.persoForm = this.fb.group({
      'nom': new FormControl('', Validators.compose([Validators.required])),
      'prenom': new FormControl('', Validators.compose([Validators.required]))
    });
  }

  suivant() {
    this.suivantClick = true;
    this.etapesInfoService.nom = this.persoForm.get('nom').value;
    this.etapesInfoService.prenom = this.persoForm.get('prenom').value;

    this.etapesAuthService.setEtape4(true);
    this.inscriptionComponent.setActiveStep(3);
    this.router.navigate(['/inscription/etape4']);
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
