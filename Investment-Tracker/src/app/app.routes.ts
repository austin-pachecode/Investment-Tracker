import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Home | Investment Tracker',
  },
  {
    path: 'update',
    loadComponent: () => import('./pages/update/update').then((m) => m.Update),
    title: 'Update | Investment Tracker',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
