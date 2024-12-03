import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DinasPageRoutingModule } from './dinas-routing.module';

import { DinasPage } from './dinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinasPageRoutingModule
  ],
  declarations: [DinasPage]
})
export class DinasPageModule {}
