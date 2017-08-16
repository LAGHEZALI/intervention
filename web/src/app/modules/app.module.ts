import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {LoadingBarModule} from 'ng2-loading-bar';

import { AppRoutingModule } from './app-routing.module';

import { InscriptionModule } from '../components/inscription/inscription.module';
import {ConnexionModule} from '../components/connexion/connexion.module';
import {FinalDashboardModule} from '../components/final-dashboard/final-dashboard.module';
import {AdminDashboardModule} from '../components/admin-dashboard/admin-dashboard.module';

import {UserInfoService} from '../shared/services/user-info.service';
import {UserService} from '../shared/services/user.service';

import { AppComponent } from '../app.component';
import { Error404Component } from '../components/error404/error404.component';
import { HomeComponent } from '../components/home/home.component';
import {LoadingService} from '../shared/services/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoadingBarModule,
    InscriptionModule,
    ConnexionModule,
    FinalDashboardModule,
    AdminDashboardModule,
    AppRoutingModule
  ],
  providers: [UserInfoService, LoadingService, AppComponent, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
