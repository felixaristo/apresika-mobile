import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiodataPage } from './biodata.page';

const routes: Routes = [
  {
    path: '',
    component: BiodataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiodataPageRoutingModule {}
