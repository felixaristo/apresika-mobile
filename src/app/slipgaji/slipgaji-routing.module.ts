import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlipgajiPage } from './slipgaji.page';

const routes: Routes = [
  {
    path: '',
    component: SlipgajiPage
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailSlipPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlipgajiPageRoutingModule {}
