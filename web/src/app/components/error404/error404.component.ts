import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor() { }

  msgs: Message[] = [];

  showMultiple() {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Erreur 404 !', detail: 'Cette page n\'est pas disponible en ce moment'});
    this.msgs.push({severity: 'info', summary: 'Ne restez pas ici !', detail: 'Touchez l\'écran pour aller vers l\'accueil'});
  }

  ngOnInit() {
    this.showMultiple();
  }
}
