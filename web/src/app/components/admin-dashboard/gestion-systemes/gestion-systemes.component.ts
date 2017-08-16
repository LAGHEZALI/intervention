import { Component, OnInit } from '@angular/core';
import {SystemeService} from '../../../shared/services/systeme.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-gestion-systemes',
  templateUrl: './gestion-systemes.component.html',
  styleUrls: ['./gestion-systemes.component.css']
})
export class GestionSystemesComponent implements OnInit {

  msgs: Message[];

  displayAddDialog: boolean;
  displayEditDialog: boolean;

  systeme: Systeme = {};

  selectedSysteme: Systeme;

  newSysteme: boolean;

  systemes: Systeme[];

  constructor(
    private systemeService: SystemeService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getStartingInfo();
  }

  getStartingInfo() {
    this.loadingService.start();
    this.systemeService.getSystemes().subscribe(
      systemes => {
        this.systemes = systemes;
        this.loadingService.complete();
      },
      error => {
        console.log(error);
        this.loadingService.reset();
        this.showPopUpsErreurStartingInfo(error);
      }
    );
  }

  showDialogToAdd() {
    this.newSysteme = true;
    this.systeme = {};
    this.displayAddDialog = true;
  }

  refresh() {
    this.loadingService.start();
    this.systemeService.getSystemes().subscribe(
      systemes => {
        this.systemes = systemes;
        this.loadingService.complete();
      },
      error => {
        console.log(error);
        this.loadingService.reset();
        this.showPopUpsErreurStartingInfo(error);
      }
    );
  }

  save() {
    this.displayAddDialog = false;
    this.loadingService.start();
    this.systemeService.addSysteme(this.systeme.nom).subscribe(
      systeme => {
        const systemes = [...this.systemes];
        systemes.push(<Systeme> systeme);
        this.systemes = systemes;
        this.systeme = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Sauvegarde terminée !', detail: `Le système a été ajouté avec succès`});
      },
      error => {
        this.systeme = null;
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  annuler() {
    this.systeme = null;
    this.displayAddDialog = false;
    this.displayEditDialog = false;
  }

  delete() {
    this.displayEditDialog = false;
    this.loadingService.start();
    this.systemeService.deleteSysteme(this.selectedSysteme.id).subscribe(
      rep => {
        const index = this.findSelectedSystemeIndex();
        this.systemes = this.systemes.filter((val, i) => i !== index);
        this.systeme = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Suppression terminée !', detail: `Le système a été supprimé avec succès`});
      },
      error => {
        this.systeme = null;
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  update() {
    this.displayEditDialog = false;
    this.loadingService.start();
    this.systemeService.updateSysteme(this.systeme).subscribe(
      systeme => {
        const systemes = [...this.systemes];
        systemes[this.findSelectedSystemeIndex()] = <Systeme> systeme;
        this.systemes = systemes;
        this.systeme = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Sauvegarde terminée !', detail: `Le système a été mis à jour avec succès`});
      },
      error => {
        this.systeme = null;
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  onRowSelect(event) {
    this.newSysteme = false;
    this.systeme = this.cloneSysteme(event.data);
    this.displayEditDialog = true;
  }

  cloneSysteme(c: Systeme): Systeme {
    const systeme = {};
    for (const prop in c) {
      if (c.hasOwnProperty(prop)) {
        systeme[prop] = c[prop];

      }
    }
    return systeme;
  }

  findSelectedSystemeIndex(): number {
    return this.systemes.indexOf(this.selectedSysteme);
  }

  showPopUpsErreurStartingInfo(error: string): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
  }

}
