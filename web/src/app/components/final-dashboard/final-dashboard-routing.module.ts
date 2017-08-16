import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FinalDashboardComponent} from './final-dashboard.component';
import {HomeComponent} from './home/home.component';
import {MonCompteComponent} from './mon-compte/mon-compte.component';


import {FinalDashboardGuardService} from './services/final-dashboard-guard.service';
import {MonCompteGuardService} from './mon-compte/mon-compte-guard.service';
import {IntervenionsComponent} from './intervenions/intervenions.component';
import {BesoinsComponent} from './besoins/besoins.component';

const connexionRoutes: Routes = [
  {
    path: 'final-dashboard',
    component: FinalDashboardComponent,
    canActivate: [FinalDashboardGuardService],
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
        path: 'interventions',
        component: IntervenionsComponent,
      },
      {
        path: 'besoins',
        component: BesoinsComponent,
      },
      { path: '',   redirectTo: '/final-dashboard/accueil', pathMatch: 'full' },
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
export class FinalDashboardRoutingModule { }
