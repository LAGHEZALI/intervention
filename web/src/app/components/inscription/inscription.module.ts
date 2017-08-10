import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrimeNgModule } from '../../modules/prime-ng.module';

import { InscriptionRoutingModule } from './inscription-routing.module';

import {CodeService} from './services/code.service';
import {EtapesGuardService} from './services/etapes-guard.service';
import {EtapesAuthService} from './services/etapes-auth.service';
import {EtapesInfoService} from './services/etapes-info.service';
import {InscriptionService} from './services/inscription.service';
import {ConfirmationService} from 'primeng/primeng';


import { InscriptionComponent } from './inscription.component';
import { Etape1Component } from './etape1/etape1.component';
import { Etape2Component } from './etape2/etape2.component';
import { Etape3Component } from './etape3/etape3.component';
import { Etape4Component } from './etape4/etape4.component';

@NgModule({
  declarations: [
    InscriptionComponent,
    Etape1Component,
    Etape2Component,
    Etape3Component,
    Etape4Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    InscriptionRoutingModule,
    BrowserAnimationsModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  providers: [
    CodeService,
    EtapesGuardService,
    EtapesAuthService,
    EtapesInfoService,
    InscriptionService,
    ConfirmationService
  ],
  exports: [
    InscriptionRoutingModule,
    PrimeNgModule
  ]
})
export class InscriptionModule { }
