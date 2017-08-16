import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../../../shared/services/user-info.service';

import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {ConfirmationService, Message} from 'primeng/primeng';

import {LoadingService} from '../../../shared/services/loading.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {


  msgs: Message[] = [];

  type = '';
  nom = '';
  prenom = '';
  pseudo = '';
  mdp = '';

  loadingOk= false;

  compteForm: FormGroup;

  constructor(
    private userInfoService: UserInfoService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getStartingInfo();
  }

  getStartingInfo() {
    this.loadingService.start();
    this.userInfoService.getUserInfo().subscribe(
        rep => {
          this.type = rep.type;
          this.nom = rep.nom;
          this.prenom = rep.prenom;
          this.pseudo = rep.pseudo;
          this.mdp = rep.mdp;
          this.buildForm();
          this.loadingOk = true;
          this.loadingService.complete();
        },
        error => {
          console.log(error);
          this.loadingService.reset();
        }
      );
  }

  buildForm() {
    this.compteForm = this.fb.group({
      'pseudo': new FormControl(this.pseudo, Validators.compose([Validators.required, Validators.minLength(5)])),
      'mdp': new FormControl(this.mdp, Validators.compose([Validators.required, Validators.minLength(8)])),
      'nom': new FormControl(this.nom, Validators.compose([Validators.required])),
      'prenom': new FormControl(this.prenom, Validators.compose([Validators.required])),
    });
  }

  sauvegarder() {
    this.loadingService.start();
    const user: User = {
      nom: this.compteForm.controls['nom'].value,
      prenom: this.compteForm.controls['prenom'].value,
      pseudo: this.compteForm.controls['pseudo'].value,
      mdp: this.compteForm.controls['mdp'].value,
    };
    this.userInfoService.updateUser(user).subscribe(
      rep => {
        this.compteForm.reset();
        this.type = rep.type;
        this.nom = rep.nom;
        this.prenom = rep.prenom;
        this.pseudo = rep.pseudo;
        this.mdp = rep.mdp;
        this.compteForm.controls['nom'].setValue(this.nom);
        this.compteForm.controls['prenom'].setValue(this.prenom);
        this.compteForm.controls['pseudo'].setValue(this.pseudo);
        this.compteForm.controls['mdp'].setValue(this.mdp);
        this.loadingService.complete();
        this.showPopUpsCodeOk();
      },
      error => {
        console.log(error);
        this.loadingService.reset();
        this.showPopUpsCodeNonOk(error);
      }
    );
  }

  restaurer() {
    this.loadingService.start();
    this.userInfoService.getUserInfo().subscribe(
        rep => {
          this.type = rep.type;
          this.nom = rep.nom;
          this.prenom = rep.prenom;
          this.pseudo = rep.pseudo;
          this.mdp = rep.mdp;
          this.compteForm.controls['nom'].setValue(this.nom);
          this.compteForm.controls['prenom'].setValue(this.prenom);
          this.compteForm.controls['pseudo'].setValue(this.pseudo);
          this.compteForm.controls['mdp'].setValue(this.mdp);
          this.loadingService.complete();
          this.showPopUpsRestaureOk();
        },
        error => {
        console.log(error);
        this.loadingService.reset();
        this.showPopUpsCodeNonOk(error);
      }
      );
  }

  showPopUpsRestaureOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Réstauration Réussite !',
      detail: 'Vos données ont été restaurées depuis la dernière sauvegarde'});
  }

  showPopUpsCodeOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Sauvegarde Réussite !', detail: 'Votre Compte a été mis à jour'});
  }

  showPopUpsCodeNonOk(error: string): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Sauvegarde Annulé !', detail: `Erreur: ${error}`});
  }

  canDeactivate(): Promise<boolean> {

    return new Promise<boolean>((resolve) => {
      if (!this.compteForm.dirty) {
        resolve(true);
      } else {
        this.confirmationService.confirm({
          message: 'Sauvegarder les changements ?',
          header: 'Pas si vite !',
          icon: 'fa fa-question-circle',
          accept: () => {
            this.sauvegarder();
            resolve(false);
          },
          reject: () => {
            resolve(true);
          }
        });
      }
    });
  }
}
