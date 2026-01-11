import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'room',
    loadComponent: () => import('./features/rooms/rooms'),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login'),
  },
  {
    path: '**',
    redirectTo: 'room',
  },
];
