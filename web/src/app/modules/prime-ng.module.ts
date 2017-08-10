import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {BlockUIModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';

@NgModule({
  exports: [
    ButtonModule,
    GrowlModule,
    StepsModule,
    SelectButtonModule,
    InputMaskModule,
    BlockUIModule,
    PanelModule,
    PasswordModule,
    InputTextModule,
    ConfirmDialogModule,
    DialogModule
  ]
})
export class PrimeNgModule {


}
