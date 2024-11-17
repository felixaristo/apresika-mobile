import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CutiPage } from './cuti.page';

const routes: Routes = [
  {
    path: '',
    component: CutiPage
  },  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'ajukan',
    loadChildren: () => import('./ajukan/ajukan.module').then( m => m.AjukanPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CutiPageRoutingModule {}
