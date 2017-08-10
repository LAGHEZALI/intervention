import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnexionComponent} from './connexion.component';
import {Etape1Component} from './etape1/etape1.component';
import {Etape2Component} from './etape2/etape2.component';
import {ConnexionGuardService} from './services/connexion-guard.service';

const connexionRoutes: Routes = [
  {
    path: 'connexion',
    component: ConnexionComponent,
    children: [
      {
        path: 'etape1',
        component: Etape1Component,
        canDeactivate: [ConnexionGuardService]
      },
      {
        path: 'etape2',
        component: Etape2Component,
        canActivate: [ConnexionGuardService],
        canDeactivate: [ConnexionGuardService]
      },
      { path: '',   redirectTo: '/connexion/etape1', pathMatch: 'full' },
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
export class ConnexionRoutingModule { }
