import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {PrimeNgModule} from '../../modules/prime-ng.module';

import {AdminDashboardComponent} from './admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import {AdminDashboardRoutingModule} from './admin-dashboard-routing.module';
import { MonCompteComponent } from './mon-compte/mon-compte.component';

import {UserInfoService} from '../../shared/services/user-info.service';
import {AdminDashboardGuardService} from './services/admin-dashboard-guard.service';
import {MonCompteGuardService} from './mon-compte/mon-compte-guard.service';
import {LoadingBarService} from 'ng2-loading-bar';
import {SystemeService} from '../../shared/services/systeme.service';
import {ModuleService} from '../../shared/services/module.service';
import { GenerationCodeComponent } from './generation-code/generation-code.component';
import { ListeCodeComponent } from './liste-code/liste-code.component';
import { GestionSystemesComponent } from './gestion-systemes/gestion-systemes.component';
import { GestionModulesComponent } from './gestion-modules/gestion-modules.component';
import { GestionUsersComponent } from './gestion-users/gestion-users.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HomeComponent,
    MonCompteComponent,
    GenerationCodeComponent,
    ListeCodeComponent,
    GestionSystemesComponent,
    GestionModulesComponent,
    GestionUsersComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AdminDashboardRoutingModule,
    PrimeNgModule
  ],
  providers: [
    UserInfoService,
    AdminDashboardGuardService,
    MonCompteGuardService,
    LoadingBarService,
    SystemeService,
    ModuleService
  ],
  exports: [
  ]
})
export class AdminDashboardModule { }
