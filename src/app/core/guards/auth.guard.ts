import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('authGuard invoked');

  return authService.authState$.pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    }),
  );
};
