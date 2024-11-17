import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KehadiranPageRoutingModule } from './kehadiran-routing.module';

import { KehadiranPage } from './kehadiran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KehadiranPageRoutingModule
  ],
  declarations: [KehadiranPage]
})
export class KehadiranPageModule {}
