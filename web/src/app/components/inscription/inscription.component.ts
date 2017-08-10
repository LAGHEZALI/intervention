import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/components/common/menuitem';

@Component({
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class InscriptionComponent implements OnInit {

  items: MenuItem[];
  activeStep: number;

  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Type Utilisateur'},
      {label: 'Informations du Compte'},
      {label: 'Informations Personnelles'},
      {label: 'Récapitulatif'}
    ];
    this.activeStep = 0;
  }

  setActiveStep(step: number) {
    this.activeStep = step;
  }

}
