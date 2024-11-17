import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PekerjaanPage } from './pekerjaan.page';

const routes: Routes = [
  {
    path: '',
    component: PekerjaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PekerjaanPageRoutingModule {}
