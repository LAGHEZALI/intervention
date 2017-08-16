import { Component, OnInit } from '@angular/core';
import {CodeService} from '../../inscription/services/code.service';
import {MenuItem, Message, SelectItem} from 'primeng/primeng';
import {LoadingService} from '../../../shared/services/loading.service';

@Component({
  selector: 'app-liste-code',
  templateUrl: './liste-code.component.html',
  styleUrls: ['./liste-code.component.css']
})
export class ListeCodeComponent implements OnInit {

  codes: CodeInscription[];
  msgs: Message[];
  types: SelectItem[];

  selectedCodeInscription: CodeInscription = {id: 0, code: '', type: '', dateCreation: '', dateUtilisation: ''};
  items: MenuItem[];

  constructor(
    private CodeService: CodeService,
    private LoadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getStartingInfo();
    this.items = [];
    this.items = [
      {label: 'Copier Code', icon: 'fa-clipboard', command: (event) => this.copier()}
    ];
    this.types = [];
    this.types.push({label: 'Tous les Types', value: null});
    this.types.push({label: 'Administrateur', value: 'Administrateur'});
    this.types.push({label: 'Utilisateur Final', value: 'Utilisateur Final'});
    this.types.push({label: 'Consultant Estimé', value: 'Consultant Estimé'});
    this.types.push({label: 'Consultant Réel', value: 'Consultant Réel'});
    this.types.push({label: 'Chef de Projet', value: 'Chef de Projet'});
  }

  getStartingInfo() {
    this.LoadingService.start();
    this.CodeService.getAllCodeInscription().subscribe(
      codes => {
        this.codes = codes;
        this.LoadingService.complete();
      },
      error => {
        console.log(error);
        this.LoadingService.reset();
        this.showPopUpsErreurStartingInfo(error);
      }
    );
  }

  copier () {
    (<HTMLInputElement>document.getElementById('clip')).select();
    document.execCommand('copy');
  }

  refresh() {
    this.getStartingInfo();
  }

  showPopUpsErreurStartingInfo(error: string): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
  }
}
