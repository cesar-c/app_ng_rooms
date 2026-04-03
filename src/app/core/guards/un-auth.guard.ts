import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

export const unAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('unAuthGuard invoked');

  return authService.authState$.pipe(
    take(1),
    map((user) => {
      if (user) {
        router.navigate(['/room']);
        return false;
      }
      return true;
    }),
  );
};
