import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PekerjaanPageRoutingModule } from './pekerjaan-routing.module';

import { PekerjaanPage } from './pekerjaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PekerjaanPageRoutingModule
  ],
  declarations: [PekerjaanPage]
})
export class PekerjaanPageModule {}
