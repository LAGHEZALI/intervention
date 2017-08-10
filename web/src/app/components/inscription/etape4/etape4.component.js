"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Etape4Component = (function () {
    function Etape4Component(etapesInfoService, inscriptionService) {
        this.etapesInfoService = etapesInfoService;
        this.inscriptionService = inscriptionService;
        this.msgs = [];
    }
    Etape4Component.prototype.ngOnInit = function () {
        this.type = this.etapesInfoService.type;
        this.pseudo = this.etapesInfoService.pseudo;
        this.mdp = this.etapesInfoService.mdp;
        this.nom = this.etapesInfoService.nom;
        this.prenom = this.etapesInfoService.prenom;
        this.societe = this.etapesInfoService.societe;
    };
    Etape4Component.prototype.verifSociete = function () {
        return this.societe === '';
    };
    Etape4Component.prototype.terminer = function () {
        var _this = this;
        this.on();
        var newUser = { pseudo: this.pseudo, mdp: this.mdp, nom: this.nom, prenom: this.prenom, societe: this.societe };
        this.inscriptionService.ajouterUtilisateur(newUser, this.type)
            .subscribe(function (rep) { return _this.evalReponse(rep); }, function (error) { return console.log(error); });
    };
    Etape4Component.prototype.evalReponse = function (rep) {
        if (rep) {
            this.etapeOk = true;
            this.showPopUpsInscriptionOk();
        }
        else {
            this.showPopUpsInscriptionNonOk();
        }
        this.off();
    };
    Etape4Component.prototype.showPopUpsInscriptionOk = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Bravo !', detail: 'Votre Inscription a été terminer avec succes' });
        this.msgs.push({ severity: 'info', summary: 'Passez à l\'action !', detail: 'Vous pouvez vous connecter désormais' });
    };
    Etape4Component.prototype.showPopUpsInscriptionNonOk = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Oups !', detail: 'L\'inscription a échoué' });
        this.msgs.push({ severity: 'info', summary: 'Quoi faire ?', detail: 'Recommencez ou contacter La SNRT' });
    };
    Etape4Component.prototype.on = function () {
        document.getElementById('overlay').style.display = 'block';
    };
    Etape4Component.prototype.off = function () {
        document.getElementById('overlay').style.display = 'none';
    };
    return Etape4Component;
}());
Etape4Component = __decorate([
    core_1.Component({
        selector: 'app-etape4',
        templateUrl: './etape4.component.html',
        styleUrls: ['./etape4.component.css']
    })
], Etape4Component);
exports.Etape4Component = Etape4Component;
