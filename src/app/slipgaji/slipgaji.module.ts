import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlipgajiPageRoutingModule } from './slipgaji-routing.module';

import { SlipgajiPage } from './slipgaji.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlipgajiPageRoutingModule
  ],
  declarations: [SlipgajiPage]
})
export class SlipgajiPageModule {}
