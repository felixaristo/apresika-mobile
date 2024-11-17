import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KehadiranPage } from './kehadiran.page';

const routes: Routes = [
  {
    path: '',
    component: KehadiranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KehadiranPageRoutingModule {}
