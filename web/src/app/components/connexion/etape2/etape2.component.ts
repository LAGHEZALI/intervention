import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {ConfirmationService, Message} from 'primeng/primeng';
import {Router} from '@angular/router';
import {ConnexionService} from '../services/connexion.service';
import {ConnexionAuthService} from '../services/connexion-auth.service';
import {ConnexionInfoService} from '../services/connexion-info.service';

@Component({
  selector: 'app-etape2',
  templateUrl: './etape2.component.html',
  styleUrls: ['./etape2.component.css']
})
export class Etape2Component implements OnInit {

  msgs: Message[] = [];
  mdpForm: FormGroup;
  msgLogo = 'Confirmez votre identification';
  isLoading = false;
  etapeOk = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private connexionAuthService: ConnexionAuthService,
    private confirmationService: ConfirmationService,
    private connexionService: ConnexionService,
    private connexionInfoService: ConnexionInfoService
  ) { }

  ngOnInit() {
    this.mdpForm = this.fb.group({
      'mdp': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    });
  }

  verifMdp() {
    const reelMdp = this.mdpForm.get('mdp').value;
    const potentialMdp = this.connexionInfoService.getUser().mdp;
    if (reelMdp === potentialMdp) {
      this.etapeOk = true;
      this.router.navigate(['/']);
    } else {
      this.mdpForm.get('mdp').setValue('');
      this.showPopUpsCodeNonOk();
    }
  }

  showPopUpsCodeNonOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Accès Refusé !', detail: 'Le mot de passe est incorrect. Veuillez ressayer...'});
  }

  canDeactivate(): Promise<boolean> {

    return new Promise<boolean>((resolve) => {
      if (this.etapeOk) {
        resolve(true);
      } else {
        this.confirmationService.confirm({
          message: 'Cette action annulera votre tentative de connexion, En êtes-vous sûr ?',
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
      }
    });
  }
}
