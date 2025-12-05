import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/demo/demo').then(m => m.Demo)
  }
];
