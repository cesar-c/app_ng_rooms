import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'room',
    loadComponent: () => import('./features/rooms/rooms'),
    canActivate: [authGuard],
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
