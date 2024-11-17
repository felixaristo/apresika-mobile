import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CutiPageRoutingModule } from './cuti-routing.module';

import { CutiPage } from './cuti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CutiPageRoutingModule
  ],
  declarations: [CutiPage]
})
export class CutiPageModule {}
