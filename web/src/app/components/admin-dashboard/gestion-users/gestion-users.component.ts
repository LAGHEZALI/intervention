import { Component, OnInit } from '@angular/core';
import {Message, SelectItem} from 'primeng/primeng';

import {LoadingService} from '../../../shared/services/loading.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent implements OnInit {

  msgs: Message[];

  displayAddDialog: boolean;
  displayEditDialog: boolean;

  user: User = {};

  selectedUser: User;

  newUser: boolean;

  users: User[];

  types: SelectItem[];
  typesDrop: SelectItem[];

  constructor(
    private userService: UserService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.setTypes();
    this.getStartingInfo();
  }

  setTypes() {
    this.types = [];
    this.types.push({label: 'Tous les Types', value: null});
    this.types.push({label: 'Administrateur', value: 'Administrateur'});
    this.types.push({label: 'Utilisateur Final', value: 'Utilisateur Final'});
    this.types.push({label: 'Consultant Estimé', value: 'Consultant Estimé'});
    this.types.push({label: 'Consultant Réel', value: 'Consultant Réel'});
    this.types.push({label: 'Chef de Projet', value: 'Chef de Projet'});
    this.typesDrop = [];
    this.typesDrop.push({label: 'Administrateur', value: 'admin'});
    this.typesDrop.push({label: 'Utilisateur Final', value: 'final'});
    this.typesDrop.push({label: 'Consultant Estimé', value: 'consultantEstime'});
    this.typesDrop.push({label: 'Consultant Réel', value: 'consultantReel'});
    this.typesDrop.push({label: 'Chef de Projet', value: 'chefProjet'});
  }

  getStartingInfo() {
    this.loadingService.start();
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.loadingService.complete();
      },
      error => {
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  showDialogToAdd() {
    this.newUser = true;
    this.user = {type: 'admin'};
    this.displayAddDialog = true;
  }

  refresh() {
    this.loadingService.start();
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.loadingService.complete();
      },
      error => {
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  save() {
    this.displayAddDialog = false;
    this.loadingService.start();
    this.userService.addUser(this.user).subscribe(
      user => {
        const users = [...this.users];
        users.push(<User> user);
        this.users = users;
        this.user = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Sauvegarde terminée !', detail: `L'utilisateur a été ajouté avec succès`});
      },
      error => {
        this.user = null;
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  annuler() {
    this.user = null;
    this.displayAddDialog = false;
    this.displayEditDialog = false;
  }

  delete() {
    this.displayEditDialog = false;
    this.loadingService.start();
    this.userService.deleteUser(this.selectedUser.id).subscribe(
      rep => {
        const index = this.findSelectedUserIndex();
        this.users = this.users.filter((val, i) => i !== index);
        this.user = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Suppression terminée !', detail: `L'utilisateur a été supprimé avec succès`});
      },
      error => {
        this.user = null;
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
    this.userService.updateUser(this.user).subscribe(
      user => {
        const users = [...this.users];
        users[this.findSelectedUserIndex()] = <User> user;
        this.users = users;
        this.user = null;
        this.loadingService.complete();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Sauvegarde terminée !', detail: `L'ultilisateur a été mis à jour avec succès`});
      },
      error => {
        this.user = null;
        console.log(error);
        this.loadingService.reset();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Une erreur c\'est produite !', detail: `Erreur details: ${error}`});
      }
    );
  }

  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    this.displayEditDialog = true;
  }

  cloneUser(c: User): User {
    const user = {};
    for (const prop in c) {
      if (c.hasOwnProperty(prop)) {
        user[prop] = c[prop];

      }
    }
    return user;
  }

  findSelectedUserIndex(): number {
    return this.users.indexOf(this.selectedUser);
  }
}
