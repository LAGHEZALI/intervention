import { Component, OnInit } from '@angular/core';
import {Message, SelectItem} from 'primeng/primeng';
import {InterventionService} from '../../../shared/services/intervention.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {UserInfoService} from '../../../shared/services/user-info.service';
import {ModuleService} from '../../../shared/services/module.service';

@Component({
  selector: 'app-intervenions',
  templateUrl: './intervenions.component.html',
  styleUrls: ['./intervenions.component.css']
})
export class IntervenionsComponent implements OnInit {

  msgs: Message[];
  etapesTable: SelectItem[];
  modulesAdd: SelectItem[];

  displayAddDialog: boolean;
  displayEditDialog: boolean;

  intervention: Intervention = {};

  selectedIntervention: Intervention;
  selectedModule: string;

  newIntervention: boolean;

  interventions: Intervention[];

  constructor(
    private interventionService: InterventionService,
    private loadingService: LoadingService,
    private userInfoService: UserInfoService,
    private moduleService: ModuleService
  ) { }

  ngOnInit() {
    this.setSelectItems();
    this.getStartingInfo();
  }

  setSelectItems() {
    this.etapesTable = [];
    this.etapesTable.push({label: 'Toutes les étapes', value: null});
    this.etapesTable.push({label: 'Etape 0: Intervention', value: 'intervention'});
    this.etapesTable.push({label: 'Etape 1: Besoins', value: 'besoins'});
    this.etapesTable.push({label: 'Etape 2: Estimations', value: 'estimations'});
    this.etapesTable.push({label: 'Etape 3: Suivi', value: 'suivi'});
    this.etapesTable.push({label: 'Etape 4: Tests', value: 'tests'});
  }

  getStartingInfo() {
    this.loadingService.start();
    this.interventionService.getInterventionsByUserId(this.userInfoService.getId()).subscribe(
      interventions => {
        this.interventions = interventions;
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

    this.loadingService.start();
    this.moduleService.getModules().subscribe(
      modules => {
        this.modulesAdd = [];
        for (const module of modules) {
          this.modulesAdd.push({label: module.nom, value: module.id});
        }
        this.selectedModule = this.modulesAdd[0].value;
        this.newIntervention = true;
        this.intervention = {};
        this.displayAddDialog = true;
        this.loadingService.complete();
      },
      error => {
        console.log(error);
        this.loadingService.reset();
        this.showPopUpsErreurStartingInfo(error);
      }
    );
  }

  refresh() {
    this.loadingService.start();
    this.interventionService.getInterventionsByUserId(this.userInfoService.getId()).subscribe(
      interventions => {
        this.interventions = interventions;
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
    this.interventionService.addIntervention(this.intervention.versionDoc, Number.parseInt(this.selectedModule)).subscribe(
      intervention => {
        console.log(intervention);
        const interventions = [...this.interventions];
        interventions.push(<Intervention> intervention[0]);
        this.interventions = interventions;
        this.intervention = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Sauvegarde terminée !', detail: `L'intervention a été ajoutée avec succès`});
      },
      error => {
        this.intervention = null;
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  annuler() {
    this.intervention = null;
    this.displayAddDialog = false;
    this.displayEditDialog = false;
  }

  delete() {
    this.displayEditDialog = false;
    this.loadingService.start();
    this.interventionService.deleteIntervention(this.selectedIntervention.id).subscribe(
      rep => {
        const index = this.findSelectedInterventionIndex();
        this.interventions = this.interventions.filter((val, i) => i !== index);
        this.intervention = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Suppression terminée !', detail: `L'intervention a été supprimée avec succès`});
      },
      error => {
        this.intervention = null;
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
    this.interventionService.updateIntervention(this.intervention.id, this.intervention.versionDoc,
                                                this.intervention.moduleId).subscribe(
      intervention => {
        const interventions = [...this.interventions];
        interventions[this.findSelectedInterventionIndex()] = <Intervention> intervention[0];
        this.interventions = interventions;
        this.intervention = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Sauvegarde terminée !', detail: `L'intervention a été mise à jour avec succès`});
      },
      error => {
        this.intervention = null;
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  onRowSelect(event) {

    this.loadingService.start();
    this.moduleService.getModules().subscribe(
      modules => {
        this.modulesAdd = [];
        for (const module of modules) {
          this.modulesAdd.push({label: module.nom, value: module.id});
        }
        this.newIntervention = false;
        this.intervention = this.cloneIntervention(event.data);
        this.displayEditDialog = true;
        this.loadingService.complete();
      },
      error => {
        console.log(error);
        this.loadingService.reset();
        this.showPopUpsErreurStartingInfo(error);
      }
    );


  }

  cloneIntervention(c: Intervention): Intervention {
    const intervention = {};
    for (const prop in c) {
      if (c.hasOwnProperty(prop)) {
        intervention[prop] = c[prop];

      }
    }
    return intervention;
  }

  findSelectedInterventionIndex(): number {
    return this.interventions.indexOf(this.selectedIntervention);
  }

  showPopUpsErreurStartingInfo(error: string): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
  }

}
