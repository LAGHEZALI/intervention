import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../../../shared/services/module.service';
import {SystemeService} from '../../../shared/services/systeme.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {Message, SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-gestion-modules',
  templateUrl: './gestion-modules.component.html',
  styleUrls: ['./gestion-modules.component.css']
})
export class GestionModulesComponent implements OnInit {

  msgs: Message[];

  displayAddDialog: boolean;
  displayEditDialog: boolean;

  module: Module = {};

  selectedModule: Module;

  systemes: SelectItem[];
  selectedSysteme: string;

  newModule: boolean;

  modules: Module[];

  constructor(
    private moduleService: ModuleService,
    private loadingService: LoadingService,
    private systemeService: SystemeService
  ) { }

  ngOnInit() {
    this.getStartingInfo();
  }

  getStartingInfo() {
    this.loadingService.start();
    this.moduleService.getModules().subscribe(
      modules => {
        this.modules = modules;
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
    this.systemeService.getSystemes().subscribe(
      systemes => {
        this.systemes = [];
        for (const systeme of systemes) {
          this.systemes.push({label: systeme.nom, value: systeme.id});
        }
        this.selectedSysteme = this.systemes[0].value;
        this.newModule = true;
        this.module = {};
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
    this.moduleService.getModules().subscribe(
      modules => {
        this.modules = modules;
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
    this.moduleService.addModule({nom: this.module.nom, systemeId: Number.parseInt(this.selectedSysteme)}).subscribe(
      module => {
        const modules = [...this.modules];
        modules.push({id: module.id, nom: module.nom, systemeId: Number.parseInt(this.selectedSysteme),
                      systemeNom: this.systemes.find(x => x.value === this.selectedSysteme).label});
        this.modules = modules;
        this.module = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Sauvegarde terminée !', detail: `Le module a été ajouté avec succès`});
      },
      error => {
        this.module = null;
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  annuler() {
    this.module = null;
    this.displayAddDialog = false;
    this.displayEditDialog = false;
  }

  delete() {
    this.displayEditDialog = false;
    this.loadingService.start();
    this.moduleService.deleteModule(this.selectedModule.id).subscribe(
      rep => {
        const index = this.findSelectedModuleIndex();
        this.modules = this.modules.filter((val, i) => i !== index);
        this.module = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Suppression terminée !', detail: `Le module a été supprimé avec succès`});
      },
      error => {
        this.module = null;
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
    this.moduleService.updateModule({id: this.module.id, nom: this.module.nom, systemeId: Number.parseInt(this.selectedSysteme)}).subscribe(
      module => {
        const modules = [...this.modules];
        modules[this.findSelectedModuleIndex()] = {id: module.id, nom: module.nom,
          systemeId: Number.parseInt(this.selectedSysteme),
          systemeNom: this.systemes.find(x => x.value === this.selectedSysteme).label};
        this.modules = modules;
        this.module = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Sauvegarde terminée !', detail: `Le module a été mis à jour avec succès`});
      },
      error => {
        this.module = null;
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  onRowSelect(event) {
    this.loadingService.start();
    this.systemeService.getSystemes().subscribe(
      systemes => {
        this.systemes = [];
        for (const systeme of systemes) {
          this.systemes.push({label: systeme.nom, value: systeme.id});
        }
        this.newModule = false;
        this.module = this.cloneModule(event.data);
        this.selectedSysteme = this.module.systemeId + '';
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

  cloneModule(c: Module): Module {
    const module = {};
    for (const prop in c) {
      if (c.hasOwnProperty(prop)) {
        module[prop] = c[prop];

      }
    }
    return module;
  }

  findSelectedModuleIndex(): number {
    return this.modules.indexOf(this.selectedModule);
  }

  showPopUpsErreurStartingInfo(error: string): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
  }

}
