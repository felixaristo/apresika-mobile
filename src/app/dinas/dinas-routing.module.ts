import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DinasPage } from './dinas.page';

const routes: Routes = [
  {
    path: '',
    component: DinasPage
  },
  {
    path: 'ajukan',
    loadChildren: () => import('./ajukan/ajukan.module').then( m => m.AjukanPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinasPageRoutingModule {}
