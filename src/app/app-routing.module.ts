import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'kehadiran',
    loadChildren: () => import('./kehadiran/kehadiran.module').then( m => m.KehadiranPageModule)
  },
  {
    path: 'cuti',
    loadChildren: () => import('./cuti/cuti.module').then( m => m.CutiPageModule)
  },
  {
    path: 'cuti-detail/:id',
    loadChildren: () => import('./cuti/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'cuti-ajukan',
    loadChildren: () => import('./cuti/ajukan/ajukan.module').then( m => m.AjukanPageModule)
  },
  {
    path: 'slipgaji',
    loadChildren: () => import('./slipgaji/slipgaji.module').then( m => m.SlipgajiPageModule)
  },
  {
    path: 'slipgaji-detail/:id/:periode',
    loadChildren: () => import('./slipgaji/detail/detail.module').then( m => m.DetailSlipPageModule)
  },
  {
    path: 'biodata',
    loadChildren: () => import('./account/biodata/biodata.module').then( m => m.BiodataPageModule)
  },
  {
    path: 'pekerjaan',
    loadChildren: () => import('./account/pekerjaan/pekerjaan.module').then( m => m.PekerjaanPageModule)
  },
  {
    path: 'payroll',
    loadChildren: () => import('./account/payroll/payroll.module').then( m => m.PayrollPageModule)
  },
  {
    path: 'dinas',
    loadChildren: () => import('./dinas/dinas.module').then( m => m.DinasPageModule)
  },
  {
    path: 'dinas-detail/:id',
    loadChildren: () => import('./dinas/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'dinas-ajukan',
    loadChildren: () => import('./dinas/ajukan/ajukan.module').then( m => m.AjukanPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
