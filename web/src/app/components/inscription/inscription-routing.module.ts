import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InscriptionComponent} from './inscription.component';
import {Etape1Component} from './etape1/etape1.component';
import {Etape2Component} from './etape2/etape2.component';
import {Etape3Component} from './etape3/etape3.component';
import {Etape4Component} from './etape4/etape4.component';

import {EtapesGuardService} from './services/etapes-guard.service';

const inscriptionRoutes: Routes = [
  {
    path: 'inscription',
    component: InscriptionComponent,
    children: [
      {
        path: 'etape1',
        component: Etape1Component,
        canDeactivate: [EtapesGuardService]
      },
      {
        path: 'etape2',
        component: Etape2Component,
        canActivate: [EtapesGuardService],
        canDeactivate: [EtapesGuardService]
      },
      {
        path: 'etape3',
        component: Etape3Component,
        canActivate: [EtapesGuardService],
        canDeactivate: [EtapesGuardService]
      },
      {
        path: 'etape4',
        component: Etape4Component,
        canActivate: [EtapesGuardService],
        canDeactivate: [EtapesGuardService]
      },
      { path: '',   redirectTo: '/inscription/etape1', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(inscriptionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InscriptionRoutingModule { }
