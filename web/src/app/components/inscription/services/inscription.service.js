"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var InscriptionService = (function () {
    function InscriptionService(http) {
        this.http = http;
    }
    InscriptionService.prototype.ajouterUtilisateur = function (body, type) {
        var url = '/api/' + type + 's';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .post(url, body, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.throw(error.json);
        });
    };
    return InscriptionService;
}());
InscriptionService = __decorate([
    core_1.Injectable()
], InscriptionService);
exports.InscriptionService = InscriptionService;
