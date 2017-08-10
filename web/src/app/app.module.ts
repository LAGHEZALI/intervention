import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './modules/app-routing.module';

import { InscriptionModule } from './components/inscription/inscription.module';

import { AppComponent } from './app.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import {ConnexionModule} from './components/connexion/connexion.module';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InscriptionModule,
    ConnexionModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
