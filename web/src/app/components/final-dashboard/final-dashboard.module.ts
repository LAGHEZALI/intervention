import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {PrimeNgModule} from '../../modules/prime-ng.module';

import {FinalDashboardComponent} from './final-dashboard.component';
import { HomeComponent } from './home/home.component';
import {FinalDashboardRoutingModule} from './final-dashboard-routing.module';
import { MonCompteComponent } from './mon-compte/mon-compte.component';

import {UserInfoService} from '../../shared/services/user-info.service';
import {FinalDashboardGuardService} from './services/final-dashboard-guard.service';
import {MonCompteGuardService} from './mon-compte/mon-compte-guard.service';
import {LoadingBarService} from 'ng2-loading-bar';
import {SystemeService} from '../../shared/services/systeme.service';
import {ModuleService} from '../../shared/services/module.service';
import { IntervenionsComponent } from './intervenions/intervenions.component';
import {InterventionService} from '../../shared/services/intervention.service';
import { BesoinsComponent } from './besoins/besoins.component';


@NgModule({
  declarations: [
    FinalDashboardComponent,
    HomeComponent,
    MonCompteComponent,
    IntervenionsComponent,
    BesoinsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FinalDashboardRoutingModule,
    PrimeNgModule
  ],
  providers: [
    UserInfoService,
    FinalDashboardGuardService,
    MonCompteGuardService,
    LoadingBarService,
    SystemeService,
    ModuleService,
    InterventionService
  ],
  exports: [
  ]
})
export class FinalDashboardModule { }
