import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { Error404Component } from '../components/error404/error404.component';
import { HomeComponent } from '../components/home/home.component';

const appRoutes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: '',   redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
