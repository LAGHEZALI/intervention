import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {ConfirmationService, Message} from 'primeng/primeng';
import {Router} from '@angular/router';
import {ConnexionService} from '../services/connexion.service';
import {ConnexionAuthService} from '../services/connexion-auth.service';
import {ConnexionInfoService} from '../services/connexion-info.service';

@Component({
  selector: 'app-etape1',
  templateUrl: './etape1.component.html',
  styleUrls: ['./etape1.component.css']
})
export class Etape1Component implements OnInit {

  msgs: Message[] = [];
  urlImg = '../../../../assets/images/snrt-logo-no-text.png';
  urlGif = '../../../../assets/images/snrt-loading-fast.gif';
  pseudoForm: FormGroup;
  msgLogo = 'Identifiez-vous';
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
    this.pseudoForm = this.fb.group({
      'pseudo': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    });
  }

  verifPseudo() {
    this.isLoading = true;
    this.on();
    this.connexionService.verifPseudo(this.pseudoForm.get('pseudo').value)
      .subscribe(
        rep => this.evalReponseVerif(rep),
        error => console.log(error)
      );
  }

  evalReponseVerif(rep) {
    if (rep) {
      this.connexionInfoService.setId(rep.id);
      this.connexionInfoService.setmdp(rep.mdp);
      this.connexionInfoService.setType(rep.type);
      this.etapeOk = true;
      this.connexionAuthService.setEtape2(true);
      this.router.navigate(['/connexion/etape2']);

    } else {
      this.pseudoForm.get('pseudo').setValue('');
      this.showPopUpsCodeNonOk();
    }
    this.off();
  }

  showPopUpsCodeNonOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Accès Refusé !', detail: 'Ce pseudo n\'exite pas. Veuillez ressayer...'});
  }

  on() {
    this.msgLogo = 'Vérification du Pseudo... Patientez SVP';
  }

  off() {
    this.isLoading = false;
    this.msgLogo = 'Identifiez-vous';
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
