import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {ConnexionComponent} from './connexion.component';
import {Etape1Component} from './etape1/etape1.component';
import { Etape2Component } from './etape2/etape2.component';
import {ConnexionRoutingModule} from './connexion-routing.module';
import {ConnexionAuthService} from './services/connexion-auth.service';
import {ConnexionGuardService} from './services/connexion-guard.service';
import {PrimeNgModule} from '../../modules/prime-ng.module';
import {ConnexionService} from './services/connexion.service';
import {ConnexionInfoService} from './services/connexion-info.service';

@NgModule({
  declarations: [
    ConnexionComponent,
    Etape1Component,
    Etape2Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ConnexionRoutingModule,
    PrimeNgModule
  ],
  providers: [
    ConnexionAuthService,
    ConnexionGuardService,
    ConnexionService,
    ConnexionInfoService
  ],
  exports: [
  ]
})
export class ConnexionModule { }
