import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { unAuthGuard } from '@core/guards/un-auth.guard';

export const routes: Routes = [
  {
    path: 'room',
    loadComponent: () => import('./features/rooms/rooms'),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/rooms/components/room-empty/room-empty'),
      },
      {
        path: ':roomId',
        loadComponent: () => import('./features/rooms/components/chat-panel/chat-panel'),
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login'),
    canActivate: [unAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'room',
  },
];
