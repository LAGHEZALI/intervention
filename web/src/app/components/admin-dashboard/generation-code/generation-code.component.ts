import { Component, OnInit } from '@angular/core';
import {Message, SelectItem} from 'primeng/primeng';
import {LoadingService} from '../../../shared/services/loading.service';
import {CodeService} from '../../inscription/services/code.service';

@Component({
  selector: 'app-generation-code',
  templateUrl: './generation-code.component.html',
  styleUrls: ['./generation-code.component.css']
})
export class GenerationCodeComponent implements OnInit {

  msgs: Message[] = [];
  types: SelectItem[];
  selectedType: string = null;
  generatedCode: string = null;

  constructor(
    private codeService: CodeService,
    private loadingService: LoadingService
  ) {
    this.types = [];
    this.types.push({label: 'Administrateur', value: 'admin'});
    this.types.push({label: 'Utilisateur Final', value: 'final'});
    this.types.push({label: 'Consultant Estimé', value: 'consultantEstime'});
    this.types.push({label: 'Consultant Réel', value: 'consultantReel'});
    this.types.push({label: 'Chef de Projet', value: 'chefProjet'});
  }

  ngOnInit(): void {
  }

  generer() {
    this.loadingService.start();
    this.codeService.generateCode(this.selectedType).subscribe(
      code => {
        this.generatedCode = code;
        this.loadingService.complete();
        this.showPopUpsCodeOk();
      },
      error => {
        console.log(error);
        this.loadingService.reset();
        this.loadingService.reset();
        this.showPopUpsCodeNonOk(error);
      }

    );
  }

  copier () {
    (<HTMLInputElement>document.getElementById('codeInput')).select();
    document.execCommand('copy');
    this.showPopUpsCodeCopy();
  }

  reset() {
    this.selectedType = null;
    this.generatedCode = null;
  }

  showPopUpsCodeOk(): void {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Code Généré !', detail: 'Le code a été généré avec succès'});
    this.msgs.push({severity: 'info', summary: 'Astuce !', detail: 'Vous pouvez copier le code avec le bouton si dessous'});
  }

  showPopUpsCodeNonOk(error: string): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Une erreur s\'est produite !', detail: error});
  }

  showPopUpsCodeCopy(): void {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Code copié !', detail: 'Le est copié dans le presse-papier'});
  }

}
