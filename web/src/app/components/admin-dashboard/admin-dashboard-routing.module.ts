import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminDashboardComponent} from './admin-dashboard.component';
import {HomeComponent} from './home/home.component';
import {MonCompteComponent} from './mon-compte/mon-compte.component';


import {AdminDashboardGuardService} from './services/admin-dashboard-guard.service';
import {MonCompteGuardService} from './mon-compte/mon-compte-guard.service';
import {GenerationCodeComponent} from './generation-code/generation-code.component';
import {ListeCodeComponent} from './liste-code/liste-code.component';
import {GestionSystemesComponent} from './gestion-systemes/gestion-systemes.component';
import {GestionModulesComponent} from './gestion-modules/gestion-modules.component';
import {GestionUsersComponent} from "./gestion-users/gestion-users.component";

const connexionRoutes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminDashboardGuardService],
    children: [
      {
        path: 'accueil',
        component: HomeComponent
      },
      {
        path: 'mon-compte',
        component: MonCompteComponent,
        canDeactivate: [MonCompteGuardService],
      },
      {
        path: 'generation-code',
        component: GenerationCodeComponent,
      },
      {
        path: 'liste-code',
        component: ListeCodeComponent,
      },
      {
        path: 'systemes',
        component: GestionSystemesComponent,
      },
      {
        path: 'modules',
        component: GestionModulesComponent,
      },
      {
        path: 'utilisateurs',
        component: GestionUsersComponent,
      },
      { path: '',   redirectTo: '/admin-dashboard/accueil', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(connexionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminDashboardRoutingModule { }
